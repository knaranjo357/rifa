import React from 'react';
import { Phone, Gift, Crown, MessageCircle } from 'lucide-react';
import { WhatsAppLink } from './WhatsAppLink';

export function Header() {
  return (
    <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center opacity-5"></div>
      <div className="relative p-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-2xl shadow-lg">
              <Crown size={32} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Rifa María Gómez
            </h1>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 inline-block mb-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Phone size={18} className="text-green-400" />
              <span className="text-lg font-medium">317 696 4215</span>
            </div>
            <WhatsAppLink 
              phoneNumber="3176964215" 
              message="Hola María, me interesa participar en la rifa"
              className="bg-green-600 hover:bg-green-700 shadow-lg"
            >
              <MessageCircle size={16} />
              Contactar por WhatsApp
            </WhatsAppLink>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-yellow-300">
              <Gift size={20} />
              <span className="font-semibold text-xl">Premio: Cafetera Premium</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              $5,000 por puesto
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}