# AeroElite Designer - AI Aircraft Model Generator

## Overview
AeroElite Designer is a professional web application that generates 3D aircraft models from text prompts using AI. Users describe their desired aircraft, and the AI intelligently selects the best matching model from a curated library of 12 aircraft types, displaying it in an interactive 3D viewer.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **3D Rendering**: Three.js, React Three Fiber, React Three Drei
- **Backend**: Express.js, Node.js
- **AI Integration**: OpenAI GPT-5 via Replit AI Integrations
- **State Management**: TanStack Query (React Query v5)
- **Validation**: Zod schemas
- **Storage**: In-memory storage (MemStorage)

## Features

### Core Features
1. **AI-Powered Aircraft Selection**
   - Natural language prompt input
   - GPT-5 analyzes descriptions and selects best-matching aircraft type
   - Intelligent tag-based matching for precise model selection
   - Detailed AI reasoning provided for each generation

2. **Interactive 3D Viewer**
   - Real-time 3D model rendering with Three.js
   - Interactive orbit controls (click and drag to rotate, scroll to zoom)
   - Smooth auto-rotation
   - Professional lighting with shadows and environment mapping
   - Procedural aircraft models for all 5 categories

3. **Aircraft Library**
   - 12 pre-configured aircraft models across 5 categories:
     - **Fighter**: F-35 Lightning II, F-22 Raptor, SR-71 Blackbird
     - **Commercial**: Boeing 737 MAX, Airbus A380
     - **Helicopter**: AH-64 Apache, Bell 206 JetRanger
     - **Private**: Cessna Citation X, Gulfstream G650, Learjet 75
     - **Cargo**: C-130 Hercules, Boeing 747-8F
   - Detailed specifications for each model
   - Tag-based categorization
   - Grid view with type badges and descriptions

4. **Customization Panel**
   - 8 preset color options
   - Scale adjustment (0.5x to 2x)
   - Material properties:
     - Metalness (0% to 100%)
     - Roughness (0% to 100%)
   - Real-time preview of all changes
   - Reset to defaults functionality

5. **Beautiful UI/UX**
   - Modern aerospace-themed design
   - Smooth animations and transitions
   - Dark mode support
   - Fully responsive layout (mobile, tablet, desktop)
   - Professional color scheme with excellent contrast
   - Inter font for UI, JetBrains Mono for technical text

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── aircraft-viewer-3d.tsx    # 3D model viewer
│   │   │   ├── hero-section.tsx          # Landing section with prompt input
│   │   │   ├── model-library.tsx         # Aircraft library grid
│   │   │   ├── customization-panel.tsx   # Model customization controls
│   │   │   ├── generation-result.tsx     # AI analysis display
│   │   │   ├── theme-provider.tsx        # Dark mode provider
│   │   │   ├── theme-toggle.tsx          # Theme toggle button
│   │   │   └── ui/                       # shadcn components
│   │   ├── pages/
│   │   │   ├── home.tsx                  # Main application page
│   │   │   └── not-found.tsx             # 404 page
│   │   ├── App.tsx                       # App root with routing
│   │   └── index.css                     # Global styles & design tokens
│   └── index.html                        # HTML entry point
├── server/
│   ├── routes.ts                         # API routes
│   ├── storage.ts                        # In-memory storage with default models
│   └── openai.ts                         # OpenAI integration
├── shared/
│   └── schema.ts                         # Shared TypeScript types and Zod schemas
└── design_guidelines.md                  # Design system documentation

