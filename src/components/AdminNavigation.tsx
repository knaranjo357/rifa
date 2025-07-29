import React from 'react';
import { Grid3X3, Users, BarChart3, Database } from 'lucide-react';

interface AdminNavigationProps {
  activeTab: 'puestos' | 'clientes' | 'estadisticas' | 'data';
  onTabChange: (tab: 'puestos' | 'clientes' | 'estadisticas' | 'data') => void;
}

export function AdminNavigation({ activeTab, onTabChange }: AdminNavigationProps) {
  return (
    <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200 fixed bottom-0 left-0 right-0 z-30 shadow-2xl">
      <div className="grid grid-cols-4">
        <button
          onClick={() => onTabChange('puestos')}
          className={`py-4 px-4 flex flex-col items-center gap-2 transition-all ${
            activeTab === 'puestos' 
              ? 'text-purple-600 bg-gradient-to-t from-purple-50 to-transparent transform scale-105' 
              : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
          }`}
        >
          <div className={`p-2 rounded-xl transition-all ${
            activeTab === 'puestos' 
              ? 'bg-purple-100 shadow-lg' 
              : 'hover:bg-gray-100'
          }`}>
            <Grid3X3 size={22} />
          </div>
          <span className="text-xs font-semibold">Puestos</span>
        </button>
        
        <button
          onClick={() => onTabChange('clientes')}
          className={`py-4 px-4 flex flex-col items-center gap-2 transition-all ${
            activeTab === 'clientes' 
              ? 'text-purple-600 bg-gradient-to-t from-purple-50 to-transparent transform scale-105' 
              : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
          }`}
        >
          <div className={`p-2 rounded-xl transition-all ${
            activeTab === 'clientes' 
              ? 'bg-purple-100 shadow-lg' 
              : 'hover:bg-gray-100'
          }`}>
            <Users size={22} />
          </div>
          <span className="text-xs font-semibold">Clientes</span>
        </button>
        
        <button
          onClick={() => onTabChange('estadisticas')}
          className={`py-4 px-4 flex flex-col items-center gap-2 transition-all ${
            activeTab === 'estadisticas' 
              ? 'text-purple-600 bg-gradient-to-t from-purple-50 to-transparent transform scale-105' 
              : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
          }`}
        >
          <div className={`p-2 rounded-xl transition-all ${
            activeTab === 'estadisticas' 
              ? 'bg-purple-100 shadow-lg' 
              : 'hover:bg-gray-100'
          }`}>
            <BarChart3 size={22} />
          </div>
          <span className="text-xs font-semibold">Estadísticas</span>
        </button>
        
        <button
          onClick={() => onTabChange('data')}
          className={`py-4 px-4 flex flex-col items-center gap-2 transition-all ${
            activeTab === 'data' 
              ? 'text-purple-600 bg-gradient-to-t from-purple-50 to-transparent transform scale-105' 
              : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
          }`}
        >
          <div className={`p-2 rounded-xl transition-all ${
            activeTab === 'data' 
              ? 'bg-purple-100 shadow-lg' 
              : 'hover:bg-gray-100'
          }`}>
            <Database size={22} />
          </div>
          <span className="text-xs font-semibold">Datos</span>
        </button>
      </div>
    </div>
  );
}