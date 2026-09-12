import { Claim, Appointment, Clinician, Location, CMEReport, CMEStatus } from '../types/models';

export const calculateDenialRate = (claims: Claim[]): number => {
  if (claims.length === 0) throw new Error("Array cannot be empty");
  const deniedCount = claims.filter((c) => c.status === "denied").length;
  return Number(((deniedCount / claims.length) * 100).toFixed(2));
};

export const denialRateByPayer = (claims: Claim[]): Record<string, number> => {
  const grouped = claims.reduce((acc, claim) => {
    if (!acc[claim.payerName]) acc[claim.payerName] = { total: 0, denied: 0 };
    acc[claim.payerName].total += 1;
    if (claim.status === "denied") acc[claim.payerName].denied += 1;
    return acc;
  }, {} as Record<string, { total: number; denied: number }>);

  const result: Record<string, number> = {};
  for (const payer in grouped) {
    result[payer] = Number(((grouped[payer].denied / grouped[payer].total) * 100).toFixed(2));
  }
  return result;
};

export const denialRateByLocation = (claims: Claim[]): Record<string, number> => {
  const grouped = claims.reduce((acc, claim) => {
    if (!acc[claim.locationId]) acc[claim.locationId] = { total: 0, denied: 0 };
    acc[claim.locationId].total += 1;
    if (claim.status === "denied") acc[claim.locationId].denied += 1;
    return acc;
  }, {} as Record<string, { total: number; denied: number }>);

  const result: Record<string, number> = {};
  for (const loc in grouped) {
    result[loc] = Number(((grouped[loc].denied / grouped[loc].total) * 100).toFixed(2));
  }
  return result;
};

export const flagHighDenialPayers = (claims: Claim[], threshold: number = 8): string[] => {
  const rates = denialRateByPayer(claims);
  return Object.keys(rates).filter((payer) => rates[payer] > threshold);
};

export const calculateNoShowCost = (
  appointments: Appointment[],
  location: Location,
  weekEndingDate: string
): number => {
  const endDate = new Date(weekEndingDate);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 6); // 7 días hacia atrás

  const noShows = appointments.filter((a) => {
    if (a.status !== "no_show" || a.locationId !== location.locationId) return false;
    const apptDate = new Date(a.scheduledDate);
    return apptDate >= startDate && apptDate <= endDate;
  });

  const cost = noShows.reduce((total, a) => {
    return total + (location.averageConsultationFee[a.serviceType] || 0);
  }, 0);

  return Number(cost.toFixed(2));
};

export const noShowRateByLocation = (appointments: Appointment[]): Record<string, number> => {
  const grouped = appointments.reduce((acc, a) => {
    if (!acc[a.locationId]) acc[a.locationId] = { total: 0, noShows: 0 };
    acc[a.locationId].total += 1;
    if (a.status === "no_show") acc[a.locationId].noShows += 1;
    return acc;
  }, {} as Record<string, { total: number; noShows: number }>);

  const result: Record<string, number> = {};
  for (const loc in grouped) {
    result[loc] = Number(((grouped[loc].noShows / grouped[loc].total) * 100).toFixed(2));
  }
  return result;
};

export const flagHighNoShowLocations = (appointments: Appointment[], threshold: number = 20): string[] => {
  const rates = noShowRateByLocation(appointments);
  return Object.keys(rates).filter((loc) => rates[loc] > threshold);
};

export const getCliniciansAtRisk = (clinicians: Clinician[], asOfDate: string): Clinician[] => {
  return clinicians.filter((c) => c.cmeHoursLogged < c.cmeHoursRequired); 
};

export const getCliniciansWithExpiringLicences = (
  clinicians: Clinician[],
  asOfDate: string,
  daysThreshold: number
): Clinician[] => {
  const currentDate = new Date(asOfDate);
  const targetDate = new Date(currentDate);
  targetDate.setDate(targetDate.getDate() + daysThreshold);

  return clinicians.filter((c) => {
    const expiryDate = new Date(c.licenceExpiryDate);
    return expiryDate > currentDate && expiryDate <= targetDate;
  });
};