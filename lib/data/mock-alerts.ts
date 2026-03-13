export interface Alert {
  id: string;
  type: "warning" | "critical" | "info" | "success";
  title: string;
  description: string;
  timestamp: Date;
  acknowledged: boolean;
  actionable: boolean;
}

export const MOCK_ALERTS: Alert[] = [
  {
    id: "alert-001",
    type: "success",
    title: "FleetCo Lead Qualified",
    description: "87% engagement. Scheduled for demo tomorrow.",
    timestamp: new Date(Date.now() - 15 * 60000),
    acknowledged: false,
    actionable: true,
  },
  {
    id: "alert-002",
    type: "warning",
    title: "Route Optimization Applied",
    description: "Zone 3-5 consolidation live. Monitoring for 2 hours.",
    timestamp: new Date(Date.now() - 10 * 60000),
    acknowledged: false,
    actionable: true,
  },
  {
    id: "alert-003",
    type: "critical",
    title: "Truck C3 Delayed",
    description: "Traffic spike on I-78. ETA +12 minutes. Clients notified.",
    timestamp: new Date(Date.now() - 5 * 60000),
    acknowledged: false,
    actionable: true,
  },
  {
    id: "alert-004",
    type: "info",
    title: "Predictive Model Updated",
    description: "3-hour demand forecast ready for zones 1-7.",
    timestamp: new Date(Date.now() - 2 * 60000),
    acknowledged: false,
    actionable: false,
  },
  {
    id: "alert-005",
    type: "success",
    title: "Fleet Efficiency +8%",
    description: "AI optimization reduced empty miles by 8% today.",
    timestamp: new Date(Date.now() - 1 * 60000),
    acknowledged: false,
    actionable: false,
  },
];

const alertTemplates = [
  { type: "success" as const, title: "Lead Converted", description: "New contract signed. Integration begins tomorrow." },
  { type: "warning" as const, title: "Peak Hour Approaching", description: "Demand spike forecasted in 30 minutes." },
  { type: "critical" as const, title: "System Alert", description: "Network latency detected. Investigating." },
  { type: "success" as const, title: "SLA Met", description: "98.2% on-time delivery this week." },
  { type: "info" as const, title: "Report Ready", description: "Weekly analytics summary generated." },
  { type: "warning" as const, title: "Resource Low", description: "Available trucks below threshold." },
  { type: "critical" as const, title: "Urgent", description: "High-priority shipment needs immediate attention." },
];

export function generateNewAlert(): Alert {
  const template = alertTemplates[Math.floor(Math.random() * alertTemplates.length)];

  return {
    id: `alert-${Date.now()}`,
    type: template.type,
    title: template.title,
    description: template.description,
    timestamp: new Date(),
    acknowledged: false,
    actionable: Math.random() > 0.3,
  };
}

export function updateMockAlerts(alerts: Alert[]): Alert[] {
  const updated = [...alerts];

  // Keep last 6 alerts
  if (updated.length >= 6) {
    updated.shift();
  }

  // Add new alert 50% of the time
  if (Math.random() > 0.5) {
    updated.push(generateNewAlert());
  }

  return updated;
}
