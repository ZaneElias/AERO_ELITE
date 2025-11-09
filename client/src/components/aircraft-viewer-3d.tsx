import { Suspense, useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Center } from "@react-three/drei";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";
import { Loader2 } from "lucide-react";
import type { AircraftModel } from "@shared/schema";

export interface AircraftViewer3DHandle {
  getExportObject: () => THREE.Group | null;
}

interface AircraftViewer3DProps {
  model?: AircraftModel;
  color?: string;
  scale?: number;
  metalness?: number;
  roughness?: number;
  autoRotate?: boolean;
}

function ProceduralAircraft({ 
  modelName,
  color = "#3b82f6",
  scale = 1,
  metalness = 0.7,
  roughness = 0.3,
}: {
  modelName: string;
  color: string;
  scale: number;
  metalness: number;
  roughness: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  const getGeometry = () => {
    switch (modelName) {
      case "F-35 Lightning II":
        return (
          <group scale={scale}>
            <mesh position={[0, 0, 0]} castShadow>
              <coneGeometry args={[0.7, 3.2, 8]} />
              <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
            </mesh>
            <mesh position={[-1.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <coneGeometry args={[0.18, 2.5, 4]} />
              <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
            </mesh>
            <mesh position={[1.4, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
              <coneGeometry args={[0.18, 2.5, 4]} />
              <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
            </mesh>
            <mesh position={[0, 0.5, -0.9]} castShadow>
              <boxGeometry args={[0.12, 0.9, 0.7]} />
              <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
            </mesh>
          </group>
        );
      
      case "F-22 Raptor":
        return (
          <group scale={scale}>
            <mesh position={[0, 0, 0]} castShadow><coneGeometry args={[0.65, 3.5, 6]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[-1.6, 0, -0.2]} rotation={[0, 0, Math.PI / 2]} castShadow><boxGeometry args={[0.15, 2.8, 1]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[1.6, 0, -0.2]} rotation={[0, 0, -Math.PI / 2]} castShadow><boxGeometry args={[0.15, 2.8, 1]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, 0.6, -1]} castShadow><boxGeometry args={[0.15, 1, 0.8]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, 0.6, -1.3]} castShadow><boxGeometry args={[0.12, 0.8, 0.5]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
          </group>
        );
      
      case "SR-71 Blackbird":
        return (
          <group scale={scale}>
            <mesh position={[0, 0, 0]} castShadow><cylinderGeometry args={[0.4, 0.4, 4.5, 16]} /><meshStandardMaterial color={color} metalness={0.9} roughness={0.1} /></mesh>
            <mesh position={[0, 0, 2.1]} castShadow><coneGeometry args={[0.4, 0.7, 16]} /><meshStandardMaterial color={color} metalness={0.9} roughness={0.1} /></mesh>
            <mesh position={[-1.8, 0.2, -0.5]} rotation={[0, 0, Math.PI / 2.5]} castShadow><coneGeometry args={[0.1, 3.5, 3]} /><meshStandardMaterial color={color} metalness={0.9} roughness={0.1} /></mesh>
            <mesh position={[1.8, 0.2, -0.5]} rotation={[0, 0, -Math.PI / 2.5]} castShadow><coneGeometry args={[0.1, 3.5, 3]} /><meshStandardMaterial color={color} metalness={0.9} roughness={0.1} /></mesh>
            <mesh position={[-0.6, 0.3, -1.8]} castShadow><cylinderGeometry args={[0.25, 0.25, 1.2, 16]} /><meshStandardMaterial color={color} metalness={0.9} roughness={0.1} /></mesh>
            <mesh position={[0.6, 0.3, -1.8]} castShadow><cylinderGeometry args={[0.25, 0.25, 1.2, 16]} /><meshStandardMaterial color={color} metalness={0.9} roughness={0.1} /></mesh>
          </group>
        );
      
      case "Boeing 737 MAX":
        return (
          <group scale={scale}>
            <mesh position={[0, 0, 0]} castShadow><cylinderGeometry args={[0.55, 0.55, 4.2, 32]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, 0, 2]} castShadow><coneGeometry args={[0.55, 0.9, 32]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[-2.4, 0, -0.4]} rotation={[0, 0, Math.PI / 2]} castShadow><boxGeometry args={[0.22, 4.2, 1.3]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[2.4, 0, -0.4]} rotation={[0, 0, -Math.PI / 2]} castShadow><boxGeometry args={[0.22, 4.2, 1.3]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[-2.5, 0, -0.4]} castShadow><cylinderGeometry args={[0.35, 0.35, 1, 16]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[2.5, 0, -0.4]} castShadow><cylinderGeometry args={[0.35, 0.35, 1, 16]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
          </group>
        );
      
      case "Airbus A380":
        return (
          <group scale={scale}>
            <mesh position={[0, 0, 0]} castShadow><cylinderGeometry args={[0.7, 0.7, 5, 32]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, 0, 2.4]} castShadow><coneGeometry args={[0.7, 1, 32]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[-3.2, 0, -0.6]} rotation={[0, 0, Math.PI / 2]} castShadow><boxGeometry args={[0.25, 5.8, 1.6]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[3.2, 0, -0.6]} rotation={[0, 0, -Math.PI / 2]} castShadow><boxGeometry args={[0.25, 5.8, 1.6]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, 0.4, 0]} castShadow><boxGeometry args={[1.2, 0.6, 3]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
          </group>
        );
      
      case "AH-64 Apache":
        return (
          <group scale={scale}>
            <mesh position={[0, 0, 0]} castShadow><capsuleGeometry args={[0.6, 2.8, 16, 32]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, 1.6, 0]}><cylinderGeometry args={[0.12, 0.12, 0.9, 16]} /><meshStandardMaterial color={color} metalness={0.9} roughness={0.1} /></mesh>
            <mesh position={[0, 2.3, 0]}><boxGeometry args={[6.5, 0.12, 0.5]} /><meshStandardMaterial color={color} metalness={0.9} roughness={0.1} /></mesh>
            <mesh position={[0, -0.7, -2]} rotation={[Math.PI / 2, 0, 0]} castShadow><boxGeometry args={[0.12, 1.4, 1]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[-0.8, 0, 0.8]} rotation={[0, 0, Math.PI / 8]} castShadow><boxGeometry args={[0.3, 0.15, 1.5]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0.8, 0, 0.8]} rotation={[0, 0, -Math.PI / 8]} castShadow><boxGeometry args={[0.3, 0.15, 1.5]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
          </group>
        );
      
      case "Bell 206 JetRanger":
        return (
          <group scale={scale}>
            <mesh position={[0, 0, 0]} castShadow><capsuleGeometry args={[0.5, 2.2, 16, 32]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, 1.3, 0]}><cylinderGeometry args={[0.08, 0.08, 0.7, 16]} /><meshStandardMaterial color={color} metalness={0.9} roughness={0.1} /></mesh>
            <mesh position={[0, 1.9, 0]}><boxGeometry args={[5, 0.1, 0.35]} /><meshStandardMaterial color={color} metalness={0.9} roughness={0.1} /></mesh>
            <mesh position={[0, -0.5, -1.5]} rotation={[Math.PI / 2, 0, 0]} castShadow><boxGeometry args={[0.1, 1, 0.7]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, -0.6, 0]} castShadow><sphereGeometry args={[0.3, 16, 16]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
          </group>
        );
      
      case "Cessna Citation X":
        return (
          <group scale={scale}>
            <mesh position={[0, 0, 0]} castShadow><cylinderGeometry args={[0.4, 0.4, 3.2, 16]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, 0, 1.5]} castShadow><coneGeometry args={[0.4, 0.7, 16]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[-2, 0, -0.2]} rotation={[0, 0, Math.PI / 2]} castShadow><boxGeometry args={[0.16, 3.5, 0.9]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[2, 0, -0.2]} rotation={[0, 0, -Math.PI / 2]} castShadow><boxGeometry args={[0.16, 3.5, 0.9]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[-2.1, 0, -0.3]} castShadow><cylinderGeometry args={[0.22, 0.22, 0.7, 16]} /><meshStandardMaterial color={color} metalness={0.9} roughness={0.1} /></mesh>
            <mesh position={[2.1, 0, -0.3]} castShadow><cylinderGeometry args={[0.22, 0.22, 0.7, 16]} /><meshStandardMaterial color={color} metalness={0.9} roughness={0.1} /></mesh>
          </group>
        );
      
      case "Gulfstream G650":
        return (
          <group scale={scale}>
            <mesh position={[0, 0, 0]} castShadow><cylinderGeometry args={[0.45, 0.45, 3.5, 20]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, 0, 1.6]} castShadow><coneGeometry args={[0.45, 0.8, 20]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[-2.2, 0, -0.3]} rotation={[0, 0, Math.PI / 2]} castShadow><boxGeometry args={[0.18, 3.8, 1]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[2.2, 0, -0.3]} rotation={[0, 0, -Math.PI / 2]} castShadow><boxGeometry args={[0.18, 3.8, 1]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, 0.55, -1.4]} rotation={[0, 0, Math.PI / 2]} castShadow><boxGeometry args={[0.15, 1.6, 0.6]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
          </group>
        );
      
      case "Learjet 75":
        return (
          <group scale={scale}>
            <mesh position={[0, 0, 0]} castShadow><cylinderGeometry args={[0.35, 0.35, 2.8, 16]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, 0, 1.3]} castShadow><coneGeometry args={[0.35, 0.6, 16]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[-1.7, 0, -0.1]} rotation={[0, 0, Math.PI / 2]} castShadow><boxGeometry args={[0.14, 3, 0.8]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[1.7, 0, -0.1]} rotation={[0, 0, -Math.PI / 2]} castShadow><boxGeometry args={[0.14, 3, 0.8]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, 0.5, -1.2]} rotation={[0, 0, Math.PI / 2]} castShadow><boxGeometry args={[0.12, 1.2, 0.5]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
          </group>
        );
      
      case "C-130 Hercules":
        return (
          <group scale={scale}>
            <mesh position={[0, 0, 0]} castShadow><boxGeometry args={[1.6, 1, 4.5]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, 0, 2.1]} castShadow><coneGeometry args={[0.8, 0.7, 16]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[-2.8, 0, -0.4]} rotation={[0, 0, Math.PI / 2]} castShadow><boxGeometry args={[0.24, 4.8, 1.4]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[2.8, 0, -0.4]} rotation={[0, 0, -Math.PI / 2]} castShadow><boxGeometry args={[0.24, 4.8, 1.4]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, 0.7, -1.7]} rotation={[0, 0, Math.PI / 2]} castShadow><boxGeometry args={[0.18, 2.2, 0.8]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
          </group>
        );
      
      case "Boeing 747-8F":
        return (
          <group scale={scale}>
            <mesh position={[0, 0, 0]} castShadow><cylinderGeometry args={[0.65, 0.65, 5.5, 32]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, 0, 2.6]} castShadow><coneGeometry args={[0.65, 1.1, 32]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[-3.5, 0, -0.7]} rotation={[0, 0, Math.PI / 2]} castShadow><boxGeometry args={[0.26, 6.2, 1.7]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[3.5, 0, -0.7]} rotation={[0, 0, -Math.PI / 2]} castShadow><boxGeometry args={[0.26, 6.2, 1.7]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
            <mesh position={[0, 0.5, 1.5]} castShadow><boxGeometry args={[1, 0.7, 1.8]} /><meshStandardMaterial color={color} metalness={metalness} roughness={roughness} /></mesh>
          </group>
        );
      
      default:
        return (
          <mesh castShadow scale={scale}>
            <boxGeometry args={[2, 1, 4]} />
            <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
          </mesh>
        );
    }
  };

  return (
    <group 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.05 : 1}
    >
      {getGeometry()}
    </group>
  );
}

