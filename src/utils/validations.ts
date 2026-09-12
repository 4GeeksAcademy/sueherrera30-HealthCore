import { Reclamacion, Cita } from '../types/models';

export const validarReclamacionEEUU = (reclamacion: Reclamacion): boolean => {
  if (reclamacion.pais !== 'EEUU') return true; 
  return reclamacion.codigosFacturacion.length > 0;
};

export const validarFechaCita = (cita: Cita): boolean => {
  const hoy = new Date();
  if (cita.estado === 'pendiente' && cita.fecha < hoy) {
    return false;
  }
  return true;
};