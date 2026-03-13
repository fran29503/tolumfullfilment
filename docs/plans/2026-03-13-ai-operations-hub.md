# TOLUM AI Operations Hub Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a premium, frontend-only AI Operations Hub dashboard for YouTube demo — a single-page system with 4 interactive modules showcasing AI-powered logistics management.

**Architecture:** Single Next.js page (`/hub`) with 4 grid-based modules, each fully self-contained with simulated data. All interactions are client-side with realistic animations. Heavy use of Framer Motion, shadcn/ui, and custom animations. 100% consistent with TOLUM's green + black premium branding. No backend calls — everything is mock data and procedurally generated.

**Tech Stack:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS (with TOLUM theme: #22c55e green, #000 black)
- Framer Motion (animations)
- shadcn/ui (components)
- Lucide React (icons)
- Mock data generators

**Branding Constraints:**
- Color Palette: #22c55e (primary green), #4ade80 (bright), #16a34a (dim), #000 (black), #0a0a0a (near-black)
- Fonts: Montserrat (headlines), Inter (body)
- Style: Premium dark theme, grid patterns, green glows, smooth animations, blur effects
- No inline styles — use Tailwind classes exclusively

---

## Task 1: Create AI Hub Page Structure & Layout

**Files:**
- Create: `app/hub/page.tsx`
- Create: `app/hub/layout.tsx`
- Modify: `app/layout.tsx` (add hub route metadata)

**Step 1: Create hub layout wrapper**

Create `app/hub/layout.tsx`:

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tolum AI Operations Hub | Real-Time Logistics Dashboard",
  description:
    "AI-powered operations dashboard showcasing real-time logistics management, predictive alerts, and intelligent sales automation.",
};

export default function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

**Step 2: Create hub page with grid structure**

Create `app/hub/page.tsx`:

```typescript
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MapModule } from "@/components/hub/map-module";
import { SalesModule } from "@/components/hub/sales-module";
import { ChatModule } from "@/components/hub/chat-module";
import { AlertsModule } from "@/components/hub/alerts-module";
import { HubHeader } from "@/components/hub/hub-header";

export default function HubPage() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <main className="bg-black min-h-screen overflow-x-hidden">
      <HubHeader />

      <div className="relative px-6 py-8 max-w-[1920px] mx-auto">
        {/* Decorative grid background */}
        <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none z-0" />

        {/* 4-Module Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Top-left: Live Operations Map */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <MapModule />
          </motion.div>

          {/* Top-right: AI Sales Panel */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SalesModule />
          </motion.div>

          {/* Bottom-left: AI Chat Assistant */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ChatModule />
          </motion.div>

          {/* Bottom-right: Smart Alerts */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <AlertsModule />
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
```

**Step 3: Create Hub Header component**

Create `components/hub/hub-header.tsx`:

```typescript
"use client";

import { motion } from "motion/react";
import { Zap, Clock } from "lucide-react";

export function HubHeader() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="px-6 py-4 max-w-[1920px] mx-auto">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-primary to-green-bright flex items-center justify-center">
              <Zap className="w-6 h-6 text-black" strokeWidth={3} />
            </div>
            <div>
              <h1 className="font-montserrat font-bold text-lg text-white">
                TOLUM Operations Hub
              </h1>
              <p className="text-xs text-white/40">AI-Powered Logistics Dashboard</p>
            </div>
          </div>

          {/* Live indicator + Time */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-primary/10 border border-green-primary/30">
              <div className="w-2 h-2 rounded-full bg-green-primary animate-pulse" />
              <span className="text-xs font-inter text-green-bright tracking-widest uppercase">
                Live
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/50 text-xs font-inter">
              <Clock size={14} />
              <span>{time}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
```

**Step 4: Update app layout metadata**

Modify `app/layout.tsx` to include hub metadata in the title pattern (already has base metadata).

**Step 5: Run dev server and verify structure**

```bash
npm run dev
# Navigate to http://localhost:3000/hub
# Expected: Header with title, grid placeholder areas
```

**Step 6: Commit**

```bash
git add app/hub/page.tsx app/hub/layout.tsx components/hub/hub-header.tsx
git commit -m "feat: scaffold AI Operations Hub page structure with header and 4-module grid layout"
```

---

## Task 2: Build Live Operations Map Module

**Files:**
- Create: `components/hub/map-module.tsx`
- Create: `lib/data/mock-routes.ts` (mock truck routes)
- Create: `components/hub/map-canvas.tsx` (SVG map visualization)

**Step 1: Create mock data for routes**

Create `lib/data/mock-routes.ts`:

