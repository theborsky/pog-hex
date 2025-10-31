import { Troop } from "@/types/hex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";
import { TROOP_TYPE_OPTIONS } from "@/utils/troopTypes";

interface TroopPropertiesPanelProps {
  troop: Troop | null;
  onUpdateTroop: (updates: Partial<Troop>) => void;
  onRemoveTroop: () => void;
  onClose?: () => void;
}

export const TroopPropertiesPanel = ({ troop, onUpdateTroop, onRemoveTroop, onClose }: TroopPropertiesPanelProps) => {
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
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-sm">Troop Properties</CardTitle>
            <p className="text-xs text-muted-foreground">
              Position: ({troop.Pos.x}, {troop.Pos.y})
            </p>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 -mt-1"
              onClick={() => {
                if (troop.Type === 0) {
                  onRemoveTroop();
                } else {
                  onClose();
                }
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
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
          <Select
            value={troop.Type.toString()}
            onValueChange={(value) => onUpdateTroop({ Type: parseInt(value) })}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TROOP_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="owner" className="text-xs">Owner</Label>
          <Select
            value={troop.Owner.toString()}
            onValueChange={(value) => onUpdateTroop({ Owner: parseInt(value) })}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Player 1</SelectItem>
              <SelectItem value="2">Player 2</SelectItem>
            </SelectContent>
          </Select>
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
