import { Troop } from "@/types/hex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTroopTypeName } from "@/utils/troopTypes";

interface TroopListProps {
  troops: Troop[];
  selectedTroopId: number | null;
  onSelectTroop: (troopId: number) => void;
  onRemoveTroop: (troopId: number) => void;
}

export const TroopList = ({ troops, selectedTroopId, onSelectTroop, onRemoveTroop }: TroopListProps) => {
  if (troops.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Troop List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No troops added yet</p>
        </CardContent>
      </Card>
    );
  }

  // Separate troops into regular and "None" type, sorted by EntityId
  const regularTroops = troops.filter(t => t.Type !== 0).sort((a, b) => a.EntityId - b.EntityId);
  const noneTroops = troops.filter(t => t.Type === 0).sort((a, b) => a.EntityId - b.EntityId);

  const renderTroopItem = (troop: Troop) => (
    <div
      key={troop.EntityId}
      className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
        selectedTroopId === troop.EntityId
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent"
      }`}
      onClick={() => onSelectTroop(troop.EntityId)}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">
          {getTroopTypeName(troop.Type)} (ID: {troop.EntityId})
        </p>
        <p className={`text-xs ${
          selectedTroopId === troop.EntityId
            ? "text-primary-foreground/70"
            : "text-muted-foreground"
        }`}>
          Pos: ({troop.Pos.x}, {troop.Pos.y}) • P{troop.Owner}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 flex-shrink-0 ml-2"
        onClick={(e) => {
          e.stopPropagation();
          onRemoveTroop(troop.EntityId);
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Troop List ({troops.length})</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="max-h-[600px]">
          <div className="space-y-3 p-4">
            {regularTroops.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                  Active Troops ({regularTroops.length})
                </h4>
                {regularTroops.map(renderTroopItem)}
              </div>
            )}
            {noneTroops.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                  Unassigned ({noneTroops.length})
                </h4>
                {noneTroops.map(renderTroopItem)}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
