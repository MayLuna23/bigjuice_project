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

  // Obtener la fecha y hora en la zona horaria de Bogotá y formatearla a YYYY-MM-DD HH:mm
  const [date, time] = now.toLocaleString('en-US', options).split(', '); // Dividir la fecha y la hora
  const [month, day, year] = date.split('/'); // Dividir la fecha en sus componentes

  // Construir la fecha en el formato deseado
  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

  // Unir la fecha formateada y la hora
  const dateTime = `${formattedDate} ${time}`;
  // console.log(dateTime)
  return dateTime;
};
// console.log(getCurrentTime())
module.exports = { getCurrentTime };
