export const RAFFLE_CONFIG = {
  // Información del encargado
  encargado: {
    nombre: 'María Gómez',
    telefono: '3176964215',
    nequi: '3177313639'
  },
  
  // Configuración de la rifa
  rifa: {
    precioPuesto: 5000,
    fechaJuego: '22 de agosto de 2024',
    jueganCon: 'las 2 últimas cifras de la Lotería de Santander',
    premio: 'Cafetera'
  },
  
  // Mensajes de WhatsApp
  mensajes: {
    pendiente: (nombre: string, puestos: number[], fecha: string, nequi: string) => 
      `Hola ${nombre}, ¡espero que estés muy bien! 😊\n\n` +
      `Te escribo para recordarte sobre tu participación en la rifa que juega el ${fecha}.\n\n` +
      `Tienes ${puestos.length} puesto${puestos.length > 1 ? 's' : ''} reservado${puestos.length > 1 ? 's' : ''}: ${puestos.map(n => n.toString().padStart(2, '0')).join(', ')}\n\n` +
      `Para confirmar tu participación, por favor realiza la consignación de $${(puestos.length * 5000).toLocaleString()} a mi Nequi: ${nequi}\n\n` +
      `¡Muchas gracias por tu confianza! 🙏`,
    
    pagado: (nombre: string, puestos: number[], fecha: string, premio: string, jueganCon: string) =>
      `¡Hola ${nombre}! 🎉\n\n` +
      `¡Muchas gracias por tu participación en la rifa! Tu pago ha sido confirmado exitosamente.\n\n` +
      `📋 Detalles de tu participación:\n` +
      `• Puesto${puestos.length > 1 ? 's' : ''}: ${puestos.map(n => n.toString().padStart(2, '0')).join(', ')}\n` +
      `• Fecha del sorteo: ${fecha}\n` +
      `• Premio: ${premio}\n` +
      `• Juega con: ${jueganCon}\n\n` +
      `¡Te deseo muchísima suerte! 🍀✨\n\n` +
      `Estaré atenta el día del sorteo para comunicarte si eres el ganador. ¡Que tengas un excelente día! 😊`
  }
};