import React, { useState } from 'react';
import { Header } from './components/Header';
import { PublicStats } from './components/PublicStats';
import { PublicGridPuestos } from './components/PublicGridPuestos';
import { useRifa } from './hooks/useRifa';

export function PublicApp() {
  const {
    puestos,
    estadisticas
  } = useRifa();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <PublicStats estadisticas={estadisticas} />
      <PublicGridPuestos puestos={puestos} />
    </div>
  );
}