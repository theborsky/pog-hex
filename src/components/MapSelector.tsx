import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PREDEFINED_MAPS } from "@/data/maps";

interface MapSelectorProps {
  onLoadMap: (mapName: string) => void;
}

export const MapSelector = ({ onLoadMap }: MapSelectorProps) => {
  const [selectedMap, setSelectedMap] = useState<string>("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Current Maps</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Select value={selectedMap} onValueChange={setSelectedMap}>
          <SelectTrigger>
            <SelectValue placeholder="Select a map" />
          </SelectTrigger>
          <SelectContent>
            {PREDEFINED_MAPS.map((map) => (
              <SelectItem key={map.name} value={map.name}>
                {map.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          onClick={() => selectedMap && onLoadMap(selectedMap)} 
          disabled={!selectedMap}
          className="w-full"
        >
          Load Map
        </Button>
      </CardContent>
    </Card>
  );
};
