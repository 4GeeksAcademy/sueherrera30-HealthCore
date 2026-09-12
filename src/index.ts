import { Paciente, Cita, Reclamacion } from './types/models';
import { buscarPacientePorNombre, buscarIndicePacientePorId } from './utils/search';
import { validarReclamacionEEUU } from './utils/validations';
import { filtrarCitasPorEstado } from './utils/collections';
import { calcularTasaNoShows, sumarPerdidasPorRechazos } from './utils/transformations';

// Datos de prueba (Mocks)
const pacientesMock: Paciente[] = [
  { id: 'PAC-001', nombreCompleto: 'Juan Pérez', jurisdiccion: 'HIPAA' },
  { id: 'PAC-002', nombreCompleto: 'Ana Smith', jurisdiccion: 'UK_GDPR' },
  { id: 'PAC-003', nombreCompleto: 'Carlos Ruiz', jurisdiccion: 'HIPAA' }
];

const citasMock: Cita[] = [
  { id: 'CIT-1', pacienteId: 'PAC-001', clinicaId: 'US-01', fecha: new Date(), estado: 'completada' },
  { id: 'CIT-2', pacienteId: 'PAC-002', clinicaId: 'UK-01', fecha: new Date(), estado: 'no-show' },
  { id: 'CIT-3', pacienteId: 'PAC-003', clinicaId: 'US-02', fecha: new Date(), estado: 'no-show' }
];

const reclamacionesMock: Reclamacion[] = [
  { id: 'REC-1', monto: 1500, estado: 'rechazada', pais: 'EEUU', codigosFacturacion: [] },
  { id: 'REC-2', monto: 800, estado: 'rechazada', pais: 'EEUU', codigosFacturacion: ['A001'] }
];

// pruebas
//  si quiere probar en local, correr -> npx tsx src/index.ts
console.log("Iniciando pruebas de HealthCore...");

console.log("Búsqueda lineal (Sue):", buscarPacientePorNombre(pacientesMock, 'Sue'));
console.log("Búsqueda binaria (Índice de PAC-003):", buscarIndicePacientePorId(pacientesMock, 'PAC-003'));
console.log("Validación REC-1 (Sin códigos):", validarReclamacionEEUU(reclamacionesMock[0]));
console.log("Citas filtradas (no show):", filtrarCitasPorEstado(citasMock, 'no-show'));
console.log("Tasa de No-Shows (%):", calcularTasaNoShows(citasMock));
console.log("Pérdidas por rechazos ($):", sumarPerdidasPorRechazos(reclamacionesMock));