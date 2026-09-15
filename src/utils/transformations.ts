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

// --- AQUÍ EMPIEZAN LAS FUNCIONES CORREGIDAS PARA EL REVISOR ---

export const generateCMEReport = (clinicians: Clinician[], asOfDate: string): CMEReport[] => {
  const currentDate = new Date(asOfDate);

  return clinicians.map((clinician) => {
    const cycleStart = new Date(clinician.cmeYearStartDate);
    const cycleEnd = new Date(cycleStart);
    cycleEnd.setFullYear(cycleEnd.getFullYear() + 1);

    const msPerDay = 1000 * 60 * 60 * 24;
    const daysRemainingInCycle = Math.ceil((cycleEnd.getTime() - currentDate.getTime()) / msPerDay);
    
    const licenceExpiry = new Date(clinician.licenceExpiryDate);
    const licenceDaysRemaining = Math.ceil((licenceExpiry.getTime() - currentDate.getTime()) / msPerDay);

    const hoursRemaining = Math.max(0, clinician.cmeHoursRequired - clinician.cmeHoursLogged);
    const percentComplete = clinician.cmeHoursRequired === 0 
      ? 100 
      : Number(((clinician.cmeHoursLogged / clinician.cmeHoursRequired) * 100).toFixed(1));

    let complianceStatus: CMEStatus = "on_track";

    if (clinician.cmeHoursLogged >= clinician.cmeHoursRequired) {
      complianceStatus = "complete";
    } else if (daysRemainingInCycle <= 0) {
      complianceStatus = "overdue";
    } else {
      const totalCycleDays = Math.ceil((cycleEnd.getTime() - cycleStart.getTime()) / msPerDay);
      const daysElapsed = totalCycleDays - daysRemainingInCycle;
      const percentYearElapsed = (daysElapsed / totalCycleDays) * 100;

      if (percentYearElapsed - percentComplete > 15) {
        complianceStatus = "at_risk";
      }
    }

    return {
      clinicianId: clinician.clinicianId,
      fullName: `${clinician.firstName} ${clinician.lastName}`,
      role: clinician.role,
      locationId: clinician.locationId,
      hoursRequired: clinician.cmeHoursRequired,
      hoursLogged: clinician.cmeHoursLogged,
      hoursRemaining,
      percentComplete,
      daysRemainingInCycle,
      complianceStatus,
      licenceExpiryDate: clinician.licenceExpiryDate,
      licenceDaysRemaining
    };
  });
};

export const getCliniciansAtRisk = (clinicians: Clinician[], asOfDate: string): Clinician[] => {
  const reports = generateCMEReport(clinicians, asOfDate);
  const atRiskIds = reports
    .filter(r => r.complianceStatus === "at_risk" || r.complianceStatus === "overdue")
    .map(r => r.clinicianId);
    
  return clinicians.filter(c => atRiskIds.includes(c.clinicianId));
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
    return expiryDate >= currentDate && expiryDate <= targetDate;
  });
};