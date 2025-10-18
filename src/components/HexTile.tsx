import { HexTile as HexTileType, Troop } from "@/types/hex";
import { hexToPixel, getHexPath } from "@/utils/hexUtils";

interface HexTileProps {
  tile: HexTileType;
  isSelected: boolean;
  onClick: () => void;
  troop?: Troop;
}

export const HexTile = ({ tile, isSelected, onClick, troop }: HexTileProps) => {
  const pixel = hexToPixel(tile.Pos);
  const hexPath = getHexPath();

  const getTileColor = () => {
    if (isSelected) return "hsl(var(--tile-selected))";
    if (tile.IsSpawnP1) return "hsl(var(--tile-spawn-p1))";
    if (tile.IsSpawnP2) return "hsl(var(--tile-spawn-p2))";
    if (tile.IsHole) return "hsl(var(--tile-hole))";
    if (tile.IsBonus) return "hsl(var(--tile-bonus))";
    if (tile.IsObstacle) return "hsl(var(--tile-obstacle))";
    return "hsl(var(--tile-walkable))";
  };

  const getStrokeColor = () => {
    // Check if there's a troop with Type !== 0 (None)
    if (troop && troop.Type !== 0) {
      return troop.Owner === 1 ? "#3b82f6" : "#ef4444"; // Blue for Player 1, Red for Player 2
    }
    
    if (isSelected) return "hsl(var(--tile-selected-stroke))";
    if (tile.IsSpawnP1) return "hsl(var(--tile-spawn-p1-stroke))";
    if (tile.IsSpawnP2) return "hsl(var(--tile-spawn-p2-stroke))";
    if (tile.IsHole) return "hsl(var(--tile-hole-stroke))";
    if (tile.IsBonus) return "hsl(var(--tile-bonus-stroke))";
    if (tile.IsObstacle) return "hsl(var(--tile-obstacle-stroke))";
    return "hsl(var(--tile-walkable-stroke))";
  };

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
      <text
        x={0}
        y={0}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-[10px] fill-foreground/50 font-mono pointer-events-none select-none"
      >
        {tile.Pos.x},{tile.Pos.y}
      </text>
    </g>
  );
};