```typescript
export interface TruckRoute {
  id: string;
  name: string;
  status: "on-time" | "delayed" | "at-destination";
  progress: number; // 0-100
  eta: string;
  packages: number;
  warehouseFrom: string;
  warehouseTo: string;
  coordinates: { lat: number; lng: number }[];
}

export const MOCK_ROUTES: TruckRoute[] = [
  {
    id: "TRUCK-001",
    name: "Transport 001",
    status: "on-time",
    progress: 62,
    eta: "14:35",
    packages: 1850,
    warehouseFrom: "Toronto Hub",
    warehouseTo: "Montreal Hub",
    coordinates: [
      { lat: 43.6532, lng: -79.3832 },
      { lat: 43.75, lng: -79.2 },
      { lat: 43.85, lng: -78.9 },
      { lat: 44.2, lng: -78.0 },
      { lat: 45.5017, lng: -73.5673 },
    ],
  },
  {
    id: "TRUCK-002",
    name: "Transport 002",
    status: "on-time",
    progress: 38,
    eta: "16:12",
    packages: 2120,
    warehouseFrom: "Vancouver Hub",
    warehouseTo: "Edmonton Hub",
    coordinates: [
      { lat: 49.2827, lng: -123.1207 },
      { lat: 49.5, lng: -122.0 },
      { lat: 50.0, lng: -121.0 },
      { lat: 51.0, lng: -115.0 },
      { lat: 53.5461, lng: -113.4938 },
    ],
  },
  {
    id: "TRUCK-003",
    name: "Transport 003",
    status: "delayed",
    progress: 44,
    eta: "17:55",
    packages: 1650,
    warehouseFrom: "Toronto Hub",
    warehouseTo: "Winnipeg Hub",
    coordinates: [
      { lat: 43.6532, lng: -79.3832 },
      { lat: 43.5, lng: -80.5 },
      { lat: 43.0, lng: -82.0 },
      { lat: 44.0, lng: -85.0 },
      { lat: 49.8951, lng: -97.1384 },
    ],
  },
];

export const WAREHOUSES = [
  { name: "Toronto Hub", lat: 43.6532, lng: -79.3832 },
  { name: "Montreal Hub", lat: 45.5017, lng: -73.5673 },
  { name: "Vancouver Hub", lat: 49.2827, lng: -123.1207 },
  { name: "Edmonton Hub", lat: 53.5461, lng: -113.4938 },
  { name: "Winnipeg Hub", lat: 49.8951, lng: -97.1384 },
];
```

**Step 2: Create SVG map canvas**

Create `components/hub/map-canvas.tsx`:

```typescript
"use client";

import { motion } from "motion/react";
import { TruckRoute, WAREHOUSES } from "@/lib/data/mock-routes";
import { Truck, AlertCircle } from "lucide-react";

interface MapCanvasProps {
  routes: TruckRoute[];
}

export function MapCanvas({ routes }: MapCanvasProps) {
  // Normalize coordinates to fit in SVG (simplified)
  const normalizeLng = (lng: number) => ((lng + 141) / 73) * 100;
  const normalizeLat = (lat: number) => ((60 - lat) / 35) * 100;

  return (
    <div className="w-full h-full bg-gradient-to-br from-near-black to-dark-surface rounded-xl border border-white/10 overflow-hidden">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Grid */}
        <defs>
          <pattern
            id="map-grid"
            x="10"
            y="10"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="rgba(34,197,94,0.05)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#map-grid)" />

        {/* Warehouse markers */}
        {WAREHOUSES.map((warehouse, i) => (
          <g key={warehouse.name}>
            <circle
              cx={normalizeLng(warehouse.lng)}
              cy={normalizeLat(warehouse.lat)}
              r="1.5"
              fill="#22c55e"
              opacity="0.8"
            />
            <circle
              cx={normalizeLng(warehouse.lng)}
              cy={normalizeLat(warehouse.lat)}
              r="1.5"
              fill="none"
              stroke="#22c55e"
              strokeWidth="0.3"
              opacity="0.3"
            >
              <animate attributeName="r" from="1.5" to="2.5" dur="2s" repeatCount="indefinite" />
              <animate attributeName="strokeWidth" from="0.3" to="0.1" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Route paths and trucks */}
        {routes.map((route, i) => {
          const coords = route.coordinates;
          const pathD = coords
            .map(
              (coord, idx) =>
                `${idx === 0 ? "M" : "L"} ${normalizeLng(coord.lng)} ${normalizeLat(coord.lat)}`
            )
            .join(" ");

          const currentIdx = Math.floor((route.progress / 100) * (coords.length - 1));
          const currentCoord = coords[currentIdx];
          const truckX = normalizeLng(currentCoord.lng);
          const truckY = normalizeLat(currentCoord.lat);

          return (
            <g key={route.id}>
              {/* Route line */}
              <path
                d={pathD}
                fill="none"
                stroke={
                  route.status === "delayed"
                    ? "rgba(255,99,71,0.3)"
                    : "rgba(34,197,94,0.2)"
                }
                strokeWidth="0.4"
                strokeDasharray="2,1"
              />

              {/* Truck icon */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.2 }}
              >
                <circle
                  cx={truckX}
                  cy={truckY}
                  r="0.8"
                  fill={route.status === "delayed" ? "#ff6347" : "#22c55e"}
                />
                <text
                  x={truckX}
                  y={truckY + 0.3}
                  textAnchor="middle"
                  fontSize="0.5"
                  fill="white"
                  fontWeight="bold"
                >
                  📦
                </text>
              </motion.g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
```

