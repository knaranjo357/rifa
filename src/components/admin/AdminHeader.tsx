import React from 'react';
import { Crown, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function AdminHeader() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-800 text-white shadow-2xl">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-2xl shadow-lg">
              <Crown size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Panel Administrativo</h1>
              <p className="text-purple-200">Gestión completa de rifas</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <User size={20} />
              <span className="font-medium">{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 px-4 py-2 rounded-full transition-colors"
            >
              <LogOut size={20} />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}