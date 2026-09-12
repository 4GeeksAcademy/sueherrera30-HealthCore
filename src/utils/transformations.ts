import { Cita, Reclamacion } from '../types/models';

export const calcularTasaNoShows = (citas: Cita[]): number => {
  if (citas.length === 0) return 0;

  const cantidadNoShows = citas.filter((cita) => cita.estado === 'no-show').length;
  return (cantidadNoShows / citas.length) * 100;
};

export const sumarPerdidasPorRechazos = (reclamaciones: Reclamacion[]): number => {
  if (reclamaciones.length === 0) return 0;

  return reclamaciones
    .filter((rec) => rec.estado === 'rechazada')
    .reduce((acumulador, rec) => acumulador + rec.monto, 0);
};