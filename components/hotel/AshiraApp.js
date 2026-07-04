'use client'
import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster, toast } from 'sonner'
import {
  Menu, X, Phone, Mail, MapPin, Star, ChevronRight, ChevronLeft, Calendar, Users,
  Bed, Wifi, Snowflake, Tv, Coffee, Bath, Sparkles, CheckCircle2, Clock, Car,
  UtensilsCrossed, Award, ArrowRight, ArrowUpRight, ShieldCheck, Send, MessageCircle,
  LogOut, LayoutDashboard, CalendarDays, BookOpen, IndianRupee, TrendingUp,
  BedDouble, DoorOpen, ChefHat, Waves, Building2, GraduationCap, Train, Flag, Bird,
  ShoppingBag, Instagram, Facebook, ChevronDown, PenTool, Shirt, Zap, ArrowUpDown,
  BellRing, ConciergeBell, Plane, Droplets, CupSoda, Loader2, Filter, Eye, Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

import { HOTEL, ROOM_TYPES, ROOM_AMENITIES, HOTEL_AMENITIES, ATTRACTIONS, RESTAURANT, GALLERY, OFFERS, FAQ_ITEMS, OWNER_IMAGES } from '@/lib/hotel-data'
import { api, inr, todayISO, nightsBetween, useRoute } from '@/components/hotel/shared'

const AMENITY_ICON = { Snowflake, Wifi, Tv, CupSoda, Coffee, Shirt, PenTool, Droplets, BellRing, Sparkles, Bath, BedDouble, UtensilsCrossed, ConciergeBell, Car, Plane, Zap, ArrowUpDown }

/* ===================== NAV ===================== */
function Nav({ navigate, currentPath }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll); onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [
    ['Home', 'home'], ['Rooms', 'rooms'], ['Restaurant', 'restaurant'],
    ['Gallery', 'gallery'], ['Nearby', 'attractions'], ['About', 'about'], ['Contact', 'contact'],
  ]
  const onHome = currentPath === 'home'
  const dark = onHome && !scrolled
  return (
    <>
      <div className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled || !onHome ? 'bg-white/95 backdrop-blur border-b border-stone-200 shadow-sm' : 'bg-transparent'}`}>
        <div className="container flex items-center justify-between h-20">
          <button onClick={() => navigate('home')} className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full grid place-items-center font-display text-lg font-bold ${dark ? 'bg-white/15 text-white ring-1 ring-white/40' : 'bg-[#0f2222] text-[#d4b170]'}`}>Ai</div>
            <div className="text-left leading-tight">
              <div className={`font-display text-xl tracking-wide ${dark ? 'text-white' : 'text-[#0f2222]'}`}>Ashira Inn</div>
              <div className={`text-[10px] uppercase tracking-[0.25em] ${dark ? 'text-white/70' : 'text-stone-500'}`}>Greater Noida</div>
            </div>
          </button>
          <nav className="hidden lg:flex items-center gap-8">
            {links.map(([label, path]) => (
              <button key={path} onClick={() => navigate(path)} className={`relative text-sm font-medium tracking-wide transition-colors ${dark ? 'text-white/90 hover:text-white' : currentPath === path ? 'text-[#0f2222]' : 'text-stone-600 hover:text-[#0f2222]'}`}>
                {label}
                {currentPath === path && <span className={`absolute -bottom-1.5 left-0 right-0 h-[2px] ${dark ? 'bg-[#d4b170]' : 'bg-[#c9a961]'}`} />}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={`tel:${HOTEL.phones[0]}`} className={`hidden md:inline-flex items-center gap-2 text-sm ${dark ? 'text-white/90' : 'text-stone-700'}`}>
              <Phone className="h-4 w-4" /> {HOTEL.phones[0]}
            </a>
            <Button onClick={() => navigate('book')} className="bg-[#c9a961] hover:bg-[#b8974a] text-[#0f2222] font-semibold rounded-full px-5">Book Now</Button>
            <button className="lg:hidden" onClick={() => setOpen(true)}><Menu className={dark ? 'text-white' : 'text-[#0f2222]'} /></button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween' }} className="fixed inset-y-0 right-0 w-80 bg-white z-[60] shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="font-display text-2xl text-[#0f2222]">Menu</div>
              <button onClick={() => setOpen(false)}><X /></button>
            </div>
            <div className="flex flex-col gap-1">
              {links.map(([l, p]) => (
                <button key={p} onClick={() => { navigate(p); setOpen(false) }} className="text-left py-3 border-b border-stone-100 text-stone-700 hover:text-[#0f2222] font-medium">{l}</button>
              ))}
              <button onClick={() => { navigate('offers'); setOpen(false) }} className="text-left py-3 border-b border-stone-100">Offers</button>
              <button onClick={() => { navigate('faq'); setOpen(false) }} className="text-left py-3 border-b border-stone-100">FAQ</button>
              <button onClick={() => { navigate('admin'); setOpen(false) }} className="text-left py-3 border-b border-stone-100 text-stone-500">Admin</button>
              <Button onClick={() => { navigate('book'); setOpen(false) }} className="mt-4 bg-[#0f2222] hover:bg-[#0a1717] text-white rounded-full">Book Now</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ===================== FOOTER ===================== */
function Footer({ navigate }) {
  return (
    <footer className="luxe-gradient text-white/90 mt-24">
      <div className="container py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-3xl text-[#d4b170]">Ashira Inn</div>
          <p className="text-sm text-white/70 mt-3 italic">"{HOTEL.tagline}"</p>
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-[#d4b170]" /> <span>{HOTEL.address}</span></div>
            <div className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-[#d4b170]" /> <span>{HOTEL.phones.join(' · ')}</span></div>
            <div className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-[#d4b170]" /> <span>{HOTEL.email}</span></div>
          </div>
        </div>
        <div>
          <div className="font-display text-lg text-[#d4b170] mb-4">Explore</div>
          <ul className="space-y-2 text-sm">
            {[['Home','home'],['Rooms','rooms'],['Restaurant','restaurant'],['Gallery','gallery'],['Nearby Attractions','attractions'],['About','about']].map(([l,p])=>(
              <li key={p}><button className="hover:text-[#d4b170]" onClick={()=>navigate(p)}>{l}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-display text-lg text-[#d4b170] mb-4">Guest Info</div>
          <ul className="space-y-2 text-sm">
            <li><button className="hover:text-[#d4b170]" onClick={()=>navigate('faq')}>FAQ</button></li>
            <li><button className="hover:text-[#d4b170]" onClick={()=>navigate('offers')}>Offers</button></li>
            <li><button className="hover:text-[#d4b170]" onClick={()=>navigate('contact')}>Contact</button></li>
            <li><button className="hover:text-[#d4b170]" onClick={()=>navigate('policy')}>Cancellation Policy</button></li>
            <li><button className="hover:text-[#d4b170]" onClick={()=>navigate('admin')}>Staff Login</button></li>
          </ul>
        </div>
        <div>
          <div className="font-display text-lg text-[#d4b170] mb-4">Newsletter</div>
          <p className="text-sm text-white/70 mb-3">Best rates & seasonal offers delivered to your inbox.</p>
          <form className="flex gap-2" onSubmit={(e)=>{e.preventDefault(); toast.success("You're subscribed!")}}>
            <Input className="bg-white/10 border-white/20 text-white placeholder:text-white/50" placeholder="your@email.com" />
            <Button type="submit" className="bg-[#d4b170] hover:bg-[#c19a4d] text-[#0f2222]"><Send className="h-4 w-4" /></Button>
          </form>
          <div className="flex gap-3 mt-6">
            <a className="h-9 w-9 rounded-full bg-white/10 hover:bg-[#d4b170] hover:text-[#0f2222] grid place-items-center transition"><Instagram className="h-4 w-4" /></a>
            <a className="h-9 w-9 rounded-full bg-white/10 hover:bg-[#d4b170] hover:text-[#0f2222] grid place-items-center transition"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-6 text-xs text-white/60 flex flex-col md:flex-row justify-between gap-2">
          <div>© {new Date().getFullYear()} Ashira Inn. All rights reserved.</div>
          <div className="flex gap-4">
            <button onClick={()=>navigate('policy')} className="hover:text-[#d4b170]">Privacy</button>
            <button onClick={()=>navigate('policy')} className="hover:text-[#d4b170]">Terms</button>
            <button onClick={()=>navigate('policy')} className="hover:text-[#d4b170]">Cancellation</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ===================== BOOKING WIDGET ===================== */
function BookingWidget({ navigate, floating = false }) {
  const [checkIn, setCheckIn] = useState(todayISO(1))
  const [checkOut, setCheckOut] = useState(todayISO(2))
  const [adults, setAdults] = useState('2')
  const [children, setChildren] = useState('0')
  const [roomType, setRoomType] = useState('any')
  const submit = (e) => {
    e.preventDefault()
    if (nightsBetween(checkIn, checkOut) <= 0) { toast.error('Check-out must be after check-in'); return }
    navigate('book', { checkIn, checkOut, adults, children, roomType })
  }
  return (
    <form onSubmit={submit} className={`${floating ? 'glass' : 'bg-white'} rounded-2xl p-4 md:p-6 shadow-2xl border ${floating ? 'border-white/40' : 'border-stone-200'}`}>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        <div>
          <Label className="text-xs uppercase tracking-wider text-stone-500 flex items-center gap-1"><Calendar className="h-3 w-3" /> Arrival</Label>
          <Input type="date" min={todayISO(0)} value={checkIn} onChange={e=>setCheckIn(e.target.value)} className="mt-1 h-11 border-stone-300" />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-wider text-stone-500 flex items-center gap-1"><Calendar className="h-3 w-3" /> Departure</Label>
          <Input type="date" min={checkIn} value={checkOut} onChange={e=>setCheckOut(e.target.value)} className="mt-1 h-11 border-stone-300" />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-wider text-stone-500 flex items-center gap-1"><Users className="h-3 w-3" /> Adults</Label>
          <Select value={adults} onValueChange={setAdults}>
            <SelectTrigger className="mt-1 h-11 border-stone-300"><SelectValue /></SelectTrigger>
            <SelectContent>{[1,2,3,4].map(n=><SelectItem key={n} value={String(n)}>{n} Adult{n>1?'s':''}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs uppercase tracking-wider text-stone-500 flex items-center gap-1"><Users className="h-3 w-3" /> Children</Label>
          <Select value={children} onValueChange={setChildren}>
            <SelectTrigger className="mt-1 h-11 border-stone-300"><SelectValue /></SelectTrigger>
            <SelectContent>{[0,1,2,3].map(n=><SelectItem key={n} value={String(n)}>{n} Child{n===1?'':'ren'}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="col-span-2 md:col-span-1">
          <Label className="text-xs uppercase tracking-wider text-stone-500 flex items-center gap-1"><Bed className="h-3 w-3" /> Room Type</Label>
          <Select value={roomType} onValueChange={setRoomType}>
            <SelectTrigger className="mt-1 h-11 border-stone-300"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Room</SelectItem>
              {ROOM_TYPES.map(r=><SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" className="w-full mt-4 h-12 bg-[#0f2222] hover:bg-[#1a3939] text-white text-base font-semibold rounded-xl">
        Check Availability <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}

/* ===================== HOME ===================== */
const HERO_SLIDES = [
  { img: OWNER_IMAGES.exterior, title: 'Boutique comfort in the heart of Knowledge Park', sub: 'Modern rooms, warm hospitality, unbeatable location' },
  { img: OWNER_IMAGES.bedroom, title: 'Rooms designed for restful evenings', sub: 'Crisp linen, quiet corners, thoughtful details' },
  { img: OWNER_IMAGES.bathtub, title: 'Private bathtub suites for a spa-like stay', sub: 'Unwind in luxury after a long day' },
]
function HomePage({ navigate }) {
  const [slide, setSlide] = useState(0)
  useEffect(() => { const t = setInterval(()=>setSlide(s=>(s+1)%HERO_SLIDES.length), 6000); return () => clearInterval(t) }, [])
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        {HERO_SLIDES.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-[1400ms] ${i===slide?'opacity-100':'opacity-0'}`}>
            <img src={s.img} alt="" className="w-full h-full object-cover scale-110" style={{transform: i===slide?'scale(1.05)':'scale(1.15)', transition:'transform 8s ease-out'}} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
          </div>
        ))}
        <div className="relative container pb-24 pt-40 md:pt-32 z-10">
          <motion.div key={slide} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:1}} className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-xs tracking-[0.3em] uppercase mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4b170]" /> Greater Noida · Knowledge Park III
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              {HERO_SLIDES[slide].title}
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl">{HERO_SLIDES[slide].sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={()=>navigate('book')} size="lg" className="bg-[#c9a961] hover:bg-[#b8974a] text-[#0f2222] font-semibold rounded-full px-8 h-12">Book Direct — Best Rate <ArrowRight className="ml-2 h-4 w-4" /></Button>
              <Button onClick={()=>navigate('rooms')} size="lg" variant="outline" className="rounded-full px-8 h-12 border-white/50 text-white bg-white/10 hover:bg-white/20">Explore Rooms</Button>
            </div>
          </motion.div>
          <div className="mt-10 max-w-5xl">
            <BookingWidget navigate={navigate} floating />
          </div>
          <div className="mt-6 flex items-center gap-3 text-white/70 text-sm">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={()=>setSlide(i)} className={`h-1 rounded-full transition-all ${i===slide?'w-12 bg-[#d4b170]':'w-6 bg-white/40'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* USP STRIP */}
      <section className="bg-white border-y border-stone-200">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
          {[
            {icon: ShieldCheck, label: 'Best Price Guarantee', sub: 'Booking direct? You save more.'},
            {icon: Clock, label: '24 / 7 Front Desk', sub: 'Warm welcome, any hour.'},
            {icon: UtensilsCrossed, label: 'Multi-Cuisine Kitchen', sub: 'Indian + Chinese, all day.'},
            {icon: Car, label: 'Free Parking', sub: 'Secure, on-site.'},
          ].map(({icon:Icon,label,sub},i)=>(
            <div key={i} className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-[#0f2222]/5 text-[#0f2222] grid place-items-center"><Icon className="h-5 w-5" /></div>
              <div><div className="font-medium text-[#0f2222]">{label}</div><div className="text-xs text-stone-500">{sub}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED ROOMS */}
      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs tracking-[0.35em] uppercase text-[#c9a961] mb-3">Our Rooms</div>
          <h2 className="font-display text-4xl md:text-5xl text-[#0f2222]">Choose your sanctuary</h2>
          <p className="text-stone-600 mt-4">Every room is thoughtfully designed with crisp linens, modern amenities and warm details — so you can rest, work and unwind with equal ease.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {ROOM_TYPES.map((r, i) => (
            <motion.div key={r.id} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
              <Card className="overflow-hidden border-stone-200 rounded-2xl group hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={r.images[0]} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs font-medium text-[#0f2222]">From {inr(r.price)}/night</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" /> {r.beds}</span>
                    <span>•</span>
                    <span>{r.size}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {r.occupancy}</span>
                  </div>
                  <h3 className="font-display text-2xl text-[#0f2222] mt-2">{r.name}</h3>
                  <p className="text-sm text-stone-600 mt-1">{r.tagline}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {r.highlights.slice(0,3).map(h => <Badge key={h} variant="secondary" className="bg-stone-100 text-stone-700 font-normal">{h}</Badge>)}
                  </div>
                  <div className="mt-6 flex gap-2">
                    <Button onClick={()=>navigate('room', {slug: r.slug})} variant="outline" className="flex-1 rounded-full border-[#0f2222]/20">View Details</Button>
                    <Button onClick={()=>navigate('book', {roomType: r.id})} className="flex-1 rounded-full bg-[#0f2222] hover:bg-[#1a3939] text-white">Book</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="bg-[#0f2222] text-white py-20">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs tracking-[0.35em] uppercase text-[#d4b170]">About Ashira Inn</div>
            <h2 className="font-display text-4xl md:text-5xl mt-3">A quieter kind of luxury</h2>
            <p className="mt-5 text-white/80 leading-relaxed">
              Tucked into leafy Knowledge Park III, Ashira Inn is a family-run boutique hotel that pairs modern comfort with genuine warmth.
              Whether you're in town for an expo at India Expo Mart, visiting family at Sharda University or catching a race at Buddh Circuit —
              we make sure you feel at home from the moment you arrive.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-8">
              {[['15+','Rooms & Suites'],['500+','Happy Guests'],['4.8','Google Rating']].map(([k,v])=>(
                <div key={k}><div className="font-display text-4xl text-[#d4b170]">{k}</div><div className="text-xs uppercase tracking-wider text-white/60 mt-1">{v}</div></div>
              ))}
            </div>
            <Button onClick={()=>navigate('about')} className="mt-8 bg-[#d4b170] hover:bg-[#c19a4d] text-[#0f2222] rounded-full">Read Our Story <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
          <div className="relative">
            <img src={OWNER_IMAGES.entrance} className="rounded-2xl w-full aspect-[4/5] object-cover" alt="Ashira Inn entrance" />
            <div className="absolute -bottom-6 -left-6 glass p-5 rounded-2xl w-56 hidden md:block">
              <div className="text-[#c9a961] flex gap-0.5">{[1,2,3,4,5].map(i=><Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <div className="text-xs text-stone-600 mt-2 italic">"Cleanest room, warmest staff. Coming back!" — Priya M.</div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs tracking-[0.35em] uppercase text-[#c9a961] mb-3">Gallery</div>
            <h2 className="font-display text-4xl md:text-5xl text-[#0f2222]">Step inside</h2>
          </div>
          <Button onClick={()=>navigate('gallery')} variant="ghost" className="hidden md:inline-flex text-[#0f2222]">View all <ArrowUpRight className="ml-2 h-4 w-4" /></Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {GALLERY.slice(0, 8).map((g, i) => (
            <button key={i} onClick={()=>navigate('gallery')} className={`relative rounded-xl overflow-hidden ${i===0||i===5?'row-span-2 aspect-square md:aspect-[3/4]':'aspect-square'} group`}>
              <img src={g.src} alt={g.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-3">
                <span className="text-white text-xs font-medium">{g.caption}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* AMENITIES */}
      <section className="bg-[#faf5eb] py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs tracking-[0.35em] uppercase text-[#c9a961] mb-3">Amenities</div>
            <h2 className="font-display text-4xl md:text-5xl text-[#0f2222]">Everything you need. Nothing you don't.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HOTEL_AMENITIES.map((a, i) => {
              const Icon = AMENITY_ICON[a.icon] || Sparkles
              return (
                <div key={i} className="bg-white rounded-2xl p-6 border border-stone-100 hover:shadow-lg transition group">
                  <div className="h-12 w-12 rounded-xl bg-[#0f2222] text-[#d4b170] grid place-items-center mb-4 group-hover:rotate-6 transition-transform"><Icon className="h-6 w-6" /></div>
                  <div className="font-display text-lg text-[#0f2222]">{a.title}</div>
                  <div className="text-sm text-stone-600 mt-1">{a.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* RESTAURANT PREVIEW */}
      <section className="container py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img src={RESTAURANT.hero} className="rounded-2xl aspect-square object-cover" alt="Restaurant" />
          <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 w-60 shadow-2xl hidden md:block">
            <div className="text-[#c9a961] text-xs uppercase tracking-wider">Chef's Special</div>
            <div className="font-display text-lg text-[#0f2222] mt-1">Signature Biryani</div>
            <div className="text-sm text-stone-500 mt-1">Dum-cooked, saffron-kissed — our most-ordered dish.</div>
          </div>
        </div>
        <div>
          <div className="text-xs tracking-[0.35em] uppercase text-[#c9a961] mb-3">Our Restaurant</div>
          <h2 className="font-display text-4xl md:text-5xl text-[#0f2222]">Indian, Chinese & everything in between</h2>
          <p className="mt-5 text-stone-600 leading-relaxed">{RESTAURANT.intro}</p>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {RESTAURANT.timings.map((t, i) => (
              <div key={i} className="border border-stone-200 rounded-xl p-3">
                <div className="text-xs uppercase tracking-wider text-stone-500">{t.meal}</div>
                <div className="text-[#0f2222] font-medium">{t.time}</div>
              </div>
            ))}
          </div>
          <Button onClick={()=>navigate('restaurant')} className="mt-8 bg-[#0f2222] hover:bg-[#1a3939] text-white rounded-full">View Menu <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* ATTRACTIONS */}
      <section className="container py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs tracking-[0.35em] uppercase text-[#c9a961] mb-3">In the Neighbourhood</div>
          <h2 className="font-display text-4xl md:text-5xl text-[#0f2222]">Everything close, nothing too far</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {ATTRACTIONS.slice(0, 3).map((a, i) => (
            <div key={i} className="group rounded-2xl overflow-hidden border border-stone-200 bg-white hover:shadow-xl transition">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={a.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={a.name} />
                <div className="absolute top-3 right-3 bg-white/95 rounded-full px-3 py-1 text-xs font-medium text-[#0f2222]">{a.distance} • {a.time}</div>
              </div>
              <div className="p-5">
                <div className="font-display text-xl text-[#0f2222]">{a.name}</div>
                <div className="text-sm text-stone-600 mt-1 line-clamp-2">{a.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button onClick={()=>navigate('attractions')} variant="outline" className="rounded-full px-8">See all attractions <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <div className="luxe-gradient rounded-3xl p-10 md:p-16 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 20% 20%, #d4b170 0%, transparent 40%), radial-gradient(circle at 80% 80%, #d4b170 0%, transparent 40%)'}} />
          <div className="relative">
            <div className="text-xs tracking-[0.35em] uppercase text-[#d4b170] mb-3">Ready when you are</div>
            <h2 className="font-display text-4xl md:text-6xl">Come stay with us.</h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">Book direct — no middlemen, no hidden fees, always the best rate.</p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button onClick={()=>navigate('book')} className="bg-[#d4b170] hover:bg-[#c19a4d] text-[#0f2222] rounded-full px-8 h-12 font-semibold">Book Now</Button>
              <a href={`tel:${HOTEL.phones[0]}`} className="inline-flex items-center gap-2 px-8 h-12 rounded-full border border-white/40 text-white hover:bg-white/10"><Phone className="h-4 w-4" /> {HOTEL.phones[0]}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function TestimonialsSection() {
  const [reviews, setReviews] = useState([])
  useEffect(()=>{ api.get('/reviews').then(setReviews).catch(()=>{}) }, [])
  return (
    <section className="bg-[#0f2222] text-white py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs tracking-[0.35em] uppercase text-[#d4b170] mb-3">Guest Stories</div>
          <h2 className="font-display text-4xl md:text-5xl">Loved by travellers</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.slice(0,4).map((t, i) => (
            <div key={i} className="glass-dark rounded-2xl p-6">
              <div className="text-[#d4b170] flex gap-0.5 mb-3">{Array.from({length: t.rating||5}).map((_,j)=><Star key={j} className="h-4 w-4 fill-current" />)}</div>
              <p className="text-white/85 italic text-sm leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 mt-5">
                <div className="h-10 w-10 rounded-full bg-[#d4b170] text-[#0f2222] font-semibold grid place-items-center text-sm">{t.initials || t.name?.slice(0,2).toUpperCase()}</div>
                <div><div className="text-sm font-medium">{t.name}</div><div className="text-xs text-white/60">{t.city}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===================== ROOMS LIST ===================== */
function RoomsPage({ navigate }) {
  return (
    <section className="container pt-32 pb-20">
      <PageHeader kicker="Accommodation" title="Rooms & Suites" sub="Three distinct room categories, all featuring modern amenities and warm, considered design." />
      <div className="grid gap-10 mt-12">
        {ROOM_TYPES.map((r, i) => (
          <div key={r.id} className={`grid md:grid-cols-2 gap-8 items-center ${i%2===1?'md:[direction:rtl]':''}`}>
            <div className="[direction:ltr] rounded-2xl overflow-hidden aspect-[4/3]">
              <img src={r.images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt={r.name} />
            </div>
            <div className="[direction:ltr]">
              <div className="flex items-center gap-2">
                <Badge className="bg-[#c9a961]/15 text-[#8a6f2c] hover:bg-[#c9a961]/15 border-0">{r.tagline}</Badge>
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-[#0f2222] mt-3">{r.name}</h2>
              <p className="text-stone-600 mt-3 leading-relaxed">{r.description}</p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {[['Beds', r.beds], ['Size', r.size], ['View', r.view], ['Occupancy', r.occupancy]].map(([k,v])=>(
                  <div key={k} className="border border-stone-200 rounded-xl p-3">
                    <div className="text-xs uppercase tracking-wider text-stone-500">{k}</div>
                    <div className="text-sm text-[#0f2222] font-medium">{v}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {r.highlights.map(h=><Badge key={h} variant="outline" className="border-stone-300">{h}</Badge>)}
              </div>
              <div className="flex items-baseline gap-3 mt-6">
                <div className="font-display text-3xl text-[#0f2222]">{inr(r.price)}</div>
                <div className="text-sm text-stone-500 line-through">{inr(r.originalPrice)}</div>
                <div className="text-sm text-stone-500">/ night</div>
              </div>
              <div className="mt-5 flex gap-3">
                <Button onClick={()=>navigate('room', {slug: r.slug})} variant="outline" className="rounded-full">View Details</Button>
                <Button onClick={()=>navigate('book', {roomType: r.id})} className="rounded-full bg-[#0f2222] hover:bg-[#1a3939] text-white">Book This Room <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ===================== ROOM DETAIL ===================== */
function RoomDetailPage({ navigate, params }) {
  const room = useMemo(()=>ROOM_TYPES.find(r=>r.slug===params.slug || r.id===params.slug) || ROOM_TYPES[0], [params.slug])
  const [active, setActive] = useState(0)
  return (
    <section className="container pt-32 pb-20">
      <button onClick={()=>navigate('rooms')} className="text-sm text-stone-500 hover:text-[#0f2222] mb-6 inline-flex items-center gap-1"><ChevronLeft className="h-4 w-4" /> Back to rooms</button>
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden aspect-[4/3]"><img src={room.images[active]} className="w-full h-full object-cover" alt={room.name} /></div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {room.images.map((img, i)=>(
              <button key={i} onClick={()=>setActive(i)} className={`aspect-square rounded-lg overflow-hidden ring-2 ${i===active?'ring-[#c9a961]':'ring-transparent'}`}><img src={img} className="w-full h-full object-cover" alt="" /></button>
            ))}
          </div>
          <div className="mt-8">
            <h1 className="font-display text-4xl text-[#0f2222]">{room.name}</h1>
            <p className="text-stone-600 mt-3 leading-relaxed">{room.description}</p>
            <h3 className="font-display text-xl text-[#0f2222] mt-8 mb-4">In-Room Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ROOM_AMENITIES.map((a, i) => {
                const Icon = AMENITY_ICON[a.icon] || Sparkles
                return (
                  <div key={i} className="flex items-center gap-3 border border-stone-200 rounded-xl p-3">
                    <Icon className="h-4 w-4 text-[#c9a961]" />
                    <span className="text-sm text-stone-700">{a.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="lg:sticky lg:top-28 h-fit">
          <Card className="border-stone-200 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-baseline gap-2">
                <div className="font-display text-4xl text-[#0f2222]">{inr(room.price)}</div>
                <div className="text-stone-500 line-through">{inr(room.originalPrice)}</div>
              </div>
              <div className="text-xs text-stone-500">per night, includes GST</div>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between"><span className="text-stone-500">Room Size</span><span className="text-[#0f2222] font-medium">{room.size}</span></div>
                <div className="flex items-center justify-between"><span className="text-stone-500">Beds</span><span className="text-[#0f2222] font-medium">{room.beds}</span></div>
                <div className="flex items-center justify-between"><span className="text-stone-500">Occupancy</span><span className="text-[#0f2222] font-medium">{room.occupancy}</span></div>
                <div className="flex items-center justify-between"><span className="text-stone-500">View</span><span className="text-[#0f2222] font-medium">{room.view}</span></div>
              </div>
              <Separator className="my-5" />
              <Button onClick={()=>navigate('book', {roomType: room.id})} className="w-full bg-[#0f2222] hover:bg-[#1a3939] text-white rounded-full h-12">Book This Room <ArrowRight className="ml-2 h-4 w-4" /></Button>
              <div className="text-xs text-center text-stone-500 mt-3">Free cancellation · No prepayment required</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

/* ===================== BOOK PAGE ===================== */
function BookPage({ navigate, params }) {
  const [step, setStep] = useState(1)
  const [dates, setDates] = useState({
    checkIn: params.checkIn || todayISO(1),
    checkOut: params.checkOut || todayISO(2),
    adults: params.adults || '2',
    children: params.children || '0',
    roomType: params.roomType || 'any',
  })
  const [availability, setAvailability] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [loading, setLoading] = useState(false)
  const [guest, setGuest] = useState({ guestName:'', phone:'', email:'', address:'', city:'', state:'', country:'India', arrivalTime:'', specialRequests:'', idProof:'Aadhaar', vehicleNumber:'', gstNumber:'' })
  const [booking, setBooking] = useState(null)

  const nights = nightsBetween(dates.checkIn, dates.checkOut)

  const checkAvail = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/availability?checkIn=${dates.checkIn}&checkOut=${dates.checkOut}`)
      setAvailability(res)
      // Pre-select if roomType supplied
      if (dates.roomType !== 'any') {
        const match = res.roomTypes.find(r => r.id === dates.roomType)
        if (match && match.roomsAvailable > 0) setSelectedRoom(match)
      }
      setStep(2)
    } catch (e) { toast.error(e.message) }
    setLoading(false)
  }

  const submitBooking = async () => {
    if (!guest.guestName || !guest.phone || !guest.email) { toast.error('Please fill name, phone and email'); return }
    setLoading(true)
    try {
      const res = await api.post('/bookings', {
        ...guest,
        adults: Number(dates.adults), children: Number(dates.children),
        checkIn: dates.checkIn, checkOut: dates.checkOut,
        roomType: selectedRoom.id,
      })
      setBooking(res); setStep(4); toast.success('Booking request received!')
    } catch (e) { toast.error(e.message) }
    setLoading(false)
  }

  return (
    <section className="container pt-32 pb-20">
      <PageHeader kicker="Reservations" title="Book Your Stay" sub="Simple, secure and always the best direct rate." />

      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mt-10 mb-10">
        {['Dates', 'Room', 'Guest Info', 'Confirmation'].map((label, i) => {
          const s = i + 1
          const active = step >= s
          return (
            <div key={s} className="flex items-center gap-2 md:gap-3">
              <div className={`h-9 w-9 rounded-full grid place-items-center text-sm font-semibold transition ${active?'bg-[#0f2222] text-white':'bg-stone-200 text-stone-500'}`}>{step > s ? <CheckCircle2 className="h-4 w-4" /> : s}</div>
              <div className={`hidden md:block text-sm ${active?'text-[#0f2222] font-medium':'text-stone-500'}`}>{label}</div>
              {s < 4 && <div className={`h-px w-6 md:w-12 ${step > s?'bg-[#0f2222]':'bg-stone-200'}`} />}
            </div>
          )
        })}
      </div>

      <div className="max-w-4xl mx-auto">
        {step === 1 && (
          <Card className="border-stone-200 rounded-2xl">
            <CardContent className="p-6 md:p-8">
              <h3 className="font-display text-2xl text-[#0f2222] mb-6">When are you visiting?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label className="text-xs uppercase tracking-wider text-stone-500">Check-in</Label><Input type="date" min={todayISO(0)} value={dates.checkIn} onChange={e=>setDates({...dates, checkIn: e.target.value})} className="mt-1 h-11" /></div>
                <div><Label className="text-xs uppercase tracking-wider text-stone-500">Check-out</Label><Input type="date" min={dates.checkIn} value={dates.checkOut} onChange={e=>setDates({...dates, checkOut: e.target.value})} className="mt-1 h-11" /></div>
                <div><Label className="text-xs uppercase tracking-wider text-stone-500">Adults</Label>
                  <Select value={dates.adults} onValueChange={v=>setDates({...dates, adults: v})}><SelectTrigger className="mt-1 h-11"><SelectValue /></SelectTrigger><SelectContent>{[1,2,3,4].map(n=><SelectItem key={n} value={String(n)}>{n} Adult{n>1?'s':''}</SelectItem>)}</SelectContent></Select>
                </div>
                <div><Label className="text-xs uppercase tracking-wider text-stone-500">Children</Label>
                  <Select value={dates.children} onValueChange={v=>setDates({...dates, children: v})}><SelectTrigger className="mt-1 h-11"><SelectValue /></SelectTrigger><SelectContent>{[0,1,2,3].map(n=><SelectItem key={n} value={String(n)}>{n}</SelectItem>)}</SelectContent></Select>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between text-sm text-stone-600">
                <div><span className="font-medium text-[#0f2222]">{nights}</span> night{nights===1?'':'s'} • {dates.adults} adult, {dates.children} child</div>
              </div>
              <Button onClick={checkAvail} disabled={loading || nights <= 0} className="w-full mt-6 h-12 bg-[#0f2222] hover:bg-[#1a3939] text-white rounded-xl">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Check Availability <ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && availability && (
          <div>
            <div className="text-center mb-6"><Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 border" variant="outline">{nights} night{nights===1?'':'s'} · {new Date(dates.checkIn).toDateString()} → {new Date(dates.checkOut).toDateString()}</Badge></div>
            <div className="grid gap-4">
              {availability.roomTypes.map(rt => {
                const isSel = selectedRoom?.id === rt.id
                const soldOut = rt.roomsAvailable <= 0
                return (
                  <div key={rt.id} className={`rounded-2xl border transition ${isSel?'border-[#c9a961] shadow-lg ring-2 ring-[#c9a961]/30':'border-stone-200'} ${soldOut?'opacity-60':''}`}>
                    <div className="grid md:grid-cols-[220px_1fr_auto] gap-5 p-4">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden"><img src={rt.images[0]} className="w-full h-full object-cover" alt={rt.name} /></div>
                      <div>
                        <h4 className="font-display text-xl text-[#0f2222]">{rt.name}</h4>
                        <div className="text-xs text-stone-500 mt-1">{rt.beds} • {rt.size} • {rt.occupancy}</div>
                        <div className="flex flex-wrap gap-1.5 mt-3">{rt.highlights.map(h=><Badge key={h} variant="secondary" className="bg-stone-100 text-stone-700 font-normal text-[11px]">{h}</Badge>)}</div>
                        <div className={`text-xs mt-3 ${soldOut?'text-red-600':'text-emerald-700'}`}>{soldOut?'Sold out for these dates':`${rt.roomsAvailable} room${rt.roomsAvailable>1?'s':''} available`}</div>
                      </div>
                      <div className="text-right flex flex-col justify-between">
                        <div>
                          <div className="font-display text-2xl text-[#0f2222]">{inr(rt.price)}</div>
                          <div className="text-xs text-stone-500">/ night</div>
                          <div className="text-sm text-stone-600 mt-2">Total: <span className="font-semibold text-[#0f2222]">{inr(rt.price * nights)}</span></div>
                        </div>
                        <Button disabled={soldOut} onClick={()=>setSelectedRoom(rt)} className={`mt-3 rounded-full ${isSel?'bg-[#c9a961] hover:bg-[#b8974a] text-[#0f2222]':'bg-[#0f2222] hover:bg-[#1a3939] text-white'}`}>{isSel?'Selected':'Select'}</Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={()=>setStep(1)}>Back</Button>
              <Button disabled={!selectedRoom} onClick={()=>setStep(3)} className="bg-[#0f2222] hover:bg-[#1a3939] text-white">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
        )}

        {step === 3 && selectedRoom && (
          <div className="grid md:grid-cols-[1fr_360px] gap-6">
            <Card className="border-stone-200 rounded-2xl">
              <CardContent className="p-6 md:p-8">
                <h3 className="font-display text-2xl text-[#0f2222] mb-2">Guest Information</h3>
                <p className="text-sm text-stone-500 mb-6">Please share your details so we can confirm your booking.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Full Name *" value={guest.guestName} onChange={v=>setGuest({...guest, guestName: v})} />
                  <Field label="Phone *" value={guest.phone} onChange={v=>setGuest({...guest, phone: v})} type="tel" />
                  <Field label="Email *" value={guest.email} onChange={v=>setGuest({...guest, email: v})} type="email" />
                  <Field label="City" value={guest.city} onChange={v=>setGuest({...guest, city: v})} />
                  <Field label="State" value={guest.state} onChange={v=>setGuest({...guest, state: v})} />
                  <Field label="Country" value={guest.country} onChange={v=>setGuest({...guest, country: v})} />
                  <div className="md:col-span-2"><Field label="Address" value={guest.address} onChange={v=>setGuest({...guest, address: v})} /></div>
                  <Field label="Arrival Time" value={guest.arrivalTime} onChange={v=>setGuest({...guest, arrivalTime: v})} placeholder="e.g. 3:00 PM" />
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-stone-500">ID Proof</Label>
                    <Select value={guest.idProof} onValueChange={v=>setGuest({...guest, idProof: v})}><SelectTrigger className="mt-1 h-10"><SelectValue /></SelectTrigger><SelectContent>{['Aadhaar','Passport','Driving Licence','Voter ID'].map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                  </div>
                  <Field label="Vehicle Number" value={guest.vehicleNumber} onChange={v=>setGuest({...guest, vehicleNumber: v})} placeholder="Optional" />
                  <Field label="GST Number" value={guest.gstNumber} onChange={v=>setGuest({...guest, gstNumber: v})} placeholder="Optional" />
                  <div className="md:col-span-2">
                    <Label className="text-xs uppercase tracking-wider text-stone-500">Special Requests</Label>
                    <Textarea value={guest.specialRequests} onChange={e=>setGuest({...guest, specialRequests: e.target.value})} className="mt-1" rows={3} placeholder="Early check-in, high floor, quiet room..." />
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={()=>setStep(2)}>Back</Button>
                  <Button onClick={submitBooking} disabled={loading} className="bg-[#0f2222] hover:bg-[#1a3939] text-white">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Confirm Booking <ArrowRight className="ml-2 h-4 w-4" /></>}
                  </Button>
                </div>
              </CardContent>
            </Card>
            <BookingSummary room={selectedRoom} nights={nights} dates={dates} />
          </div>
        )}

        {step === 4 && booking && (
          <ConfirmationView booking={booking} navigate={navigate} />
        )}
      </div>
    </section>
  )
}

function Field({ label, value, onChange, type='text', placeholder }) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-wider text-stone-500">{label}</Label>
      <Input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="mt-1 h-10" />
    </div>
  )
}

function BookingSummary({ room, nights, dates }) {
  const rate = room.price * nights
  const taxes = Math.round(rate * HOTEL.gstPercent / 100)
  const total = rate + taxes
  return (
    <Card className="border-stone-200 rounded-2xl h-fit sticky top-28">
      <CardContent className="p-6">
        <div className="text-xs uppercase tracking-wider text-[#c9a961] mb-3">Your Reservation</div>
        <div className="aspect-[4/3] rounded-xl overflow-hidden"><img src={room.images[0]} className="w-full h-full object-cover" alt={room.name} /></div>
        <h4 className="font-display text-xl text-[#0f2222] mt-4">{room.name}</h4>
        <div className="text-xs text-stone-500">{room.beds} • {room.size}</div>
        <Separator className="my-4" />
        <div className="text-sm space-y-2">
          <div className="flex justify-between"><span className="text-stone-500">Check-in</span><span className="text-[#0f2222]">{new Date(dates.checkIn).toDateString()}</span></div>
          <div className="flex justify-between"><span className="text-stone-500">Check-out</span><span className="text-[#0f2222]">{new Date(dates.checkOut).toDateString()}</span></div>
          <div className="flex justify-between"><span className="text-stone-500">Guests</span><span className="text-[#0f2222]">{dates.adults}A {dates.children}C</span></div>
        </div>
        <Separator className="my-4" />
        <div className="text-sm space-y-2">
          <div className="flex justify-between"><span className="text-stone-500">{inr(room.price)} × {nights} night{nights===1?'':'s'}</span><span>{inr(rate)}</span></div>
          <div className="flex justify-between"><span className="text-stone-500">GST ({HOTEL.gstPercent}%)</span><span>{inr(taxes)}</span></div>
          <div className="flex justify-between font-semibold text-[#0f2222] pt-2 border-t border-stone-200"><span>Total</span><span className="font-display text-lg">{inr(total)}</span></div>
        </div>
        <div className="text-xs text-stone-500 mt-4 flex items-start gap-2"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600 mt-0.5" /> No payment required now. Pay at check-in.</div>
      </CardContent>
    </Card>
  )
}

function ConfirmationView({ booking, navigate }) {
  return (
    <Card className="border-stone-200 rounded-2xl overflow-hidden">
      <div className="luxe-gradient text-white p-10 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-[#d4b170] text-[#0f2222] grid place-items-center"><CheckCircle2 className="h-8 w-8" /></div>
        <h2 className="font-display text-3xl mt-4">Booking Received!</h2>
        <p className="text-white/80 mt-2">We've received your request. Our team will confirm shortly on WhatsApp / email.</p>
        <div className="mt-4 inline-block bg-white/10 border border-white/20 rounded-full px-5 py-2 font-mono text-sm">{booking.bookingId}</div>
      </div>
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <Detail label="Guest" value={booking.guestName} />
          <Detail label="Contact" value={`${booking.phone} • ${booking.email}`} />
          <Detail label="Room" value={booking.roomTypeName} />
          <Detail label="Nights" value={booking.nights} />
          <Detail label="Check-in" value={new Date(booking.checkIn).toDateString()} />
          <Detail label="Check-out" value={new Date(booking.checkOut).toDateString()} />
          <Detail label="Room Charges" value={inr(booking.rate)} />
          <Detail label="Taxes" value={inr(booking.taxes)} />
          <Detail label="Total Payable" value={inr(booking.total)} highlight />
          <Detail label="Status" value={<Badge className="bg-amber-50 text-amber-700 border-amber-200 border">Pending Approval</Badge>} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={()=>navigate('home')} variant="outline" className="rounded-full">Back to Home</Button>
          <a href={`https://wa.me/91${HOTEL.whatsapp}?text=Hi! I just booked. Booking ID: ${booking.bookingId}`} target="_blank" className="inline-flex items-center gap-2 px-5 h-10 rounded-full bg-emerald-600 text-white"><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>
          <a href={`tel:${HOTEL.phones[0]}`} className="inline-flex items-center gap-2 px-5 h-10 rounded-full bg-[#0f2222] text-white"><Phone className="h-4 w-4" /> Call Hotel</a>
        </div>
      </CardContent>
    </Card>
  )
}
function Detail({ label, value, highlight }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-stone-500">{label}</div>
      <div className={`mt-1 ${highlight ? 'font-display text-xl text-[#0f2222]' : 'text-[#0f2222]'}`}>{value}</div>
    </div>
  )
}

/* ===================== ABOUT ===================== */
function AboutPage({ navigate }) {
  return (
    <section className="container pt-32 pb-20">
      <PageHeader kicker="Our Story" title="A quieter kind of luxury" sub="Family-run, thoughtfully designed, and endlessly proud of the small details." />
      <div className="grid md:grid-cols-2 gap-12 mt-12 items-center">
        <img src={OWNER_IMAGES.exterior} className="rounded-2xl aspect-[4/3] object-cover w-full" alt="Ashira Inn" />
        <div>
          <p className="text-stone-700 leading-relaxed">Ashira Inn was born from a simple idea: that Greater Noida deserved a hotel that felt less like a chain and more like a home. Set in the leafy calm of Knowledge Park III, we blend modern hospitality with the warmth of a family that has hosted travellers for generations.</p>
          <p className="text-stone-700 leading-relaxed mt-4">From business travellers visiting India Expo Mart to families dropping off students at Sharda University — our mission is the same: give our guests a room they never want to leave.</p>
          <div className="grid grid-cols-3 gap-6 mt-8">
            {[['15+','Rooms'],['4.8/5','Google Rating'],['24/7','Front Desk']].map(([k,v])=><div key={k}><div className="font-display text-3xl text-[#c9a961]">{k}</div><div className="text-xs uppercase tracking-wider text-stone-500 mt-1">{v}</div></div>)}
          </div>
        </div>
      </div>
      <div className="mt-20 grid md:grid-cols-3 gap-6">
        {[
          {title:'Warm Hospitality', desc:'Every guest is welcomed like family. From remembering names to arranging birthday cakes — we sweat the small stuff.'},
          {title:'Modern Comforts', desc:'Rooms are refreshed continuously with new linen, spotless bathrooms, fast WiFi and the amenities you\'d expect in a big-city hotel.'},
          {title:'Fair, Honest Pricing', desc:'No surge pricing, no hidden fees, and always the best rate when you book direct on this website.'},
        ].map((v,i)=>(
          <div key={i} className="bg-white rounded-2xl p-8 border border-stone-100 shadow-sm">
            <div className="h-12 w-12 rounded-xl bg-[#0f2222] text-[#d4b170] grid place-items-center mb-4"><Award className="h-6 w-6" /></div>
            <div className="font-display text-2xl text-[#0f2222]">{v.title}</div>
            <p className="text-stone-600 mt-2 text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ===================== GALLERY ===================== */
function GalleryPage() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const cats = ['All', ...new Set(GALLERY.map(g=>g.category))]
  const items = filter === 'All' ? GALLERY : GALLERY.filter(g=>g.category===filter)
  return (
    <section className="container pt-32 pb-20">
      <PageHeader kicker="Gallery" title="Every corner, worth a photo" sub="From rooms and restaurant to the neighbourhood — explore Ashira Inn in pictures." />
      <div className="flex flex-wrap gap-2 justify-center mt-8">
        {cats.map(c => (
          <button key={c} onClick={()=>setFilter(c)} className={`px-4 py-2 rounded-full text-sm border transition ${filter===c?'bg-[#0f2222] text-white border-[#0f2222]':'border-stone-300 text-stone-600 hover:border-[#0f2222]'}`}>{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
        {items.map((g, i) => (
          <button key={i} onClick={()=>setLightbox(g)} className="group relative aspect-square rounded-xl overflow-hidden">
            <img src={g.src} alt={g.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 opacity-0 group-hover:opacity-100 transition flex items-end p-3"><span className="text-white text-xs font-medium">{g.caption}</span></div>
          </button>
        ))}
      </div>
      <Dialog open={!!lightbox} onOpenChange={()=>setLightbox(null)}>
        <DialogContent className="max-w-4xl p-0 border-0 bg-transparent">
          {lightbox && <img src={lightbox.src} className="w-full rounded-xl" alt="" />}
        </DialogContent>
      </Dialog>
    </section>
  )
}

/* ===================== RESTAURANT ===================== */
function RestaurantPage() {
  return (
    <section className="pt-20">
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={RESTAURANT.hero} className="w-full h-full object-cover" alt="Restaurant" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 grid place-items-center text-center text-white">
          <div>
            <div className="text-xs tracking-[0.35em] uppercase text-[#d4b170]">Restaurant</div>
            <h1 className="font-display text-5xl md:text-6xl mt-3">All-Day Dining</h1>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">Indian & Chinese, from breakfast till late — lovingly cooked in our in-house kitchen.</p>
          </div>
        </div>
      </div>
      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-3 mb-12">
          {RESTAURANT.timings.map((t,i)=>(
            <div key={i} className="border border-stone-200 rounded-xl p-4 bg-white text-center">
              <div className="text-xs uppercase tracking-wider text-[#c9a961]">{t.meal}</div>
              <div className="text-[#0f2222] font-medium mt-1">{t.time}</div>
            </div>
          ))}
        </div>
        <Tabs defaultValue={RESTAURANT.menu[0].section}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto bg-stone-100 p-1 rounded-xl">
            {RESTAURANT.menu.map(m => <TabsTrigger key={m.section} value={m.section} className="data-[state=active]:bg-white data-[state=active]:text-[#0f2222] py-2.5">{m.section}</TabsTrigger>)}
          </TabsList>
          {RESTAURANT.menu.map(section => (
            <TabsContent key={section.section} value={section.section} className="mt-8">
              <div className="grid md:grid-cols-[300px_1fr] gap-8">
                <img src={section.image} className="rounded-2xl aspect-square object-cover w-full" alt={section.section} />
                <div className="space-y-4">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200 last:border-0">
                      <div>
                        <div className="font-display text-lg text-[#0f2222]">{item.name}</div>
                        <div className="text-sm text-stone-600 mt-1">{item.desc}</div>
                      </div>
                      <div className="text-[#c9a961] font-semibold whitespace-nowrap">{inr(item.price)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

/* ===================== ATTRACTIONS ===================== */
function AttractionsPage() {
  return (
    <section className="container pt-32 pb-20">
      <PageHeader kicker="Nearby" title="Things to do around us" sub="From F1 racing to peaceful bird sanctuaries, Greater Noida has more than you'd expect." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {ATTRACTIONS.map((a, i) => (
          <a key={i} href={a.maps} target="_blank" rel="noreferrer" className="group rounded-2xl overflow-hidden border border-stone-200 bg-white hover:shadow-xl transition block">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={a.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={a.name} />
              <div className="absolute top-3 right-3 bg-white/95 rounded-full px-3 py-1 text-xs font-medium text-[#0f2222]">{a.distance} • {a.time}</div>
            </div>
            <div className="p-5">
              <div className="font-display text-xl text-[#0f2222] group-hover:text-[#c9a961] transition">{a.name}</div>
              <div className="text-sm text-stone-600 mt-1">{a.desc}</div>
              <div className="mt-3 inline-flex items-center text-xs text-[#c9a961] font-medium">Open in Maps <ArrowUpRight className="h-3 w-3 ml-1" /></div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

/* ===================== AMENITIES ===================== */
function AmenitiesPage() {
  return (
    <section className="container pt-32 pb-20">
      <PageHeader kicker="Amenities" title="Everything you need, done right" sub="From lightning-fast WiFi to complimentary breakfast — the details that make a stay memorable." />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
        {HOTEL_AMENITIES.map((a, i) => {
          const Icon = AMENITY_ICON[a.icon] || Sparkles
          return (
            <div key={i} className="bg-white rounded-2xl p-6 border border-stone-100">
              <div className="h-12 w-12 rounded-xl bg-[#0f2222] text-[#d4b170] grid place-items-center mb-4"><Icon className="h-6 w-6" /></div>
              <div className="font-display text-lg text-[#0f2222]">{a.title}</div>
              <div className="text-sm text-stone-600 mt-1">{a.desc}</div>
            </div>
          )
        })}
      </div>
      <div className="mt-16 bg-[#0f2222] text-white rounded-3xl p-10 md:p-16">
        <div className="text-xs tracking-[0.35em] uppercase text-[#d4b170] mb-3">In-Room</div>
        <h2 className="font-display text-3xl md:text-4xl">Every room includes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {ROOM_AMENITIES.map((a, i) => {
            const Icon = AMENITY_ICON[a.icon] || Sparkles
            return (
              <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                <Icon className="h-4 w-4 text-[#d4b170]" />
                <span className="text-sm">{a.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ===================== CONTACT ===================== */
function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' })
  const [loading, setLoading] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/contact', form)
      toast.success('Thanks! We’ll get back within a few hours.')
      setForm({ name:'', email:'', phone:'', subject:'', message:'' })
    } catch (e) { toast.error(e.message) }
    setLoading(false)
  }
  return (
    <section className="container pt-32 pb-20">
      <PageHeader kicker="Contact" title="Say hello" sub="Have a question about your stay? We’re just a call, email or message away." />
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 mt-12">
        <div>
          <div className="space-y-6">
            {[
              { icon: MapPin, title: 'Address', body: HOTEL.address },
              { icon: Phone, title: 'Phone', body: HOTEL.phones.join(' · ') },
              { icon: Mail, title: 'Email', body: HOTEL.email },
              { icon: Clock, title: 'Check-in / Check-out', body: `${HOTEL.checkIn} / ${HOTEL.checkOut}` },
            ].map(({icon:Icon, title, body}, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-12 w-12 rounded-xl bg-[#0f2222] text-[#d4b170] grid place-items-center flex-shrink-0"><Icon className="h-5 w-5" /></div>
                <div><div className="text-xs uppercase tracking-wider text-stone-500">{title}</div><div className="text-[#0f2222] mt-1 font-medium">{body}</div></div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl overflow-hidden aspect-[4/3] border border-stone-200">
            <iframe src="https://www.google.com/maps?q=Knowledge+Park+III+Greater+Noida&output=embed" className="w-full h-full" loading="lazy" title="map"></iframe>
          </div>
        </div>
        <form onSubmit={submit} className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 h-fit">
          <h3 className="font-display text-2xl text-[#0f2222] mb-6">Send us a message</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Your Name *" value={form.name} onChange={v=>setForm({...form,name:v})} />
            <Field label="Phone" value={form.phone} onChange={v=>setForm({...form,phone:v})} />
            <div className="md:col-span-2"><Field label="Email *" type="email" value={form.email} onChange={v=>setForm({...form,email:v})} /></div>
            <div className="md:col-span-2"><Field label="Subject" value={form.subject} onChange={v=>setForm({...form,subject:v})} /></div>
            <div className="md:col-span-2">
              <Label className="text-xs uppercase tracking-wider text-stone-500">Message *</Label>
              <Textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="mt-1" rows={5} />
            </div>
          </div>
          <Button disabled={loading} className="w-full mt-6 h-12 bg-[#0f2222] hover:bg-[#1a3939] text-white rounded-xl">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
          </Button>
        </form>
      </div>
    </section>
  )
}

/* ===================== FAQ ===================== */
function FaqPage() {
  return (
    <section className="container pt-32 pb-20 max-w-3xl">
      <PageHeader kicker="Help" title="Frequently Asked Questions" sub="Quick answers to the things guests ask most." />
      <Accordion type="single" collapsible className="mt-10">
        {FAQ_ITEMS.map((f, i) => (
          <AccordionItem key={i} value={`i${i}`} className="border-stone-200">
            <AccordionTrigger className="text-left font-display text-lg text-[#0f2222] hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="text-stone-600 leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

/* ===================== OFFERS ===================== */
function OffersPage({ navigate }) {
  return (
    <section className="container pt-32 pb-20">
      <PageHeader kicker="Offers" title="Special deals for direct bookers" sub="Book on this website to unlock rates you won’t find on aggregators." />
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {OFFERS.map((o, i) => (
          <div key={i} className="rounded-2xl bg-gradient-to-br from-[#0f2222] to-[#1a3939] text-white p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#d4b170] text-[#0f2222] px-3 py-1 rounded-full text-xs font-semibold">{o.tag}</div>
            <div className="font-display text-2xl mt-6">{o.title}</div>
            <p className="text-white/70 text-sm mt-2">{o.desc}</p>
            <div className="mt-6 bg-white/10 border border-dashed border-white/30 rounded-lg p-3 flex items-center justify-between">
              <div><div className="text-xs text-white/60">Use Code</div><div className="font-mono font-semibold">{o.code}</div></div>
              <Button onClick={()=>navigate('book')} size="sm" className="bg-[#d4b170] hover:bg-[#c19a4d] text-[#0f2222]">Book</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ===================== POLICY ===================== */
function PolicyPage() {
  return (
    <section className="container pt-32 pb-20 max-w-3xl prose prose-stone">
      <PageHeader kicker="Policies" title="Booking, Privacy & Cancellation" sub="" />
      <div className="mt-10 space-y-8 text-stone-700 leading-relaxed">
        <div><h3 className="font-display text-2xl text-[#0f2222] mb-2">Cancellation Policy</h3><p>Cancellations made 48+ hours prior to check-in are fully refundable. Cancellations within 48 hours will attract a one-night charge. No-shows will be charged the full stay amount.</p></div>
        <div><h3 className="font-display text-2xl text-[#0f2222] mb-2">Check-in / Check-out</h3><p>Standard check-in: {HOTEL.checkIn}. Standard check-out: {HOTEL.checkOut}. Early check-in and late check-out are subject to availability.</p></div>
        <div><h3 className="font-display text-2xl text-[#0f2222] mb-2">Privacy</h3><p>We collect only the information necessary to process your booking and communicate with you about your stay. We never sell your data. Full details at {HOTEL.email}.</p></div>
      </div>
    </section>
  )
}

/* ===================== SHARED HEADER ===================== */
function PageHeader({ kicker, title, sub }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-xs tracking-[0.35em] uppercase text-[#c9a961]">{kicker}</div>
      <h1 className="font-display text-4xl md:text-6xl text-[#0f2222] mt-3">{title}</h1>
      {sub && <p className="text-stone-600 mt-4">{sub}</p>}
    </div>
  )
}

/* ===================== ADMIN ===================== */
function AdminPage({ navigate }) {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => { if (typeof window !== 'undefined' && localStorage.getItem('ashira_admin')) setAuthed(true) }, [])
  const login = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/admin/login', { password })
      localStorage.setItem('ashira_admin', res.token)
      setAuthed(true); toast.success('Welcome back!')
    } catch (e) { toast.error(e.message) }
    setLoading(false)
  }
  if (!authed) return (
    <section className="container pt-32 pb-20 max-w-md">
      <PageHeader kicker="Staff" title="Admin Login" sub="Access the Ashira Inn management dashboard." />
      <form onSubmit={login} className="mt-10 bg-white rounded-2xl border border-stone-200 p-6">
        <Label className="text-xs uppercase tracking-wider text-stone-500">Password</Label>
        <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 h-11" placeholder="Enter admin password" />
        <Button disabled={loading} className="w-full mt-4 h-12 bg-[#0f2222] hover:bg-[#1a3939] text-white rounded-xl">{loading?<Loader2 className="h-4 w-4 animate-spin" />:'Sign In'}</Button>
        <div className="text-xs text-stone-500 mt-3 text-center">Default password: <code className="bg-stone-100 px-1.5 py-0.5 rounded">ashira@2025</code></div>
      </form>
    </section>
  )
  return <AdminDashboard onLogout={()=>{ localStorage.removeItem('ashira_admin'); setAuthed(false); navigate('home') }} />
}

function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('overview')
  const [stats, setStats] = useState(null)
  const [bookings, setBookings] = useState([])
  const [q, setQ] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [detail, setDetail] = useState(null)
  const reload = async () => {
    try {
      const [s, b] = await Promise.all([api.get('/dashboard'), api.get('/bookings')])
      setStats(s); setBookings(b)
    } catch (e) { toast.error(e.message) }
  }
  useEffect(() => { reload() }, [])
  const filtered = bookings.filter(b => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false
    if (q) {
      const s = q.toLowerCase()
      return b.guestName.toLowerCase().includes(s) || b.phone.includes(s) || b.email.toLowerCase().includes(s) || b.bookingId.toLowerCase().includes(s)
    }
    return true
  })
  const updateStatus = async (bookingId, status) => {
    try { await api.patch(`/bookings/${bookingId}`, { status }); toast.success('Updated'); reload(); if (detail) setDetail({ ...detail, status }) }
    catch (e) { toast.error(e.message) }
  }
  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs tracking-[0.35em] uppercase text-[#c9a961]">Admin</div>
            <h1 className="font-display text-3xl md:text-4xl text-[#0f2222]">Ashira Inn Dashboard</h1>
          </div>
          <Button variant="outline" onClick={onLogout}><LogOut className="h-4 w-4 mr-2" /> Sign Out</Button>
        </div>
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <StatCard icon={BookOpen} label="Total Bookings" value={stats.totals.bookings} color="bg-blue-50 text-blue-700" />
            <StatCard icon={Clock} label="Pending" value={stats.totals.pending} color="bg-amber-50 text-amber-700" />
            <StatCard icon={CheckCircle2} label="Confirmed" value={stats.totals.confirmed} color="bg-emerald-50 text-emerald-700" />
            <StatCard icon={DoorOpen} label="Checked In" value={stats.totals.checkedIn} color="bg-cyan-50 text-cyan-700" />
            <StatCard icon={IndianRupee} label="Revenue" value={inr(stats.totals.revenue)} color="bg-[#c9a961]/15 text-[#8a6f2c]" small />
            <StatCard icon={TrendingUp} label="Occupancy" value={stats.totals.occupancy + '%'} color="bg-purple-50 text-purple-700" />
          </div>
        )}
        <Tabs value={tab} onValueChange={setTab} className="mt-8">
          <TabsList className="bg-white border border-stone-200 rounded-xl h-auto p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#0f2222] data-[state=active]:text-white rounded-lg py-2 px-4"><LayoutDashboard className="h-4 w-4 mr-2" /> Overview</TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-[#0f2222] data-[state=active]:text-white rounded-lg py-2 px-4"><BookOpen className="h-4 w-4 mr-2" /> Bookings</TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-[#0f2222] data-[state=active]:text-white rounded-lg py-2 px-4"><CalendarDays className="h-4 w-4 mr-2" /> Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-stone-200 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl text-[#0f2222] mb-4">Today’s Arrivals</h3>
                  {stats && stats.todayArrivals.length === 0 && <div className="text-sm text-stone-500">No arrivals today.</div>}
                  <div className="space-y-2">
                    {stats && stats.todayArrivals.map(b => (
                      <div key={b.bookingId} className="border border-stone-200 rounded-xl p-3 flex justify-between items-center">
                        <div><div className="font-medium text-[#0f2222]">{b.guestName}</div><div className="text-xs text-stone-500">{b.roomTypeName} • {b.phone}</div></div>
                        <Badge className={statusColor(b.status)}>{b.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-stone-200 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl text-[#0f2222] mb-4">Recent Bookings</h3>
                  <div className="space-y-2">
                    {stats && stats.recent.slice(0,6).map(b => (
                      <div key={b.bookingId} className="border border-stone-200 rounded-xl p-3 flex justify-between items-center cursor-pointer hover:bg-stone-50" onClick={()=>{setDetail(b); setTab('bookings')}}>
                        <div><div className="font-medium text-[#0f2222]">{b.guestName}</div><div className="text-xs text-stone-500">{b.bookingId} • {new Date(b.checkIn).toLocaleDateString()}</div></div>
                        <div className="text-right"><div className="font-semibold text-[#0f2222] text-sm">{inr(b.total)}</div><Badge className={statusColor(b.status)}>{b.status}</Badge></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            <Card className="border-stone-200 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex-1 min-w-[200px] relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-stone-400" />
                    <Input placeholder="Search name, phone, email, booking ID..." value={q} onChange={e=>setQ(e.target.value)} className="pl-9" />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['all','pending','confirmed','checked-in','checked-out','cancelled'].map(s=><SelectItem key={s} value={s}>{s.replace('-',' ')}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="text-left text-xs uppercase tracking-wider text-stone-500 border-b border-stone-200">
                      <th className="py-3 pr-3">Booking</th><th className="py-3 pr-3">Guest</th><th className="py-3 pr-3">Room</th><th className="py-3 pr-3">Dates</th><th className="py-3 pr-3">Total</th><th className="py-3 pr-3">Status</th><th></th>
                    </tr></thead>
                    <tbody>
                      {filtered.map(b => (
                        <tr key={b.bookingId} className="border-b border-stone-100 hover:bg-stone-50">
                          <td className="py-3 pr-3 font-mono text-xs">{b.bookingId}</td>
                          <td className="py-3 pr-3"><div className="font-medium text-[#0f2222]">{b.guestName}</div><div className="text-xs text-stone-500">{b.phone}</div></td>
                          <td className="py-3 pr-3">{b.roomTypeName}</td>
                          <td className="py-3 pr-3 text-xs">{new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}</td>
                          <td className="py-3 pr-3 font-medium">{inr(b.total)}</td>
                          <td className="py-3 pr-3"><Badge className={statusColor(b.status)}>{b.status}</Badge></td>
                          <td className="py-3"><Button size="sm" variant="ghost" onClick={()=>setDetail(b)}><Eye className="h-4 w-4" /></Button></td>
                        </tr>
                      ))}
                      {filtered.length === 0 && <tr><td colSpan="7" className="py-10 text-center text-stone-500">No bookings found.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <CalendarView bookings={bookings} onSelect={setDetail} />
          </TabsContent>
        </Tabs>
      </div>
      <Dialog open={!!detail} onOpenChange={()=>setDetail(null)}>
        <DialogContent className="max-w-2xl">
          {detail && (
            <>
              <DialogHeader><DialogTitle className="font-display text-2xl text-[#0f2222]">Booking {detail.bookingId}</DialogTitle></DialogHeader>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <Detail label="Guest" value={detail.guestName} />
                <Detail label="Phone" value={<a className="text-[#c9a961]" href={`tel:${detail.phone}`}>{detail.phone}</a>} />
                <Detail label="Email" value={detail.email} />
                <Detail label="Room Type" value={detail.roomTypeName} />
                <Detail label="Check-in" value={new Date(detail.checkIn).toDateString()} />
                <Detail label="Check-out" value={new Date(detail.checkOut).toDateString()} />
                <Detail label="Guests" value={`${detail.adults} Adult${detail.adults>1?'s':''}, ${detail.children} Child${detail.children===1?'':'ren'}`} />
                <Detail label="Nights" value={detail.nights} />
                <Detail label="Rate" value={inr(detail.rate)} />
                <Detail label="Taxes" value={inr(detail.taxes)} />
                <Detail label="Total" value={inr(detail.total)} highlight />
                <Detail label="Status" value={<Badge className={statusColor(detail.status)}>{detail.status}</Badge>} />
              </div>
              {detail.specialRequests && <div className="border border-stone-200 rounded-xl p-3 text-sm"><div className="text-xs uppercase tracking-wider text-stone-500 mb-1">Special Requests</div>{detail.specialRequests}</div>}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-200">
                {detail.status === 'pending' && <>
                  <Button onClick={()=>updateStatus(detail.bookingId,'confirmed')} className="bg-emerald-600 hover:bg-emerald-700">Approve</Button>
                  <Button onClick={()=>updateStatus(detail.bookingId,'cancelled')} variant="destructive">Reject</Button>
                </>}
                {detail.status === 'confirmed' && <Button onClick={()=>updateStatus(detail.bookingId,'checked-in')} className="bg-cyan-600 hover:bg-cyan-700">Check In</Button>}
                {detail.status === 'checked-in' && <Button onClick={()=>updateStatus(detail.bookingId,'checked-out')} className="bg-stone-700 hover:bg-stone-800">Check Out</Button>}
                {['pending','confirmed'].includes(detail.status) && <Button onClick={()=>updateStatus(detail.bookingId,'cancelled')} variant="outline">Cancel</Button>}
                <a href={`https://wa.me/91${detail.phone}?text=Hi ${detail.guestName}, this is Ashira Inn regarding your booking ${detail.bookingId}.`} target="_blank" className="inline-flex items-center gap-2 px-4 h-10 rounded-md bg-emerald-600 text-white text-sm"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function statusColor(status) {
  const map = {
    pending: 'bg-amber-100 text-amber-800 border-amber-200 border',
    confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200 border',
    cancelled: 'bg-red-100 text-red-800 border-red-200 border',
    'checked-in': 'bg-cyan-100 text-cyan-800 border-cyan-200 border',
    'checked-out': 'bg-stone-100 text-stone-700 border-stone-200 border',
  }
  return map[status] || 'bg-stone-100'
}

function StatCard({ icon: Icon, label, value, color, small }) {
  return (
    <Card className="border-stone-200 rounded-2xl">
      <CardContent className="p-4">
        <div className={`h-9 w-9 rounded-lg ${color} grid place-items-center`}><Icon className="h-4 w-4" /></div>
        <div className={`font-display ${small?'text-lg':'text-2xl'} text-[#0f2222] mt-2`}>{value}</div>
        <div className="text-xs uppercase tracking-wider text-stone-500 mt-1">{label}</div>
      </CardContent>
    </Card>
  )
}

function CalendarView({ bookings, onSelect }) {
  const [month, setMonth] = useState(new Date())
  const y = month.getFullYear(), m = month.getMonth()
  const first = new Date(y, m, 1), last = new Date(y, m+1, 0)
  const startDow = first.getDay(), days = last.getDate()
  const cells = []
  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= days; d++) cells.push(new Date(y, m, d))
  const bookingsOnDay = (d) => bookings.filter(b => {
    const ci = new Date(b.checkIn), co = new Date(b.checkOut)
    return d >= new Date(ci.getFullYear(),ci.getMonth(),ci.getDate()) && d < new Date(co.getFullYear(),co.getMonth(),co.getDate()) && ['pending','confirmed','checked-in'].includes(b.status)
  })
  const monthLabel = month.toLocaleString('en-IN', { month: 'long', year: 'numeric' })
  return (
    <Card className="border-stone-200 rounded-2xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={()=>setMonth(new Date(y, m-1, 1))} className="p-2 rounded-lg hover:bg-stone-100"><ChevronLeft className="h-4 w-4" /></button>
          <h3 className="font-display text-xl text-[#0f2222]">{monthLabel}</h3>
          <button onClick={()=>setMonth(new Date(y, m+1, 1))} className="p-2 rounded-lg hover:bg-stone-100"><ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs uppercase tracking-wider text-stone-500 mb-2">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (!d) return <div key={i} className="aspect-square" />
            const bs = bookingsOnDay(d)
            return (
              <div key={i} className="aspect-square border border-stone-200 rounded-lg p-1 flex flex-col overflow-hidden hover:bg-stone-50">
                <div className="text-xs text-stone-500">{d.getDate()}</div>
                <div className="flex-1 space-y-0.5 overflow-hidden">
                  {bs.slice(0,3).map((b, j) => (
                    <button key={j} onClick={()=>onSelect(b)} className={`w-full text-left text-[10px] px-1 py-0.5 rounded truncate ${b.status==='confirmed'?'bg-emerald-100 text-emerald-800':b.status==='pending'?'bg-amber-100 text-amber-800':'bg-cyan-100 text-cyan-800'}`}>{b.guestName}</button>
                  ))}
                  {bs.length > 3 && <div className="text-[10px] text-stone-500">+{bs.length-3}</div>}
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex gap-3 mt-4 text-xs">
          <div className="flex items-center gap-1"><div className="h-3 w-3 rounded bg-amber-100" /> Pending</div>
          <div className="flex items-center gap-1"><div className="h-3 w-3 rounded bg-emerald-100" /> Confirmed</div>
          <div className="flex items-center gap-1"><div className="h-3 w-3 rounded bg-cyan-100" /> Checked-in</div>
        </div>
      </CardContent>
    </Card>
  )
}

/* ===================== ROOT APP ===================== */
export default function AshiraApp() {
  const { route, navigate } = useRoute()
  const isAdmin = route.path === 'admin'
  const showNav = !isAdmin || (isAdmin && typeof window !== 'undefined' && !localStorage.getItem('ashira_admin'))
  return (
    <div>
      <Toaster position="top-center" richColors />
      {!isAdmin && <Nav navigate={navigate} currentPath={route.path} />}
      {isAdmin && (
        <div className="fixed top-0 inset-x-0 z-50 bg-[#0f2222] text-white h-14 flex items-center">
          <div className="container flex items-center justify-between">
            <button onClick={()=>navigate('home')} className="font-display text-lg text-[#d4b170]">Ashira Inn <span className="text-white/60 text-xs ml-2">Admin</span></button>
            <button onClick={()=>navigate('home')} className="text-xs text-white/70 hover:text-white">← Back to site</button>
          </div>
        </div>
      )}
      <main className={isAdmin ? 'pt-14' : ''}>
        {route.path === 'home' && <HomePage navigate={navigate} />}
        {route.path === 'rooms' && <RoomsPage navigate={navigate} />}
        {route.path === 'room' && <RoomDetailPage navigate={navigate} params={route.params} />}
        {route.path === 'book' && <BookPage navigate={navigate} params={route.params} />}
        {route.path === 'about' && <AboutPage navigate={navigate} />}
        {route.path === 'gallery' && <GalleryPage />}
        {route.path === 'restaurant' && <RestaurantPage />}
        {route.path === 'attractions' && <AttractionsPage />}
        {route.path === 'amenities' && <AmenitiesPage />}
        {route.path === 'contact' && <ContactPage />}
        {route.path === 'faq' && <FaqPage />}
        {route.path === 'offers' && <OffersPage navigate={navigate} />}
        {route.path === 'policy' && <PolicyPage />}
        {route.path === 'admin' && <AdminPage navigate={navigate} />}
      </main>
      {!isAdmin && <Footer navigate={navigate} />}
    </div>
  )
}
