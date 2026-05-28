import { useEffect, useMemo, useRef, useState } from 'react'
import { useToast } from '@/contexts/ToastContext'

// Charging Map — Leaflet + OpenStreetMap + OSRM routing + Nominatim geocoding.
// No API keys, no billing. Online stations = green pins, offline = gray.
// Click any station (or pick from the list) to draw a driving route from
// the user's location. "My Location" uses navigator.geolocation.
const STATIONS = [
  { id: 'del',  name: 'Delhi · Connaught Place',      lat: 28.6315, lng: 77.2167, status: 'online'  },
  { id: 'mum',  name: 'Mumbai · Bandra West',         lat: 19.0596, lng: 72.8295, status: 'online'  },
  { id: 'blr',  name: 'Bengaluru · MG Road',          lat: 12.9755, lng: 77.6062, status: 'online'  },
  { id: 'che',  name: 'Chennai · T. Nagar',           lat: 13.0418, lng: 80.2341, status: 'online'  },
  { id: 'hyd',  name: 'Hyderabad · Banjara Hills',    lat: 17.4126, lng: 78.4361, status: 'online'  },
  { id: 'kol',  name: 'Kolkata · Park Street',        lat: 22.5535, lng: 88.3520, status: 'online'  },
  { id: 'ahd',  name: 'Ahmedabad · Navrangpura',      lat: 23.0395, lng: 72.5660, status: 'online'  },
  { id: 'pun',  name: 'Pune · Koregaon Park',         lat: 18.5362, lng: 73.8939, status: 'online'  },
  { id: 'jai',  name: 'Jaipur · MI Road',             lat: 26.9173, lng: 75.8050, status: 'offline' },
  { id: 'luc',  name: 'Lucknow · Hazratganj',         lat: 26.8506, lng: 80.9462, status: 'online'  },
  { id: 'sur',  name: 'Surat · Adajan',               lat: 21.1959, lng: 72.7933, status: 'online'  },
  { id: 'koc',  name: 'Kochi · Marine Drive',         lat: 9.9719,  lng: 76.2856, status: 'online'  },
  { id: 'bho',  name: 'Bhopal · MP Nagar',            lat: 23.2329, lng: 77.4347, status: 'online'  },
  { id: 'cha',  name: 'Chandigarh · Sector 17',       lat: 30.7411, lng: 76.7681, status: 'online'  },
  { id: 'ind',  name: 'Indore · Vijay Nagar',         lat: 22.7533, lng: 75.8937, status: 'offline' },
  { id: 'gho',  name: 'Goa · Panjim',                 lat: 15.4989, lng: 73.8278, status: 'offline' },
  { id: 'vis',  name: 'Visakhapatnam · Beach Road',   lat: 17.7231, lng: 83.3210, status: 'online'  },
  { id: 'gha',  name: 'Guwahati · Paltan Bazaar',     lat: 26.1828, lng: 91.7461, status: 'offline' },
  { id: 'srin', name: 'Srinagar · Lal Chowk',         lat: 34.0779, lng: 74.8094, status: 'online'  },
  { id: 'amr',  name: 'Amritsar · Mall Road',         lat: 31.6340, lng: 74.8723, status: 'online'  },

  // Gujarat expansion
  { id: 'raj',  name: 'Rajkot · Race Course Ring Rd', lat: 22.3039, lng: 70.8022, status: 'online'  },
  { id: 'vad',  name: 'Vadodara · Alkapuri',          lat: 22.3072, lng: 73.1812, status: 'online'  },
  { id: 'ana',  name: 'Anand · Vidyanagar Road',      lat: 22.5645, lng: 72.9289, status: 'online'  },
  { id: 'vap',  name: 'Vapi · GIDC Industrial Area',  lat: 20.3704, lng: 72.9047, status: 'offline' },
  { id: 'nad',  name: 'Nadiad · Station Road',        lat: 22.6916, lng: 72.8634, status: 'online'  },
  { id: 'jun',  name: 'Junagadh · Kalwa Chowk',       lat: 21.5222, lng: 70.4579, status: 'online'  },
]

