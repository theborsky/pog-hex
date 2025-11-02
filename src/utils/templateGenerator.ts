import { HexGrid, HexTile, Troop } from "@/types/hex";

/**
 * Creates a blank template from an existing map by:
 * - Resetting all tiles to walkable
 * - Keeping only Base entities (Type 10)
 */
export function createBlankTemplate(sourceMap: HexGrid): HexGrid {
  // Reset all tiles to walkable
  const resetTiles: HexTile[] = sourceMap.Tiles.map(tile => ({
    Pos: { ...tile.Pos },
    IsWalkable: true,
    IsHole: false,
    IsBonus: false,
    IsObstacle: false,
    IsSpawnP1: false,
    IsSpawnP2: false,
  }));

  // Keep only Base troops (Type 10)
  const baseTroops: Troop[] = (sourceMap.Troops || []).filter(troop => troop.Type === 10);

  return {
    Tiles: resetTiles,
    Troops: baseTroops,
  };
}

