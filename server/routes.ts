import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeAircraftPrompt } from "./openai";
import { 
  generateAircraftRequestSchema,
  type GenerateAircraftResponse,
  type AircraftLibraryResponse 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.get("/api/aircraft/library", async (req, res) => {
    try {
      const models = await storage.getAllAircraftModels();
      const response: AircraftLibraryResponse = {
        models,
        total: models.length
      };
      res.json(response);
    } catch (error) {
      console.error("Error fetching aircraft library:", error);
      res.status(500).json({ error: "Failed to fetch aircraft library" });
    }
  });

  app.post("/api/aircraft/generate", async (req, res) => {
    try {
      const validated = generateAircraftRequestSchema.parse(req.body);
      
      const analysis = await analyzeAircraftPrompt(validated.prompt);
      
      const matchingModels = await storage.getAircraftModelsByType(analysis.aircraftType);
      
      if (matchingModels.length === 0) {
        return res.status(404).json({ 
          error: `No ${analysis.aircraftType} models available in the library` 
        });
      }

      let selectedModel = matchingModels[0];
      
      if (analysis.matchingTags && analysis.matchingTags.length > 0) {
        const scoredModels = matchingModels.map(model => {
          const tagMatches = analysis.matchingTags.filter(tag => 
            model.tags?.some(modelTag => 
              modelTag.toLowerCase().includes(tag.toLowerCase()) ||
              tag.toLowerCase().includes(modelTag.toLowerCase())
            )
          ).length;
          return { model, score: tagMatches };
        });
        
        scoredModels.sort((a, b) => b.score - a.score);
        selectedModel = scoredModels[0].model;
      }

      const generation = await storage.createGeneration({
        prompt: validated.prompt,
        selectedModelId: selectedModel.id,
        aiResponse: analysis.reasoning,
        customizations: null
      });

      const response: GenerateAircraftResponse = {
        modelId: selectedModel.id,
        model: selectedModel,
        aiAnalysis: analysis.reasoning,
        generationId: generation.id
      };

      res.json(response);
    } catch (error: any) {
      console.error("Error generating aircraft:", error);
      
      if (error.name === "ZodError") {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: error.errors 
        });
      }
      
      res.status(500).json({ 
        error: error.message || "Failed to generate aircraft" 
      });
    }
  });

  app.get("/api/aircraft/:id", async (req, res) => {
    try {
      const model = await storage.getAircraftModelById(req.params.id);
      
      if (!model) {
        return res.status(404).json({ error: "Aircraft model not found" });
      }
      
      res.json(model);
    } catch (error) {
      console.error("Error fetching aircraft model:", error);
      res.status(500).json({ error: "Failed to fetch aircraft model" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
