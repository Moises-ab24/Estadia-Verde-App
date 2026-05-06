import { useState, useEffect } from 'react'
import { Save, Edit3, User, DoorOpen, Calendar, LogOut, Moon } from 'lucide-react'
import type { HuespedData } from '../types'
import styles from './Registro.module.css'

interface Props {
  onGuardado: () => void
}

const CLAVE_LS = 'huesped'

function getHuespedLS(): HuespedData | null {
  try {
    const raw = localStorage.getItem(CLAVE_LS)
    if (!raw) return null
    return JSON.parse(raw) as HuespedData
  } catch {
    return null
  }
}

function calcNoches(entrada: string, salida: string): number {
  if (!entrada || !salida) return 0
  const diff = new Date(salida).getTime() - new Date(entrada).getTime()
  return Math.max(0, Math.round(diff / 86400000))
}

export default function Registro({ onGuardado }: Props) {
  const [form, setForm] = useState<HuespedData>({
    nombre: '', habitacion: '', fechaEntrada: '', fechaSalida: ''
  })
  const [guardado, setGuardado] = useState(false)
  const [editando, setEditando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const datos = getHuespedLS()
    if (datos) {
      setForm(datos)
      setGuardado(true)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleGuardar = () => {
    if (!form.nombre.trim() || !form.habitacion.trim() || !form.fechaEntrada || !form.fechaSalida) {
      setError('Por favor completá todos los campos.')
      return
    }
    if (new Date(form.fechaSalida) <= new Date(form.fechaEntrada)) {
      setError('La fecha de salida debe ser después de la entrada.')
      return
    }
    localStorage.setItem(CLAVE_LS, JSON.stringify(form))
    setGuardado(true)
    setEditando(false)
    setError('')
    onGuardado()
  }

  const handleSalir = () => {
    localStorage.removeItem(CLAVE_LS)
    setForm({ nombre: '', habitacion: '', fechaEntrada: '', fechaSalida: '' })
    setGuardado(false)
    setEditando(false)
    onGuardado()
  }

  const mostrarForm = !guardado || editando
  const noches = calcNoches(form.fechaEntrada, form.fechaSalida)

  return (
    <div className={styles.container}>
      {/* Banner */}
      <div className={styles.banner}>
        <div className={styles.bannerEmoji}>🏔️</div>
        <h2 className={styles.bannerTitulo}>
          {guardado && !editando
            ? `¡Bienvenido, ${form.nombre.split(' ')[0]}!`
            : 'Registrá tu estadía'}
        </h2>
        <p className={styles.bannerSub}>Hotel Monteverde · Costa Rica</p>
      </div>

      {/* Info guardada */}
      {guardado && !editando && (
        <div className={styles.card}>
          <div className={styles.infoFila}>
            <User size={15} color="var(--verde)" />
            <span className={styles.infoEtiqueta}>Huésped</span>
            <span className={styles.infoValor}>{form.nombre}</span>
          </div>
          <div className={styles.separador} />
          <div className={styles.infoFila}>
            <DoorOpen size={15} color="var(--cafe)" />
            <span className={styles.infoEtiqueta}>Habitación</span>
            <span className={styles.infoValor}>#{form.habitacion}</span>
          </div>
          <div className={styles.separador} />
          <div className={styles.infoFila}>
            <Calendar size={15} color="var(--verde)" />
            <span className={styles.infoEtiqueta}>Entrada</span>
            <span className={styles.infoValor}>{form.fechaEntrada}</span>
          </div>
          <div className={styles.separador} />
          <div className={styles.infoFila}>
            <Calendar size={15} color="var(--cafe)" />
            <span className={styles.infoEtiqueta}>Salida</span>
            <span className={styles.infoValor}>{form.fechaSalida}</span>
          </div>

          {noches > 0 && (
            <div className={styles.nochesChip}>
              <Moon size={13} />
              {noches} {noches === 1 ? 'noche' : 'noches'}
            </div>
          )}

          <div className={styles.botonesRow}>
            <button className={styles.btnEditar} onClick={() => setEditando(true)}>
              <Edit3 size={14} /> Editar
            </button>
            <button className={styles.btnSalir} onClick={handleSalir}>
              <LogOut size={14} /> Salir
            </button>
          </div>
        </div>
      )}

      {/* Formulario */}
      {mostrarForm && (
        <div className={styles.card}>
          <div className={styles.campo}>
            <label className={styles.label}>Nombre completo</label>
            <input
              className={styles.input}
              type="text"
              name="nombre"
              placeholder="Ej: Juan Pérez"
              value={form.nombre}
              onChange={handleChange}
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Número de habitación</label>
            <input
              className={styles.input}
              type="text"
              name="habitacion"
              placeholder="Ej: 101"
              value={form.habitacion}
              onChange={handleChange}
            />
          </div>

          <div className={styles.camposFila}>
            <div className={styles.campo}>
              <label className={styles.label}>Entrada</label>
              <input
                className={styles.input}
                type="date"
                name="fechaEntrada"
                value={form.fechaEntrada}
                onChange={handleChange}
              />
            </div>
            <div className={styles.campo}>
              <label className={styles.label}>Salida</label>
              <input
                className={styles.input}
                type="date"
                name="fechaSalida"
                value={form.fechaSalida}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <p className={styles.errorMsg}>{error}</p>}

          <button className={styles.btnGuardar} onClick={handleGuardar}>
            <Save size={16} />
            {editando ? 'Actualizar datos' : 'Guardar y entrar'}
          </button>

          {editando && (
            <button className={styles.btnCancelar} onClick={() => setEditando(false)}>
              Cancelar
            </button>
          )}
        </div>
      )}

      {/* Tips */}
      {guardado && !editando && (
        <div className={styles.tips}>
          <p className={styles.tipsTitle}>🌿 Tips de Monteverde</p>
          <p>• Temperatura promedio 17°C — llevá chaqueta</p>
          <p>• El bosque nuboso es más activo en la mañana</p>
          <p>• Desayuno: 7am a 9am en el restaurante</p>
          <p>• Recepción disponible las 24 horas (ext. 0)</p>
        </div>
      )}
    </div>
  )
}