const LEAFLET_VERSION = '1.9.4'
const LEAFLET_CSS = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.css`
const LEAFLET_JS  = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.js`

// Inject the Leaflet CSS + JS once
let leafletLoader = null
function loadLeaflet() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'))
  if (window.L) return Promise.resolve(window.L)
  if (leafletLoader) return leafletLoader
  leafletLoader = new Promise((resolve, reject) => {
    // CSS
    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement('link')
      link.rel  = 'stylesheet'
      link.href = LEAFLET_CSS
      document.head.appendChild(link)
    }
    // JS
    const s = document.createElement('script')
    s.src = LEAFLET_JS
    s.async = true
    s.onload  = () => resolve(window.L)
    s.onerror = () => reject(new Error('Failed to load Leaflet'))
    document.head.appendChild(s)
  })
  return leafletLoader
}

// EV-charging-station pin — teardrop shape with a lightning bolt inside.
// Colored by status (green online, gray offline). Tip of the pin sits at the
// bottom-center, so iconAnchor must be [width/2, height] in Leaflet.
function chargerPin(color) {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
  <defs>
    <filter id="ds" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000" flood-opacity="0.45"/>
    </filter>
  </defs>
  <path filter="url(#ds)"
        d="M16 1 C7.7 1 1 7.7 1 16 c0 10.5 15 22 15 22 s15-11.5 15-22 C31 7.7 24.3 1 16 1 z"
        fill="${color}" stroke="#0a0a0a" stroke-width="1.5"/>
  <circle cx="16" cy="15" r="9" fill="rgba(255,255,255,0.18)"/>
  <path d="M18.5 8 L11.5 17 L15 17 L13.5 23 L20.5 14 L17 14 Z"
        fill="#ffffff" stroke="#0a0a0a" stroke-width="0.6" stroke-linejoin="round"/>
</svg>`.trim()
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg)
}
const PIN_ONLINE  = chargerPin('#22c55e')
const PIN_OFFLINE = chargerPin('#6b7280')

// Small inline-circle for the legend chips and station-list rows (CSS sets size)
function pinSvg(color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="${color}" stroke="#0a0a0a" stroke-width="1"/></svg>`
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg)
}

// Top-down car icon — used for the user's origin (search result or geolocation).
const CAR_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <ellipse cx="20" cy="36" rx="11" ry="2" fill="rgba(0,0,0,0.35)"/>
  <rect x="11" y="6"  width="18" height="28" rx="4" fill="#3b82f6" stroke="#0a0a0a" stroke-width="1.6"/>
  <rect x="13" y="9"  width="14" height="7" rx="1.2" fill="rgba(255,255,255,0.6)"/>
  <rect x="13" y="23" width="14" height="6" rx="1.2" fill="rgba(255,255,255,0.4)"/>
  <rect x="7"  y="14" width="4"  height="2.5" rx="0.5" fill="#3b82f6" stroke="#0a0a0a" stroke-width="1"/>
  <rect x="29" y="14" width="4"  height="2.5" rx="0.5" fill="#3b82f6" stroke="#0a0a0a" stroke-width="1"/>
  <rect x="13" y="6.5" width="4" height="2"  fill="#fbbf24"/>
  <rect x="23" y="6.5" width="4" height="2"  fill="#fbbf24"/>
  <rect x="13" y="31.5" width="4" height="2" fill="#ef4444"/>
  <rect x="23" y="31.5" width="4" height="2" fill="#ef4444"/>
