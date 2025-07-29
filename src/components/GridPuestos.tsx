import React from 'react';
import { Puesto } from '../types';

interface GridPuestosProps {
  puestos: Puesto[];
  puestosSeleccionados: number[];
  modoSeleccion: boolean;
  onPuestoClick: (numero: number) => void;
  onToggleSeleccion: (numero: number) => void;
}

export function GridPuestos({ 
  puestos, 
  puestosSeleccionados, 
  modoSeleccion, 
  onPuestoClick, 
  onToggleSeleccion 
}: GridPuestosProps) {
  const getColorPuesto = (puesto: Puesto) => {
    if (puestosSeleccionados.includes(puesto.numero)) {
      return 'bg-gradient-to-br from-indigo-400 to-indigo-600 border-indigo-500 text-white shadow-lg transform scale-105';
    }
    
    switch (puesto.estado) {
      case 'pagado':
        return 'bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-500 text-white shadow-lg hover:shadow-xl';
      case 'vendido':
        return 'bg-gradient-to-br from-amber-400 to-amber-600 border-amber-500 text-white shadow-lg hover:shadow-xl';
      default:
        return 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg';
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="grid grid-cols-10 gap-2 mb-6">
        {puestos.map((puesto) => (
          <button
            key={puesto.numero}
            className={`
              aspect-square rounded-xl border-2 transition-all duration-300 
              flex items-center justify-center text-sm font-bold
              active:scale-95 hover:scale-110 ${getColorPuesto(puesto)}
              ${modoSeleccion ? 'cursor-pointer' : 'cursor-pointer'}
            `}
            onClick={() => modoSeleccion ? onToggleSeleccion(puesto.numero) : onPuestoClick(puesto.numero)}
            style={{
              transform: puestosSeleccionados.includes(puesto.numero) ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {puesto.numero}
          </button>
        ))}
      </div>
      
      <div className="bg-white rounded-2xl p-4 shadow-xl border">
        <h4 className="font-semibold text-gray-800 mb-3 text-center">Leyenda</h4>
        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-lg shadow-sm"></div>
            <span className="font-medium text-gray-700">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-600 border border-amber-500 rounded-lg shadow-sm"></div>
            <span className="font-medium text-gray-700">Vendido</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-600 border border-emerald-500 rounded-lg shadow-sm"></div>
            <span className="font-medium text-gray-700">Pagado</span>
          </div>
        </div>
      </div>
    </div>
  );
}