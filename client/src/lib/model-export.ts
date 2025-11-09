import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";
import type * as THREE from "three";

export type ExportFormat = "glb" | "gltf" | "obj" | "stl";

function downloadBlob(blob: Blob, filename: string) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

function downloadString(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/plain" });
  downloadBlob(blob, filename);
}

export async function exportModel(
  scene: THREE.Group | THREE.Mesh | THREE.Scene,
  format: ExportFormat,
  modelName: string
): Promise<void> {
  const sanitizedName = modelName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  
  return new Promise((resolve, reject) => {
    try {
      switch (format) {
        case "glb": {
          const exporter = new GLTFExporter();
          exporter.parse(
            scene,
            (result) => {
              const blob = new Blob([result as ArrayBuffer], {
                type: "application/octet-stream",
              });
              downloadBlob(blob, `${sanitizedName}.glb`);
              resolve();
            },
            (error) => {
              console.error("GLB export error:", error);
              reject(error);
            },
            { binary: true }
          );
          break;
        }

        case "gltf": {
          const exporter = new GLTFExporter();
          exporter.parse(
            scene,
            (result) => {
              const json = JSON.stringify(result, null, 2);
              downloadString(json, `${sanitizedName}.gltf`);
              resolve();
            },
            (error) => {
              console.error("GLTF export error:", error);
              reject(error);
            },
            { binary: false }
          );
          break;
        }

        case "obj": {
          const exporter = new OBJExporter();
          const data = exporter.parse(scene);
          downloadString(data, `${sanitizedName}.obj`);
          resolve();
          break;
        }

        case "stl": {
          const exporter = new STLExporter();
          const result = exporter.parse(scene, { binary: true });
          const blob = new Blob([result], {
            type: "application/octet-stream",
          });
          downloadBlob(blob, `${sanitizedName}.stl`);
          resolve();
          break;
        }

        default:
          reject(new Error(`Unsupported format: ${format}`));
      }
    } catch (error) {
      reject(error);
    }
  });
}

export const exportFormatInfo = {
  glb: {
    name: "GLB (Binary GLTF)",
    description: "Compact format with materials, best for web and game engines",
    extension: ".glb",
  },
  gltf: {
    name: "GLTF (JSON)",
    description: "Human-readable format with materials, good for debugging",
    extension: ".gltf",
  },
  obj: {
    name: "OBJ (Wavefront)",
    description: "Geometry only, widely compatible with 3D software",
    extension: ".obj",
  },
  stl: {
    name: "STL (Stereolithography)",
    description: "Geometry only, ideal for 3D printing",
    extension: ".stl",
  },
} as const;
