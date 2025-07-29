import React, { useState, useEffect } from 'react';
import { X, User, Phone, Calendar, DollarSign, CheckCircle } from 'lucide-react';
import { Puesto } from '../types';
import { WhatsAppLink } from './WhatsAppLink';

interface ModalPuestoProps {
  puesto: Puesto | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (numero: number, datos: Partial<Puesto>) => void;
  nombresClientes: string[];
  preciosPuesto: number;
}

export function ModalPuesto({ 
  puesto, 
  isOpen, 
  onClose, 
  onSave, 
  nombresClientes, 
  preciosPuesto 
}: ModalPuestoProps) {
  const [cliente, setCliente] = useState('');
  const [telefono, setTelefono] = useState('');
  const [estado, setEstado] = useState<'disponible' | 'vendido' | 'pagado'>('disponible');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (puesto) {
      setCliente(puesto.cliente || '');
      setTelefono(puesto.telefono || '');
      setEstado(puesto.estado);
    }
  }, [puesto]);

  const filteredSuggestions = nombresClientes.filter(nombre =>
    nombre.toLowerCase().includes(cliente.toLowerCase()) && nombre !== cliente
  );

  const handleSave = () => {
    if (!puesto) return;
    
    const datos: Partial<Puesto> = {
      estado,
      cliente: cliente.trim() || undefined,
      telefono: telefono.trim() || undefined,
    };

    onSave(puesto.numero, datos);
    onClose();
  };

  const formatearFecha = (fechaString?: string) => {
    if (!fechaString) return 'No registrada';
    return new Date(fechaString).toLocaleString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen || !puesto) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Puesto #{puesto.numero}</h2>
              <p className="text-purple-100">Gestionar información del puesto</p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">
              <User size={16} className="inline mr-2" />
              Cliente
            </label>
            <div className="relative">
              <input
                type="text"
                value={cliente}
                onChange={(e) => {
                  setCliente(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
                placeholder="Nombre del cliente"
              />
              
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-10 max-h-40 overflow-y-auto mt-1">
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
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">
              <Phone size={16} className="inline mr-2" />
              Teléfono
            </label>
            <div className="flex gap-3">
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
                placeholder="Número de teléfono"
              />
              {telefono && (
                <WhatsAppLink 
                  phoneNumber={telefono} 
                  message={`Hola ${cliente || 'Cliente'}, me comunico por el puesto #${puesto.numero} de la rifa.`}
                  className="shadow-lg hover:shadow-xl px-4 py-2"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">Estado</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value as any)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
            >
              <option value="disponible">Disponible</option>
              <option value="vendido">Vendido</option>
              <option value="pagado">Pagado</option>
            </select>
          </div>

          {puesto.estado !== 'disponible' && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 space-y-3">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" />
                Historial de transacciones
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm bg-white rounded-xl p-3 shadow-sm">
                  <Calendar size={16} className="text-blue-600" />
                  <span className="font-medium text-gray-700">Fecha de venta:</span>
                  <span className="text-gray-900">{formatearFecha(puesto.fechaVenta)}</span>
                </div>
                
                {puesto.estado === 'pagado' && (
                  <div className="flex items-center gap-3 text-sm bg-white rounded-xl p-3 shadow-sm">
                    <DollarSign size={16} className="text-green-600" />
                    <span className="font-medium text-gray-700">Fecha de pago:</span>
                    <span className="text-gray-900">{formatearFecha(puesto.fechaPago)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-4 px-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-4 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-[1.02] transition-all shadow-lg"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}