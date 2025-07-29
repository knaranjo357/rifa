import { useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Puesto, Cliente, EstadisticasRifa } from '../types';
import { RAFFLE_CONFIG } from '../config';

export function useRifa() {
  const [puestos, setPuestos] = useLocalStorage<Puesto[]>('rifa-puestos', 
    Array.from({ length: 100 }, (_, i) => ({
      numero: i,
      estado: 'disponible' as const
    }))
  );

  const [puestosSeleccionados, setPuestosSeleccionados] = useState<number[]>([]);
  const [modoSeleccion, setModoSeleccion] = useState(false);

  const estadisticas = useMemo((): EstadisticasRifa => {
    const totalPuestos = puestos.length;
    const puestosVendidos = puestos.filter(p => p.estado === 'vendido' || p.estado === 'pagado').length;
    const puestosPagados = puestos.filter(p => p.estado === 'pagado').length;
    const puestosDisponibles = puestos.filter(p => p.estado === 'disponible').length;
    const dineroRecaudado = puestosPagados * RAFFLE_CONFIG.rifa.precioPuesto;
    const dineroPendiente = (puestosVendidos - puestosPagados) * RAFFLE_CONFIG.rifa.precioPuesto;
    const dineroTotal = puestosVendidos * RAFFLE_CONFIG.rifa.precioPuesto;

    return {
      totalPuestos,
      puestosVendidos,
      puestosPagados,
      puestosDisponibles,
      dineroRecaudado,
      dineroPendiente,
      dineroTotal
    };
  }, [puestos]);

  const clientes = useMemo((): Cliente[] => {
    const clientesMap = new Map<string, Cliente>();

    puestos.forEach(puesto => {
      if (puesto.cliente && (puesto.estado === 'vendido' || puesto.estado === 'pagado')) {
        const cliente = clientesMap.get(puesto.cliente) || {
          nombre: puesto.cliente,
          telefono: puesto.telefono,
          puestos: [],
          totalPuestos: 0,
          totalPagado: 0,
          totalPendiente: 0
        };

        cliente.puestos.push(puesto.numero);
        cliente.totalPuestos++;
        
        if (puesto.estado === 'pagado') {
          cliente.totalPagado += RAFFLE_CONFIG.rifa.precioPuesto;
        } else {
          cliente.totalPendiente += RAFFLE_CONFIG.rifa.precioPuesto;
        }

        clientesMap.set(puesto.cliente, cliente);
      }
    });

    return Array.from(clientesMap.values()).sort((a, b) => a.nombre.localeCompare(b.nombre));
  }, [puestos]);

  const nombresClientes = useMemo(() => {
    return Array.from(new Set(clientes.map(c => c.nombre))).sort();
  }, [clientes]);

  const clientesCompletos = useMemo(() => {
    return clientes.map(c => ({ nombre: c.nombre, telefono: c.telefono }));
  }, [clientes]);

  const actualizarCliente = useCallback((nombreAnterior: string, nuevoNombre: string, nuevoTelefono?: string) => {
    setPuestos(prevPuestos => 
      prevPuestos.map(puesto => {
        if (puesto.cliente === nombreAnterior) {
          return {
            ...puesto,
            cliente: nuevoNombre,
            telefono: nuevoTelefono
          };
        }
        return puesto;
      })
    );
  }, [setPuestos]);

  const marcarClientePagado = useCallback((nombreCliente: string) => {
    setPuestos(prevPuestos => 
      prevPuestos.map(puesto => {
        if (puesto.cliente === nombreCliente && puesto.estado === 'vendido') {
          return {
            ...puesto,
            estado: 'pagado' as const,
            fechaPago: new Date().toISOString()
          };
        }
        return puesto;
      })
    );
  }, [setPuestos]);

  const actualizarPuesto = useCallback((numero: number, datos: Partial<Puesto>) => {
    setPuestos(prevPuestos => 
      prevPuestos.map(puesto => {
        if (puesto.numero === numero) {
          const nuevosDatos = { ...puesto, ...datos };
          
          if (datos.estado === 'vendido' && puesto.estado === 'disponible') {
            nuevosDatos.fechaVenta = new Date().toISOString();
          }
          if (datos.estado === 'pagado' && puesto.estado === 'vendido') {
            nuevosDatos.fechaPago = new Date().toISOString();
          }
          if (datos.estado === 'disponible') {
            nuevosDatos.cliente = undefined;
            nuevosDatos.telefono = undefined;
            nuevosDatos.fechaVenta = undefined;
            nuevosDatos.fechaPago = undefined;
          }
          
          return nuevosDatos;
        }
        return puesto;
      })
    );
  }, [setPuestos]);

  const actualizarPuestosMultiples = useCallback((numeros: number[], datos: Partial<Puesto>) => {
    setPuestos(prevPuestos => 
      prevPuestos.map(puesto => {
        if (numeros.includes(puesto.numero)) {
          const nuevosDatos = { ...puesto, ...datos };
          
          if (datos.estado === 'vendido' && puesto.estado === 'disponible') {
            nuevosDatos.fechaVenta = new Date().toISOString();
          }
          if (datos.estado === 'pagado' && puesto.estado === 'vendido') {
            nuevosDatos.fechaPago = new Date().toISOString();
          }
          if (datos.estado === 'disponible') {
            nuevosDatos.cliente = undefined;
            nuevosDatos.telefono = undefined;
            nuevosDatos.fechaVenta = undefined;
            nuevosDatos.fechaPago = undefined;
          }
          
          return nuevosDatos;
        }
        return puesto;
      })
    );
  }, [setPuestos]);

  const toggleSeleccionPuesto = useCallback((numero: number) => {
    setPuestosSeleccionados(prev => 
      prev.includes(numero) 
        ? prev.filter(n => n !== numero)
        : [...prev, numero]
    );
  }, []);

  const limpiarSeleccion = useCallback(() => {
    setPuestosSeleccionados([]);
    setModoSeleccion(false);
  }, []);

  return {
    puestos,
    estadisticas,
    clientes,
    nombresClientes,
    clientesCompletos,
    puestosSeleccionados,
    modoSeleccion,
    actualizarPuesto,
    actualizarCliente,
    marcarClientePagado,
    actualizarPuestosMultiples,
    toggleSeleccionPuesto,
    limpiarSeleccion,
    setModoSeleccion,
    setPuestos,
    PRECIO_PUESTO: RAFFLE_CONFIG.rifa.precioPuesto
  };
}