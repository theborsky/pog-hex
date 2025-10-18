import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="bg-[#999] border-slate-700">
      <CardHeader>
        <CardTitle className="text-lg">Legend</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map(({ label, color, stroke }) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded border-2"
              style={{
                backgroundColor: color,
                borderColor: stroke,
              }}
            />
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
