import { useState } from "react";
import { Sparkles, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface HeroSectionProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

const EXAMPLE_PROMPTS = [
  "Sleek military fighter jet with delta wings",
  "Modern commercial airliner with twin engines",
  "Futuristic stealth aircraft with angular design",
  "Vintage propeller aircraft from the 1940s",
];

export function HeroSection({ onGenerate, isGenerating }: HeroSectionProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt.trim());
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-16 space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI-Powered Aircraft Design
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Transform Words into
            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Aircraft Models
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Describe your vision and watch AI select the perfect 3D aircraft model. 
            Professional-grade visualization in seconds.
          </p>
        </div>

        <Card className="p-6 md:p-8 backdrop-blur-sm bg-card/95 shadow-xl border-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="prompt-input" className="text-sm font-medium">
                Describe your aircraft
              </label>
              <Textarea
                id="prompt-input"
                data-testid="input-aircraft-prompt"
                placeholder="Example: A sleek military fighter jet with swept-back wings and a streamlined fuselage..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] resize-none text-base"
                disabled={isGenerating}
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{prompt.length}/500 characters</span>
                <span>Be descriptive for better results</span>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full text-lg"
              disabled={!prompt.trim() || isGenerating}
              data-testid="button-generate-aircraft"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Plane className="w-5 h-5 mr-2" />
                  Generate Aircraft
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.map((example, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="sm"
                  onClick={() => handleExampleClick(example)}
                  disabled={isGenerating}
                  className="text-xs"
                  data-testid={`button-example-${index}`}
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
