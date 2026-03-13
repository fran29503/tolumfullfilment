export interface Alert {
  id: string;
  severity: "critical" | "warning" | "info";
  message: string;
  timestamp: Date;
  truck?: string;
}

export const MOCK_ALERTS: Alert[] = [
  {
    id: "alert-001",
    severity: "critical",
    message: "TRUCK-C3 delayed by 45 min. ETA adjustment needed.",
    timestamp: new Date(Date.now() - 5 * 60000),
    truck: "TRUCK-C3",
  },
  {
    id: "alert-002",
    severity: "warning",
    message: "TRUCK-B2 fuel level below 30%. Recommend refuel stop.",
    timestamp: new Date(Date.now() - 12 * 60000),
    truck: "TRUCK-B2",
  },
  {
    id: "alert-003",
    severity: "warning",
    message: "Route optimization available. Potential 8 min savings.",
    timestamp: new Date(Date.now() - 18 * 60000),
  },
  {
    id: "alert-004",
    severity: "info",
    message: "Scheduled maintenance due for TRUCK-A1 in 2 weeks.",
    timestamp: new Date(Date.now() - 25 * 60000),
    truck: "TRUCK-A1",
  },
  {
    id: "alert-005",
    severity: "warning",
    message: "Weather alert: Heavy rain expected in delivery zone.",
    timestamp: new Date(Date.now() - 35 * 60000),
  },
];

export function updateMockAlerts(alerts: Alert[]): Alert[] {
  // Simulate alert updates - occasionally add new, remove resolved
  const updatedAlerts = [...alerts];

  // 20% chance to remove oldest info-level alert
  const infoAlerts = updatedAlerts.filter(a => a.severity === "info");
  if (infoAlerts.length > 0 && Math.random() < 0.2) {
    const oldestInfo = infoAlerts[0];
    updatedAlerts.splice(updatedAlerts.indexOf(oldestInfo), 1);
  }

  return updatedAlerts;
}