</svg>`.trim()
const PIN_USER = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(CAR_SVG)

function buildIcon(L, url, size = 28) {
  return L.icon({
    iconUrl:    url,
    iconSize:   [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}

// Teardrop pin — tip sits at the bottom, so anchor is bottom-center.
function buildChargerIcon(L, url) {
  return L.icon({
    iconUrl:    url,
    iconSize:   [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -36],
  })
}

// Format meters / seconds nicely
const fmtKm  = (m) => (m >= 1000 ? `${(m / 1000).toFixed(m >= 10000 ? 0 : 1)} km` : `${Math.round(m)} m`)
const fmtDur = (s) => {
  const h = Math.floor(s / 3600)
  const min = Math.round((s - h * 3600) / 60)
  if (h && min) return `${h} hr ${min} min`
  if (h)        return `${h} hr`
  return `${min} min`
}

export default function ChargingMap() {
  const mapElRef     = useRef(null)
  const mapRef       = useRef(null)
  const markerRefs   = useRef([])
  const userMarker   = useRef(null)
  const routeLayer   = useRef(null)
  const searchTimer  = useRef(null)
  const wrapRef      = useRef(null)

  const [q, setQ]               = useState('')
  const [listQ, setListQ]       = useState('')
  const [suggestions, setSugg]  = useState([])
  const [showSugg, setShowSugg] = useState(false)
  const [userLoc, setUserLoc]   = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [routeInfo, setRouteInfo] = useState(null) // { distance, duration, to }
  const [mapReady, setMapReady] = useState(false)
  const [mapError, setMapError] = useState(null)
  const { show } = useToast()

  const online  = STATIONS.filter((s) => s.status === 'online').length
  const offline = STATIONS.length - online

  // --- Mount: load Leaflet, initialize map --------------------------------
  useEffect(() => {
    let cancelled = false
    loadLeaflet()
      .then((L) => {
        if (cancelled || !mapElRef.current) return
        const map = L.map(mapElRef.current, {
          center: [22.5, 80],
          zoom: 5,
          zoomControl: true,
          attributionControl: true,
        })

        // CARTO Dark Matter tiles — fits the site's dark theme. Free + no key.
        // Falls back to OSM standard if Carto unreachable.
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors · &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        }).addTo(map)

        mapRef.current = map

        // Station markers — teardrop EV-charger pins
        const onlineIcon  = buildChargerIcon(L, PIN_ONLINE)
        const offlineIcon = buildChargerIcon(L, PIN_OFFLINE)
        markerRefs.current = STATIONS.map((s) => {
          const marker = L.marker([s.lat, s.lng], {
            icon: s.status === 'online' ? onlineIcon : offlineIcon,
            title: s.name,
          }).addTo(map)
          marker.bindPopup(
            `<div style="font-family:sans-serif;color:#111;min-width:180px">
              <strong style="display:block;margin-bottom:4px">${s.name}</strong>
              <span style="color:${s.status === 'online' ? '#22c55e' : '#6b7280'};font-size:12px;text-transform:uppercase;letter-spacing:1px">
                ${s.status === 'online' ? '● Online · Available' : '● Offline · Maintenance'}
              </span>
            </div>`
          )
          marker.on('click', () => {
            setActiveId(s.id)
            routeTo(s)
          })
          return { station: s, marker }
        })

        setMapReady(true)

        // Fix size after layout settles
        setTimeout(() => map.invalidateSize(), 0)
      })
      .catch((err) => {
        console.error(err)
        setMapError('Failed to load map library. Check your network connection.')
      })
    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Close suggestion dropdown on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (!wrapRef.current?.contains(e.target)) setShowSugg(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  // --- Place / update user-origin marker ---------------------------------
  function setOrigin(loc, label = 'Your location') {
    if (!mapRef.current || !window.L) return
    const L = window.L
    setUserLoc(loc)
    if (userMarker.current) {
      userMarker.current.setLatLng([loc.lat, loc.lng])
      userMarker.current.setPopupContent(label)
    } else {
      userMarker.current = L.marker([loc.lat, loc.lng], {
        icon: buildIcon(L, PIN_USER, 40),
        title: label,
        zIndexOffset: 1000,
      }).addTo(mapRef.current).bindPopup(label)
    }
    mapRef.current.setView([loc.lat, loc.lng], 11)
    if (activeId) {
      const s = STATIONS.find((x) => x.id === activeId)
      if (s) routeTo(s, loc)
    }
  }

  // --- Geolocation -------------------------------------------------------
  function useMyLocation() {
    if (!navigator.geolocation) {
      show('Geolocation is not supported by your browser.', 'error')
      return
    }
    show('Locating you…', 'info')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin(
          { lat: pos.coords.latitude, lng: pos.coords.longitude },
          'Your location',
        )
        show('Location set.', 'success')
      },
      (err) => {
        show(`Could not get your location: ${err.message}`, 'error')
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  // --- Compute + render route via OSRM (public demo server) --------------
  async function routeTo(station, originOverride) {
    if (!mapRef.current || !window.L) return
    const L = window.L
    const origin = originOverride || userLoc
    setActiveId(station.id)

    if (!origin) {
      show('Set your location first to see directions.', 'info')
      mapRef.current.setView([station.lat, station.lng], 11)
      // Open the popup for that station
      const entry = markerRefs.current.find((m) => m.station.id === station.id)
      entry?.marker.openPopup()
      return
    }

    try {
      const url =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${origin.lng},${origin.lat};${station.lng},${station.lat}` +
        `?overview=full&geometries=geojson`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`OSRM ${res.status}`)
      const data = await res.json()
      const route = data.routes?.[0]
      if (!route) throw new Error('No route found')

      // Clear existing route, draw new one
      if (routeLayer.current) mapRef.current.removeLayer(routeLayer.current)
      const coords = route.geometry.coordinates.map(([lng, lat]) => [lat, lng])
      routeLayer.current = L.polyline(coords, {
        color: '#22c55e',
        weight: 5,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(mapRef.current)

      // Fit map to show both endpoints
      const bounds = L.latLngBounds([
        [origin.lat, origin.lng],
        [station.lat, station.lng],
      ])
      mapRef.current.fitBounds(bounds, { padding: [60, 60] })

      setRouteInfo({
        distance: fmtKm(route.distance),
        duration: fmtDur(route.duration),
        to: station.name,
      })
    } catch (err) {
      console.error(err)
      show(`Could not fetch route: ${err.message}`, 'error')
    }
  }

  function clearRoute() {
    if (routeLayer.current && mapRef.current) {
      mapRef.current.removeLayer(routeLayer.current)
      routeLayer.current = null
    }
    setRouteInfo(null)
    setActiveId(null)
  }

  // --- Nominatim search suggestions --------------------------------------
  function onSearchChange(e) {
    const v = e.target.value
    setQ(v)
    if (searchTimer.current) clearTimeout(searchTimer.current)
    if (!v.trim()) {
      setSugg([])
      setShowSugg(false)
      return
    }
    searchTimer.current = setTimeout(async () => {
      try {
        const url =
          `https://nominatim.openstreetmap.org/search` +
          `?q=${encodeURIComponent(v)}&format=json&limit=5&countrycodes=in&addressdetails=0`
        const res = await fetch(url, { headers: { Accept: 'application/json' } })
        if (!res.ok) return
        const data = await res.json()
        setSugg(data)
        setShowSugg(true)
      } catch {
        /* swallow — search is best-effort */
      }
    }, 350)
  }

  function pickSuggestion(s) {
    setQ(s.display_name)
    setShowSugg(false)
    setOrigin(
      { lat: parseFloat(s.lat), lng: parseFloat(s.lon) },
      s.display_name,
    )
  }

  // --- Local list filter (independent of the Nominatim search) -----------
  const filteredList = useMemo(() => {
    const term = listQ.trim().toLowerCase()
    if (!term) return STATIONS
    return STATIONS.filter((s) => s.name.toLowerCase().includes(term))
  }, [listQ])

  return (
    <section id="cn-map">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Find a Charger</span>
          <h2 className="section-title">
            Charging <span className="accent">Map</span>
          </h2>
          <p className="section-desc">
            Search by city, pincode, or landmark — or use your current location
            to get driving directions to the nearest Svitch-compatible charger.
          </p>
        </div>

        <div className="card-base map-card">
          {/* Search + geolocate */}
          <form
            ref={wrapRef}
            className="map-search-bar"
            onSubmit={(e) => {
              e.preventDefault()
              if (suggestions[0]) pickSuggestion(suggestions[0])
            }}
          >
            <div className="map-search-input-wrap">
              <input
                type="search"
                id="cnMapSearch"
                placeholder="Search city, pincode or landmark…"
                aria-label="Search city, pincode or landmark"
                value={q}
                onChange={onSearchChange}
                onFocus={() => suggestions.length && setShowSugg(true)}
                autoComplete="off"
              />
              {showSugg && suggestions.length > 0 && (
                <ul className="map-search-suggestions">
                  {suggestions.map((s) => (
                    <li key={s.place_id}>
                      <button type="button" onClick={() => pickSuggestion(s)}>
                        <i className="bi bi-geo-alt" />
                        <span>{s.display_name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="button"
              className="btn-csr secondary sm"
              onClick={useMyLocation}
              title="Use my current location"
            >
              <i className="bi bi-crosshair"></i> My Location
            </button>
            {routeInfo && (
              <button type="button" className="btn-csr ghost sm" onClick={clearRoute}>
                <i className="bi bi-x-circle"></i> Clear Route
              </button>
            )}
          </form>

          {/* Legend + route info */}
          <div className="map-legend">
            <span className="map-legend-chip">
              <span className="map-pin-dot is-online" /> Online
              <strong>{online}</strong>
            </span>
            <span className="map-legend-chip">
              <span className="map-pin-dot is-offline" /> Offline
              <strong>{offline}</strong>
            </span>
            {routeInfo && (
              <span className="map-route-info">
                <i className="bi bi-signpost-split-fill" /> {routeInfo.distance} · {routeInfo.duration}
                <span className="map-route-target"> → {routeInfo.to}</span>
              </span>
            )}
          </div>

          {/* Map + stations list side-by-side */}
          <div className="map-body">
            <div className="map-canvas">
              <div ref={mapElRef} className="map-canvas-leaflet" />
              {!mapReady && !mapError && (
                <div className="map-canvas-loading rajdhani-lbl-text-sm">
                  <i className="bi bi-arrow-repeat spin-icon" /> Loading map…
                </div>
              )}
              {mapError && (
                <div className="map-canvas-loading rajdhani-lbl-text-sm map-canvas-error">
                  <i className="bi bi-exclamation-triangle-fill" /> {mapError}
                </div>
              )}
            </div>

            <aside className="map-stations">
              <h4 className="map-stations-title">Charging Stations</h4>
              <div className="map-stations-filter">
                <i className="bi bi-search" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Filter stations…"
                  value={listQ}
                  onChange={(e) => setListQ(e.target.value)}
                  aria-label="Filter charging stations"
                />
                {listQ && (
                  <button
                    type="button"
                    className="map-stations-filter-clear"
                    onClick={() => setListQ('')}
                    aria-label="Clear filter"
                  >
                    <i className="bi bi-x" />
                  </button>
                )}
              </div>
              <ul className="map-stations-list">
                {filteredList.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className={`map-station-row${activeId === s.id ? ' is-active' : ''}`}
                      onClick={() => {
                        const entry = markerRefs.current.find((m) => m.station.id === s.id)
                        if (entry && mapRef.current) {
                          mapRef.current.setView([s.lat, s.lng], 11)
                          entry.marker.openPopup()
                        }
                        routeTo(s)
                      }}
                    >
                      <span className={`map-pin-dot is-${s.status}`} />
                      <span className="map-station-name">{s.name}</span>
                      <i className="bi bi-arrow-right" />
                    </button>
                  </li>
                ))}
                {filteredList.length === 0 && (
                  <li className="map-stations-empty rajdhani-lbl-text-sm">
                    No stations match your search.
                  </li>
                )}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
