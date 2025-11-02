import { HexGrid } from "@/types/hex";
import { PREDEFINED_MAPS } from "@/data/maps";
import { createBlankTemplate } from "@/utils/templateGenerator";
import { Button } from "./ui/button";
import { MapThumbnail } from "./MapThumbnail";

interface QuickStartProps {
  onLoadMap: (tiles: any[], troops: any[]) => void;
}

export function QuickStart({ onLoadMap }: QuickStartProps) {
  const handleLoadTemplate = (mapName: string) => {
    const sourceMap = PREDEFINED_MAPS.find(m => m.name === mapName);
    if (sourceMap) {
      const template = createBlankTemplate(sourceMap.data);
      onLoadMap(template.Tiles, template.Troops || []);
    }
  };

  const handleLoadExistingMap = (mapName: string) => {
    const map = PREDEFINED_MAPS.find(m => m.name === mapName);
    if (map) {
      onLoadMap(map.data.Tiles, map.data.Troops || []);
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">No Grid Loaded</h2>
          <p className="text-muted-foreground">Get started with a template or load an existing map</p>
        </div>

        {/* Templates Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Quick Templates</h3>
          <p className="text-sm text-muted-foreground text-center">
            Blank grids with only Base entities
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => handleLoadTemplate("Desolation Pass")}
              size="lg"
              variant="outline"
              className="min-w-32"
            >
              Small
            </Button>
            <Button
              onClick={() => handleLoadTemplate("Wild Steppes")}
              size="lg"
              variant="outline"
              className="min-w-32"
            >
              Medium
            </Button>
            <Button
              onClick={() => handleLoadTemplate("Mt.Bosk")}
              size="lg"
              variant="outline"
              className="min-w-32"
            >
              Large
            </Button>
          </div>
        </div>

        {/* Existing Maps Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Current Maps</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PREDEFINED_MAPS.map((map) => (
              <MapThumbnail
                key={map.name}
                map={map.data}
                name={map.name}
                onClick={() => handleLoadExistingMap(map.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
