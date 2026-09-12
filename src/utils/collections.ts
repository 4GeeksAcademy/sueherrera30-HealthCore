import { Cita, Reclamacion } from '../types/models';

export const filtrarCitasPorEstado = (citas: Cita[], estadoBuscado: Cita['estado']): Cita[] => {
  if (citas.length === 0) return [];
  return citas.filter((cita) => cita.estado === estadoBuscado);
};
export const ordenarReclamacionesPorMonto = (
  reclamaciones: Reclamacion[],
  orden: 'asc' | 'desc'
): Reclamacion[] => {
  if (reclamaciones.length === 0) return [];
  
  return [...reclamaciones].sort((a, b) => {
    return orden === 'asc' ? a.monto - b.monto : b.monto - a.monto;
  });
};