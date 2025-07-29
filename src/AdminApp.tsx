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
import { AdminNavigation } from './components/AdminNavigation';
import { useRifa } from './hooks/useRifa';

export function AdminApp() {
  const {
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
    PRECIO_PUESTO
  } = useRifa();

  const [activeTab, setActiveTab] = useState<'puestos' | 'clientes' | 'estadisticas' | 'data'>('puestos');
  const [modalPuesto, setModalPuesto] = useState<number | null>(null);

  const puestoSeleccionado = modalPuesto !== null ? puestos.find(p => p.numero === modalPuesto) : null;

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
        <TablaClientes 
          clientes={clientes} 
          preciosPuesto={PRECIO_PUESTO}
          onUpdateCliente={actualizarCliente}
          onMarcarPagado={marcarClientePagado}
        />
      )}
      
      {activeTab === 'estadisticas' && (
        <div className="p-6">
          <AdvancedStats puestos={puestos} preciosPuesto={PRECIO_PUESTO} />
        </div>
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
        clientesCompletos={clientesCompletos}
        preciosPuesto={PRECIO_PUESTO}
      />

      <BarraSeleccionMultiple
        puestosSeleccionados={puestosSeleccionados}
        puestos={puestos}
        onLimpiarSeleccion={limpiarSeleccion}
        onActualizarMultiples={actualizarPuestosMultiples}
        nombresClientes={nombresClientes}
        clientesCompletos={clientesCompletos}
      />
      
      <AdminNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}