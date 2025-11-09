import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plane, Loader2 } from "lucide-react";
import type { AircraftModel } from "@shared/schema";

interface ModelLibraryProps {
  models: AircraftModel[];
  onSelectModel: (model: AircraftModel) => void;
  isLoading?: boolean;
  selectedModelId?: string;
}

const MODEL_TYPE_COLORS: Record<string, string> = {
  fighter: "bg-red-500/10 text-red-700 dark:text-red-400",
  commercial: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  helicopter: "bg-green-500/10 text-green-700 dark:text-green-400",
  private: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  cargo: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
};

export function ModelLibrary({ 
  models, 
  onSelectModel, 
  isLoading = false,
  selectedModelId 
}: ModelLibraryProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Loading aircraft library...</p>
        </div>
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Plane className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No Aircraft Models Available</h3>
        <p className="text-sm text-muted-foreground">
          The aircraft library is empty. Models will be available soon.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Aircraft Library</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {models.length} models available
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {models.map((model) => (
          <Card
            key={model.id}
            className={`group overflow-hidden transition-all hover-elevate active-elevate-2 cursor-pointer ${
              selectedModelId === model.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelectModel(model)}
            data-testid={`card-model-${model.id}`}
          >
            <div className="aspect-square bg-gradient-to-br from-accent/20 to-background relative overflow-hidden">
              {model.thumbnailPath ? (
                <img
                  src={model.thumbnailPath}
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Plane className="w-16 h-16 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              )}
              
              {selectedModelId === model.id && (
                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                  <Badge variant="default">Selected</Badge>
                </div>
              )}
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm line-clamp-1" title={model.name}>
                  {model.name}
                </h3>
                <Badge 
                  variant="secondary" 
                  className={`${MODEL_TYPE_COLORS[model.type] || ""} text-xs shrink-0`}
                >
                  {model.type}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2">
                {model.description}
              </p>

              {model.tags && model.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {model.tags.slice(0, 3).map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-[10px] px-1.5 py-0"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
