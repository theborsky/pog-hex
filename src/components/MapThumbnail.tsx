import { HexGrid } from "@/types/hex";

interface MapThumbnailProps {
  map: HexGrid;
  name: string;
  onClick: () => void;
}

export function MapThumbnail({ map, name, onClick }: MapThumbnailProps) {
  // Calculate bounds for the mini grid
  const allX = map.Tiles.map(t => t.Pos.x);
  const allY = map.Tiles.map(t => t.Pos.y);
  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);
  
  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  const tileCount = map.Tiles.length;

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 border-border hover:border-primary transition-all bg-card hover:bg-accent/50"
    >
      <div className="relative w-20 h-20 flex items-center justify-center bg-muted/30 rounded-md overflow-hidden">
        {/* Simple grid representation */}
        <svg 
          viewBox={`0 0 ${width * 10} ${height * 10}`} 
          className="w-full h-full"
        >
          {map.Tiles.map((tile, i) => {
            const x = (tile.Pos.x - minX) * 10;
            const y = (tile.Pos.y - minY) * 10;
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width="9"
                height="9"
                fill="currentColor"
                className="text-primary/60 group-hover:text-primary transition-colors"
              />
            );
          })}
        </svg>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{tileCount} tiles</p>
      </div>
    </button>
  );
}
