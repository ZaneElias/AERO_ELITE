import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Download, Info } from "lucide-react";
import type { AircraftModel } from "@shared/schema";

interface GenerationResultProps {
  model: AircraftModel;
  aiAnalysis: string;
  onDownload?: () => void;
}

export function GenerationResult({ model, aiAnalysis, onDownload }: GenerationResultProps) {
  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-background border-primary/20">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">AI Analysis Complete</h3>
          <p className="text-sm text-muted-foreground">
            Perfect match found for your description
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="default">{model.type}</Badge>
          <span className="text-sm font-semibold">{model.name}</span>
        </div>

        <div className="p-4 rounded-lg bg-card border">
          <div className="flex items-start gap-2 mb-2">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span className="text-xs font-medium text-muted-foreground">
              AI Insights
            </span>
          </div>
          <p className="text-sm leading-relaxed">{aiAnalysis}</p>
        </div>

        <p className="text-xs text-muted-foreground">
          {model.description}
        </p>

        {model.tags && model.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {model.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="pt-2 border-t">
        <p className="text-xs text-muted-foreground mb-3">
          Note: 3D models are currently procedural representations. Full GLB export coming soon.
        </p>
        {onDownload && (
          <Button 
            onClick={onDownload} 
            variant="outline" 
            className="w-full"
            disabled
            data-testid="button-download-model"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Model (Coming Soon)
          </Button>
        )}
      </div>
    </Card>
  );
}
