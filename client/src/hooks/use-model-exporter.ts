import { useState } from "react";
import { exportModel, type ExportFormat } from "@/lib/model-export";
import type * as THREE from "three";

export function useModelExporter(modelName: string) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async (
    getExportObject: () => THREE.Group | null,
    format: ExportFormat
  ): Promise<void> => {
    setIsExporting(true);
    setError(null);

    try {
      const exportObject = getExportObject();
      if (!exportObject) {
        throw new Error("No model available for export");
      }

      await exportModel(exportObject, format, modelName);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Export failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    error,
    handleExport,
  };
}
