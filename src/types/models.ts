export interface Paciente {
  id: string;
  nombreCompleto: string;
  jurisdiccion: 'HIPAA' | 'UK_GDPR';
}

export interface Cita {
  id: string;
  pacienteId: string;
  clinicaId: string;
  fecha: Date;
  estado: 'pendiente' | 'completada' | 'no-show'; 
}

export interface Reclamacion {
  id: string;
  monto: number;
  estado: 'aprobada' | 'rechazada' | 'pendiente';
  pais: 'EEUU' | 'UK';
  codigosFacturacion: string[];
}
