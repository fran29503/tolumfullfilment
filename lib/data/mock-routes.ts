export interface TruckRoute {
  id: string;
  truckId: string;
  status: "in-transit" | "delayed" | "delivered" | "loading";
  packages: number;
  eta: string;
  currentLat: number;
  currentLng: number;
  destinationLat: number;
  destinationLng: number;
  progress: number; // 0-100
  lastUpdate: Date;
}

export const MOCK_ROUTES: TruckRoute[] = [
  {
    id: "route-001",
    truckId: "TRUCK-A1",
    status: "in-transit",
    packages: 47,
    eta: "14:35",
    currentLat: 40.7128,
    currentLng: -74.0,
    destinationLat: 40.758,
    destinationLng: -73.9855,
    progress: 65,
    lastUpdate: new Date(),
  },
  {
    id: "route-002",
    truckId: "TRUCK-B2",
    status: "in-transit",
    packages: 32,
    eta: "15:12",
    currentLat: 40.6892,
    currentLng: -74.0445,
    destinationLat: 40.7489,
    destinationLng: -73.9680,
    progress: 48,
    lastUpdate: new Date(),
  },
  {
    id: "route-003",
    truckId: "TRUCK-C3",
    status: "delayed",
    packages: 28,
    eta: "16:45",
    currentLat: 40.7580,
    currentLng: -73.9855,
    destinationLat: 40.6501,
    destinationLng: -73.9496,
    progress: 32,
    lastUpdate: new Date(),
  },
];

// Simulate route updates every 3 seconds
export function updateMockRoutes(routes: TruckRoute[]): TruckRoute[] {
  return routes.map((route) => {
    const progressIncrease = Math.random() * 2;
    const newProgress = Math.min(route.progress + progressIncrease, 100);

    const latDiff = route.destinationLat - route.currentLat;
    const lngDiff = route.destinationLng - route.currentLng;

    return {
      ...route,
      currentLat: route.currentLat + (latDiff * progressIncrease) / 100,
      currentLng: route.currentLng + (lngDiff * progressIncrease) / 100,
      progress: newProgress,
      lastUpdate: new Date(),
      status:
        newProgress === 100
          ? "delivered"
          : Math.random() > 0.95
            ? "delayed"
            : route.status,
    };
  });
}
