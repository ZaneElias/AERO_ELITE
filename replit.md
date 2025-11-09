# AeroElite Designer - AI Aircraft Model Generator

## Overview
AeroElite Designer is a professional web application that generates 3D aircraft models from text prompts using AI. Users describe their desired aircraft, and the AI intelligently selects the best matching model from a curated library of 12 aircraft types, displaying it in an interactive 3D viewer. Users can save models to a persistent gallery and export them in multiple 3D formats.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **3D Rendering**: Three.js, React Three Fiber, React Three Drei
- **Backend**: Express.js, Node.js
- **AI Integration**: OpenAI GPT-5 via Replit AI Integrations
- **State Management**: TanStack Query (React Query v5)
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Validation**: Zod schemas
- **Storage**: Database persistence for saved models, in-memory for aircraft library

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

5. **Persistent User Gallery**
   - Save customized aircraft models to database
   - View all saved models in dedicated gallery page
   - Edit/rename saved models
   - Delete unwanted models
   - 3D preview of selected models
   - Persistent storage with PostgreSQL

6. **3D Model Export System**
   - Export procedural models in 4 formats:
     - **GLB**: Binary GLTF with materials and colors (best for web/game engines)
     - **GLTF**: JSON format with materials (human-readable, good for debugging)
     - **OBJ**: Geometry only, widely compatible with 3D software
     - **STL**: Geometry only, ideal for 3D printing
   - Client-side export using Three.js official exporters
   - Automatic file downloads with proper naming
   - Format comparison and selection UI

7. **Beautiful UI/UX**
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
│   │   │   ├── aircraft-viewer-3d.tsx    # 3D model viewer with export support
│   │   │   ├── hero-section.tsx          # Landing section with prompt input
│   │   │   ├── model-library.tsx         # Aircraft library grid
│   │   │   ├── customization-panel.tsx   # Model customization controls
│   │   │   ├── export-panel.tsx          # 3D model export UI
│   │   │   ├── generation-result.tsx     # AI analysis display
│   │   │   ├── theme-provider.tsx        # Dark mode provider
│   │   │   ├── theme-toggle.tsx          # Theme toggle button
│   │   │   └── ui/                       # shadcn components
│   │   ├── hooks/
│   │   │   └── use-model-exporter.ts     # Export state management hook
│   │   ├── lib/
│   │   │   └── model-export.ts           # Three.js export utilities
│   │   ├── pages/
│   │   │   ├── home.tsx                  # Main application page
│   │   │   ├── gallery.tsx               # User gallery with saved models
│   │   │   └── not-found.tsx             # 404 page
│   │   ├── App.tsx                       # App root with routing
│   │   └── index.css                     # Global styles & design tokens
│   └── index.html                        # HTML entry point
├── server/
│   ├── routes.ts                         # API routes (aircraft + saved models)
│   ├── storage.ts                        # Database + in-memory storage layer
│   ├── db.ts                             # Drizzle database connection
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

### GET `/api/saved-models`
Returns all saved aircraft models for the user.

**Response:**
```json
{
  "models": [{ "id": "...", "name": "...", "baseModelId": "...", "customizations": {...}, ... }],
  "total": 5
}
```

### POST `/api/saved-models`
Saves a new aircraft model to the database.

**Request:**
```json
{
  "name": "My Custom F-35",
  "baseModelId": "uuid",
  "customizations": { "color": "#ff0000", "scale": 1.5, ... },
  "generationId": "uuid"
}
```

### PATCH `/api/saved-models/:id`
Updates a saved model (currently supports name changes).

**Request:**
```json
{
  "name": "Updated Model Name"
}
```

### DELETE `/api/saved-models/:id`
Deletes a saved model from the database.

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

### SavedModel
- `id`: Unique identifier
- `name`: User-provided name
- `baseModelId`: Reference to aircraft model
- `customizations`: JSON object with color, scale, metalness, roughness
- `generationId`: Optional reference to original generation
- `createdAt`: Timestamp
- `updatedAt`: Last modification timestamp

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

1. **Procedural Models**: 3D models are currently procedural geometric representations rather than actual GLB files. Each of the 12 aircraft has a unique procedural geometry design - no two models look the same. Models are distinguished by their specific name (F-35, F-22, SR-71, etc.), not just by type category.

2. **Export Formats**: While all 4 formats (GLB, GLTF, OBJ, STL) are supported, OBJ and STL export geometry only (no materials/colors). GLB and GLTF preserve materials and colors.

3. **WebGL Requirement**: The 3D viewer and export functionality require WebGL support. Headless environments may not support these features.

## Completed Features ✅

1. ~~**Database Persistence**: Move from in-memory to PostgreSQL~~ - Completed with saved models table
2. ~~**Model Export**: Enable downloading in GLB, GLTF, OBJ, and STL formats~~ - Completed with ExportPanel
3. ~~**User Gallery**: Save and manage customized models~~ - Completed with full CRUD operations

## Future Enhancements

1. **Real GLB Models**: Load actual 3D aircraft models from GLB files
2. **User Accounts**: Multi-user authentication and private galleries
3. **More Aircraft**: Expand library with dozens of additional models
4. **Advanced Customization**: Wing adjustments, engine configurations, livery designs
5. **True Procedural Generation**: AI-generated geometries from descriptions
6. **AR Preview**: View models in augmented reality
7. **Collaboration**: Real-time collaborative editing and sharing

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
