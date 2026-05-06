import { useEffect, useState } from 'react'
import { Utensils, Wifi, Phone, Cloud, Sun, CloudRain, CloudSnow, Wind } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ClimaData } from '../types'
import styles from './InfoHotel.module.css'

function getDescripcionClima(codigo: number): { texto: string; Icono: LucideIcon } {
  if (codigo === 0) return { texto: 'Despejado', Icono: Sun }
  if (codigo <= 3) return { texto: 'Parcialmente nublado', Icono: Cloud }
  if (codigo <= 67) return { texto: 'Lluvia', Icono: CloudRain }
  if (codigo <= 77) return { texto: 'Nevada', Icono: CloudSnow }
  if (codigo <= 82) return { texto: 'Lluvia fuerte', Icono: CloudRain }
  return { texto: 'Tormenta', Icono: Wind }
}

export default function InfoHotel() {
  const [clima, setClima] = useState<ClimaData>({
    temperatura: 0,
    codigoClima: 0,
    loading: true,
    error: false,
  })

  useEffect(() => {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=10.3086&longitude=-84.8282&current_weather=true&temperature_unit=celsius'

    fetch(url)
      .then(r => r.json())
      .then((data: { current_weather: { temperature: number; weathercode: number } }) => {
        setClima({
          temperatura: Math.round(data.current_weather.temperature),
          codigoClima: data.current_weather.weathercode,
          loading: false,
          error: false,
        })
      })
      .catch(() => {
        setClima(prev => ({ ...prev, loading: false, error: true }))
      })
  }, [])

  const { texto: climaTxt, Icono: ClimaIcono } = clima.loading || clima.error
    ? { texto: '', Icono: Cloud }
    : getDescripcionClima(clima.codigoClima)

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Información del Hotel</h2>

      {/* Clima */}
      <div className={`${styles.card} ${styles.cardClima}`}>
        <div className={styles.cardHeader}>
          <div className={styles.cardIcono} style={{ background: '#e0f2fe' }}>
            <ClimaIcono size={20} color="#0284c7" />
          </div>
          <div>
            <p className={styles.cardTitulo}>Clima en Monteverde</p>
            <p className={styles.cardSub}>Datos en tiempo real</p>
          </div>
        </div>
        {clima.loading && <p className={styles.climaCargando}>Cargando clima...</p>}
        {clima.error && (
          <p className={styles.climaError}>🌫️ Fresco y nublado — llevá chaqueta</p>
        )}
        {!clima.loading && !clima.error && (
          <div className={styles.climaDatos}>
            <span className={styles.climaTemp}>{clima.temperatura}°C</span>
            <span className={styles.climaTxt}>{climaTxt} · llevá chaqueta 🧥</span>
          </div>
        )}
      </div>

      {/* Restaurante */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardIcono} style={{ background: '#fef3c7' }}>
            <Utensils size={20} color="#d97706" />
          </div>
          <div>
            <p className={styles.cardTitulo}>Restaurante</p>
            <p className={styles.cardSub}>Cocina costarricense</p>
          </div>
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.infoFila}>
            <span className={styles.infoEtiqueta}>Desayuno</span>
            <span className={styles.infoValor}>7:00am – 9:00am</span>
          </div>
          <div className={styles.infoFila}>
            <span className={styles.infoEtiqueta}>Almuerzo</span>
            <span className={styles.infoValor}>12:00pm – 2:00pm</span>
          </div>
          <div className={styles.infoFila}>
            <span className={styles.infoEtiqueta}>Cena</span>
            <span className={styles.infoValor}>6:00pm – 9:00pm</span>
          </div>
        </div>
      </div>

      {/* WiFi */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardIcono} style={{ background: 'var(--verde-suave)' }}>
            <Wifi size={20} color="var(--verde)" />
          </div>
          <div>
            <p className={styles.cardTitulo}>WiFi del Hotel</p>
            <p className={styles.cardSub}>Gratis para huéspedes</p>
          </div>
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.infoFila}>
            <span className={styles.infoEtiqueta}>Red</span>
            <span className={styles.infoValor}>HotelMonteverde</span>
          </div>
          <div className={styles.infoFila}>
            <span className={styles.infoEtiqueta}>Clave</span>
            <span className={`${styles.infoValor} ${styles.clave}`}>{import.meta.env.VITE_WIFI_CLAVE}</span>
          </div>
        </div>
      </div>

      {/* Recepción */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardIcono} style={{ background: '#f3e8ff' }}>
            <Phone size={20} color="#7c3aed" />
          </div>
          <div>
            <p className={styles.cardTitulo}>Recepción</p>
            <p className={styles.cardSub}>Disponible las 24 horas</p>
          </div>
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.infoFila}>
            <span className={styles.infoEtiqueta}>Extensión interna</span>
            <span className={styles.infoValor}>{import.meta.env.VITE_RECEPCION_EXT}</span>
          </div>
          <div className={styles.infoFila}>
            <span className={styles.infoEtiqueta}>WhatsApp</span>
            <span className={styles.infoValor}>+506 8888-8888</span>
          </div>
          <div className={styles.infoFila}>
            <span className={styles.infoEtiqueta}>Horario</span>
            <span className={styles.infoValor}>24/7</span>
          </div>
        </div>
      </div>
    </div>
  )
}
