import { useState } from "react";
import { Download, FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { exportFormatInfo, type ExportFormat } from "@/lib/model-export";
import { useModelExporter } from "@/hooks/use-model-exporter";
import type { AircraftModel } from "@shared/schema";
import type { AircraftViewer3DHandle } from "./aircraft-viewer-3d";

interface ExportPanelProps {
  model: AircraftModel;
  viewerRef: React.RefObject<AircraftViewer3DHandle>;
}

export function ExportPanel({ model, viewerRef }: ExportPanelProps) {
  const { toast } = useToast();
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("glb");
  const { handleExport: exportModel, isExporting } = useModelExporter(model.name);

  const handleExport = async () => {
    try {
      if (!viewerRef.current) {
        throw new Error("3D viewer not ready");
      }

      await exportModel(
        () => viewerRef.current?.getExportObject() || null,
        selectedFormat
      );

      toast({
        title: "Export Successful",
        description: `Your aircraft has been exported as ${exportFormatInfo[selectedFormat].extension}`,
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: "Failed to export the model. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <FileDown className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Export 3D Model</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Format</label>
          <Select
            value={selectedFormat}
            onValueChange={(value) => setSelectedFormat(value as ExportFormat)}
          >
            <SelectTrigger data-testid="select-export-format">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(exportFormatInfo).map(([key, info]) => (
                <SelectItem key={key} value={key}>
                  {info.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {exportFormatInfo[selectedFormat].description}
          </p>
        </div>

        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full"
          data-testid="button-export"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download {exportFormatInfo[selectedFormat].extension.toUpperCase()}
            </>
          )}
        </Button>

        <div className="pt-2 border-t space-y-2">
          <p className="text-xs font-medium">Format Comparison</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <p className="font-medium text-muted-foreground">GLB / GLTF</p>
              <p className="text-muted-foreground">✓ Materials</p>
              <p className="text-muted-foreground">✓ Colors</p>
              <p className="text-muted-foreground">Best for web</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-muted-foreground">OBJ / STL</p>
              <p className="text-muted-foreground">✓ Geometry only</p>
              <p className="text-muted-foreground">✓ 3D printing</p>
              <p className="text-muted-foreground">Wide compatibility</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
