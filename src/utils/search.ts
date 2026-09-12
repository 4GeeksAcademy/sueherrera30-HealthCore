import { Paciente } from '../types/models';

// lineal
export const buscarPacientePorNombre = (pacientes: Paciente[], nombreParcial: string): Paciente | null => {
  if (pacientes.length === 0) return null;
  const pacienteEncontrado = pacientes.find((p) => 
    p.nombreCompleto.toLowerCase().includes(nombreParcial.toLowerCase())
  );
  return pacienteEncontrado || null;
};

// binaria
export const buscarIndicePacientePorId = (pacientesOrdenados: Paciente[], idBuscado: string): number => {
  if (pacientesOrdenados.length === 0) return -1;

  let inicio = 0;
  let fin = pacientesOrdenados.length - 1;

  while (inicio <= fin) {
    const medio = Math.floor((inicio + fin) / 2);
    const pacienteMedio = pacientesOrdenados[medio];

    if (pacienteMedio.id === idBuscado) {
      return medio;
    }

    if (pacienteMedio.id < idBuscado) {
      inicio = medio + 1;
    } else {
      fin = medio - 1;
    }
  }

  return -1;
};