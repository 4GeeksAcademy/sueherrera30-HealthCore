import { Claim, Appointment, AppointmentStatus } from '../types/models';

export const filterClaims = (
  claims: Claim[],
  filters: Partial<Pick<Claim, "locationId" | "status" | "payerName" | "serviceType">>
): Claim[] => {
  return claims.filter((claim) => {
    // Verifica que el claim cumpla con TODOS los filtros que sí fueron proporcionados
    return (Object.keys(filters) as (keyof typeof filters)[]).every(
      (key) => filters[key] === undefined || claim[key] === filters[key]
    );
  });
};

export const filterAppointmentsByStatus = (
  appointments: Appointment[],
  status: AppointmentStatus[]
): Appointment[] => {
  if (status.length === 0) return [];
  return appointments.filter((appt) => status.includes(appt.status));
};

export const sortClaimsById = (claims: Claim[], direction: "asc" | "desc"): Claim[] => {
  return [...claims].sort((a, b) => {
    if (a.claimId < b.claimId) return direction === "asc" ? -1 : 1;
    if (a.claimId > b.claimId) return direction === "asc" ? 1 : -1;
    return 0;
  });
};

export const sortAppointmentsByDate = (
  appointments: Appointment[],
  direction: "asc" | "desc"
): Appointment[] => {
  return [...appointments].sort((a, b) => {
    const dateA = new Date(a.scheduledDate).getTime();
    const dateB = new Date(b.scheduledDate).getTime();
    return direction === "asc" ? dateA - dateB : dateB - dateA;
  });
};

export const groupClaimsBy = (
  claims: Claim[],
  key: "locationId" | "payerName" | "status" | "serviceType"
): Record<string, Claim[]> => {
  return claims.reduce((acc, claim) => {
    const groupKey = claim[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(claim);
    return acc;
  }, {} as Record<string, Claim[]>);
};