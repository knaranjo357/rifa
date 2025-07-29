import React from 'react';
import { Puesto } from '../types';

interface PublicGridPuestosProps {
  puestos: Puesto[];
}

export function PublicGridPuestos({ puestos }: PublicGridPuestosProps) {
  const getColorPuesto = (puesto: Puesto) => {
    switch (puesto.estado) {
      case 'pagado':
        return 'bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-500 text-white shadow-lg';
      case 'vendido':
        return 'bg-gradient-to-br from-amber-400 to-amber-600 border-amber-500 text-white shadow-lg';
      default:
        return 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 text-gray-700 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer';
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="grid grid-cols-10 gap-2 mb-6">
        {puestos.map((puesto) => (
          <div
            key={puesto.numero}
            className={`
              aspect-square rounded-xl border-2 transition-all duration-300 
              flex items-center justify-center text-sm font-bold
              ${getColorPuesto(puesto)}
            `}
          >
            {puesto.numero.toString().padStart(2, '0')}
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-2xl p-4 shadow-xl border">
        <h4 className="font-semibold text-gray-800 mb-3 text-center">Estado de los Puestos</h4>
        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-lg shadow-sm"></div>
            <span className="font-medium text-gray-700">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-600 border border-amber-500 rounded-lg shadow-sm"></div>
            <span className="font-medium text-gray-700">Reservado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-600 border border-emerald-500 rounded-lg shadow-sm"></div>
            <span className="font-medium text-gray-700">Vendido</span>
          </div>
        </div>
      </div>
    </div>
  );
}