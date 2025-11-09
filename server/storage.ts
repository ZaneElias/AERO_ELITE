import { 
  type AircraftModel, 
  type InsertAircraftModel,
  type Generation,
  type InsertGeneration 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllAircraftModels(): Promise<AircraftModel[]>;
  getAircraftModelById(id: string): Promise<AircraftModel | undefined>;
  getAircraftModelsByType(type: string): Promise<AircraftModel[]>;
  createAircraftModel(model: InsertAircraftModel): Promise<AircraftModel>;
  
  createGeneration(generation: InsertGeneration): Promise<Generation>;
  getGenerationById(id: string): Promise<Generation | undefined>;
}

export class MemStorage implements IStorage {
  private aircraftModels: Map<string, AircraftModel>;
  private generations: Map<string, Generation>;

  constructor() {
    this.aircraftModels = new Map();
    this.generations = new Map();
    this.initializeDefaultModels();
  }

  private initializeDefaultModels() {
    const defaultModels: InsertAircraftModel[] = [
      {
        name: "F-35 Lightning II",
        type: "fighter",
        description: "Advanced fifth-generation stealth multirole fighter with superior agility and cutting-edge avionics.",
        modelPath: "/models/f35.glb",
        tags: ["stealth", "multirole", "advanced", "military", "supersonic"],
        specifications: { wingspan: 10.7, length: 15.7, maxSpeed: 1960 }
      },
      {
        name: "F-22 Raptor",
        type: "fighter",
        description: "Unmatched air superiority fighter with twin-engine thrust vectoring and extreme maneuverability.",
        modelPath: "/models/f22.glb",
        tags: ["stealth", "air-superiority", "twin-engine", "vectoring", "supersonic"],
        specifications: { wingspan: 13.6, length: 18.9, maxSpeed: 2410 }
      },
      {
        name: "Boeing 737 MAX",
        type: "commercial",
        description: "Popular narrow-body commercial airliner known for fuel efficiency and passenger comfort.",
        modelPath: "/models/737max.glb",
        tags: ["commercial", "passenger", "efficient", "boeing", "narrow-body"],
        specifications: { wingspan: 35.9, length: 39.5, maxSpeed: 839 }
      },
      {
        name: "Airbus A380",
        type: "commercial",
        description: "World's largest passenger airliner featuring double-deck wide-body design for maximum capacity.",
        modelPath: "/models/a380.glb",
        tags: ["commercial", "jumbo", "double-deck", "airbus", "wide-body"],
        specifications: { wingspan: 79.8, length: 72.7, maxSpeed: 945 }
      },
      {
        name: "AH-64 Apache",
        type: "helicopter",
        description: "Twin-turboshaft attack helicopter with advanced targeting systems and heavy armament.",
        modelPath: "/models/apache.glb",
        tags: ["military", "attack", "twin-engine", "rotary", "combat"],
        specifications: { rotorDiameter: 14.6, length: 17.7, maxSpeed: 293 }
      },
      {
        name: "Bell 206 JetRanger",
        type: "helicopter",
        description: "Versatile light utility helicopter perfect for civilian and corporate operations.",
        modelPath: "/models/jetranger.glb",
        tags: ["civilian", "utility", "light", "versatile", "rotary"],
        specifications: { rotorDiameter: 10.2, length: 11.8, maxSpeed: 225 }
      },
      {
        name: "Cessna Citation X",
        type: "private",
        description: "High-speed business jet combining luxury with performance for executive travel.",
        modelPath: "/models/citationx.glb",
        tags: ["business", "luxury", "fast", "executive", "private"],
        specifications: { wingspan: 19.9, length: 22.0, maxSpeed: 1153 }
      },
      {
        name: "Gulfstream G650",
        type: "private",
        description: "Ultra-long-range business jet offering unparalleled comfort and advanced technology.",
        modelPath: "/models/g650.glb",
        tags: ["ultra-long-range", "luxury", "business", "gulfstream", "executive"],
        specifications: { wingspan: 30.4, length: 30.4, maxSpeed: 956 }
      },
      {
        name: "C-130 Hercules",
        type: "cargo",
        description: "Legendary military transport aircraft renowned for reliability and versatility.",
        modelPath: "/models/c130.glb",
        tags: ["military", "transport", "versatile", "cargo", "tactical"],
        specifications: { wingspan: 40.4, length: 29.8, maxSpeed: 592 }
      },
      {
        name: "Boeing 747-8F",
        type: "cargo",
        description: "Massive freight aircraft with exceptional payload capacity for global logistics.",
        modelPath: "/models/7478f.glb",
        tags: ["freight", "jumbo", "cargo", "boeing", "heavy-lift"],
        specifications: { wingspan: 68.4, length: 76.3, maxSpeed: 920 }
      },
      {
        name: "SR-71 Blackbird",
        type: "fighter",
        description: "Legendary reconnaissance aircraft holding speed records with sleek black design.",
        modelPath: "/models/sr71.glb",
        tags: ["reconnaissance", "fastest", "stealth", "legendary", "supersonic"],
        specifications: { wingspan: 16.9, length: 32.7, maxSpeed: 3540 }
      },
      {
        name: "Learjet 75",
        type: "private",
        description: "Modern light business jet perfect for short to medium-range flights.",
        modelPath: "/models/learjet75.glb",
        tags: ["light", "business", "modern", "efficient", "private"],
        specifications: { wingspan: 16.3, length: 17.7, maxSpeed: 861 }
      }
    ];

    defaultModels.forEach(model => {
      const id = randomUUID();
      const aircraftModel: AircraftModel = { ...model, id };
      this.aircraftModels.set(id, aircraftModel);
    });
  }

  async getAllAircraftModels(): Promise<AircraftModel[]> {
    return Array.from(this.aircraftModels.values());
  }

  async getAircraftModelById(id: string): Promise<AircraftModel | undefined> {
    return this.aircraftModels.get(id);
  }

  async getAircraftModelsByType(type: string): Promise<AircraftModel[]> {
    return Array.from(this.aircraftModels.values()).filter(
      model => model.type === type
    );
  }

  async createAircraftModel(insertModel: InsertAircraftModel): Promise<AircraftModel> {
    const id = randomUUID();
    const model: AircraftModel = { ...insertModel, id };
    this.aircraftModels.set(id, model);
    return model;
  }

  async createGeneration(insertGeneration: InsertGeneration): Promise<Generation> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const generation: Generation = { ...insertGeneration, id, createdAt };
    this.generations.set(id, generation);
    return generation;
  }

  async getGenerationById(id: string): Promise<Generation | undefined> {
    return this.generations.get(id);
  }
}

export const storage = new MemStorage();
