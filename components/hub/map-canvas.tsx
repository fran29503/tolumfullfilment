"use client";

import { useMemo } from "react";
import { TruckRoute } from "@/lib/data/mock-routes";

interface MapCanvasProps {
  routes: TruckRoute[];
}

// Fixed positions in 0-100 SVG space
const WAREHOUSE = { x: 22, y: 65 };
const DESTINATION = { x: 78, y: 20 };

function getStatusColor(status: string) {
  switch (status) {
    case "in-transit": return "#22c55e";
    case "delayed":    return "#ef4444";
    case "delivered":  return "#10b981";
    case "loading":    return "#f59e0b";
    default:           return "#22c55e";
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "in-transit": return "EN RUTA";
    case "delayed":    return "DEMORADO";
    case "delivered":  return "ENTREGADO";
    case "loading":    return "CARGANDO";
    default:           return "OK";
  }
}

export function MapCanvas({ routes }: MapCanvasProps) {
  const normalizeCoord = (lat: number, lng: number) => {
    const x = ((lng + 74.05) / 0.15) * 100;
    const y = ((40.8 - lat) / 0.15) * 100;
    return {
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(78, y)),
    };
  };

  const routePaths = useMemo(() =>
    routes.map((route) => ({
      route,
      current: normalizeCoord(route.currentLat, route.currentLng),
    })),
  [routes]);

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      style={{ background: "linear-gradient(135deg, rgba(0,10,5,0.95) 0%, rgba(0,5,2,0.98) 100%)" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Grid pattern */}
        <pattern id="map-grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(34,197,94,0.07)" strokeWidth="0.15" />
        </pattern>

        {/* Glow filter */}
        <filter id="icon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Strong glow for labels */}
        <filter id="label-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <style>{`
          @keyframes pulse-ring {
            0%   { r: 5; opacity: 0.6; }
            100% { r: 9; opacity: 0; }
          }
          .warehouse-pulse { animation: pulse-ring 2.5s ease-out infinite; transform-origin: ${WAREHOUSE.x}px ${WAREHOUSE.y}px; }

          @keyframes route-march {
            0%   { stroke-dashoffset: 8; }
            100% { stroke-dashoffset: 0; }
          }
          .route-marching { animation: route-march 2s linear infinite; }

          @keyframes truck-glow-pulse {
            0%, 100% { opacity: 0.3; }
            50%       { opacity: 0.6; }
          }
          .truck-aura { animation: truck-glow-pulse 1.8s ease-in-out infinite; }

          @keyframes dest-bounce {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(-0.5px); }
          }
          .dest-pin { animation: dest-bounce 2s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* Background grid */}
      <rect width="100" height="100" fill="url(#map-grid)" />

      {/* ─── ROUTE LINES ─────────────────────────────────────────── */}
      {routePaths.map(({ route, current }) => {
        const color = getStatusColor(route.status);
        return (
          <g key={`route-${route.id}`}>
            {/* Dashed line: truck → destination (remaining journey) */}
            <line
              x1={current.x} y1={current.y}
              x2={DESTINATION.x} y2={DESTINATION.y}
              stroke={color}
              strokeWidth="0.55"
              opacity="0.3"
              strokeDasharray="2,2"
            />
            {/* Animated solid line: warehouse → truck (distance covered) */}
            <line
              x1={WAREHOUSE.x} y1={WAREHOUSE.y}
              x2={current.x} y2={current.y}
              stroke={color}
              strokeWidth="0.9"
              opacity="0.85"
              strokeDasharray="1.5,0.8"
              className="route-marching"
            />
          </g>
        );
      })}

      {/* ─── WAREHOUSE HUB ───────────────────────────────────────── */}
      <g>
        {/* Pulse ring */}
        <circle
          cx={WAREHOUSE.x} cy={WAREHOUSE.y}
          r="5"
          fill="none"
          stroke="#22c55e"
          strokeWidth="0.4"
          className="warehouse-pulse"
        />
        {/* Base glow */}
        <circle cx={WAREHOUSE.x} cy={WAREHOUSE.y} r="6" fill="#22c55e" opacity="0.08" />
        {/* Background hexagon approximation: circle */}
        <circle cx={WAREHOUSE.x} cy={WAREHOUSE.y} r="5" fill="rgba(34,197,94,0.18)" stroke="#22c55e" strokeWidth="0.5" />

        {/* Building body */}
        <rect
          x={WAREHOUSE.x - 3.2} y={WAREHOUSE.y - 1.8}
          width="6.4" height="4.8"
          fill="#22c55e" rx="0.5" opacity="0.95"
        />
        {/* Roof triangle */}
        <polygon
          points={`${WAREHOUSE.x},${WAREHOUSE.y - 5.2} ${WAREHOUSE.x - 4.2},${WAREHOUSE.y - 1.8} ${WAREHOUSE.x + 4.2},${WAREHOUSE.y - 1.8}`}
          fill="#4ade80"
        />
        {/* Door */}
        <rect
          x={WAREHOUSE.x - 0.9} y={WAREHOUSE.y + 1}
          width="1.8" height="2"
          fill="rgba(0,0,0,0.55)" rx="0.2"
        />
        {/* Windows */}
        <rect x={WAREHOUSE.x - 2.6} y={WAREHOUSE.y - 0.8} width="1.4" height="1.2" fill="rgba(0,0,0,0.4)" rx="0.15" />
        <rect x={WAREHOUSE.x + 1.2} y={WAREHOUSE.y - 0.8} width="1.4" height="1.2" fill="rgba(0,0,0,0.4)" rx="0.15" />

        {/* Label pill */}
        <rect x={WAREHOUSE.x - 8} y={WAREHOUSE.y + 7} width="16" height="4" fill="rgba(34,197,94,0.2)" rx="1" stroke="#22c55e" strokeWidth="0.3" />
        <text x={WAREHOUSE.x} y={WAREHOUSE.y + 9.8}
          fontSize="2.4" fill="#22c55e" fontWeight="bold" textAnchor="middle"
          filter="url(#label-glow)"
        >
          ALMACÉN / HUB
        </text>
      </g>

      {/* ─── DESTINATION PIN ─────────────────────────────────────── */}
      <g className="dest-pin">
        {/* Glow halo */}
        <circle cx={DESTINATION.x} cy={DESTINATION.y} r="6" fill="#f59e0b" opacity="0.1" />
        {/* Pin head */}
        <circle
          cx={DESTINATION.x} cy={DESTINATION.y}
          r="4"
          fill="#f59e0b" opacity="0.95"
          stroke="#fbbf24" strokeWidth="0.4"
          filter="url(#icon-glow)"
        />
        {/* Pin tail */}
        <polygon
          points={`${DESTINATION.x},${DESTINATION.y + 7.5} ${DESTINATION.x - 2},${DESTINATION.y + 2.5} ${DESTINATION.x + 2},${DESTINATION.y + 2.5}`}
          fill="#f59e0b"
        />
        {/* Inner dot */}
        <circle cx={DESTINATION.x} cy={DESTINATION.y} r="1.4" fill="rgba(0,0,0,0.5)" />

        {/* Label pill */}
        <rect x={DESTINATION.x - 9} y={DESTINATION.y - 13} width="18" height="4" fill="rgba(245,158,11,0.2)" rx="1" stroke="#f59e0b" strokeWidth="0.3" />
        <text x={DESTINATION.x} y={DESTINATION.y - 9.3}
          fontSize="2.4" fill="#f59e0b" fontWeight="bold" textAnchor="middle"
          filter="url(#label-glow)"
        >
          DESTINO FINAL
        </text>
      </g>

      {/* ─── TRUCK MARKERS ───────────────────────────────────────── */}
      {routePaths.map(({ route, current }) => {
        const color = getStatusColor(route.status);
        const id = route.truckId.replace("TRUCK-", "");
        return (
          <g key={`truck-${route.id}`}>
            {/* Aura glow */}
            <circle
              cx={current.x} cy={current.y}
              r="4" fill={color} opacity="0.18"
              className="truck-aura"
            />

            {/* Status badge (above) */}
            <rect
              x={current.x - 5} y={current.y - 10}
              width="10" height="3.2"
              fill={color} rx="0.8" opacity="0.9"
            />
            <text
              x={current.x} y={current.y - 7.4}
              fontSize="1.9" fill="#000" fontWeight="bold"
              textAnchor="middle"
            >
              {getStatusLabel(route.status)}
            </text>

            {/* Truck body (side view) */}
            <rect
              x={current.x - 3} y={current.y - 1.6}
              width="5.5" height="3.2"
              fill={color} rx="0.5" opacity="0.95"
            />
            {/* Cab (front) */}
            <rect
              x={current.x + 2} y={current.y - 2.2}
              width="2.2" height="4.4"
              fill={color} rx="0.5" opacity="1"
            />
            {/* Windshield */}
            <rect
              x={current.x + 2.3} y={current.y - 1.8}
              width="1.4" height="1.4"
              fill="rgba(0,0,0,0.45)" rx="0.2"
            />
            {/* Rear wheels */}
            <circle cx={current.x - 1.2} cy={current.y + 1.9} r="0.85" fill="rgba(0,0,0,0.65)" />
            {/* Front wheel */}
            <circle cx={current.x + 2.8} cy={current.y + 1.9} r="0.85" fill="rgba(0,0,0,0.65)" />

            {/* Truck ID label */}
            <text
              x={current.x} y={current.y - 11.8}
              fontSize="2.5" fill="#ffffff" fontWeight="bold"
              textAnchor="middle" opacity="1"
              filter="url(#label-glow)"
            >
              {id}
            </text>
          </g>
        );
      })}

      {/* ─── LEGEND ──────────────────────────────────────────────── */}
      <g>
        {/* Legend background */}
        <rect x="1" y="85" width="98" height="14" fill="rgba(0,0,0,0.75)" rx="1.5" />
        <line x1="1" y1="85" x2="99" y2="85" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />

        {/* Title */}
        <text x="3.5" y="90.5" fontSize="2" fill="rgba(255,255,255,0.5)" fontWeight="bold">
          ESTADO FLOTA:
        </text>

        {/* In Transit */}
        <rect x="24" y="87.8" width="3.5" height="2.2" fill="#22c55e" rx="0.4" />
        <text x="28.5" y="90.5" fontSize="2" fill="#22c55e" fontWeight="600">En Ruta</text>

        {/* Delayed */}
        <rect x="44" y="87.8" width="3.5" height="2.2" fill="#ef4444" rx="0.4" />
        <text x="48.5" y="90.5" fontSize="2" fill="#ef4444" fontWeight="600">Demorado</text>

        {/* Delivered */}
        <rect x="66" y="87.8" width="3.5" height="2.2" fill="#10b981" rx="0.4" />
        <text x="70.5" y="90.5" fontSize="2" fill="#10b981" fontWeight="600">Entregado</text>

        {/* Route key */}
        <line x1="3.5" y1="96" x2="10" y2="96" stroke="#22c55e" strokeWidth="1" />
        <text x="11.5" y="97.2" fontSize="1.7" fill="rgba(255,255,255,0.45)">línea sólida = trecho recorrido</text>

        <line x1="52" y1="96" x2="58.5" y2="96" stroke="#22c55e" strokeWidth="0.8" strokeDasharray="1.5,1.5" />
        <text x="60" y="97.2" fontSize="1.7" fill="rgba(255,255,255,0.45)">línea punteada = ruta restante</text>
      </g>
    </svg>
  );
}
