import { HexTile as HexTileType, Position, Troop } from "@/types/hex";
import { HexTile } from "./HexTile";
import { hexToPixel, getBaseCoveredTiles } from "@/utils/hexUtils";
import { useMemo } from "react";
import { TROOP_TYPES } from "@/utils/troopTypes";

interface HexGridProps {
  tiles: HexTileType[];
  selectedTile: Position | null;
  onTileClick: (pos: Position) => void;
  troops: Troop[];
  viewMode: "tiles" | "troops";
}

export const HexGrid = ({ tiles, selectedTile, onTileClick, troops, viewMode }: HexGridProps) => {
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

  // Calculate which tiles are covered by bases
  const coveredByBaseTiles = useMemo(() => {
    const covered = new Map<string, number>();
    troops.forEach((troop) => {
      if (troop.Type === TROOP_TYPES.Base) {
        const coveredTiles = getBaseCoveredTiles(troop.Pos);
        coveredTiles.forEach((pos) => {
          covered.set(`${pos.x},${pos.y}`, troop.Owner);
        });
      }
    });
    return covered;
  }, [troops]);

  const padding = 60;
  const viewBoxWidth = bounds.maxX - bounds.minX + padding * 2;
  const viewBoxHeight = bounds.maxY - bounds.minY + padding * 2;
  const viewBoxX = bounds.minX - padding;
  const viewBoxY = bounds.minY - padding;

  // Sort tiles so selected tile renders last (on top)
  const sortedTiles = useMemo(() => {
    if (!selectedTile) return tiles;
    return [...tiles].sort((a, b) => {
      const aIsSelected = a.Pos.x === selectedTile.x && a.Pos.y === selectedTile.y;
      const bIsSelected = b.Pos.x === selectedTile.x && b.Pos.y === selectedTile.y;
      if (aIsSelected) return 1;
      if (bIsSelected) return -1;
      return 0;
    });
  }, [tiles, selectedTile]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-background overflow-auto">
      <svg
        viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
        className="max-w-full max-h-full"
        style={{ minHeight: "400px" }}
      >
        {sortedTiles.map((tile) => {
          const troopAtTile = troops.find(
            (t) => t.Pos.x === tile.Pos.x && t.Pos.y === tile.Pos.y
          );
          const tileKey = `${tile.Pos.x},${tile.Pos.y}`;
          const baseOwner = coveredByBaseTiles.get(tileKey);
          const isCoveredByBase = baseOwner !== undefined;
          return (
            <HexTile
              key={tileKey}
              tile={tile}
              troop={troopAtTile}
              isSelected={
                selectedTile !== null &&
                tile.Pos.x === selectedTile.x &&
                tile.Pos.y === selectedTile.y
              }
              isCoveredByBase={isCoveredByBase}
              baseOwner={baseOwner}
              viewMode={viewMode}
              onClick={() => onTileClick(tile.Pos)}
            />
          );
        })}
      </svg>
    </div>
  );
};