const AircraftModel3D = forwardRef<THREE.Group, {
  model: AircraftModel;
  color: string;
  scale: number;
  metalness: number;
  roughness: number;
}>(({ 
  model,
  color = "#3b82f6",
  scale = 1,
  metalness = 0.7,
  roughness = 0.3,
}, ref) => {
  const groupRef = useRef<THREE.Group>(null);

  useImperativeHandle(ref, () => groupRef.current!, []);

  return (
    <Center>
      <group ref={groupRef} scale={scale}>
        <ProceduralAircraft
          modelName={model.name}
          color={color}
          scale={1}
          metalness={metalness}
          roughness={roughness}
        />
      </group>
    </Center>
  );
});

AircraftModel3D.displayName = "AircraftModel3D";

export const AircraftViewer3D = forwardRef<AircraftViewer3DHandle, AircraftViewer3DProps>(
  ({ model, autoRotate = true, ...customization }, ref) => {
    const modelRef = useRef<THREE.Group>(null);

    useImperativeHandle(ref, () => ({
      getExportObject: () => {
        if (modelRef.current) {
          const clone = modelRef.current.clone(true);
          return clone;
        }
        return null;
      },
    }), []);

    if (!model) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background via-accent/20 to-background">
          <div className="text-center space-y-4 p-8">
            <div className="text-6xl">✈️</div>
            <p className="text-lg font-medium text-muted-foreground">
              Generate or select an aircraft to view
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full relative bg-gradient-to-br from-background via-accent/20 to-background">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 2, 12]} />
            <ambientLight intensity={0.5} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.3}
              penumbra={1}
              intensity={1}
              castShadow
            />
            <directionalLight position={[-5, 5, 5]} intensity={0.5} />
            <pointLight position={[0, 10, 0]} intensity={0.3} />
            
            <AircraftModel3D 
              ref={modelRef}
              model={model}
              color={customization.color || "#3b82f6"}
              scale={customization.scale || 1}
              metalness={customization.metalness || 0.7}
              roughness={customization.roughness || 0.3}
            />
          
          <ContactShadows
            position={[0, -3, 0]}
            opacity={0.4}
            scale={15}
            blur={2.5}
            far={4}
          />
          
          <Environment preset="city" />
          
          <OrbitControls
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            enablePan={false}
            minDistance={8}
            maxDistance={20}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-4 left-4 space-y-1">
        <p className="text-xs text-muted-foreground font-mono">
          Click and drag to rotate • Scroll to zoom
        </p>
        <p className="text-xs text-muted-foreground">
          Model: {model.name}
        </p>
      </div>
    </div>
  );
});

AircraftViewer3D.displayName = "AircraftViewer3D";

export function AircraftViewer3DLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
        <p className="text-sm text-muted-foreground">Loading 3D viewer...</p>
      </div>
    </div>
  );
}
