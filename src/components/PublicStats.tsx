import React from 'react';
import { TrendingUp, CheckCircle, Users } from 'lucide-react';
import { EstadisticasRifa } from '../types';

interface PublicStatsProps {
  estadisticas: EstadisticasRifa;
}

export function PublicStats({ estadisticas }: PublicStatsProps) {
  const porcentajeVendido = (estadisticas.puestosVendidos / 100) * 100;

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-xl">
              <TrendingUp size={20} />
            </div>
            <div>
              <span className="text-sm font-medium text-emerald-100">Vendidos</span>
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">
            {estadisticas.puestosVendidos}/100
          </div>
          <div className="text-xs text-emerald-100">
            {porcentajeVendido.toFixed(1)}% completado
          </div>
          <div className="mt-2 bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${porcentajeVendido}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-xl">
              <CheckCircle size={20} />
            </div>
            <div>
              <span className="text-sm font-medium text-blue-100">Confirmados</span>
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">
            {estadisticas.puestosPagados}
          </div>
          <div className="text-xs text-blue-100">
            Puestos pagados
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-xl">
              <Users size={20} />
            </div>
            <div>
              <span className="text-sm font-medium text-purple-100">Disponibles</span>
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">
            {estadisticas.puestosDisponibles}
          </div>
          <div className="text-xs text-purple-100">
            Puestos libres
          </div>
        </div>
      </div>
    </div>
  );
}