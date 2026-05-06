import { useState, useEffect } from 'react'
import { Check, Star } from 'lucide-react'
import type { Actividad, EstadoActividad } from '../types'
import styles from './Actividades.module.css'

const CLAVE_LS = 'actividades'

const ACTIVIDADES_BASE: Omit<Actividad, 'estado'>[] = [
  { id: 'bosque', nombre: 'Tour al bosque nuboso', emoji: '🌫️', descripcion: 'Caminata guiada por el bosque' },
  { id: 'mariposas', nombre: 'Mariposario', emoji: '🦋', descripcion: 'Jardín de mariposas tropicales' },
  { id: 'tirolesa', nombre: 'Tirolesa', emoji: '🪂', descripcion: 'Canopy sobre el bosque nuboso' },
  { id: 'nocturna', nombre: 'Caminata nocturna', emoji: '🌙', descripcion: 'Flora y fauna de noche' },
  { id: 'aves', nombre: 'Avistamiento de aves', emoji: '🦜', descripcion: 'Más de 400 especies en Monteverde' },
  { id: 'cena', nombre: 'Cena típica costarricense', emoji: '🍽️', descripcion: 'Gallo pinto, casado y más' },
  { id: 'cafe', nombre: 'Taller de café', emoji: '☕', descripcion: 'Del grano a la taza tica' },
  { id: 'canopy', nombre: 'Canopy', emoji: '🌳', descripcion: 'Tirolesas en la reserva privada' },
]

function cargarEstados(): Record<string, EstadoActividad> {
  try {
    const raw = localStorage.getItem(CLAVE_LS)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, EstadoActividad>
  } catch {
    return {}
  }
}

export default function Actividades() {
  const [actividades, setActividades] = useState<Actividad[]>([])

  useEffect(() => {
    const estados = cargarEstados()
    setActividades(
      ACTIVIDADES_BASE.map(a => ({ ...a, estado: estados[a.id] ?? 'ninguno' }))
    )
  }, [])

  const cambiarEstado = (id: string) => {
    setActividades(prev => {
      const updated = prev.map(a => {
        if (a.id !== id) return a
        const siguiente: EstadoActividad =
          a.estado === 'ninguno' ? 'interesa' :
          a.estado === 'interesa' ? 'hecha' : 'ninguno'
        return { ...a, estado: siguiente }
      })
      const estados: Record<string, EstadoActividad> = {}
      updated.forEach(a => { estados[a.id] = a.estado })
      localStorage.setItem(CLAVE_LS, JSON.stringify(estados))
      return updated
    })
  }

  const hechas = actividades.filter(a => a.estado === 'hecha').length
  const interesa = actividades.filter(a => a.estado === 'interesa').length

  return (
    <div className={styles.container}>
      <div className={styles.resumen}>
        <div className={styles.chip} style={{ background: 'var(--verde-suave)', color: 'var(--verde)' }}>
          <Check size={13} /> {hechas} hechas
        </div>
        <div className={styles.chip} style={{ background: 'var(--amarillo-suave)', color: 'var(--amarillo)' }}>
          <Star size={13} /> {interesa} me interesan
        </div>
      </div>

      <p className={styles.instruccion}>
        Tocá cada actividad para marcarla 👆
      </p>

      <div className={styles.lista}>
        {actividades.map(act => (
          <button
            key={act.id}
            className={`${styles.item} ${
              act.estado === 'hecha' ? styles.itemHecha :
              act.estado === 'interesa' ? styles.itemInteresa : ''
            }`}
            onClick={() => cambiarEstado(act.id)}
          >
            <span className={styles.emoji}>{act.emoji}</span>
            <div className={styles.itemTexto}>
              <span className={styles.itemNombre}>{act.nombre}</span>
              <span className={styles.itemDesc}>{act.descripcion}</span>
            </div>
            <div className={styles.badge}>
              {act.estado === 'hecha' && (
                <span className={styles.badgeHecha}><Check size={14} /></span>
              )}
              {act.estado === 'interesa' && (
                <span className={styles.badgeInteresa}><Star size={14} /></span>
              )}
              {act.estado === 'ninguno' && (
                <span className={styles.badgeNinguno} />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className={styles.leyenda}>
        <span className={styles.leyendaItem}>
          <span className={styles.dotVerde} /> Ya la hice
        </span>
        <span className={styles.leyendaItem}>
          <span className={styles.dotAmarillo} /> Me interesa
        </span>
        <span className={styles.leyendaItem}>
          <span className={styles.dotGris} /> Sin marcar
        </span>
      </div>
    </div>
  )
}
