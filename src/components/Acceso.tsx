import { ShieldAlert, QrCode } from 'lucide-react'
import styles from './Acceso.module.css'

export default function Acceso() {
  return (
    <div className={styles.container}>
      <div className={styles.contenido}>
        <div className={styles.logo}>🌿</div>
        <h1 className={styles.nombre}>Estadía Verde</h1>
        <p className={styles.hotel}>Hotel Monteverde · Costa Rica</p>

        <div className={styles.card}>
          <ShieldAlert size={32} color="#F79E51" />
          <h2 className={styles.titulo}>Acceso restringido</h2>
          <p className={styles.desc}>
            Esta app es exclusiva para huéspedes del hotel. Escaneá el código QR
            en recepción para acceder.
          </p>
        </div>

        <div className={styles.qrBox}>
          <QrCode size={28} color="var(--verde-suave)" />
          <p className={styles.qrTexto}>
            Encontrá el QR en recepción
          </p>
        </div>

        <p className={styles.footer}>
          🏔️ Monteverde, Costa Rica
        </p>
      </div>
    </div>
  )
}