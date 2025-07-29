import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppLinkProps {
  phoneNumber: string;
  message?: string;
  className?: string;
  children?: React.ReactNode;
}

export function WhatsAppLink({ phoneNumber, message, className = '', children }: WhatsAppLinkProps) {
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 10 && !cleaned.startsWith('57')) {
      return `57${cleaned}`;
    }
    
    return cleaned;
  };

  const defaultMessage = message || 'Hola, me comunico por el puesto de la rifa.';
  const formattedPhone = formatPhoneNumber(phoneNumber);
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg transition-colors text-sm font-medium ${className}`}
    >
      <MessageCircle size={16} />
      {children || phoneNumber}
    </a>
  );
}