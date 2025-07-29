export interface Puesto {
  numero: number;
  estado: 'disponible' | 'vendido' | 'pagado';
  cliente?: string;
  telefono?: string;
  fechaVenta?: string;
  fechaPago?: string;
}

export interface Cliente {
  nombre: string;
  telefono?: string;
  puestos: number[];
  totalPuestos: number;
  totalPagado: number;
  totalPendiente: number;
}

export interface EstadisticasRifa {
  totalPuestos: number;
  puestosVendidos: number;
  puestosPagados: number;
  puestosDisponibles: number;
  dineroRecaudado: number;
  dineroPendiente: number;
  dineroTotal: number;
}