const fs = require('fs');
const { get } = require('http');

const getCurrentTime = () => {
  const now = new Date();

  // Configurar opciones para obtener la fecha y hora en la zona horaria de Bogotá
  const options = {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  // Obtener la fecha y hora en la zona horaria de Bogotá
  const dateTime = now.toLocaleString('en-US', options);

  return dateTime;
};

module.exports = { getCurrentTime };
