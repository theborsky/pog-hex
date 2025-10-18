import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";

interface TroopControlsProps {
  onAddTroop: (x: number, y: number) => void;
}

export const TroopControls = ({ onAddTroop }: TroopControlsProps) => {
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  const handleAdd = () => {
    const xNum = parseInt(x);
    const yNum = parseInt(y);
    if (!isNaN(xNum) && !isNaN(yNum)) {
      onAddTroop(xNum, yNum);
      setX("");
      setY("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Troop Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Label className="text-xs">Add Troop at Position</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="X"
              value={x}
              onChange={(e) => setX(e.target.value)}
              className="h-8"
            />
            <Input
              type="number"
              placeholder="Y"
              value={y}
              onChange={(e) => setY(e.target.value)}
              className="h-8"
            />
          </div>
          <Button onClick={handleAdd} size="sm" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Troop
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
