export interface TruckInfo {
  id: string;
  label: string;
  eta: string;
  kmWithoutStop: number;
  accumulatedCost: number;
  delayRisk: "low" | "medium" | "high";
  speed: number;
}

export const MOCK_TRUCK_INFO: TruckInfo[] = [
  {
    id: "TRK-001",
    label: "TRK-001",
    eta: "14:35",
    kmWithoutStop: 142,
    accumulatedCost: 3840,
    delayRisk: "low",
    speed: 87,
  },
  {
    id: "TRK-002",
    label: "TRK-002",
    eta: "15:12",
    kmWithoutStop: 98,
    accumulatedCost: 2610,
    delayRisk: "medium",
    speed: 73,
  },
  {
    id: "TRK-003",
    label: "TRK-003",
    eta: "16:45",
    kmWithoutStop: 67,
    accumulatedCost: 1980,
    delayRisk: "high",
    speed: 54,
  },
];

export function updateTruckStats(trucks: TruckInfo[]): TruckInfo[] {
  return trucks.map((truck) => {
    const speedDelta = (Math.random() - 0.5) * 10;
    const newSpeed = Math.max(30, Math.min(120, truck.speed + speedDelta));
    const newKm = truck.kmWithoutStop + Math.random() * 1.5;
    const newCost = truck.accumulatedCost + Math.random() * 20;

    const risks: Array<"low" | "medium" | "high"> = ["low", "medium", "high"];
    const newRisk =
      Math.random() > 0.85
        ? risks[Math.floor(Math.random() * 3)]
        : truck.delayRisk;

    return {
      ...truck,
      speed: Math.round(newSpeed),
      kmWithoutStop: Math.round(newKm * 10) / 10,
      accumulatedCost: Math.round(newCost),
      delayRisk: newRisk,
    };
  });
}
