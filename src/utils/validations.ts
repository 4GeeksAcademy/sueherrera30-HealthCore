import { Claim, Clinician } from '../types/models';

export const validateClaim = (
  claim: Claim,
  knownLocationIds: string[]
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (claim.claimAmount <= 0) errors.push("claimAmount must be > 0");
  if (new Date(claim.submissionDate) > new Date()) errors.push("submissionDate cannot be in the future");
  if (!knownLocationIds.includes(claim.locationId)) errors.push("locationId is unknown");
  if (claim.status === "denied" && !claim.denialReason) errors.push("denialReason required for denied claims");
  
  const patientIdRegex = /^HC-[a-zA-Z0-9]{6}$/;
  if (!patientIdRegex.test(claim.patientId)) errors.push("Invalid patientId format");

  return { valid: errors.length === 0, errors };
};

export const validateClinician = (clinician: Clinician): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (clinician.cmeHoursRequired < 0) errors.push("cmeHoursRequired must be >= 0");
  if (clinician.cmeHoursLogged < 0) errors.push("cmeHoursLogged must be >= 0");

  const validRoles = ["physician", "nurse_practitioner", "nurse", "medical_assistant"];
  if (!validRoles.includes(clinician.role)) errors.push("Invalid role");

  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  const expiryDate = new Date(clinician.licenceExpiryDate);
  
  if (expiryDate < today) errors.push("licenceExpiryDate cannot be in the past");

  return { valid: errors.length === 0, errors };
};

export const isDenialRateAboveThreshold = (rate: number, threshold: number = 8): boolean => {
  return rate > threshold;
};

export const isNoShowRateAboveThreshold = (rate: number, threshold: number = 20): boolean => {
  return rate > threshold;
};