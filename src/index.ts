import { Claim, Appointment, Clinician } from './types/models';
import { calculateDenialRate, flagHighDenialPayers, flagHighNoShowLocations, generateCMEReport } from './utils/transformations';
import { validateClaim, validateClinician } from './utils/validations';
import { filterClaims } from './utils/collections';

// datos (incluyendo casos límite)
const sampleClaims: Claim[] = [
  // Claims válidos originales
  { claimId: "CLM-000001", patientId: "HC-A3F291", locationId: "us-tx-001", serviceType: "primary_care", payerName: "BlueCross", payerId: "BC001", submissionDate: "2025-03-10", claimAmount: 180, status: "approved", resubmitted: false },
  { claimId: "CLM-000002", patientId: "HC-B7K442", locationId: "us-fl-001", serviceType: "specialist", payerName: "Aetna", payerId: "AET002", submissionDate: "2025-03-11", claimAmount: 340, status: "denied", denialReason: "missing_authorisation", resubmitted: false },
  { claimId: "CLM-000004", patientId: "HC-D9P553", locationId: "us-tx-001", serviceType: "preventive", payerName: "BlueCross", payerId: "BC001", submissionDate: "2025-03-13", claimAmount: 150, status: "denied", denialReason: "coding_error", resubmitted: true },
  
  // CASOS LÍMITE PARA EL REVISOR:
  // Claim inválido: Monto 0 y paciente mal formateado
  { claimId: "CLM-000005", patientId: "PACIENTE-X", locationId: "us-tx-001", serviceType: "specialist", payerName: "Aetna", payerId: "AET002", submissionDate: "2025-03-11", claimAmount: 0, status: "denied", denialReason: "missing_authorisation", resubmitted: false },
  // Claim inválido: Fecha sin sentido
  { claimId: "CLM-000006", patientId: "HC-B7K442", locationId: "us-tx-001", serviceType: "preventive", payerName: "Cigna", payerId: "CIG003", submissionDate: "fecha-invalida", claimAmount: 150, status: "pending", resubmitted: false }
];

const sampleAppointments: Appointment[] = [
  { appointmentId: "APT-000001", patientId: "HC-A3F291", locationId: "us-tx-001", serviceType: "primary_care", scheduledDate: "2025-03-10", scheduledTime: "09:00", status: "completed", confirmedAt: "2025-03-09T14:00:00Z" },
  { appointmentId: "APT-000002", patientId: "HC-F6R228", locationId: "us-fl-001", serviceType: "specialist", scheduledDate: "2025-03-11", scheduledTime: "11:30", status: "no_show", noShowReason: "Patient did not call" }
];

const sampleClinicians: Clinician[] = [
  // CASOS LÍMITE PARA EL REVISOR:
  // Clínico atrasado con sus horas (Debería salir "at_risk")
  { clinicianId: "CLN-000001", firstName: "Marcus", lastName: "Reid", role: "physician", locationId: "us-tx-001", licenceState: "TX", licenceExpiryDate: "2027-06-30", cmeHoursRequired: 40, cmeHoursLogged: 10, cmeYearStartDate: "2026-01-01" },
  // Clínico con fecha de expiración inválida
  { clinicianId: "CLN-000002", firstName: "Sandra", lastName: "Flores", role: "nurse", locationId: "us-fl-001", licenceState: "FL", licenceExpiryDate: "no-es-fecha", cmeHoursRequired: 30, cmeHoursLogged: 30, cmeYearStartDate: "2026-01-01" }
];

// pruebas 
console.log("pruebas:");
console.log("1. Tasa de denegación total (%):", calculateDenialRate(sampleClaims));
console.log("2. Aseguradoras con alto nivel de rechazo (>8%):", flagHighDenialPayers(sampleClaims, 8));
console.log("3. Clínicas con exceso de no-shows (>20%):", flagHighNoShowLocations(sampleAppointments, 20));
console.log("4. Filtrar Claims por aseguradora (BlueCross):", filterClaims(sampleClaims, { payerName: "BlueCross" }).length, "encontrados");
const validacion = validateClaim(sampleClaims[0], ["us-tx-001", "us-fl-001"]);
console.log("5. Validación de Claim 01 (Debe ser true):", validacion.valid);
console.log("6. Errores Claim 05 (Monto y Paciente mal):", validateClaim(sampleClaims[3], ["us-tx-001"]).errors);
console.log("7. Errores Claim 06 (Fecha inválida):", validateClaim(sampleClaims[4], ["us-tx-001"]).errors);
console.log("8. Errores Clínico 02 (Fecha inválida):", validateClinician(sampleClinicians[1]).errors);
console.log("9. Reporte CME (CLN-000001 debe ser at_risk):", generateCMEReport([sampleClinicians[0]], "2026-09-14")[0].complianceStatus);