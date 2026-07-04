'use client'
import { useEffect, useState } from 'react'

export const api = {
  async get(path) {
    const r = await fetch(`/api${path}`)
    const j = await r.json()
    if (!j.ok) throw new Error(j.error || 'Request failed')
    return j.data
  },
  async post(path, body) {
    const r = await fetch(`/api${path}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}),
    })
    const j = await r.json()
    if (!j.ok) throw new Error(j.error || 'Request failed')
    return j.data
  },
  async patch(path, body) {
    const r = await fetch(`/api${path}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}),
    })
    const j = await r.json()
    if (!j.ok) throw new Error(j.error || 'Request failed')
    return j.data
  },
}

export function inr(n) { return '\u20B9' + Number(n || 0).toLocaleString('en-IN') }
export function todayISO(offset = 0) {
  const d = new Date(); d.setDate(d.getDate() + offset)
  return d.toISOString().slice(0, 10)
}
export function nightsBetween(a, b) {
  return Math.max(0, Math.round((new Date(b) - new Date(a)) / 86400000))
}

// Simple hash router
export function useRoute() {
  const [route, setRoute] = useState({ path: 'home', params: {} })
  useEffect(() => {
    const parse = () => {
      const h = (typeof window !== 'undefined' ? window.location.hash : '#').replace(/^#\/?/, '')
      const [p, qs] = h.split('?')
      const params = {}
      if (qs) qs.split('&').forEach(kv => { const [k,v] = kv.split('='); params[decodeURIComponent(k)] = decodeURIComponent(v || '') })
      setRoute({ path: p || 'home', params })
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' })
    }
    parse()
    window.addEventListener('hashchange', parse)
    return () => window.removeEventListener('hashchange', parse)
  }, [])
  const navigate = (path, params = {}) => {
    const qs = Object.keys(params).length
      ? '?' + Object.entries(params).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
      : ''
    window.location.hash = `/${path}${qs}`
  }
  return { route, navigate }
}

export function useMounted() {
  const [m, setM] = useState(false)
  useEffect(() => setM(true), [])
  return m
}
