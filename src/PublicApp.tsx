import React, { useState } from 'react';
import { Header } from './components/Header';
import { Estadisticas } from './components/Estadisticas';
import { GridPuestos } from './components/GridPuestos';
import { ModalPuesto } from './components/ModalPuesto';
import { TablaClientes } from './components/TablaClientes';
import { Navigation } from './components/Navigation';
import { BotonSeleccionMultiple } from './components/BotonSeleccionMultiple';
import { BarraSeleccionMultiple } from './components/BarraSeleccionMultiple';
import { useRifa } from './hooks/useRifa';

export function PublicApp() {
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
    PRECIO_PUESTO
  } = useRifa();

  const [activeTab, setActiveTab] = useState<'puestos' | 'clientes' | 'estadisticas'>('puestos');
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
      <Header />
      
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

      {activeTab === 'estadisticas' && (
        <Estadisticas estadisticas={estadisticas} />
      )}

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

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