**Step 3: Create Map Module with stats**

Create `components/hub/map-module.tsx`:

```typescript
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MapCanvas } from "./map-canvas";
import { MOCK_ROUTES, TruckRoute } from "@/lib/data/mock-routes";
import { AlertTriangle, Clock, Package } from "lucide-react";

export function MapModule() {
  const [routes, setRoutes] = useState<TruckRoute[]>(MOCK_ROUTES);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRoutes((prev) =>
        prev.map((route) => ({
          ...route,
          progress: Math.min(100, route.progress + Math.random() * 3),
        }))
      );
      setUpdatedAt(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const delayedCount = routes.filter((r) => r.status === "delayed").length;
  const totalPackages = routes.reduce((sum, r) => sum + r.packages, 0);

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="mb-4 pb-4 border-b border-white/10">
        <h2 className="font-montserrat font-bold text-white text-lg mb-2">
          Live Operations Map
        </h2>
        <p className="text-xs text-white/50">Real-time truck tracking & route optimization</p>
      </div>

      {/* Map */}
      <div className="flex-1 mb-4 min-h-80">
        <MapCanvas routes={routes} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 hover:border-green-primary/30 transition">
          <div className="text-xs text-white/50 mb-1 flex items-center gap-1">
            <Package size={12} /> Total Packages
          </div>
          <div className="font-montserrat font-bold text-green-bright">
            {(totalPackages / 1000).toFixed(1)}k
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3 hover:border-green-primary/30 transition">
          <div className="text-xs text-white/50 mb-1 flex items-center gap-1">
            <Clock size={12} /> Active Routes
          </div>
          <div className="font-montserrat font-bold text-green-bright">{routes.length}</div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3 hover:border-red-400/30 transition">
          <div className="text-xs text-white/50 mb-1 flex items-center gap-1">
            <AlertTriangle size={12} /> Delayed
          </div>
          <div className="font-montserrat font-bold text-orange-400">{delayedCount}</div>
        </div>
      </div>

      {/* Last updated */}
      <div className="text-xs text-white/30 mt-3 text-right">
        Updated {updatedAt.toLocaleTimeString()}
      </div>
    </motion.div>
  );
}
```

**Step 4: Run and verify**

```bash
npm run dev
# Visit http://localhost:3000/hub
# Expected: Map module showing SVG with warehouse dots and truck positions
```

**Step 5: Commit**

```bash
git add components/hub/map-module.tsx components/hub/map-canvas.tsx lib/data/mock-routes.ts
git commit -m "feat: implement live operations map with SVG rendering and real-time route tracking"
```

---

## Task 3: Build AI Sales Panel Module

**Files:**
- Create: `components/hub/sales-module.tsx`
- Create: `lib/data/mock-leads.ts` (lead pipeline data)
- Create: `components/hub/lead-card.tsx` (individual lead card)

**Step 1: Create mock leads data**

Create `lib/data/mock-leads.ts`:

```typescript
export interface Lead {
  id: string;
  company: string;
  contact: string;
  stage: "prospect" | "qualified" | "proposal" | "negotiation";
  score: number; // AI confidence 0-100
  value: number; // USD
  nextAction: string;
  daysInStage: number;
  aiInsight: string;
}

export const MOCK_LEADS: Lead[] = [
  {
    id: "LEAD-001",
    company: "EcoShip Inc.",
    contact: "Sarah Chen",
    stage: "negotiation",
    score: 92,
    value: 450000,
    nextAction: "Send contract",
    daysInStage: 8,
    aiInsight: "High intent signals detected. 87% likelihood to close this week.",
  },
  {
    id: "LEAD-002",
    company: "FreshMart Co.",
    contact: "Mike Rodriguez",
    stage: "proposal",
    score: 78,
    value: 320000,
    nextAction: "Schedule demo",
    daysInStage: 5,
    aiInsight: "Product-market fit confirmed. ROI calculator showed 340% improvement.",
  },
  {
    id: "LEAD-003",
    company: "RetailFlow Ltd.",
    contact: "Emma Wilson",
    stage: "qualified",
    score: 65,
    value: 280000,
    nextAction: "Needs analysis call",
    daysInStage: 12,
    aiInsight: "Budget confirmed. Recommend case study approach for decision-maker.",
  },
  {
    id: "LEAD-004",
    company: "LogisticHub Global",
    contact: "David Park",
    stage: "prospect",
    score: 58,
    value: 520000,
    nextAction: "Initial consultation",
    daysInStage: 2,
    aiInsight: "Enterprise opportunity. Similar to closed deal LEAD-098. Follow same playbook.",
  },
];

export const STAGE_COLORS: Record<Lead["stage"], string> = {
  prospect: "bg-blue-500/20 border-blue-500/30 text-blue-400",
  qualified: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
  proposal: "bg-purple-500/20 border-purple-500/30 text-purple-400",
  negotiation: "bg-green-primary/20 border-green-primary/30 text-green-bright",
};
```

**Step 2: Create lead card component**

Create `components/hub/lead-card.tsx`:

