import { Claim, Clinician } from '../types/models';

export const findClaimById = (claims: Claim[], claimId: string): Claim | null => {
  return claims.find((c) => c.claimId === claimId) || null;
};

export const findClinicianById = (clinicians: Clinician[], clinicianId: string): Clinician | null => {
  return clinicians.find((c) => c.clinicianId === clinicianId) || null;
};

export const binarySearchClaimById = (sortedClaims: Claim[], targetId: string): number => {
  let left = 0;
  let right = sortedClaims.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midId = sortedClaims[mid].claimId;

    if (midId === targetId) return mid;
    if (midId < targetId) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};