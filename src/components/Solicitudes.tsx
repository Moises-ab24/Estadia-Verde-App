import { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import type { HuespedData } from '../types'
import styles from './Solicitudes.module.css'

const WA_NUMERO = import.meta.env.VITE_WA_NUMERO as string

interface Servicio {
  nombre: string
  emoji: string
}

interface Categoria {
  id: string
  titulo: string
  emoji: string
  servicios: Servicio[]
}

const CATEGORIAS: Categoria[] = [
  {
    id: 'habitacion',
    titulo: 'Habitación',
    emoji: '🛏️',
    servicios: [
      { nombre: 'Toallas extra', emoji: '🛁' },
      { nombre: 'Reporte de mantenimiento', emoji: '🔧' },
      { nombre: 'Cambio de sábanas', emoji: '🛏️' },
      { nombre: 'Artículos de tocador', emoji: '🧴' },
    ],
  },
  {
    id: 'restaurante',
    titulo: 'Restaurante',
    emoji: '🍽️',
    servicios: [
      { nombre: 'Room service', emoji: '🥡' },
      { nombre: 'Reserva para cena', emoji: '📋' },
      { nombre: 'Desayuno a la habitación', emoji: '☕' },
    ],
  },
  {
    id: 'transporte',
    titulo: 'Transporte',
    emoji: '🚐',
    servicios: [
      { nombre: 'Transporte al pueblo', emoji: '🏘️' },
      { nombre: 'Transporte al aeropuerto', emoji: '✈️' },
      { nombre: 'Tour en jeep', emoji: '🚙' },
    ],
  },
]

function getHuesped(): HuespedData | null {
  try {
    const raw = localStorage.getItem('huesped')
    if (!raw) return null
    return JSON.parse(raw) as HuespedData
  } catch {
    return null
  }
}

function abrirWhatsApp(servicio: string) {
  const huesped = getHuesped()
  const nombre = huesped?.nombre ?? 'Huésped'
  const habitacion = huesped?.habitacion ?? '—'
  const mensaje = `Hola, soy ${nombre}, habitación ${habitacion}. Solicito: ${servicio}.`
  const url = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(mensaje)}`
  window.open(url, '_blank')
}

export default function Solicitudes() {
  const [abiertos, setAbiertos] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    setAbiertos(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const huesped = getHuesped()

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Solicitudes al Personal</h2>

      {!huesped && (
        <div className={styles.aviso}>
          ⚠️ Registrá tu nombre y habitación en la pestaña <strong>Inicio</strong> para que los mensajes incluyan tu info.
        </div>
      )}

      {huesped && (
        <div className={styles.infoHuesped}>
          Enviando como <strong>{huesped.nombre}</strong> · Hab. <strong>#{huesped.habitacion}</strong>
        </div>
      )}

      <div className={styles.categorias}>
        {CATEGORIAS.map(cat => (
          <div key={cat.id} className={styles.categoria}>
            <button className={styles.catHeader} onClick={() => toggle(cat.id)}>
              <span className={styles.catEmoji}>{cat.emoji}</span>
              <span className={styles.catTitulo}>{cat.titulo}</span>
              {abiertos[cat.id]
                ? <ChevronUp size={18} color="var(--gris)" />
                : <ChevronDown size={18} color="var(--gris)" />
              }
            </button>

            {abiertos[cat.id] && (
              <div className={styles.servicios}>
                {cat.servicios.map(srv => (
                  <button
                    key={srv.nombre}
                    className={styles.btnServicio}
                    onClick={() => abrirWhatsApp(srv.nombre)}
                  >
                    <span className={styles.srvEmoji}>{srv.emoji}</span>
                    <span className={styles.srvNombre}>{srv.nombre}</span>
                    <ExternalLink size={14} color="var(--verde)" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className={styles.nota}>
        💬 Cada botón abre WhatsApp con un mensaje ya redactado al personal del hotel.
      </p>
    </div>
  )
}