```typescript
"use client";

import { motion } from "motion/react";
import { Lead, STAGE_COLORS } from "@/lib/data/mock-leads";
import { TrendingUp, Zap, Clock } from "lucide-react";

interface LeadCardProps {
  lead: Lead;
  index: number;
}

export function LeadCard({ lead, index }: LeadCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-green-primary/30 transition group cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-montserrat font-semibold text-white text-sm mb-1">
            {lead.company}
          </h4>
          <p className="text-xs text-white/50">{lead.contact}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-bold border ${STAGE_COLORS[lead.stage]}`}>
          {lead.stage}
        </div>
      </div>

      {/* AI Score Bar */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-white/50 flex items-center gap-1">
            <Zap size={12} /> AI Score
          </span>
          <span className="text-xs font-bold text-green-bright">{lead.score}%</span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-primary to-green-bright"
            initial={{ width: 0 }}
            animate={{ width: `${lead.score}%` }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
          />
        </div>
      </div>

      {/* Deal value + Days */}
      <div className="flex items-center justify-between mb-2 text-xs">
        <div>
          <span className="text-white/50">Value: </span>
          <span className="font-bold text-white">${(lead.value / 1000).toFixed(0)}k</span>
        </div>
        <div className="flex items-center gap-1 text-white/50">
          <Clock size={12} />
          <span>{lead.daysInStage}d in stage</span>
        </div>
      </div>

      {/* AI Insight */}
      <div className="p-2 bg-green-primary/10 border border-green-primary/20 rounded text-xs text-green-100 mb-2">
        💡 {lead.aiInsight}
      </div>

      {/* CTA */}
      <button className="w-full px-2 py-1.5 text-xs font-bold text-black bg-green-primary rounded hover:bg-green-bright transition">
        {lead.nextAction}
      </button>
    </motion.div>
  );
}
```

**Step 3: Create Sales Module**

Create `components/hub/sales-module.tsx`:

```typescript
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MOCK_LEADS, Lead } from "@/lib/data/mock-leads";
import { LeadCard } from "./lead-card";
import { TrendingUp, DollarSign } from "lucide-react";

