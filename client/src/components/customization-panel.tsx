import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Palette, RotateCcw } from "lucide-react";
import type { CustomizeAircraft } from "@shared/schema";

interface CustomizationPanelProps {
  onUpdate: (customization: CustomizeAircraft) => void;
  initialValues?: CustomizeAircraft;
}

const PRESET_COLORS = [
  { name: "Sky Blue", value: "#3b82f6" },
  { name: "Military Green", value: "#22c55e" },
  { name: "Stealth Gray", value: "#6b7280" },
  { name: "Racing Red", value: "#ef4444" },
  { name: "Gold", value: "#f59e0b" },
  { name: "Navy", value: "#1e40af" },
  { name: "White", value: "#f8fafc" },
  { name: "Black", value: "#0f172a" },
];

export function CustomizationPanel({ onUpdate, initialValues }: CustomizationPanelProps) {
  const [color, setColor] = useState(initialValues?.color || "#3b82f6");
  const [scale, setScale] = useState(initialValues?.scale || 1);
  const [metalness, setMetalness] = useState(initialValues?.metalness || 0.7);
  const [roughness, setRoughness] = useState(initialValues?.roughness || 0.3);

  const handleUpdate = () => {
    onUpdate({ color, scale, metalness, roughness });
  };

  const handleReset = () => {
    setColor("#3b82f6");
    setScale(1);
    setMetalness(0.7);
    setRoughness(0.3);
    onUpdate({ 
      color: "#3b82f6", 
      scale: 1, 
      metalness: 0.7, 
      roughness: 0.3 
    });
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Customization</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          data-testid="button-reset-customization"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Color</Label>
          <div className="grid grid-cols-4 gap-2">
            {PRESET_COLORS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => {
                  setColor(preset.value);
                  onUpdate({ color: preset.value, scale, metalness, roughness });
                }}
                className={`h-10 rounded-md border-2 transition-all hover-elevate active-elevate-2 ${
                  color === preset.value 
                    ? "border-primary ring-2 ring-primary ring-offset-2" 
                    : "border-border"
                }`}
                style={{ backgroundColor: preset.value }}
                title={preset.name}
                data-testid={`button-color-${preset.name.toLowerCase().replace(" ", "-")}`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="scale-slider">Scale</Label>
            <span className="text-sm text-muted-foreground font-mono">
              {scale.toFixed(1)}x
            </span>
          </div>
          <Slider
            id="scale-slider"
            min={0.5}
            max={2}
            step={0.1}
            value={[scale]}
            onValueChange={(value) => {
              setScale(value[0]);
              onUpdate({ color, scale: value[0], metalness, roughness });
            }}
            data-testid="slider-scale"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="metalness-slider">Metalness</Label>
            <span className="text-sm text-muted-foreground font-mono">
              {Math.round(metalness * 100)}%
            </span>
          </div>
          <Slider
            id="metalness-slider"
            min={0}
            max={1}
            step={0.05}
            value={[metalness]}
            onValueChange={(value) => {
              setMetalness(value[0]);
              onUpdate({ color, scale, metalness: value[0], roughness });
            }}
            data-testid="slider-metalness"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="roughness-slider">Roughness</Label>
            <span className="text-sm text-muted-foreground font-mono">
              {Math.round(roughness * 100)}%
            </span>
          </div>
          <Slider
            id="roughness-slider"
            min={0}
            max={1}
            step={0.05}
            value={[roughness]}
            onValueChange={(value) => {
              setRoughness(value[0]);
              onUpdate({ color, scale, metalness, roughness: value[0] });
            }}
            data-testid="slider-roughness"
          />
        </div>
      </div>

      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          Adjust material properties to achieve your desired look. Changes apply instantly to the 3D model.
        </p>
      </div>
    </Card>
  );
}
