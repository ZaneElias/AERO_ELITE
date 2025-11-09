import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Trash2, Eye, Loader2, Save, Edit2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AircraftViewer3D } from "@/components/aircraft-viewer-3d";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { SavedModel, AircraftModel } from "@shared/schema";

interface SavedModelWithBase extends SavedModel {
  baseModel?: AircraftModel;
}

export default function Gallery() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [selectedModel, setSelectedModel] = useState<SavedModelWithBase | null>(null);
  const [editingModel, setEditingModel] = useState<SavedModelWithBase | null>(null);
  const [newName, setNewName] = useState("");

  const { data, isLoading } = useQuery<{ models: SavedModel[]; total: number }>({
    queryKey: ["/api/saved-models"],
  });

  const { data: aircraftLibrary } = useQuery<{ models: AircraftModel[] }>({
    queryKey: ["/api/aircraft/library"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/saved-models/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete model");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/saved-models"] });
      toast({
        title: "Model Deleted",
        description: "The saved model has been removed from your gallery",
      });
      setSelectedModel(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete the model. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const response = await apiRequest("PATCH", `/api/saved-models/${id}`, { name });
      return await response.json() as SavedModel;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/saved-models"] });
      toast({
        title: "Model Updated",
        description: "Your model has been renamed successfully",
      });
      setEditingModel(null);
      setNewName("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update the model. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleEditClick = (saved: SavedModelWithBase) => {
    setEditingModel(saved);
    setNewName(saved.name);
  };

  const handleConfirmEdit = () => {
    if (!editingModel || !newName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for your model.",
        variant: "destructive",
      });
      return;
    }
    updateMutation.mutate({ id: editingModel.id, name: newName });
  };

  const savedModelsWithBase: SavedModelWithBase[] = (data?.models || []).map((saved) => {
    const baseModel = aircraftLibrary?.models.find((m) => m.id === saved.baseModelId);
    return { ...saved, baseModel };
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading your gallery...</p>
        </div>
      </div>
    );
  }

  if (!data || data.models.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <Card className="p-12 text-center max-w-lg">
          <Save className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Saved Models Yet</h2>
          <p className="text-muted-foreground mb-6">
            Start generating and customizing aircraft models, then save your favorites to your gallery.
          </p>
          <Button onClick={() => navigate("/")}>
            Generate Aircraft
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Gallery</h1>
            <p className="text-muted-foreground">
              {data.total} saved {data.total === 1 ? "model" : "models"}
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Generator
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Saved Models</h2>
            <div className="grid gap-4">
              {savedModelsWithBase.map((saved) => (
                <Card
                  key={saved.id}
                  className={`p-4 cursor-pointer transition-all hover-elevate ${
                    selectedModel?.id === saved.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedModel(saved)}
                  data-testid={`card-saved-model-${saved.id}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{saved.name}</h3>
                      {saved.baseModel && (
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {saved.baseModel.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground truncate">
                            {saved.baseModel.name}
                          </span>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Saved {new Date(saved.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedModel(saved);
                        }}
                        data-testid={`button-view-${saved.id}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(saved);
                        }}
                        data-testid={`button-edit-${saved.id}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMutation.mutate(saved.id);
                        }}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-${saved.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="sticky top-8 h-[600px]">
            {selectedModel && selectedModel.baseModel ? (
              <Card className="h-full flex flex-col overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-lg">{selectedModel.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedModel.baseModel.name}
                  </p>
                </div>
                <div className="flex-1">
                  <AircraftViewer3D
                    model={selectedModel.baseModel}
                    autoRotate
                    {...(selectedModel.customizations as any)}
                  />
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Select a model to view</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Dialog open={!!editingModel} onOpenChange={() => setEditingModel(null)}>
        <DialogContent data-testid="dialog-edit-model">
          <DialogHeader>
            <DialogTitle>Rename Model</DialogTitle>
            <DialogDescription>
              Update the name of your saved aircraft model.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter new name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleConfirmEdit();
                }
              }}
              data-testid="input-edit-name"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingModel(null)}
              data-testid="button-cancel-edit"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmEdit}
              disabled={updateMutation.isPending || !newName.trim()}
              data-testid="button-confirm-edit"
            >
              {updateMutation.isPending ? "Updating..." : "Update Name"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
