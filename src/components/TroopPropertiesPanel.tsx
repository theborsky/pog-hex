import { Troop } from "@/types/hex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface TroopPropertiesPanelProps {
  troop: Troop | null;
  onUpdateTroop: (updates: Partial<Troop>) => void;
  onRemoveTroop: () => void;
}

export const TroopPropertiesPanel = ({ troop, onUpdateTroop, onRemoveTroop }: TroopPropertiesPanelProps) => {
  if (!troop) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Troop Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No troop selected</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Troop Properties</CardTitle>
        <p className="text-xs text-muted-foreground">
          Position: ({troop.Pos.x}, {troop.Pos.y})
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="entityId" className="text-xs">Entity ID</Label>
          <Input
            id="entityId"
            type="number"
            value={troop.EntityId}
            onChange={(e) => onUpdateTroop({ EntityId: parseInt(e.target.value) })}
            className="h-8"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type" className="text-xs">Type</Label>
          <Input
            id="type"
            type="number"
            value={troop.Type}
            onChange={(e) => onUpdateTroop({ Type: parseInt(e.target.value) })}
            className="h-8"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="owner" className="text-xs">Owner</Label>
          <Input
            id="owner"
            type="number"
            value={troop.Owner}
            onChange={(e) => onUpdateTroop({ Owner: parseInt(e.target.value) })}
            className="h-8"
          />
        </div>
        <Button 
          onClick={onRemoveTroop} 
          variant="destructive" 
          className="w-full"
          size="sm"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove Troop
        </Button>
      </CardContent>
    </Card>
  );
};
