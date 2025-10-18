import { HexTile as HexTileType, Troop } from "@/types/hex";
import { hexToPixel, getHexPath } from "@/utils/hexUtils";
import { getTroopTypeName } from "@/utils/troopTypes";

interface HexTileProps {
  tile: HexTileType;
  isSelected: boolean;
  onClick: () => void;
  troop?: Troop;
  isCoveredByBase?: boolean;
  baseOwner?: number;
  viewMode: "tiles" | "troops";
}

export const HexTile = ({ tile, isSelected, onClick, troop, isCoveredByBase, baseOwner, viewMode }: HexTileProps) => {
  const pixel = hexToPixel(tile.Pos);
  const hexPath = getHexPath();

  const getTileColor = () => {
    if (isSelected) return "hsl(var(--tile-selected))";
    if (tile.IsSpawnP1) return "hsl(var(--tile-spawn-p1))";
    if (tile.IsSpawnP2) return "hsl(var(--tile-spawn-p2))";
    if (tile.IsHole) return "hsl(var(--tile-hole))";
    if (tile.IsBonus) return "hsl(var(--tile-bonus))";
    if (tile.IsObstacle) return "hsl(var(--tile-obstacle))";
    
    // Check if all booleans are false
    const allFalse = !tile.IsWalkable && !tile.IsHole && !tile.IsBonus && 
                     !tile.IsObstacle && !tile.IsSpawnP1 && !tile.IsSpawnP2;
    if (allFalse) return "hsl(var(--muted))";
    
    return "hsl(var(--tile-walkable))";
  };

  const getStrokeColor = () => {
    if (isSelected) return "hsl(var(--tile-selected-stroke))";
    if (tile.IsSpawnP1) return "hsl(var(--tile-spawn-p1-stroke))";
    if (tile.IsSpawnP2) return "hsl(var(--tile-spawn-p2-stroke))";
    if (tile.IsHole) return "hsl(var(--tile-hole-stroke))";
    if (tile.IsBonus) return "hsl(var(--tile-bonus-stroke))";
    if (tile.IsObstacle) return "hsl(var(--tile-obstacle-stroke))";
    return "hsl(var(--tile-walkable-stroke))";
  };

  const getTroopStrokeColor = () => {
    if (!troop || troop.Type === 0) return null;
    return troop.Owner === 1 ? "#3b82f6" : "#ef4444"; // Blue for Player 1, Red for Player 2
  };

  const insetHexPath = getHexPath(25); // 5 pixels smaller radius for inset

  return (
    <g
      transform={`translate(${pixel.x}, ${pixel.y})`}
      onClick={onClick}
      className="cursor-pointer transition-all hover:opacity-80"
    >
      <path
        d={hexPath}
        fill={getTileColor()}
        stroke={getStrokeColor()}
        strokeWidth={isSelected ? 3 : 2}
      />
      {getTroopStrokeColor() && (
        <path
          d={insetHexPath}
          fill="none"
          stroke={getTroopStrokeColor()!}
          strokeWidth={1.5}
        />
      )}
      {isCoveredByBase && baseOwner && (
        <path
          d={insetHexPath}
          fill="none"
          stroke={baseOwner === 1 ? "#3b82f6" : "#ef4444"}
          strokeWidth={1}
          strokeDasharray="4 2"
          opacity={0.7}
        />
      )}
      {isSelected && viewMode === "troops" && (
        <path
          d={insetHexPath}
          fill="none"
          stroke="#9333ea"
          strokeWidth={2}
        />
      )}
      {troop && troop.Type !== 0 && (
        <text
          x={0}
          y={-8}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[8px] fill-foreground/70 font-mono pointer-events-none select-none font-semibold"
        >
          {getTroopTypeName(troop.Type)}
        </text>
      )}
      <text
        x={0}
        y={troop && troop.Type !== 0 ? 5 : 0}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-[10px] fill-foreground/50 font-mono pointer-events-none select-none"
      >
        {tile.Pos.x},{tile.Pos.y}
      </text>
    </g>
  );
};
