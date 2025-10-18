import { HexTile as HexTileType, Position, Troop } from "@/types/hex";
import { HexTile } from "./HexTile";
import { hexToPixel } from "@/utils/hexUtils";
import { useMemo } from "react";

interface HexGridProps {
  tiles: HexTileType[];
  selectedTile: Position | null;
  onTileClick: (pos: Position) => void;
  troops: Troop[];
}

export const HexGrid = ({ tiles, selectedTile, onTileClick, troops }: HexGridProps) => {
  const bounds = useMemo(() => {
    if (tiles.length === 0) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }

    const pixels = tiles.map((t) => hexToPixel(t.Pos));
    const minX = Math.min(...pixels.map((p) => p.x));
    const maxX = Math.max(...pixels.map((p) => p.x));
    const minY = Math.min(...pixels.map((p) => p.y));
    const maxY = Math.max(...pixels.map((p) => p.y));

    return { minX, maxX, minY, maxY };
  }, [tiles]);

  const padding = 60;
  const viewBoxWidth = bounds.maxX - bounds.minX + padding * 2;
  const viewBoxHeight = bounds.maxY - bounds.minY + padding * 2;
  const viewBoxX = bounds.minX - padding;
  const viewBoxY = bounds.minY - padding;

  return (
    <div className="w-full h-full flex items-center justify-center bg-background overflow-auto">
      <svg
        viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
        className="max-w-full max-h-full"
        style={{ minHeight: "400px" }}
      >
        {tiles.map((tile) => {
          const troopAtTile = troops.find(
            (t) => t.Pos.x === tile.Pos.x && t.Pos.y === tile.Pos.y
          );
          return (
            <HexTile
              key={`${tile.Pos.x},${tile.Pos.y}`}
              tile={tile}
              troop={troopAtTile}
              isSelected={
                selectedTile !== null &&
                tile.Pos.x === selectedTile.x &&
                tile.Pos.y === selectedTile.y
              }
              onClick={() => onTileClick(tile.Pos)}
            />
          );
        })}
      </svg>
    </div>
  );
};
