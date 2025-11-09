# Design Guidelines: AI Aircraft Model Generator

## Design Approach
**Reference-Based Approach** drawing inspiration from modern 3D and AI tools:
- **Spline/Sketchfab**: Clean 3D viewer interfaces with contextual controls
- **Midjourney/Runway**: Sleek AI prompt interfaces with generation feedback
- **Linear**: Precise typography and spatial organization

**Core Principle**: Create a professional aerospace-grade tool that feels cutting-edge and trustworthy, with the 3D viewer as the hero element.

## Typography System
- **Primary Font**: Inter (Google Fonts) - clean, technical readability
- **Accent Font**: JetBrains Mono (Google Fonts) - for model IDs and technical specifications
- **Hierarchy**:
  - Hero/H1: text-5xl font-bold
  - Section Headers: text-2xl font-semibold
  - Body: text-base font-normal
  - Labels/Captions: text-sm font-medium
  - Technical specs: text-xs font-mono

## Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, and 8 consistently
- Micro spacing: p-2, gap-2
- Standard spacing: p-4, gap-4, m-4
- Section spacing: p-6, py-8
- Major spacing: p-8, py-12

**Grid Structure**: 
- Main viewport: Split-panel layout (40% prompt/controls, 60% 3D viewer on desktop)
- Mobile: Stack vertically with 3D viewer on top

## Page Structure & Components

### Hero Section (Full Viewport)
**Layout**: Immersive 3D showcase with floating prompt interface
- Full-height container (min-h-screen) with 3D canvas background showing rotating sample aircraft
- Centered floating card (max-w-2xl) with semi-transparent backdrop blur
- Prominent prompt input field with generate button
- Tagline above: "Transform Words into Aircraft" (text-3xl font-bold)
- Subtle example prompts below input (text-sm)

**Image**: Background 3D canvas with pre-rendered aircraft silhouettes in subtle motion

### Main Application Interface
**Left Panel - Prompt & Control Zone** (w-full lg:w-2/5):
- Prompt textarea with character count (h-32, rounded-lg border-2)
- Generate button (w-full, py-3, text-lg font-semibold)
- Generation status indicator with progress animation
- Model library grid below (grid-cols-2 gap-3)
  - Aircraft thumbnail cards with type labels
  - Quick-load functionality

**Right Panel - 3D Viewer** (w-full lg:w-3/5):
- Full-height canvas container (h-screen sticky top-0)
- Floating control overlay (top-right):
  - View angle presets (Front/Side/Top buttons)
  - Zoom controls
  - Reset view
- Bottom toolbar with:
  - Download dropdown (GLB/GLTF/OBJ options)
  - Share model button
  - Model info display (polygon count, vertices)

### Customization Panel
**Expandable Sidebar** (w-80, slide-in from right):
- Accordion sections for:
  - Colors & Materials (swatches grid-cols-6 gap-2)
  - Scale & Dimensions (range sliders)
  - Detail Level (radio button group)
  - Lighting (preset options)
- Apply/Reset buttons at bottom

### Footer
Compact technical footer with:
- Model format info
- Keyboard shortcuts reference
- Export limitations notice
- Logo and minimal navigation

## Component Library

**Buttons**:
- Primary (Generate): Large, bold with subtle shadow
- Secondary: Outlined variant for less critical actions
- Icon buttons: Square (w-10 h-10) for toolbar controls

**Input Fields**:
- Textarea: Large, rounded corners (rounded-xl), visible focus ring
- Search: Compact with icon prefix for model library filter

**Cards**:
- Model thumbnails: Aspect-ratio-square with hover lift effect
- Floating panels: Backdrop blur with border, rounded-2xl

**Icons**: Font Awesome for UI controls (3D cube, download, share, settings icons)

**Loading States**:
- Spinner for generation: Orbital animation
- Skeleton loaders for model thumbnails: Shimmer effect
- Progress bar for downloads: Linear with percentage

## Animations
**Minimal & Purposeful**:
- 3D model: Smooth rotation on user interaction only (no auto-spin)
- Panel transitions: Slide-in/out (300ms ease-in-out)
- Button feedback: Scale on click (scale-95)
- Generation status: Pulsing dot indicator
- No scroll-triggered animations

## Accessibility
- High contrast ratios for all text over backgrounds
- Focus visible states on all interactive elements (ring-2)
- Keyboard navigation for 3D viewer controls (arrow keys, +/- zoom)
- Alt descriptions for generated models
- ARIA labels for icon-only buttons

## Responsive Breakpoints
- Mobile (base): Single column, 3D viewer 60vh height
- Tablet (md): Stacked with increased viewer height (70vh)
- Desktop (lg): Side-by-side split panel layout
- Wide (xl): Expand 3D viewer further, floating controls

## Image Requirements
1. **Hero Background**: Abstract 3D wireframe aircraft renders in motion (low-opacity overlay)
2. **Model Library Thumbnails**: Pre-rendered isometric views of each aircraft type
3. **Empty State**: Placeholder graphic for 3D viewer before generation

This design balances technical precision with creative freedom, positioning the product as a professional-grade AI tool for aircraft design and visualization.