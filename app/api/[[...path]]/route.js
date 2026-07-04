import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getDb } from '@/lib/mongo'
import { ROOM_TYPES, HOTEL, TESTIMONIALS, buildRoomInventory } from '@/lib/hotel-data'

const ok = (data, status = 200) => NextResponse.json({ ok: true, data }, { status })
const bad = (message, status = 400) => NextResponse.json({ ok: false, error: message }, { status })

// ---------- Utilities ----------
function diffNights(a, b) {
  const d1 = new Date(a)
  const d2 = new Date(b)
  const ms = d2.getTime() - d1.getTime()
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)))
}

function bookingIdFor(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `ASH-${y}${m}${d}-${rand}`
}

function datesOverlap(aStart, aEnd, bStart, bEnd) {
  return new Date(aStart) < new Date(bEnd) && new Date(bStart) < new Date(aEnd)
}

async function ensureSeed(db) {
  const existing = await db.collection('rooms').countDocuments()
  if (existing === 0) {
    const inventory = buildRoomInventory().map((r) => ({ ...r, _id: uuidv4() }))
    await db.collection('rooms').insertMany(inventory)
  }
  await db.collection('bookings').createIndex({ bookingId: 1 }, { unique: true }).catch(() => {})
  await db.collection('bookings').createIndex({ status: 1, checkIn: 1 })
}

async function computeAvailability(db, checkIn, checkOut) {
  // Rooms grouped by type
  const rooms = await db.collection('rooms').find({}).toArray()
  const totalByType = rooms.reduce((acc, r) => {
    acc[r.roomType] = (acc[r.roomType] || 0) + 1
    return acc
  }, {})

  // Overlapping bookings by type
  const activeStatuses = ['pending', 'confirmed', 'checked-in']
  const bookings = await db
    .collection('bookings')
    .find({ status: { $in: activeStatuses } })
    .toArray()

  const usedByType = {}
  bookings.forEach((b) => {
    if (datesOverlap(checkIn, checkOut, b.checkIn, b.checkOut)) {
      usedByType[b.roomType] = (usedByType[b.roomType] || 0) + 1
    }
  })

  return ROOM_TYPES.map((rt) => {
    const total = totalByType[rt.id] || rt.inventory
    const used = usedByType[rt.id] || 0
    const available = Math.max(0, total - used)
    return { ...rt, totalRooms: total, roomsAvailable: available }
  })
}

async function readJson(req) {
  try {
    return await req.json()
  } catch {
    return {}
  }
}

