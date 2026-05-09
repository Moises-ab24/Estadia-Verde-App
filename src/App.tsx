import { useState } from 'react'
import { Home, CheckSquare, Info, MessageCircle, Map } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Pantalla } from './types'
import Registro from './components/Registro'
import Actividades from './components/Actividades'
import InfoHotel from './components/InfoHotel'
import Solicitudes from './components/Solicitudes'
import Mapa from './components/Mapa'
import styles from './App.module.css'
import Acceso from './components/Acceso'

interface NavItem {
  id: Pantalla
  label: string
  Icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { id: 'registro', label: 'Inicio', Icon: Home },
  { id: 'actividades', label: 'Actividades', Icon: CheckSquare },
  { id: 'info', label: 'Info', Icon: Info },
  { id: 'solicitudes', label: 'Solicitudes', Icon: MessageCircle },
  { id: 'mapa', label: 'Mapa', Icon: Map },
]

function getNombreHuesped(): string | null {
  try {
    const raw = localStorage.getItem('huesped')
    if (!raw) return null
    const data = JSON.parse(raw) as { nombre: string }
    return data.nombre?.split(' ')[0] ?? null
  } catch {
    return null
  }
}

function verificarAcceso(): boolean {
  const KEY_CORRECTA = import.meta.env.VITE_ACCESS_KEY as string
  const DIAS = 7
  const params = new URLSearchParams(window.location.search)
  const keyUrl = params.get('key')

  if (keyUrl === KEY_CORRECTA) {
    const expira = Date.now() + DIAS * 24 * 60 * 60 * 1000
    localStorage.setItem('acceso_key', keyUrl)
    localStorage.setItem('acceso_expira', String(expira))
    // Limpiar la key de la URL sin recargar
    window.history.replaceState({}, '', window.location.pathname)
    return true
  }

  const keyGuardada = localStorage.getItem('acceso_key')
  const expira = Number(localStorage.getItem('acceso_expira'))

  if (keyGuardada === KEY_CORRECTA && Date.now() < expira) {
    return true
  }

  localStorage.removeItem('acceso_key')
  localStorage.removeItem('acceso_expira')
  return false
}

function App() {
  const [tieneAcceso] = useState(() => verificarAcceso())
  const [pantalla, setPantalla] = useState<Pantalla>('registro')
  const [refreshKey, setRefreshKey] = useState(0)

  const nombre = getNombreHuesped()

  const handleRegistroGuardado = () => {
    setRefreshKey(k => k + 1)
  }

  if (!tieneAcceso) return <Acceso />

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.logo}>🌿</span>
          <div className={styles.headerTexto}>
            <h1 className={styles.titulo}>Estadía Verde</h1>
            <p className={styles.subtitulo}>
              {nombre ? `Hola, ${nombre} 👋` : 'Hotel Monteverde · CR'}
            </p>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={`${styles.seccion} ${pantalla === 'registro' ? styles.seccionActiva : ''}`}>
          <Registro key={refreshKey} onGuardado={handleRegistroGuardado} />
        </div>
        <div className={`${styles.seccion} ${pantalla === 'actividades' ? styles.seccionActiva : ''}`}>
          <Actividades />
        </div>
        <div className={`${styles.seccion} ${pantalla === 'info' ? styles.seccionActiva : ''}`}>
          <InfoHotel />
        </div>
        <div className={`${styles.seccion} ${pantalla === 'solicitudes' ? styles.seccionActiva : ''}`}>
          <Solicitudes />
        </div>
        <div className={`${styles.seccion} ${pantalla === 'mapa' ? styles.seccionActiva : ''}`}>
          <Mapa />
        </div>
      </main>

      <nav className={styles.navbar}>
        {NAV_ITEMS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`${styles.navBtn} ${pantalla === id ? styles.activo : ''}`}
            onClick={() => setPantalla(id)}
            aria-label={label}
          >
            <Icon size={21} strokeWidth={pantalla === id ? 2.5 : 1.8} />
            <span className={styles.navLabel}>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
