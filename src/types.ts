export interface HuespedData {
  nombre: string;
  habitacion: string;
  fechaEntrada: string;
  fechaSalida: string;
}

export type EstadoActividad = 'ninguno' | 'interesa' | 'hecha';

export interface Actividad {
  id: string;
  nombre: string;
  emoji: string;
  descripcion: string;
  estado: EstadoActividad;
}

export type Pantalla = 'registro' | 'actividades' | 'info' | 'solicitudes' | 'mapa';

export interface ClimaData {
  temperatura: number;
  codigoClima: number;
  loading: boolean;
  error: boolean;
}

export interface CategoriasSolicitud {
  id: string;
  titulo: string;
  emoji: string;
  servicios: string[];
}
