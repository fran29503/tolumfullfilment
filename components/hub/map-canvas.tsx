"use client";

import { useMemo } from "react";
import { TruckRoute } from "@/lib/data/mock-routes";

interface MapCanvasProps {
  routes: TruckRoute[];
}

export function MapCanvas({ routes }: MapCanvasProps) {
  // Normalize coordinates to SVG space (0-100)
  const normalizeCoord = (lat: number, lng: number) => {
    // Simple normalization for NYC area
    const x = ((lng + 74.05) / 0.15) * 100; // Normalize longitude
    const y = ((40.8 - lat) / 0.15) * 100; // Normalize latitude (inverted for SVG)
    return {
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y)),
    };
  };

  const warehousePos = { x: 50, y: 50 };
  const destinationPos = { x: 80, y: 25 };

  const routePaths = useMemo(() => {
    return routes.map((route) => {
      const current = normalizeCoord(route.currentLat, route.currentLng);
      const destination = normalizeCoord(
        route.destinationLat,
        route.destinationLng
      );
      return { route, current, destination };
    });
  }, [routes]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-transit":
        return "#22c55e"; // green-primary
      case "delayed":
        return "#ef4444"; // red
      case "delivered":
        return "#10b981"; // emerald
      case "loading":
        return "#f59e0b"; // amber
      default:
        return "#22c55e";
    }
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      style={{ background: "rgba(0,0,0,0.3)" }}
    >
      {/* Grid background */}
      <defs>
        <pattern
          id="grid"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="rgba(34,197,94,0.05)"
            strokeWidth="0.2"
          />
        </pattern>

        {/* Glow filter for trucks */}
        <filter id="truck-glow">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Pulse animation */}
        <style>
          {`
            @keyframes truck-pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.7; }
            }
            .truck-marker { animation: truck-pulse 2s ease-in-out infinite; }
            @keyframes route-dash {
              0% { stroke-dashoffset: 5; }
              100% { stroke-dashoffset: 0; }
            }
            .route-line { animation: route-dash 20s linear infinite; }
          `}
        </style>
      </defs>

      {/* Grid background */}
      <rect width="100" height="100" fill="url(#grid)" />

      {/* Route lines */}
      {routePaths.map(({ route, current, destination }) => (
        <g key={`route-${route.id}`}>
          {/* Destination line */}
          <line
            x1={current.x}
            y1={current.y}
            x2={destination.x}
            y2={destination.y}
            stroke={getStatusColor(route.status)}
            strokeWidth="0.4"
            opacity="0.3"
            strokeDasharray="1,1"
          />

          {/* Animated progress line */}
          <line
            x1={current.x}
            y1={current.y}
            x2={
              current.x +
              (destination.x - current.x) * (route.progress / 100)
            }
            y2={
              current.y +
              (destination.y - current.y) * (route.progress / 100)
            }
            stroke={getStatusColor(route.status)}
            strokeWidth="0.6"
            className="route-line"
            opacity="0.8"
          />
        </g>
      ))}

      {/* Warehouse (center hub) */}
      <g>
        <circle
          cx={warehousePos.x}
          cy={warehousePos.y}
          r="2"
          fill="#22c55e"
          opacity="0.8"
        />
        <circle
          cx={warehousePos.x}
          cy={warehousePos.y}
          r="3"
          fill="none"
          stroke="#22c55e"
          strokeWidth="0.3"
          opacity="0.4"
        />
        <circle
          cx={warehousePos.x}
          cy={warehousePos.y}
          r="4.5"
          fill="none"
          stroke="#22c55e"
          strokeWidth="0.2"
          opacity="0.2"
        />
      </g>

      {/* Destination marker */}
      <g>
        <circle
          cx={destinationPos.x}
          cy={destinationPos.y}
          r="1.5"
          fill="none"
          stroke="#4ade80"
          strokeWidth="0.4"
          opacity="0.6"
        />
        <circle
          cx={destinationPos.x}
          cy={destinationPos.y}
          r="0.6"
          fill="#4ade80"
          opacity="0.4"
        />
      </g>

      {/* Truck markers */}
      {routePaths.map(({ route, current }) => (
        <g key={`truck-${route.id}`} className="truck-marker">
          {/* Truck glow */}
          <circle
            cx={current.x}
            cy={current.y}
            r="1.2"
            fill={getStatusColor(route.status)}
            opacity="0.3"
            filter="url(#truck-glow)"
          />

          {/* Truck circle */}
          <circle
            cx={current.x}
            cy={current.y}
            r="0.8"
            fill={getStatusColor(route.status)}
            opacity="0.9"
          />

          {/* Truck ID label */}
          <text
            x={current.x}
            y={current.y - 1.2}
            fontSize="0.6"
            fill="#ffffff"
            textAnchor="middle"
            opacity="0.7"
          >
            {route.truckId.split("-")[1]}
          </text>
        </g>
      ))}

      {/* Labels for warehouse and destination */}
      <text
        x={warehousePos.x}
        y={warehousePos.y + 6}
        fontSize="1.2"
        fill="#22c55e"
        fontWeight="bold"
        textAnchor="middle"
        opacity="0.9"
      >
        Warehouse
      </text>

      <text
        x={destinationPos.x}
        y={destinationPos.y - 3}
        fontSize="1.2"
        fill="#4ade80"
        fontWeight="bold"
        textAnchor="middle"
        opacity="0.9"
      >
        Destination
      </text>

      {/* Enhanced Legend at bottom */}
      <g>
        {/* Legend background */}
        <rect x="5" y="87" width="90" height="11" fill="rgba(0,0,0,0.4)" rx="1" />

        {/* Legend title */}
        <text x="7" y="92" fontSize="1" fill="#ffffff" fontWeight="bold" opacity="0.8">
          FLEET STATUS
        </text>

        {/* Truck Status Legend */}
        <g>
          {/* Live */}
          <circle cx="30" cy="91" r="0.4" fill="#22c55e" />
          <text x="31.5" y="91.5" fontSize="0.8" fill="#ffffff" opacity="0.8">
            In Transit
          </text>

          {/* Delayed */}
          <circle cx="48" cy="91" r="0.4" fill="#ef4444" />
          <text x="49.5" y="91.5" fontSize="0.8" fill="#ffffff" opacity="0.8">
            Delayed
          </text>

          {/* Delivered */}
          <circle cx="62" cy="91" r="0.4" fill="#10b981" />
          <text x="63.5" y="91.5" fontSize="0.8" fill="#ffffff" opacity="0.8">
            Delivered
          </text>

          {/* Loading */}
          <circle cx="76" cy="91" r="0.4" fill="#f59e0b" />
          <text x="77.5" y="91.5" fontSize="0.8" fill="#ffffff" opacity="0.8">
            Loading
          </text>
        </g>

        {/* Route description */}
        <text x="7" y="97" fontSize="0.7" fill="#ffffff" opacity="0.6">
          Solid line = Route Progress | Dashed line = Route to Destination
        </text>
      </g>
    </svg>
  );
}