```

## API Endpoints

### GET `/api/aircraft/library`
Returns all available aircraft models.

**Response:**
```json
{
  "models": [{ "id": "...", "name": "...", "type": "...", ... }],
  "total": 12
}
```

### POST `/api/aircraft/generate`
Analyzes a prompt and returns the best matching aircraft.

**Request:**
```json
{
  "prompt": "A fast military fighter jet with stealth capabilities"
}
```

**Response:**
```json
{
  "modelId": "uuid",
  "model": { ... },
  "aiAnalysis": "This is a fighter jet because...",
  "generationId": "uuid"
}
```

### GET `/api/aircraft/:id`
Returns a specific aircraft model by ID.

## Data Models

### AircraftModel
- `id`: Unique identifier
- `name`: Aircraft name
- `type`: Category (fighter, commercial, helicopter, private, cargo)
- `description`: Detailed description
- `modelPath`: Path to 3D model file (currently procedural)
- `thumbnailPath`: Optional thumbnail image
- `tags`: Array of descriptive tags
- `specifications`: Technical specs (wingspan, length, maxSpeed, etc.)

### Generation
- `id`: Unique identifier
- `prompt`: User's input prompt
- `selectedModelId`: ID of selected aircraft
- `aiResponse`: AI's reasoning
- `customizations`: Applied customizations
- `createdAt`: Timestamp

## Design System

### Colors
- **Primary**: Blue (#3b82f6) - professional aerospace theme
- **Background**: Light gray in light mode, dark navy in dark mode
- **Accent**: Subtle blue-gray for cards and panels
- **Text**: High contrast for accessibility

### Typography
- **Primary**: Inter - clean, modern sans-serif
- **Mono**: JetBrains Mono - for technical specifications

### Spacing
- Consistent 4/8/16/24px spacing units
- Generous padding for readability
- Balanced white space

## Current Limitations

1. **Procedural Models**: 3D models are currently procedural geometric representations rather than actual GLB files. Each aircraft type (fighter, commercial, helicopter, private, cargo) has a unique procedural design, but they don't load external model files yet.

2. **Download Feature**: Model download is disabled pending GLB asset implementation.

3. **In-Memory Storage**: Data is not persisted between server restarts.

## Future Enhancements

1. **Real GLB Models**: Load actual 3D aircraft models from GLB files
2. **Model Export**: Enable downloading in GLB, GLTF, OBJ, and STL formats
3. **Database Persistence**: Move from in-memory to PostgreSQL
4. **User Accounts**: Save generations and favorite models
5. **More Aircraft**: Expand library with dozens of additional models
6. **Advanced Customization**: Wing adjustments, engine configurations, livery designs
7. **AR Preview**: View models in augmented reality
8. **Collaboration**: Share and remix models with other users

## Environment Variables

The OpenAI integration uses Replit AI Integrations:
- `AI_INTEGRATIONS_OPENAI_BASE_URL` - Automatically set by Replit
- `AI_INTEGRATIONS_OPENAI_API_KEY` - Automatically set by Replit

No manual API key configuration required. Charges are billed to Replit credits.

## Development

The application runs on port 5000 with hot module reloading enabled.

```bash
npm run dev
```

## Architecture Decisions

1. **Schema-First Development**: All data models defined in `shared/schema.ts` for frontend/backend consistency
2. **Component-Based Architecture**: Modular, reusable React components
3. **Type Safety**: Full TypeScript coverage with Zod validation
4. **Responsive Design**: Mobile-first approach with desktop enhancements
5. **Dark Mode**: System preference detection with manual override
6. **AI Integration**: OpenAI GPT-5 for intelligent aircraft analysis and matching

## User Journey

1. User lands on hero section with prominent prompt input
2. User describes desired aircraft or clicks example prompt
3. AI analyzes description and selects best matching model
4. 3D viewer displays selected model with auto-rotation
5. User customizes colors, scale, and materials in real-time
6. User explores aircraft library and manually selects different models
7. Each model displays with AI analysis and specifications

## Performance Optimizations

- React Query caching for API responses
- Three.js canvas with optimized rendering
- Lazy loading with Suspense boundaries
- Debounced customization updates
- Efficient re-renders with React.memo where beneficial

## Accessibility

- High contrast color ratios (WCAG AA compliant)
- Keyboard navigation support
- Focus visible states on all interactive elements
- Semantic HTML structure
- ARIA labels for icon-only buttons
- Descriptive alt text and labels

---

**Built with ❤️ using Replit**
