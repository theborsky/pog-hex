import { HexTile } from "@/types/hex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowUp, ArrowDown } from "lucide-react";

interface TilePropertiesPanelProps {
  tile: HexTile | null;
  onUpdateTile: (updates: Partial<HexTile>) => void;
  onRemoveTile: () => void;
  onAddTileAbove: () => void;
  onAddTileBelow: () => void;
}

export const TilePropertiesPanel = ({ tile, onUpdateTile, onRemoveTile, onAddTileAbove, onAddTileBelow }: TilePropertiesPanelProps) => {
  if (!tile) {
    return (
      <Card className="bg-[#999] border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg">Tile Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Select a tile to edit its properties</p>
        </CardContent>
      </Card>
    );
  }

  const properties = [
    { key: "IsWalkable", label: "Walkable", color: "hsl(var(--tile-walkable))" },
    { key: "IsHole", label: "Hole", color: "hsl(var(--tile-hole))" },
    { key: "IsBonus", label: "Bonus", color: "hsl(var(--tile-bonus))" },
    { key: "IsObstacle", label: "Obstacle", color: "hsl(var(--tile-obstacle))" },
    { key: "IsSpawnP1", label: "Spawn P1", color: "hsl(var(--tile-spawn-p1))" },
    { key: "IsSpawnP2", label: "Spawn P2", color: "hsl(var(--tile-spawn-p2))" },
  ] as const;

  return (
    <Card className="bg-[#999] border-slate-700">
      <CardHeader>
        <CardTitle className="text-lg">Tile Properties</CardTitle>
        <p className="text-sm text-muted-foreground">
          Position: ({tile.Pos.x}, {tile.Pos.y})
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {properties.map(({ key, label, color }) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded border-2"
                style={{
                  backgroundColor: color,
                  borderColor: color,
                  opacity: 0.7,
                }}
              />
              <Label htmlFor={key} className="cursor-pointer">
                {label}
              </Label>
            </div>
            <Switch
              id={key}
              checked={tile[key]}
              onCheckedChange={(checked) => onUpdateTile({ [key]: checked })}
            />
          </div>
        ))}
        <div className="space-y-2 pt-2">
          <div className="flex gap-2">
            <Button 
              onClick={onAddTileAbove} 
              variant="secondary" 
              className="flex-1"
              size="sm"
            >
              <ArrowUp className="mr-1 h-4 w-4" />
              Add Above
            </Button>
            <Button 
              onClick={onAddTileBelow} 
              variant="secondary" 
              className="flex-1"
              size="sm"
            >
              <ArrowDown className="mr-1 h-4 w-4" />
              Add Below
            </Button>
          </div>
          <Button 
            onClick={onRemoveTile} 
            variant="destructive" 
            className="w-full"
            size="sm"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove Tile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
