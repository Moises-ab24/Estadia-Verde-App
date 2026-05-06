import { Home, Utensils, Trees, BedDouble, Waves, Car } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import styles from './Mapa.module.css'

interface PuntoMapa {
  id: string
  nombre: string
  Icono: LucideIcon
  top: string
  left: string
  color: string
  bg: string
}

const PUNTOS: PuntoMapa[] = [
  { id: 'sendero', nombre: 'Sendero', Icono: Trees, top: '18%', left: '50%', color: '#fff', bg: '#1b4332' },
  { id: 'recepcion', nombre: 'Recepción', Icono: Home, top: '30%', left: '50%', color: '#fff', bg: '#2d6a4f' },
  { id: 'restaurante', nombre: 'Restaurante', Icono: Utensils, top: '30%', left: '78%', color: '#fff', bg: '#7f4f24' },
  { id: 'zona-a', nombre: 'Hab. Zona A', Icono: BedDouble, top: '55%', left: '22%', color: '#fff', bg: '#52b788' },
  { id: 'zona-b', nombre: 'Hab. Zona B', Icono: BedDouble, top: '55%', left: '78%', color: '#fff', bg: '#52b788' },
  { id: 'piscina', nombre: 'Piscina', Icono: Waves, top: '72%', left: '50%', color: '#fff', bg: '#0284c7' },
  { id: 'parqueo', nombre: 'Parqueo', Icono: Car, top: '88%', left: '50%', color: '#fff', bg: '#6b7280' },
]

export default function Mapa() {
  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Mapa del Hotel</h2>
      <p className={styles.sub}>Vista ilustrativa de las instalaciones</p>

      <div className={styles.mapaWrapper}>
        <div className={styles.mapa}>

          {/* Bosque arriba */}
          <div className={styles.bosque} />

          {/* Camino vertical central */}
          <div className={styles.caminoV} />

          {/* Camino horizontal medio */}
          <div className={styles.caminoH} />

          {/* Edificio recepción */}
          <div className={styles.edificio} style={{ top: '24%', left: '36%', width: '28%', height: '12%' }} />

          {/* Edificio restaurante */}
          <div className={styles.edificioCafe} style={{ top: '24%', left: '68%', width: '24%', height: '12%' }} />

          {/* Hab Zona A */}
          <div className={styles.edificioVerde} style={{ top: '48%', left: '4%', width: '30%', height: '14%' }} />

          {/* Hab Zona B */}
          <div className={styles.edificioVerde} style={{ top: '48%', left: '66%', width: '30%', height: '14%' }} />

          {/* Piscina */}
          <div className={styles.piscinaBloque} />

          {/* Parqueo */}
          <div className={styles.parqueoBloque} />

          {/* Puntos */}
          {PUNTOS.map(punto => (
            <div
              key={punto.id}
              className={styles.punto}
              style={{ top: punto.top, left: punto.left }}
            >
              <div className={styles.puntoIcono} style={{ background: punto.bg }}>
                <punto.Icono size={13} color={punto.color} />
              </div>
              <span className={styles.puntoLabel}>{punto.nombre}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Leyenda */}
      <div className={styles.leyenda}>
        {PUNTOS.map(punto => (
          <div key={punto.id} className={styles.leyendaItem}>
            <div className={styles.leyendaDot} style={{ background: punto.bg }}>
              <punto.Icono size={10} color="#fff" />
            </div>
            <span>{punto.nombre}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
