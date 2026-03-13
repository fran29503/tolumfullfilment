export interface Lead {
  id: string;
  company: string;
  contact: string;
  value: number;
  status: "new" | "qualified" | "negotiating" | "converted";
  engagement: number; // 0-100
  nextAction: string;
  probability: number; // 0-100
  lastUpdate: Date;
}

export const MOCK_LEADS: Lead[] = [
  {
    id: "lead-001",
    company: "Apex Logistics",
    contact: "Sarah Chen",
    value: 125000,
    status: "qualified",
    engagement: 85,
    nextAction: "Demo scheduled",
    probability: 72,
    lastUpdate: new Date(),
  },
  {
    id: "lead-002",
    company: "FleetCo International",
    contact: "James Miller",
    value: 89000,
    status: "negotiating",
    engagement: 92,
    nextAction: "Contract review",
    probability: 88,
    lastUpdate: new Date(),
  },
  {
    id: "lead-003",
    company: "Supply Chain Plus",
    contact: "Maria Garcia",
    value: 156000,
    status: "new",
    engagement: 45,
    nextAction: "Initial call",
    probability: 35,
    lastUpdate: new Date(),
  },
  {
    id: "lead-004",
    company: "Urban Delivery",
    contact: "David Park",
    value: 210000,
    status: "converted",
    engagement: 100,
    nextAction: "Onboarding",
    probability: 100,
    lastUpdate: new Date(),
  },
];

export function updateMockLeads(leads: Lead[]): Lead[] {
  return leads.map((lead) => {
    const engagementChange = (Math.random() - 0.4) * 5;
    const newEngagement = Math.max(
      0,
      Math.min(100, lead.engagement + engagementChange)
    );

    // Randomly increase probability for negotiating leads
    const probChange =
      lead.status === "negotiating" ? Math.random() * 3 : Math.random() * 1;
    const newProbability = Math.min(100, lead.probability + probChange);

    // Auto-convert if probability reaches 100
    const newStatus =
      newProbability === 100 && lead.status !== "converted"
        ? "converted"
        : lead.status;

    return {
      ...lead,
      engagement: newEngagement,
      probability: newProbability,
      status: newStatus,
      lastUpdate: new Date(),
    };
  });
}
