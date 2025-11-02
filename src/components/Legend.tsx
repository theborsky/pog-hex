import { Card, CardContent } from "@/components/ui/card";

export const Legend = () => {
  const items = [
    { label: "Walkable", color: "hsl(var(--tile-walkable))", stroke: "hsl(var(--tile-walkable-stroke))" },
    { label: "Hole", color: "hsl(var(--tile-hole))", stroke: "hsl(var(--tile-hole-stroke))" },
    { label: "Bonus", color: "hsl(var(--tile-bonus))", stroke: "hsl(var(--tile-bonus-stroke))" },
    { label: "Obstacle", color: "hsl(var(--tile-obstacle))", stroke: "hsl(var(--tile-obstacle-stroke))" },
    { label: "Spawn P1", color: "hsl(var(--tile-spawn-p1))", stroke: "hsl(var(--tile-spawn-p1-stroke))" },
    { label: "Spawn P2", color: "hsl(var(--tile-spawn-p2))", stroke: "hsl(var(--tile-spawn-p2-stroke))" },
    { label: "Selected", color: "hsl(var(--tile-selected))", stroke: "hsl(var(--tile-selected-stroke))" },
  ];

  return (
    <Card className="w-fit">
      <CardContent className="flex items-center gap-4 p-3">
        {items.map(({ label, color, stroke }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div
              className="w-4 h-4 rounded border-2"
              style={{
                backgroundColor: color,
                borderColor: stroke,
              }}
            />
            <span className="text-xs whitespace-nowrap">{label}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