export function SalesModule() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);

  // Simulate score updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLeads((prev) =>
        prev.map((lead) => ({
          ...lead,
          score: Math.min(100, Math.max(0, lead.score + (Math.random() - 0.5) * 4)),
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const avgScore = Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length);

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="mb-4 pb-4 border-b border-white/10">
        <h2 className="font-montserrat font-bold text-white text-lg mb-2">
          AI Sales Panel
        </h2>
        <p className="text-xs text-white/50">Pipeline with predictive lead scoring</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <div className="text-xs text-white/50 mb-1 flex items-center gap-1">
            <DollarSign size={12} /> Pipeline Value
          </div>
          <div className="font-montserrat font-bold text-green-bright">
            ${(totalValue / 1000000).toFixed(1)}M
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <div className="text-xs text-white/50 mb-1 flex items-center gap-1">
            <TrendingUp size={12} /> Avg AI Score
          </div>
          <div className="font-montserrat font-bold text-green-bright">{avgScore}%</div>
        </div>
      </div>

      {/* Lead cards */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {leads.map((lead, i) => (
          <LeadCard key={lead.id} lead={lead} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
```

**Step 4: Run and verify**

```bash
npm run dev
# Visit http://localhost:3000/hub
# Expected: Sales panel showing lead cards with AI scores and pipeline value
```

**Step 5: Commit**

```bash
git add components/hub/sales-module.tsx components/hub/lead-card.tsx lib/data/mock-leads.ts
git commit -m "feat: build AI sales panel with lead scoring and pipeline visualization"
```

---

## Task 4: Build AI Chat Assistant Module

**Files:**
- Create: `components/hub/chat-module.tsx`
- Create: `lib/data/mock-messages.ts` (pre-written responses)
- Create: `components/hub/chat-message.tsx` (message component)

**Step 1: Create mock chat responses**

Create `lib/data/mock-messages.ts`:

```typescript
export const CHAT_RESPONSES: Record<string, string[]> = {
  operational: [
    "Current warehouse utilization across all hubs: 78%. Toronto showing highest demand (85%). Recommend increasing staff allocation for next 48h.",
    "Predictive analytics show 23% spike in inbound shipments tomorrow. Recommend pre-positioning inventory at Vancouver and Montreal hubs.",
    "Average fulfillment time: 18.3h. Target: 16h. Bottleneck identified in pick process at Edmonton. Recommend workflow optimization.",
  ],
  sales: [
    "Top performing sales representatives this month: Sarah (92 deals), Mike (87 deals), Emma (76 deals). Sarah's avg deal size: $420k (25% above baseline).",
    "Customer retention rate: 94%. Churn prediction model identifies 3 at-risk accounts. Recommend proactive outreach to RetailFlow Ltd., FreshMart Co., and EcoShip Inc.",
    "Q2 revenue forecast: $8.2M. Confidence: 87%. Top growth opportunity in enterprise segment (currently 32% of pipeline).",
  ],
  system: [
    "System health check complete. All servers operating at optimal capacity. No alerts. Next scheduled maintenance: 2026-03-20 (02:00 UTC).",
    "Network latency: 12ms average. Uptime: 99.98%. Last incident: 2026-02-14 (resolved in 14 minutes).",
    "API performance: 2.1ms avg response time. Database queries: 0.8ms avg. Load balancing: optimal distribution across 12 instances.",
  ],
};

export interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  category?: "operational" | "sales" | "system";
}

export const generateAIResponse = (category: keyof typeof CHAT_RESPONSES): string => {
  const responses = CHAT_RESPONSES[category];
  return responses[Math.floor(Math.random() * responses.length)];
};
```

**Step 2: Create chat message component**

Create `components/hub/chat-message.tsx`:

```typescript
"use client";

import { motion } from "motion/react";
import { ChatMessage } from "@/lib/data/mock-messages";
import { Bot, User } from "lucide-react";

interface ChatMessageComponentProps {
  message: ChatMessage;
  index: number;
}

export function ChatMessageComponent({ message, index }: ChatMessageComponentProps) {
  const isUser = message.type === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-lg bg-green-primary/20 border border-green-primary/30 flex items-center justify-center flex-shrink-0">
          <Bot size={16} className="text-green-primary" />
        </div>
      )}

      <div
        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
          isUser
            ? "bg-green-primary text-black font-medium"
            : "bg-white/5 border border-white/10 text-white/80"
        }`}
      >
        {message.content}
      </div>

      {isUser && (
        <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-white/50" />
        </div>
      )}
    </motion.div>
  );
}
```

**Step 3: Create Chat Module**

Create `components/hub/chat-module.tsx`:

```typescript
"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  ChatMessage as ChatMessageType,
  generateAIResponse,
} from "@/lib/data/mock-messages";
import { ChatMessageComponent } from "./chat-message";
import { Send, BarChart3, Settings2, Activity } from "lucide-react";

const QUICK_QUERIES = [
  { icon: Activity, label: "Operations", category: "operational" as const },
  { icon: BarChart3, label: "Sales", category: "sales" as const },
  { icon: Settings2, label: "System", category: "system" as const },
];

export function ChatModule() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: "msg-0",
      type: "ai",
      content: "Welcome to TOLUM AI Assistant. How can I help optimize your operations today?",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuickQuery = async (category: "operational" | "sales" | "system") => {
    const userMsg: ChatMessageType = {
      id: `msg-${Date.now()}`,
      type: "user",
      content: `Tell me about ${category} metrics`,
      timestamp: new Date(),
      category,
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    // Simulate delay
    setTimeout(() => {
      const aiResponse: ChatMessageType = {
        id: `msg-${Date.now() + 1}`,
        type: "ai",
        content: generateAIResponse(category),
        timestamp: new Date(),
        category,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
    }, 800);
  };

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="mb-4 pb-4 border-b border-white/10">
        <h2 className="font-montserrat font-bold text-white text-lg mb-2">
          TOLUM AI Assistant
        </h2>
        <p className="text-xs text-white/50">Operational intelligence at your fingertips</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
        {messages.map((msg, i) => (
          <ChatMessageComponent key={msg.id} message={msg} index={i} />
        ))}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-green-primary animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-green-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
            <div className="w-2 h-2 rounded-full bg-green-primary animate-bounce" style={{ animationDelay: "0.4s" }} />
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {QUICK_QUERIES.map(({ icon: Icon, label, category }) => (
          <button
            key={label}
            onClick={() => handleQuickQuery(category)}
            disabled={loading}
            className="px-2 py-2 text-xs font-bold rounded-lg bg-white/5 border border-white/10 text-white/70 hover:border-green-primary/30 hover:text-green-primary transition disabled:opacity-50"
          >
            <Icon size={14} className="mx-auto mb-1" />
            {label}
          </button>
        ))}
      </div>

      {/* Input (simulated - read-only demo) */}
      <div className="flex gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
        <input
          type="text"
          placeholder="Ask anything..."
          className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/30"
          readOnly
          disabled
        />
        <button className="p-2 bg-green-primary text-black rounded hover:bg-green-bright transition disabled:opacity-50" disabled>
          <Send size={16} />
        </button>
      </div>
    </motion.div>
  );
}
```

**Step 4: Run and verify**

```bash
npm run dev
# Visit http://localhost:3000/hub
# Click quick action buttons and verify chat responses appear
```

**Step 5: Commit**

```bash
git add components/hub/chat-module.tsx components/hub/chat-message.tsx lib/data/mock-messages.ts
git commit -m "feat: implement AI chat assistant with operational, sales, and system intelligence"
```

---

## Task 5: Build Smart Alerts Module

**Files:**
- Create: `components/hub/alerts-module.tsx`
- Create: `lib/data/mock-alerts.ts` (alert data)
- Create: `components/hub/alert-item.tsx` (individual alert)

**Step 1: Create mock alerts**

Create `lib/data/mock-alerts.ts`:

```typescript
export interface Alert {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  timestamp: Date;
  action: string;
  status: "unresolved" | "resolved";
  category: "delay" | "capacity" | "quality" | "revenue";
}

export const MOCK_ALERTS: Alert[] = [
  {
    id: "ALERT-024",
    severity: "critical",
    title: "Warehouse Capacity Alert",
    description: "Toronto hub at 94% capacity. Incoming shipment of 850 units in 2 hours.",
    timestamp: new Date(Date.now() - 5 * 60000),
    action: "Activate overflow protocol",
    status: "unresolved",
    category: "capacity",
  },
  {
    id: "ALERT-023",
    severity: "warning",
    title: "Route Delay Detected",
    description: "Transport 003 (Winnipeg route) 45min behind schedule due to weather.",
    timestamp: new Date(Date.now() - 15 * 60000),
    action: "Notify customer & adjust ETA",
    status: "unresolved",
    category: "delay",
  },
  {
    id: "ALERT-022",
    severity: "warning",
    title: "Quality Issue Flagged",
    description: "Package damage rate in Toronto hub 8.2% (target: <5%). AI detected labeling issue.",
    timestamp: new Date(Date.now() - 30 * 60000),
    action: "Retrain staff on labeling SOP",
    status: "unresolved",
    category: "quality",
  },
  {
    id: "ALERT-021",
    severity: "info",
    title: "Revenue Opportunity",
    description: "EcoShip Inc. expanded contract negotiation detected. Upsell potential: $180k.",
    timestamp: new Date(Date.now() - 45 * 60000),
    action: "Contact account manager",
    status: "unresolved",
    category: "revenue",
  },
  {
    id: "ALERT-020",
    severity: "info",
    title: "System Optimization",
    description: "Peak load forecasted 2pm-4pm. Recommend pre-scaling API servers.",
    timestamp: new Date(Date.now() - 60 * 60000),
    action: "Execute scaling plan",
    status: "resolved",
    category: "delay",
  },
];

export const SEVERITY_COLORS: Record<Alert["severity"], string> = {
  critical: "bg-red-500/20 border-red-500/30 text-red-400",
  warning: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
  info: "bg-blue-500/20 border-blue-500/30 text-blue-400",
};

export const SEVERITY_ICONS: Record<Alert["severity"], string> = {
  critical: "🚨",
  warning: "⚠️",
  info: "ℹ️",
};
```

**Step 2: Create alert item component**

Create `components/hub/alert-item.tsx`:

```typescript
"use client";

import { motion } from "motion/react";
import { Alert, SEVERITY_COLORS, SEVERITY_ICONS } from "@/lib/data/mock-alerts";
import { CheckCircle2, ChevronRight } from "lucide-react";

interface AlertItemProps {
  alert: Alert;
  index: number;
  onResolve: (id: string) => void;
}

export function AlertItem({ alert, index, onResolve }: AlertItemProps) {
  const timeAgo = Math.round((Date.now() - alert.timestamp.getTime()) / 60000);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`p-3 rounded-lg border transition ${
        alert.status === "resolved"
          ? "bg-white/5 border-white/10 opacity-60"
          : SEVERITY_COLORS[alert.severity]
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2 flex-1">
          <span className="text-lg flex-shrink-0">{SEVERITY_ICONS[alert.severity]}</span>
          <div className="flex-1">
            <h4 className="font-montserrat font-semibold text-white text-sm">
              {alert.title}
            </h4>
            <p className="text-xs text-white/60 mt-1">{alert.description}</p>
          </div>
        </div>

        {alert.status === "resolved" && (
          <CheckCircle2 size={18} className="text-green-primary flex-shrink-0 mt-1" />
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/50">{timeAgo}m ago</span>

        {alert.status === "unresolved" && (
          <button
            onClick={() => onResolve(alert.id)}
            className="text-xs font-bold text-white/70 hover:text-white flex items-center gap-1 transition"
          >
            {alert.action}
            <ChevronRight size={14} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
```

**Step 3: Create Alerts Module**

Create `components/hub/alerts-module.tsx`:

```typescript
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MOCK_ALERTS, Alert } from "@/lib/data/mock-alerts";
import { AlertItem } from "./alert-item";
import { AlertCircle, TrendingDown } from "lucide-react";

export function AlertsModule() {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);

  const handleResolve = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, status: "resolved" as const } : alert
      )
    );
  };

  const unresolvedCount = alerts.filter((a) => a.status === "unresolved").length;
  const criticalCount = alerts.filter(
    (a) => a.status === "unresolved" && a.severity === "critical"
  ).length;

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="mb-4 pb-4 border-b border-white/10">
        <h2 className="font-montserrat font-bold text-white text-lg mb-2">
          Smart Alerts Center
        </h2>
        <p className="text-xs text-white/50">AI-detected anomalies & opportunities</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <div className="text-xs text-white/50 mb-1 flex items-center gap-1">
            <AlertCircle size={12} /> Active Alerts
          </div>
          <div className="font-montserrat font-bold text-white">
            {unresolvedCount}
            {criticalCount > 0 && (
              <span className="text-red-400 ml-2">({criticalCount} critical)</span>
            )}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <div className="text-xs text-white/50 mb-1 flex items-center gap-1">
            <TrendingDown size={12} /> Resolution Rate
          </div>
          <div className="font-montserrat font-bold text-green-bright">
            {Math.round(
              ((alerts.length - unresolvedCount) / alerts.length) * 100
            )}
            %
          </div>
        </div>
      </div>

      {/* Alert list */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {alerts
          .sort((a, b) => {
            // Unresolved first, then by severity, then by timestamp
            if (a.status !== b.status) return a.status === "unresolved" ? -1 : 1;
            const severityOrder = { critical: 0, warning: 1, info: 2 };
            if (severityOrder[a.severity] !== severityOrder[b.severity]) {
              return severityOrder[a.severity] - severityOrder[b.severity];
            }
            return b.timestamp.getTime() - a.timestamp.getTime();
          })
          .map((alert, i) => (
            <AlertItem
              key={alert.id}
              alert={alert}
              index={i}
              onResolve={handleResolve}
            />
          ))}
      </div>
    </motion.div>
  );
}
```

**Step 4: Run and verify**

```bash
npm run dev
# Visit http://localhost:3000/hub
# Click action buttons on alerts to resolve them
```

**Step 5: Commit**

```bash
git add components/hub/alerts-module.tsx components/hub/alert-item.tsx lib/data/mock-alerts.ts
git commit -m "feat: build smart alerts center with severity filtering and action resolution"
```

---

## Task 6: Polish & Animations

**Files:**
- Modify: `components/hub/hub-header.tsx` (add live clock)
- Create: `components/hub/module-container.tsx` (wrapper for consistent styling)
- Modify: CSS/Tailwind for hover effects

**Step 1: Create module container wrapper**

Create `components/hub/module-container.tsx`:

```typescript
"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface ModuleContainerProps {
  children: ReactNode;
  delay?: number;
}

export function ModuleContainer({ children, delay = 0 }: ModuleContainerProps) {
  return (
    <motion.div
      className="h-full bg-gradient-to-br from-near-black to-dark-surface rounded-xl border border-white/10 p-5 backdrop-blur-sm hover:border-green-primary/30 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ borderColor: "rgba(34,197,94,0.5)" }}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Update hub page to use container wrapper**

Modify `app/hub/page.tsx` - wrap each module:

```typescript
// Change:
<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
  <MapModule />
</motion.div>

// To:
<ModuleContainer delay={0.1}>
  <MapModule />
</ModuleContainer>
```

(Do this for all 4 modules)

**Step 3: Add live clock update**

Update `components/hub/hub-header.tsx` to refresh time every second:

```typescript
"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Zap, Clock } from "lucide-react";

export function HubHeader() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    );

    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="px-6 py-4 max-w-[1920px] mx-auto">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-primary to-green-bright flex items-center justify-center">
              <Zap className="w-6 h-6 text-black" strokeWidth={3} />
            </div>
            <div>
              <h1 className="font-montserrat font-bold text-lg text-white">
                TOLUM Operations Hub
              </h1>
              <p className="text-xs text-white/40">AI-Powered Logistics Dashboard</p>
            </div>
          </div>

          {/* Live indicator + Time */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-primary/10 border border-green-primary/30">
              <div className="w-2 h-2 rounded-full bg-green-primary animate-pulse" />
              <span className="text-xs font-inter text-green-bright tracking-widest uppercase">
                Live
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/50 text-xs font-inter">
              <Clock size={14} />
              <span className="w-16">{time || "00:00:00"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
```

**Step 4: Test all interactions**

```bash
npm run dev
# Verify:
# - Header displays live clock updating every second
# - All 4 modules appear with staggered animations
# - Hover effects on module containers
# - Chat quick buttons work
# - Alert resolution works
# - Sales scores update periodically
# - Map routes animate
```

**Step 5: Commit**

```bash
git add components/hub/module-container.tsx app/hub/page.tsx components/hub/hub-header.tsx
git commit -m "feat: add module container wrapper, live clock, and polish animations"
```

---

## Task 7: Responsive & Dark Mode

**Files:**
- Modify: Global CSS for dark mode support
- Modify: All modules for mobile responsiveness
- Test: Mobile layout at 375px width

**Step 1: Add mobile responsive tweaks**

Update all modules' grid breakpoints from `lg:grid-cols-2` to handle mobile:

In `app/hub/page.tsx`:

```typescript
// Change from:
className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10"

// Mobile will show 1 column, desktop 2 columns - this is already correct!
```

For individual stat cards, ensure they stack on mobile:

In all `*-module.tsx` files, change:

```typescript
// From: grid-cols-3 or grid-cols-2
// To: responsive versions:
className="grid grid-cols-2 lg:grid-cols-3 gap-2"
```

**Step 2: Test mobile responsiveness**

```bash
npm run dev
# Open DevTools (F12)
# Set viewport to iPhone SE (375px)
# Verify:
# - All text readable
# - No horizontal scroll
# - Stacked layout on mobile
# - Charts/maps responsive
```

**Step 3: Verify dark mode (already implemented)**

The entire site is dark mode (black background). No changes needed.

**Step 4: Commit**

```bash
git add -A  # Include any responsive tweaks
git commit -m "feat: ensure mobile responsiveness and dark mode across all modules"
```

---

## Task 8: Final Testing & Polish

**Files:**
- Test: Full hub flow
- Verify: TOLUM branding consistency
- Verify: Performance (no console errors)

**Step 1: Full integration test**

```bash
npm run dev
# Visit http://localhost:3000/hub
# Verify each module independently:

## Map Module:
# - SVG renders without errors
# - Truck positions update
# - Stats display correctly
# - Routes show accurate coordinates

## Sales Module:
# - Lead cards display
# - AI scores animate on load
# - Scores update periodically
# - Quick action buttons visible

## Chat Module:
# - Initial message displays
# - Quick query buttons clickable
# - AI responses appear with animation
# - Typing animation works

## Alerts Module:
# - All alerts display with correct severity colors
# - Action buttons resolve alerts
# - Stats update correctly
# - Timestamps format properly
```

**Step 2: Branding compliance check**

```
✓ Colors: All green shades match #22c55e, #4ade80, #16a34a
✓ Fonts: Montserrat for headers, Inter for body
✓ Dark theme: Black backgrounds with subtle borders
✓ Glows: Green glow effects on interactions
✓ Animations: Smooth Framer Motion transitions
✓ Icons: Lucide React icons consistent
✓ Spacing: Consistent padding/margins throughout
```

**Step 3: Performance audit**

```bash
# Open DevTools Console (F12)
# Verify:
# - No console errors
# - No warning messages
# - Network requests: only JS/CSS/fonts (no external APIs)
# - Performance: animations smooth (60fps)
```

**Step 4: Cross-browser test (optional but recommended)**

```
- Chrome: ✓
- Firefox: ✓
- Safari: ✓
- Mobile Safari (iOS): ✓
```

**Step 5: Final commit**

```bash
git add -A
git commit -m "test: final integration testing and branding verification for AI Operations Hub"
```

---

## Task 9: Documentation & Deployment Ready

**Files:**
- Create: `README.md` for hub section
- Update: Main README to reference hub route

**Step 1: Create hub documentation**

Create `docs/HUB_README.md`:

```markdown
# TOLUM AI Operations Hub

A premium, frontend-only AI operations dashboard showcasing four intelligent modules:

1. **Live Operations Map** — Real-time truck tracking with route optimization
2. **AI Sales Panel** — Lead scoring and pipeline management
3. **TOLUM AI Assistant** — Conversational intelligence for ops/sales/system queries
4. **Smart Alerts Center** — AI-detected anomalies and opportunities

## Architecture

- **Frontend-only**: All data is mocked and procedurally generated
- **No backend**: Zero API calls required for demo purposes
- **Real-time updates**: Simulated live data refresh every 3-4 seconds per module
- **100% responsive**: Mobile-first design, works at any resolution

## Tech Stack

- Next.js 15 (App Router)
- React 19 with TypeScript
- Tailwind CSS (TOLUM theme)
- Framer Motion
- Lucide React icons
- shadcn/ui (utility components)

## Running

```bash
npm run dev
# Navigate to http://localhost:3000/hub
```

## Branding

- Primary Green: #22c55e
- Accent Green: #4ade80
- Background: #000000
- Border: rgba(255,255,255,0.06)
- Fonts: Montserrat (headers) + Inter (body)

## Future Enhancements

- Backend API integration (replace mock data)
- Real map integration (Google Maps / Mapbox)
- Live chat with actual AI (e.g., Claude API)
- Database persistence
- User authentication
```

**Step 2: Update root README**

Add section to main project README pointing to `/hub` route.

**Step 3: Final commit**

```bash
git add docs/HUB_README.md
git commit -m "docs: add AI Operations Hub documentation"
```

---

## Task 10: Video Demo Checklist

**Pre-recording preparation:**

- [ ] Clear browser cache & cookies
- [ ] Set viewport to 1920x1200 (premium widescreen)
- [ ] Disable notifications
- [ ] Record at 60fps
- [ ] Test audio (no background noise)
- [ ] Write demo script:
  - "This is TOLUM AI Operations Hub — a real-time dashboard showing how AI transforms logistics"
  - Show each module, explain the feature
  - Interact with chat, click alerts, highlight key metrics
  - Emphasize the premium design & realtime updates

**Recording flow:**

1. Load hub at `/hub`
2. Pan across all 4 modules (5 sec each)
3. Demo map (show truck movements)
4. Demo sales (click quick queries)
5. Demo chat (ask operational question)
6. Demo alerts (resolve one alert)
7. Show responsive on phone
8. Fade out

---

## Summary

This plan delivers a **premium, fully-functional AI Operations Hub** in 10 focused tasks. Each task is actionable, includes exact code, and commits frequently. The result is a YouTube-ready demo that showcases how AI can transform logistics operations — without any backend dependencies.

**Total estimated time:** 4-6 hours for implementation + 1 hour for recording/editing.

**Next steps:** Start with Task 1, execute each task sequentially, commit after each task, and verify all interactions work before final demo.

---
