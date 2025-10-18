import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { PREDEFINED_MAPS } from "@/data/maps";

interface MapSelectorProps {
  onLoadMap: (mapName: string) => void;
}

export const MapSelector = ({ onLoadMap }: MapSelectorProps) => {
  const [selectedMap, setSelectedMap] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CardHeader>
          <CollapsibleTrigger className="flex items-center justify-between w-full hover:opacity-80 transition-opacity">
            <CardTitle className="text-lg">Current Maps</CardTitle>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "" : "-rotate-90"}`} />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
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
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
