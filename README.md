✈️ AeroElite Designer - AI Aircraft Model Generator
An AI-powered web application that generates interactive 3D aircraft models from natural language descriptions. Built for aviation enthusiasts, designers, students, and 3D printing hobbyists.

🎯 What It Does
Simply describe an aircraft in plain English (e.g., "a fast military stealth fighter"), and AeroElite Designer:

Uses GPT-5 to analyze your description
Intelligently selects the best matching aircraft from a curated library
Displays it in an interactive 3D viewer
Lets you customize colors, materials, and scale in real-time
Saves your creations to a personal gallery
Exports models in multiple 3D formats (GLB, GLTF, OBJ, STL)
No 3D modeling skills required. No expensive software needed.

✨ Features
🤖 AI-Powered Selection
Natural language prompt input
GPT-5 analyzes descriptions and selects best-matching aircraft
Intelligent tag-based scoring system
Detailed reasoning provided for each selection
🎨 Interactive 3D Viewer
Real-time 3D rendering with Three.js
Orbit controls (click and drag to rotate, scroll to zoom)
Auto-rotation mode
Professional lighting with shadows
12 unique procedural aircraft models
⚙️ Real-Time Customization
8 color presets
Scale adjustment (0.5x to 2x)
Material properties (metalness 0-100%, roughness 0-100%)
Instant preview of all changes
💾 Persistent Gallery
Save customized models to database
View all saved models in dedicated gallery page
Edit/rename saved models
Delete unwanted models
3D preview of selected models
📦 Multi-Format Export
GLB - Binary GLTF with materials (best for web/game engines)
GLTF - JSON format with materials (human-readable)
OBJ - Geometry only (universal 3D software compatibility)
STL - Geometry only (ideal for 3D printing)
🌙 Beautiful UI
Modern aerospace-themed design
Dark mode support
Fully responsive (mobile, tablet, desktop)
Smooth animations throughout
🛩️ Aircraft Library
12 aircraft across 5 categories:

Fighter Jets: F-35 Lightning II, F-22 Raptor, SR-71 Blackbird
Commercial: Boeing 737 MAX, Airbus A380
Helicopters: AH-64 Apache, Bell 206 JetRanger
Private Jets: Cessna Citation X, Gulfstream G650, Learjet 75
Cargo: C-130 Hercules, Boeing 747-8F
🛠️ Tech Stack
Frontend
React 18 + TypeScript
Three.js v0.168.0
React Three Fiber v8.17.10
React Three Drei v9.114.3
Tailwind CSS + shadcn/ui
TanStack Query v5
Backend
Express.js
Node.js
PostgreSQL (Neon)
Drizzle ORM
AI Integration
OpenAI GPT-5 via Replit AI Integrations
No API key management needed
🚀 Getting Started
Prerequisites
Node.js 20+
PostgreSQL database
Installation
Clone the repository
git clone <your-repo-url>
cd aeroelite-designer

Install dependencies
npm install

Set up environment variables
# DATABASE_URL is automatically provided by Replit
# AI integration credentials are managed by Replit

Push database schema
npm run db:push

Start the development server
npm run dev

Open in browser
http://localhost:5000

📖 Usage
Generate an Aircraft

Enter a description in the prompt box (e.g., "supersonic commercial airliner")
Click "Generate Aircraft"
View AI analysis and selected model
Customize Your Model

Choose from 8 color presets
Adjust scale with the slider
Fine-tune metalness and roughness
Watch changes apply in real-time
Save to Gallery

Click "Save to Gallery"
Give your model a custom name
Access it anytime from the Gallery page
Export Your Model

Select your desired format (GLB, GLTF, OBJ, or STL)
Click the export button
File downloads automatically
⚠️ Important: Version Compatibility
Critical - Do NOT upgrade these packages without testing:

Three.js: 0.168.0 (exact version required)
React Three Fiber: 8.17.10 (supports Three.js up to r168)
React Three Drei: 9.114.3 (compatible with Fiber v8)
Why? Three.js v0.169+ breaks React Three Fiber v8.17.10, causing runtime crashes. React Three Fiber v9 requires React 19, which would require major refactoring.

🔧 Troubleshooting
"Cannot read properties of undefined (reading 'replit')" Error
Cause: Your browser cached old JavaScript bundles from before the Three.js fix.

Solution:

Hard refresh your browser: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
Or open in private/incognito window
"3D Viewer Unavailable" / "WebGL is not available"
Cause: Replit's embedded webview has iframe restrictions that limit WebGL.

Solution:

Quick fix: Click "Open in new tab" button in the Replit webview
Best fix: Publish your app to get a permanent URL with full WebGL support
Check your browser supports WebGL: visit https://get.webgl.org
Export Not Working
Cause: Export requires a working 3D scene.

Solution:

Make sure WebGL is working (see above)
Hard refresh to clear browser cache
Open in a new browser tab
🎓 How It Works
User enters prompt → "A fast military stealth fighter"
GPT-5 analyzes → Matches keywords to aircraft tags
AI selects best match → F-35 Lightning II (stealth, military, fighter)
3D viewer renders → Procedural geometry with customizations
User customizes → Colors, materials, scale
Save or export → Database storage or file download
🚧 Current Limitations
Procedural Models: Aircraft are geometric representations, not actual GLB files
No Real-Time Generation: AI selects from library rather than creating new geometries
OBJ/STL: Export geometry only (no materials/colors)
🔮 Future Enhancements
Real GLB aircraft models
User authentication and private galleries
Expanded aircraft library (50+ models)
Advanced customization (wing adjustments, livery designs)
True procedural generation from AI descriptions
AR preview for viewing models in augmented reality
Collaboration features
📝 License
MIT License - feel free to use for your own projects!

🙏 Credits
Built with ❤️ using:

Replit for hosting and AI integration
OpenAI GPT-5 for intelligent aircraft matching
Three.js community for amazing 3D tools
Ready to design aircraft? Just describe what you want and watch it come to life in 3D! ✈️

