import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Aircraft model schema
export const aircraftModels = pgTable("aircraft_models", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // "fighter", "commercial", "helicopter", "private", "cargo"
  description: text("description").notNull(),
  modelPath: text("model_path").notNull(), // Path to 3D model file
  thumbnailPath: text("thumbnail_path"), // Path to thumbnail image
  tags: text("tags").array().notNull().default(sql`'{}'::text[]`),
  specifications: jsonb("specifications"), // { wingspan, length, maxSpeed, etc }
});

// Generation history schema
export const generations = pgTable("generations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  prompt: text("prompt").notNull(),
  selectedModelId: varchar("selected_model_id").references(() => aircraftModels.id),
  aiResponse: text("ai_response"), // AI analysis/description
  customizations: jsonb("customizations"), // { color, scale, materials, etc }
  createdAt: varchar("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Zod schemas for validation
export const insertAircraftModelSchema = createInsertSchema(aircraftModels).omit({
  id: true,
});

export const insertGenerationSchema = createInsertSchema(generations).omit({
  id: true,
  createdAt: true,
});

export const generateAircraftRequestSchema = z.object({
  prompt: z.string().min(5, "Prompt must be at least 5 characters").max(500, "Prompt too long"),
});

export const customizeAircraftSchema = z.object({
  color: z.string().optional(),
  scale: z.number().min(0.1).max(5).optional(),
  metalness: z.number().min(0).max(1).optional(),
  roughness: z.number().min(0).max(1).optional(),
});

// TypeScript types
export type AircraftModel = typeof aircraftModels.$inferSelect;
export type InsertAircraftModel = z.infer<typeof insertAircraftModelSchema>;
export type Generation = typeof generations.$inferSelect;
export type InsertGeneration = z.infer<typeof insertGenerationSchema>;
export type GenerateAircraftRequest = z.infer<typeof generateAircraftRequestSchema>;
export type CustomizeAircraft = z.infer<typeof customizeAircraftSchema>;

// API response types
export interface GenerateAircraftResponse {
  modelId: string;
  model: AircraftModel;
  aiAnalysis: string;
  generationId: string;
}

export interface AircraftLibraryResponse {
  models: AircraftModel[];
  total: number;
}
