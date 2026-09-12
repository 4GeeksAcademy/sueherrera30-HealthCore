import { Claim, Appointment } from './types/models';
import { calculateDenialRate, flagHighDenialPayers, flagHighNoShowLocations } from './utils/transformations';
import { validateClaim } from './utils/validations';
import { filterClaims } from './utils/collections';

// datos 
const sampleClaims: Claim[] = [
  { claimId: "CLM-000001", patientId: "HC-A3F291", locationId: "us-tx-001", serviceType: "primary_care", payerName: "BlueCross", payerId: "BC001", submissionDate: "2025-03-10", claimAmount: 180, status: "approved", resubmitted: false },
  { claimId: "CLM-000002", patientId: "HC-B7K442", locationId: "us-fl-001", serviceType: "specialist", payerName: "Aetna", payerId: "AET002", submissionDate: "2025-03-11", claimAmount: 340, status: "denied", denialReason: "missing_authorisation", resubmitted: false },
  { claimId: "CLM-000004", patientId: "HC-D9P553", locationId: "us-tx-001", serviceType: "preventive", payerName: "BlueCross", payerId: "BC001", submissionDate: "2025-03-13", claimAmount: 150, status: "denied", denialReason: "coding_error", resubmitted: true }
];

const sampleAppointments: Appointment[] = [
  { appointmentId: "APT-000001", patientId: "HC-A3F291", locationId: "us-tx-001", serviceType: "primary_care", scheduledDate: "2025-03-10", scheduledTime: "09:00", status: "completed", confirmedAt: "2025-03-09T14:00:00Z" },
  { appointmentId: "APT-000002", patientId: "HC-F6R228", locationId: "us-fl-001", serviceType: "specialist", scheduledDate: "2025-03-11", scheduledTime: "11:30", status: "no_show", noShowReason: "Patient did not call" }
];

// pruebas 
console.log("1. Tasa de denegación total (%):", calculateDenialRate(sampleClaims));
console.log("2. Aseguradoras con alto nivel de rechazo (>8%):", flagHighDenialPayers(sampleClaims, 8));
console.log("3. Clínicas con exceso de no-shows (>20%):", flagHighNoShowLocations(sampleAppointments, 20));
console.log("4. Filtrar Claims por aseguradora (BlueCross):", filterClaims(sampleClaims, { payerName: "BlueCross" }).length, "encontrados");
const validacion = validateClaim(sampleClaims[0], ["us-tx-001", "us-fl-001"]);
console.log("5. Validación de Claim 01 (Debe ser true):", validacion.valid);