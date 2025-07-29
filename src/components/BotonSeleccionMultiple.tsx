import React from 'react';
import { CheckSquare, Square, Sparkles } from 'lucide-react';

interface BotonSeleccionMultipleProps {
  modoSeleccion: boolean;
  cantidadSeleccionados: number;
  onToggleModo: () => void;
}

export function BotonSeleccionMultiple({ 
  modoSeleccion, 
  cantidadSeleccionados, 
  onToggleModo 
}: BotonSeleccionMultipleProps) {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <button
        onClick={onToggleModo}
        className={`w-full py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl ${
          modoSeleccion 
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/25' 
            : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
        }`}
      >
        {modoSeleccion ? (
          <>
            <CheckSquare size={24} />
            <Sparkles size={20} />
            <span>Seleccionando ({cantidadSeleccionados})</span>
          </>
        ) : (
          <>
            <Square size={24} />
            <span>Activar Selección Múltiple</span>
          </>
        )}
      </button>
    </div>
  );
}