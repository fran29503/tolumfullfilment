# TOLUM AI Operations Hub

> Premium AI-powered logistics dashboard. Real-time truck tracking, lead intelligence, AI assistant, and smart alerts for operations teams.

## Overview

TOLUM Operations Hub is a **frontend-only demonstration dashboard** showcasing a modern, premium interface for logistics operations. Built with Next.js 15, React 19, Tailwind CSS, and Framer Motion, it features four interactive modules with real-time mock data updates and smooth animations.

### Features

- **Live Operations Map** – Real-time truck tracking with interactive SVG visualization, route animations, and logistics metrics
- **AI Sales Panel** – Lead pipeline intelligence with engagement scoring, win probability, and conversion tracking
- **TOLUM AI Assistant** – Conversational interface with real-time message updates and operational insights
- **Smart Alerts Center** – Color-coded alerts (critical, warning, info, success) with actionable notifications
- **Premium Animations** – Staggered entrance animations, live indicators, and responsive glass-morphism UI
- **Dark Theme** – High-contrast dark mode with green (#22c55e) accent colors for premium aesthetics
- **Fully Responsive** – Mobile-first design optimized for all viewport sizes

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) + React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 + Custom Green Theme |
| **Animations** | Framer Motion 12 |
| **Components** | Shadcn/ui + Lucide React Icons |
| **Data** | Mock data generators (real-time simulation) |

## Project Structure

```
tolum_proyecto/
├── app/
│   ├── hub/
│   │   └── page.tsx              # Main hub page with 2-column grid
│   └── layout.tsx
├── components/
│   └── hub/
│       ├── module-container.tsx  # Reusable animation wrapper
│       ├── hub-header.tsx         # Header with LIVE badge & clock
│       ├── map-module.tsx         # Live Operations Map
│       ├── sales-module.tsx       # AI Sales Panel
│       ├── chat-module.tsx        # TOLUM AI Assistant
│       ├── alerts-module.tsx      # Smart Alerts Center
│       ├── map-canvas.tsx         # SVG truck tracking visualization
│       ├── lead-card.tsx          # Sales pipeline card
│       ├── chat-message.tsx       # Chat message component
│       └── alert-item.tsx         # Alert notification card
├── lib/
│   └── data/
│       ├── mock-leads.ts          # Sales lead data + updater
│       ├── mock-messages.ts       # Chat messages + updater
│       ├── mock-routes.ts         # Truck routes + updater
│       └── mock-alerts.ts         # Alerts + updater
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+ (uses 20+ recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Server will run on `http://localhost:3000`

### Build for Production

```bash
# Build the application
npm run build

# Preview production build locally
npm run start
```

## Key Architecture Decisions

### Real-Time Data Updates
Each module updates its mock data at different intervals to simulate realistic operations:
- **Map Module**: Updates every 3 seconds (truck locations, route progress)
- **Sales Module**: Updates every 2 seconds (lead engagement, probability)
- **Chat Module**: Updates every 4 seconds (assistant messages)
- **Alerts Module**: Updates every 3 seconds (new notifications)

### Component Structure
- **ModuleContainer**: Reusable wrapper providing consistent entrance animations with configurable delays
- **Module Components**: Self-contained with their own state, data updates, and statistics calculations
- **Server Components**: Maximum server-side rendering in layout; client-side interactivity only where needed

