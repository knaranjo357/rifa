import React, { useState } from 'react';
import { AdminHeader } from './components/admin/AdminHeader';
import { AdvancedStats } from './components/admin/AdvancedStats';
import { DataManager } from './components/admin/DataManager';
import { Estadisticas } from './components/Estadisticas';
import { GridPuestos } from './components/GridPuestos';
import { ModalPuesto } from './components/ModalPuesto';
import { TablaClientes } from './components/TablaClientes';
import { BotonSeleccionMultiple } from './components/BotonSeleccionMultiple';
import { BarraSeleccionMultiple } from './components/BarraSeleccionMultiple';
import { BarChart3, Users, Grid3X3, Database } from 'lucide-react';
import { useRifa } from './hooks/useRifa';

export function AdminApp() {
  const {
    puestos,
    estadisticas,
    clientes,
    nombresClientes,
    puestosSeleccionados,
    modoSeleccion,
    actualizarPuesto,
    actualizarPuestosMultiples,
    toggleSeleccionPuesto,
    limpiarSeleccion,
    setModoSeleccion,
    setPuestos,
    PRECIO_PUESTO
  } = useRifa();

  const [activeTab, setActiveTab] = useState<'puestos' | 'clientes' | 'estadisticas' | 'data'>('estadisticas');
  const [modalPuesto, setModalPuesto] = useState<number | null>(null);

  const puestoSeleccionado = modalPuesto !== null ? puestos[modalPuesto - 1] : null;

  const handlePuestoClick = (numero: number) => {
    setModalPuesto(numero);
  };

  const handleToggleModoSeleccion = () => {
    if (modoSeleccion) {
      limpiarSeleccion();
    } else {
      setModoSeleccion(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      <AdminHeader />
      
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('estadisticas')}
            className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'estadisticas' 
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' 
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <BarChart3 size={20} />
            Estadísticas Avanzadas
          </button>
          
          <button
            onClick={() => setActiveTab('puestos')}
            className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'puestos' 
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' 
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Grid3X3 size={20} />
            Gestión de Puestos
          </button>
          
          <button
            onClick={() => setActiveTab('clientes')}
            className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'clientes' 
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' 
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Users size={20} />
            Clientes
          </button>
          
          <button
            onClick={() => setActiveTab('data')}
            className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'data' 
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' 
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Database size={20} />
            Gestión de Datos
          </button>
        </div>
      </div>

      {activeTab === 'estadisticas' && (
        <div className="p-6">
          <AdvancedStats puestos={puestos} preciosPuesto={PRECIO_PUESTO} />
        </div>
      )}
      
      {activeTab === 'puestos' && (
        <>
          <Estadisticas estadisticas={estadisticas} />
          <BotonSeleccionMultiple
            modoSeleccion={modoSeleccion}
            cantidadSeleccionados={puestosSeleccionados.length}
            onToggleModo={handleToggleModoSeleccion}
          />
          <GridPuestos
            puestos={puestos}
            puestosSeleccionados={puestosSeleccionados}
            modoSeleccion={modoSeleccion}
            onPuestoClick={handlePuestoClick}
            onToggleSeleccion={toggleSeleccionPuesto}
          />
        </>
      )}

      {activeTab === 'clientes' && (
        <TablaClientes clientes={clientes} preciosPuesto={PRECIO_PUESTO} />
      )}

      {activeTab === 'data' && (
        <div className="p-6">
          <DataManager puestos={puestos} onImportData={setPuestos} />
        </div>
      )}

      <ModalPuesto
        puesto={puestoSeleccionado}
        isOpen={modalPuesto !== null}
        onClose={() => setModalPuesto(null)}
        onSave={actualizarPuesto}
        nombresClientes={nombresClientes}
        preciosPuesto={PRECIO_PUESTO}
      />

      <BarraSeleccionMultiple
        puestosSeleccionados={puestosSeleccionados}
        puestos={puestos}
        onLimpiarSeleccion={limpiarSeleccion}
        onActualizarMultiples={actualizarPuestosMultiples}
        nombresClientes={nombresClientes}
      />
    </div>
  );
}