import React, { useState } from 'react';
import { X, Users, Check, DollarSign, Sparkles } from 'lucide-react';
import { Puesto } from '../types';

interface BarraSeleccionMultipleProps {
  puestosSeleccionados: number[];
  puestos: Puesto[];
  onLimpiarSeleccion: () => void;
  onActualizarMultiples: (numeros: number[], datos: Partial<Puesto>) => void;
  nombresClientes: string[];
}

export function BarraSeleccionMultiple({
  puestosSeleccionados,
  puestos,
  onLimpiarSeleccion,
  onActualizarMultiples,
  nombresClientes
}: BarraSeleccionMultipleProps) {
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [cliente, setCliente] = useState('');
  const [telefono, setTelefono] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const puestosData = puestos.filter(p => puestosSeleccionados.includes(p.numero));
  const estadosDisponibles = getEstadosDisponibles(puestosData);

  const filteredSuggestions = nombresClientes.filter(nombre =>
    nombre.toLowerCase().includes(cliente.toLowerCase()) && nombre !== cliente
  );

  function getEstadosDisponibles(puestosData: Puesto[]) {
    const estados = puestosData.map(p => p.estado);
    const todosSonDisponibles = estados.every(e => e === 'disponible');
    const todosSonVendidos = estados.every(e => e === 'vendido');
    const hayVendidos = estados.some(e => e === 'vendido');
    
    if (todosSonDisponibles) {
      return ['vendido'];
    }
    if (todosSonVendidos) {
      return ['pagado', 'disponible'];
    }
    if (hayVendidos) {
      return ['pagado'];
    }
    return [];
  }

  const asignarCliente = () => {
    if (!cliente.trim()) return;
    
    onActualizarMultiples(puestosSeleccionados, {
      cliente: cliente.trim(),
      telefono: telefono.trim() || undefined,
      estado: 'vendido'
    });
    
    setCliente('');
    setTelefono('');
    setMostrarOpciones(false);
    onLimpiarSeleccion();
  };

  const cambiarEstado = (nuevoEstado: 'disponible' | 'vendido' | 'pagado') => {
    const datos: Partial<Puesto> = { estado: nuevoEstado };
    
    if (nuevoEstado === 'disponible') {
      datos.cliente = undefined;
      datos.telefono = undefined;
    }
    
    onActualizarMultiples(puestosSeleccionados, datos);
    onLimpiarSeleccion();
  };

  if (puestosSeleccionados.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl z-40">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-2xl shadow-lg">
              <Users className="text-white" size={24} />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-lg flex items-center gap-2">
                {puestosSeleccionados.length} puestos seleccionados
                <Sparkles className="text-purple-500" size={18} />
              </div>
              <div className="text-sm text-gray-600">
                Números: {puestosSeleccionados.sort((a, b) => a - b).map(n => n.toString().padStart(2, '0')).join(', ')}
              </div>
            </div>
          </div>
          <button
            onClick={onLimpiarSeleccion}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {!mostrarOpciones ? (
          <div className="flex gap-3">
            <button
              onClick={() => setMostrarOpciones(true)}
              className="flex-1 py-4 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
            >
              <Users size={20} />
              Asignar Cliente
            </button>
            
            {estadosDisponibles.map(estado => (
              <button
                key={estado}
                onClick={() => cambiarEstado(estado)}
                className={`py-4 px-4 rounded-2xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all ${
                  estado === 'pagado' 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
                  estado === 'vendido' 
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white' :
                    'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                }`}
              >
                {estado === 'pagado' ? <DollarSign size={20} /> : <Check size={20} />}
                <span className="hidden sm:inline">
                  {estado === 'pagado' ? 'Pagado' : estado === 'vendido' ? 'Vendido' : 'Disponible'}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={cliente}
                onChange={(e) => {
                  setCliente(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Nombre del cliente"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
              />
              
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute bottom-full left-0 right-0 bg-white border-2 border-gray-200 rounded-xl shadow-xl mb-2 max-h-32 overflow-y-auto">
                  {filteredSuggestions.map((nombre) => (
                    <button
                      key={nombre}
                      onClick={() => {
                        setCliente(nombre);
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left p-3 hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      {nombre}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Teléfono (opcional)"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => setMostrarOpciones(false)}
                className="flex-1 py-4 px-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
              >
                Cancelar
              </button>
              <button
                onClick={asignarCliente}
                disabled={!cliente.trim()}
                className="flex-1 py-4 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
              >
                Asignar Cliente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}