### Styling Philosophy
- **Glass Morphism**: `border-white/10 bg-black/40 backdrop-blur-sm` creates premium frosted glass effect
- **Color Scheme**: Black backgrounds with white text/borders; green (#22c55e) for primary actions and live indicators
- **Responsive Grid**: `grid-cols-1 lg:grid-cols-2` ensures single-column mobile, 2-column desktop (1024px+)
- **Animations**: All entrance animations use staggered 0.1-0.4s delays from `ModuleContainer`

## Features in Detail

### Hub Header
- TOLUM logo with green icon
- "Operations Hub" title
- Live status badge (green dot + "LIVE" text)
- Real-time clock (HH:MM:SS format)
- Premium typography with tracking

### Live Operations Map
- SVG-based truck visualization
- Animated route lines with gradient colors
- 3D perspective circles for truck positions
- Real-time metrics: Total Packages, Active Routes, Delayed count
- Live update indicator

### AI Sales Panel
- Horizontal scrolling carousel of lead cards
- Lead details: company, contact, status, engagement %, win probability %
- Progress bars for engagement visualization
- Statistics: Pipeline value ($M), Conversion count, Avg win probability
- Status badges: New, Qualified, Negotiating, Converted
- 2-second refresh updates all stats dynamically

### TOLUM AI Assistant
- Message feed with auto-scroll to latest message
- Sender differentiation (AI vs human avatars)
- Timestamps for all messages
- Message statistics: Total, AI count, User count
- ReadOnly input placeholder
- 4-second message updates

### Smart Alerts Center
- Type-based color coding:
  - 🟢 **Green (success)**: SLA Met, Lead Converted
  - 🟡 **Yellow (warning)**: Resource Low, Capacity Alert
  - 🔴 **Red (critical)**: System Alert, Network Issues
  - 🔵 **Blue (info)**: Status Updates
- Alert details with timestamps ("just now", "1m ago")
- "Take Action" buttons on actionable alerts
- Statistics: Critical count, Warnings count, Unread count
- 3-second refresh updates alert list

## Responsive Design

### Mobile (< 768px)
- Single column layout
- Full-width modules
- Touch-friendly spacing

### Tablet (768px - 1024px)
- Single column layout
- Slightly larger touch targets
- Optimized padding

### Desktop (1024px+)
- 2-column grid layout
- Top: Map + Sales
- Bottom: Chat + Alerts
- Gap: 24px spacing

## Performance Considerations

- **Code Splitting**: Next.js automatically splits route-based code
- **Image Optimization**: All icons are SVG (zero rasterization)
- **Animation Performance**: Framer Motion uses GPU-accelerated transforms
- **Re-render Optimization**: Module state updates are isolated; one module's update doesn't trigger sibling re-renders
- **Bundle Size**: ~200KB gzipped (Next.js + React + Framer Motion + Tailwind)

## Deployment

### Vercel (Recommended)

```bash
# Push to main branch triggers auto-deploy
git push origin main
```

### Docker
The project includes a simple Dockerfile for containerization:

```bash
docker build -t tolum-hub .
docker run -p 3000:3000 tolum-hub
```

### Environment Variables
Currently, no environment variables are required. Mock data is hardcoded in `/lib/data/*.ts` files.

## Development Guidelines

### Adding New Modules
1. Create component at `components/hub/[module-name].tsx`
2. Implement real-time updates using `setInterval()`
3. Wrap in `<ModuleContainer>` with unique `delay` prop
4. Add to hub page grid
5. Ensure consistent styling with existing modules

### Updating Mock Data
Mock data generators are in `/lib/data/`. Each file exports:
- **Interface**: Type definition (e.g., `Lead`, `ChatMessage`)
- **MOCK_[DATA]**: Initial data array
- **updateMock[Data]()**: Function to simulate real-time changes

### Color Customization
- Primary green: `#22c55e` (Tailwind `green-600`)
- Bright green: `#84cc16` (custom `green-bright`)
- Modify `tailwind.config.ts` to change theme

## Video Demo Checklist

Before recording video demonstrations, verify:
- [ ] All 4 modules visible and animating
- [ ] Live indicators pulsing on all modules
- [ ] Header clock updating in real-time
- [ ] Real-time data changes visible every few seconds
- [ ] Responsive layout works on target devices
- [ ] No console errors (F12)
- [ ] No unused console.logs in code
- [ ] All animations smooth (60 FPS)
- [ ] Dark theme displays correctly on camera
- [ ] Text is readable at target resolution

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Build Fails
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Styles Not Applying
- Verify Tailwind CSS is compiled: `npm run build`
- Check that `tailwind.config.ts` hasn't been modified incorrectly
- Ensure all Tailwind classes use standard naming (no spaces)

## Future Enhancements

Potential additions (not in current scope):
- Real API integration instead of mock data
- WebSocket real-time updates
- User authentication & authorization
- Data persistence with database
- Customizable dashboard layouts
- Export/report generation
- Dark/light mode toggle
- Internationalization (i18n)
- Advanced charting with Chart.js or Recharts

## License

This is a proprietary demonstration project. Unauthorized reproduction prohibited.

## Support

For technical questions or issues, contact the development team.

---

**Built with ❤️ for premium operations dashboards**
*Last Updated: March 2026*
