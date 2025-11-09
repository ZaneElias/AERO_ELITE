import { useState, Suspense } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { HeroSection } from "@/components/hero-section";
import { AircraftViewer3D, AircraftViewer3DLoading } from "@/components/aircraft-viewer-3d";
import { ModelLibrary } from "@/components/model-library";
import { CustomizationPanel } from "@/components/customization-panel";
import { GenerationResult } from "@/components/generation-result";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { 
  AircraftModel, 
  GenerateAircraftResponse,
  AircraftLibraryResponse,
  CustomizeAircraft 
} from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  const [selectedModel, setSelectedModel] = useState<AircraftModel | null>(null);
  const [generationResult, setGenerationResult] = useState<GenerateAircraftResponse | null>(null);
  const [customization, setCustomization] = useState<CustomizeAircraft>({
    color: "#3b82f6",
    scale: 1,
    metalness: 0.7,
    roughness: 0.3,
  });

  const { data: libraryData, isLoading: isLoadingLibrary } = useQuery<AircraftLibraryResponse>({
    queryKey: ["/api/aircraft/library"],
  });

  const generateMutation = useMutation({
    mutationFn: async (prompt: string) => {
      return await apiRequest<GenerateAircraftResponse>(
        "POST",
        "/api/aircraft/generate",
        { prompt }
      );
    },
    onSuccess: (data) => {
      setGenerationResult(data);
      setSelectedModel(data.model);
      toast({
        title: "Aircraft Generated!",
        description: "Your AI-selected model is ready to view.",
      });
      
      const resultsSection = document.getElementById("results-section");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate aircraft. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = (prompt: string) => {
    generateMutation.mutate(prompt);
  };

  const handleSelectModel = (model: AircraftModel) => {
    setSelectedModel(model);
    setGenerationResult(null);
  };

  const handleCustomizationUpdate = (newCustomization: CustomizeAircraft) => {
    setCustomization(newCustomization);
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your model is being prepared for download.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3l14 9-14 9V3z"
                />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-lg">AeroElite Designer</h1>
              <p className="text-xs text-muted-foreground">AI Aircraft Generator</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <HeroSection 
        onGenerate={handleGenerate}
        isGenerating={generateMutation.isPending}
      />

      {(selectedModel || generateMutation.isPending) && (
        <section 
          id="results-section"
          className="container mx-auto px-4 py-12 lg:py-16"
        >
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-xl border overflow-hidden h-[500px] lg:h-[600px]">
                <Suspense fallback={<AircraftViewer3DLoading />}>
                  <AircraftViewer3D
                    model={selectedModel}
                    color={customization.color}
                    scale={customization.scale}
                    metalness={customization.metalness}
                    roughness={customization.roughness}
                    autoRotate={true}
                  />
                </Suspense>
              </div>

              {selectedModel && (
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedModel.name}</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedModel.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {generationResult && (
                <GenerationResult
                  model={generationResult.model}
                  aiAnalysis={generationResult.aiAnalysis}
                  onDownload={handleDownload}
                />
              )}

              <CustomizationPanel
                onUpdate={handleCustomizationUpdate}
                initialValues={customization}
              />
            </div>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-12 lg:py-16">
        <ModelLibrary
          models={libraryData?.models || []}
          onSelectModel={handleSelectModel}
          isLoading={isLoadingLibrary}
          selectedModelId={selectedModel?.id}
        />
      </section>

      <footer className="border-t bg-muted/30 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">AeroElite Designer</p>
              <p className="text-xs">Powered by AI • Professional 3D Visualization</p>
            </div>
            <div className="text-xs text-muted-foreground text-center md:text-right">
              <p>Models are procedurally generated 3D representations</p>
              <p>Full GLB asset loading and export coming in future updates</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
