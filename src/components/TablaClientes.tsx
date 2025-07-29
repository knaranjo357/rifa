import React, { useState } from 'react';
import { Search, Phone, DollarSign, Hash, User } from 'lucide-react';
import { Cliente } from '../types';
import { WhatsAppLink } from './WhatsAppLink';
import { RAFFLE_CONFIG } from '../config';

interface TablaClientesProps {
  clientes: Cliente[];
  preciosPuesto: number;
}

export function TablaClientes({ clientes, preciosPuesto }: TablaClientesProps) {
  const [filtro, setFiltro] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'pendientes' | 'pagados'>('todos');

  const formatearDinero = (cantidad: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(cantidad);
  };

  const clientesFiltrados = clientes.filter(cliente => {
    const coincideNombre = cliente.nombre.toLowerCase().includes(filtro.toLowerCase());
    
    if (filtroEstado === 'pendientes') {
      return coincideNombre && cliente.totalPendiente > 0;
    }
    if (filtroEstado === 'pagados') {
      return coincideNombre && cliente.totalPendiente === 0;
    }
    
    return coincideNombre;
  });

  const getWhatsAppMessage = (cliente: Cliente) => {
    if (cliente.totalPendiente > 0) {
      return RAFFLE_CONFIG.mensajes.pendiente(
        cliente.nombre,
        cliente.puestos,
        RAFFLE_CONFIG.rifa.fechaJuego,
        RAFFLE_CONFIG.encargado.nequi
      );
    } else {
      return RAFFLE_CONFIG.mensajes.pagado(
        cliente.nombre,
        cliente.puestos,
        RAFFLE_CONFIG.rifa.fechaJuego,
        RAFFLE_CONFIG.rifa.premio,
        RAFFLE_CONFIG.rifa.jueganCon
      );
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-2xl shadow-lg">
            <User className="text-white" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Clientes</h3>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              placeholder="Buscar cliente..."
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-lg"
            />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setFiltroEstado('todos')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all shadow-lg ${
                filtroEstado === 'todos' 
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-purple-500/25' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Todos ({clientes.length})
            </button>
            <button
              onClick={() => setFiltroEstado('pendientes')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all shadow-lg ${
                filtroEstado === 'pendientes' 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-500/25' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Pendientes ({clientes.filter(c => c.totalPendiente > 0).length})
            </button>
            <button
              onClick={() => setFiltroEstado('pagados')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all shadow-lg ${
                filtroEstado === 'pagados' 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-500/25' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Pagados ({clientes.filter(c => c.totalPendiente === 0).length})
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {clientesFiltrados.map((cliente) => (
          <div key={cliente.nombre} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{cliente.nombre}</h4>
                {cliente.telefono && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={16} />
                      <span className="font-medium">{cliente.telefono}</span>
                    </div>
                    <WhatsAppLink 
                      phoneNumber={cliente.telefono} 
                      message={getWhatsAppMessage(cliente)}
                      className="shadow-lg hover:shadow-xl"
                    />
                  </div>
                )}
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                cliente.totalPendiente > 0 
                  ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' 
                  : 'bg-gradient-to-r from-green-400 to-green-500 text-white'
              }`}>
                {cliente.totalPendiente > 0 ? 'Pendiente' : 'Pagado'}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <Hash size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-600 font-medium">Puestos</div>
                    <div className="text-xl font-bold text-blue-800">{cliente.totalPuestos}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <DollarSign size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-green-600 font-medium">Total</div>
                    <div className="text-xl font-bold text-green-800">
                      {formatearDinero(cliente.totalPagado + cliente.totalPendiente)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {cliente.totalPendiente > 0 && (
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-orange-500 p-2 rounded-lg">
                    <DollarSign size={16} className="text-white" />
                  </div>
                  <div>
                    <span className="text-orange-800 font-semibold">
                      Pendiente de cobro: {formatearDinero(cliente.totalPendiente)}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 font-medium mb-2">Números asignados:</div>
              <div className="flex flex-wrap gap-2">
                {cliente.puestos.sort((a, b) => a - b).map(numero => (
                  <span 
                    key={numero} 
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg text-sm font-semibold"
                  >
                    {numero}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        {clientesFiltrados.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <User className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-500 text-lg">No se encontraron clientes</p>
          </div>
        )}
      </div>
    </div>
  );
}