// ---------- Routing ----------
async function route(req, method, path) {
  const db = await getDb()
  await ensureSeed(db)
  const [head, second, third] = path
  const url = new URL(req.url)

  // ==== ROOMS ====
  if (head === 'rooms' && method === 'GET') {
    if (second) {
      const rt = ROOM_TYPES.find((r) => r.slug === second || r.id === second)
      if (!rt) return bad('Room type not found', 404)
      return ok(rt)
    }
    return ok(ROOM_TYPES)
  }

  // ==== AVAILABILITY ====
  if (head === 'availability' && method === 'GET') {
    const checkIn = url.searchParams.get('checkIn')
    const checkOut = url.searchParams.get('checkOut')
    if (!checkIn || !checkOut) return bad('checkIn and checkOut required')
    if (diffNights(checkIn, checkOut) <= 0) return bad('Invalid date range')
    const avail = await computeAvailability(db, checkIn, checkOut)
    return ok({
      checkIn,
      checkOut,
      nights: diffNights(checkIn, checkOut),
      roomTypes: avail,
    })
  }

  // ==== BOOKINGS ====
  if (head === 'bookings' && method === 'POST') {
    const body = await readJson(req)
    const required = ['guestName', 'phone', 'email', 'checkIn', 'checkOut', 'roomType']
    for (const key of required) {
      if (!body[key]) return bad(`Missing field: ${key}`)
    }
    const nights = diffNights(body.checkIn, body.checkOut)
    if (nights <= 0) return bad('Check-out must be after check-in')

    const rt = ROOM_TYPES.find((r) => r.id === body.roomType || r.slug === body.roomType)
    if (!rt) return bad('Invalid room type')

    // Availability check
    const avail = await computeAvailability(db, body.checkIn, body.checkOut)
    const target = avail.find((a) => a.id === rt.id)
    if (!target || target.roomsAvailable <= 0) return bad('Sorry, no rooms of this type available for the selected dates', 409)

    const rate = rt.price * nights
    const gstPercent = HOTEL.gstPercent
    const taxes = Math.round((rate * gstPercent) / 100)
    const discount = Number(body.discount || 0)
    const total = rate + taxes - discount

    const bookingId = bookingIdFor()
    const now = new Date().toISOString()
    const doc = {
      _id: uuidv4(),
      bookingId,
      timestamp: now,
      guestName: body.guestName,
      phone: body.phone,
      email: body.email,
      address: body.address || '',
      city: body.city || '',
      state: body.state || '',
      country: body.country || 'India',
      adults: Number(body.adults || 1),
      children: Number(body.children || 0),
      roomType: rt.id,
      roomTypeName: rt.name,
      roomNumber: null,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      nights,
      arrivalTime: body.arrivalTime || '',
      specialRequests: body.specialRequests || '',
      idProof: body.idProof || '',
      vehicleNumber: body.vehicleNumber || '',
      gstNumber: body.gstNumber || '',
      rate,
      taxes,
      discount,
      total,
      paid: 0,
      balance: total,
      status: 'pending',
      paymentStatus: 'unpaid',
      notes: '',
      createdAt: now,
      updatedAt: now,
    }
    await db.collection('bookings').insertOne(doc)

    // Upsert customer
    await db.collection('customers').updateOne(
      { email: body.email },
      {
        $setOnInsert: {
          _id: uuidv4(),
          customerId: `CUS-${Date.now().toString().slice(-6)}`,
          createdAt: now,
        },
        $set: {
          name: body.guestName,
          phone: body.phone,
          email: body.email,
          address: body.address || '',
        },
        $inc: { visits: 1, lifetimeSpend: total },
      },
      { upsert: true }
    )

    return ok(doc, 201)
  }

  if (head === 'bookings' && method === 'GET') {
    if (second) {
      const b = await db.collection('bookings').findOne({ bookingId: second })
      if (!b) return bad('Booking not found', 404)
      return ok(b)
    }
    const status = url.searchParams.get('status')
    const q = status ? { status } : {}
    const items = await db.collection('bookings').find(q).sort({ createdAt: -1 }).limit(200).toArray()
    return ok(items)
  }

  if (head === 'bookings' && method === 'PATCH' && second) {
    const body = await readJson(req)
    const allowed = ['status', 'paymentStatus', 'notes', 'roomNumber', 'paid', 'discount']
    const set = { updatedAt: new Date().toISOString() }
    for (const k of allowed) if (body[k] !== undefined) set[k] = body[k]
    if (set.paid !== undefined) {
      const b = await db.collection('bookings').findOne({ bookingId: second })
      if (b) set.balance = b.total - Number(set.paid)
    }
    const res = await db.collection('bookings').findOneAndUpdate(
      { bookingId: second },
      { $set: set },
      { returnDocument: 'after' }
    )
    if (!res) return bad('Booking not found', 404)
    return ok(res)
  }

  // ==== DASHBOARD ====
  if (head === 'dashboard' && method === 'GET') {
    const bookings = await db.collection('bookings').find({}).toArray()
    const rooms = await db.collection('rooms').find({}).toArray()
    const today = new Date().toISOString().slice(0, 10)
    const arrivals = bookings.filter((b) => b.checkIn.slice(0, 10) === today && ['confirmed', 'pending'].includes(b.status))
    const departures = bookings.filter((b) => b.checkOut.slice(0, 10) === today)
    const pending = bookings.filter((b) => b.status === 'pending')
    const confirmed = bookings.filter((b) => b.status === 'confirmed')
    const cancelled = bookings.filter((b) => b.status === 'cancelled')
    const checkedIn = bookings.filter((b) => b.status === 'checked-in')
    const revenue = bookings
      .filter((b) => ['confirmed', 'checked-in', 'checked-out'].includes(b.status))
      .reduce((s, b) => s + (b.total || 0), 0)
    const paid = bookings.reduce((s, b) => s + (b.paid || 0), 0)
    const occupancy = rooms.length ? Math.round((checkedIn.length / rooms.length) * 100) : 0
    return ok({
      totals: {
        bookings: bookings.length,
        pending: pending.length,
        confirmed: confirmed.length,
        cancelled: cancelled.length,
        checkedIn: checkedIn.length,
        revenue,
        paid,
        occupancy,
        rooms: rooms.length,
      },
      todayArrivals: arrivals,
      todayDepartures: departures,
      recent: bookings
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10),
    })
  }

  // ==== CALENDAR ====
  if (head === 'calendar' && method === 'GET') {
    const month = url.searchParams.get('month') // YYYY-MM
    const bookings = await db
      .collection('bookings')
      .find({ status: { $in: ['pending', 'confirmed', 'checked-in'] } })
      .toArray()
    const filtered = month
      ? bookings.filter((b) => b.checkIn.slice(0, 7) === month || b.checkOut.slice(0, 7) === month)
      : bookings
    return ok(filtered.map((b) => ({
      bookingId: b.bookingId,
      title: `${b.guestName} \u2022 ${b.roomTypeName}`,
      guestName: b.guestName,
      phone: b.phone,
      roomType: b.roomType,
      roomTypeName: b.roomTypeName,
      checkIn: b.checkIn,
      checkOut: b.checkOut,
      status: b.status,
    })))
  }

  // ==== CONTACT ====
  if (head === 'contact' && method === 'POST') {
    const body = await readJson(req)
    if (!body.name || !body.email || !body.message) return bad('name, email, message required')
    const doc = { _id: uuidv4(), ...body, createdAt: new Date().toISOString(), read: false }
    await db.collection('contacts').insertOne(doc)
    return ok(doc, 201)
  }

  if (head === 'contact' && method === 'GET') {
    const items = await db.collection('contacts').find({}).sort({ createdAt: -1 }).limit(200).toArray()
    return ok(items)
  }

  // ==== REVIEWS ====
  if (head === 'reviews' && method === 'GET') {
    const items = await db.collection('reviews').find({}).sort({ createdAt: -1 }).toArray()
    // Include seed testimonials if collection empty
    if (items.length === 0) return ok(TESTIMONIALS.map((t) => ({ ...t, seed: true })))
    return ok(items)
  }

  if (head === 'reviews' && method === 'POST') {
    const body = await readJson(req)
    if (!body.name || !body.rating || !body.text) return bad('name, rating, text required')
    const doc = { _id: uuidv4(), ...body, createdAt: new Date().toISOString(), verified: false }
    await db.collection('reviews').insertOne(doc)
    return ok(doc, 201)
  }

  // ==== ADMIN LOGIN ====
  if (head === 'admin' && second === 'login' && method === 'POST') {
    const body = await readJson(req)
    if (body.password === (process.env.ADMIN_PASSWORD || 'ashira@2025')) {
      return ok({ token: 'ashira-admin-' + uuidv4() })
    }
    return bad('Invalid password', 401)
  }

  // ==== HEALTH ====
  if (head === 'health' || head === undefined) {
    return ok({ service: 'Ashira Inn API', time: new Date().toISOString() })
  }

  return bad('Route not found: ' + path.join('/'), 404)
}

export async function GET(req, { params }) {
  const { path = [] } = await params
  try { return await route(req, 'GET', path) } catch (e) { console.error(e); return bad(e.message || 'Server error', 500) }
}
export async function POST(req, { params }) {
  const { path = [] } = await params
  try { return await route(req, 'POST', path) } catch (e) { console.error(e); return bad(e.message || 'Server error', 500) }
}
export async function PATCH(req, { params }) {
  const { path = [] } = await params
  try { return await route(req, 'PATCH', path) } catch (e) { console.error(e); return bad(e.message || 'Server error', 500) }
}
export async function DELETE(req, { params }) {
  const { path = [] } = await params
  try { return await route(req, 'DELETE', path) } catch (e) { console.error(e); return bad(e.message || 'Server error', 500) }
}
