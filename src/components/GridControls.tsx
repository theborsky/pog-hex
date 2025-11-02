import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, Plus, Trash2, Minus } from "lucide-react";
import { useState, useEffect } from "react";

interface GridControlsProps {
  onImport: (file: File) => void;
  onExport: () => void;
  onAddColumn: (x: number) => void;
  onRemoveColumn: (x: number) => void;
  onAddRow: (y: number) => void;
  onRemoveRow: (y: number) => void;
  showImportExportOnly?: boolean;
  showGridControlsOnly?: boolean;
  defaultColumnX?: number;
  defaultRowY?: number;
  currentMaxX?: number;
  currentMaxY?: number;
}

export const GridControls = ({
  onImport,
  onExport,
  onAddColumn,
  onRemoveColumn,
  onAddRow,
  onRemoveRow,
  showImportExportOnly = false,
  showGridControlsOnly = false,
  defaultColumnX = 0,
  defaultRowY = 0,
  currentMaxX = 0,
  currentMaxY = 0,
}: GridControlsProps) => {
  const [columnX, setColumnX] = useState(defaultColumnX.toString());
  const [rowY, setRowY] = useState(defaultRowY.toString());

  // Update inputs when defaults change
  useEffect(() => {
    setColumnX(defaultColumnX.toString());
  }, [defaultColumnX]);

  useEffect(() => {
    setRowY(defaultRowY.toString());
  }, [defaultRowY]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {!showGridControlsOnly && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Import/Export</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={onExport} className="w-full" variant="default">
              <Download className="mr-2 h-4 w-4" />
              Export JSON
            </Button>
            <Button asChild variant="secondary" className="w-full">
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Import JSON
                <input
                  id="file-upload"
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </Button>
          </CardContent>
        </Card>
      )}

      {!showImportExportOnly && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Manage Grid</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="column-x" className="text-sm font-medium">Column X</Label>
              <div className="flex gap-2">
                <Button
                  onClick={() => setColumnX((parseInt(columnX) - 1).toString())}
                  size="icon"
                  variant="outline"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="column-x"
                  type="number"
                  value={columnX}
                  onChange={(e) => setColumnX(e.target.value)}
                  placeholder="X"
                  className="flex-1"
                />
                <Button
                  onClick={() => setColumnX((parseInt(columnX) + 1).toString())}
                  size="icon"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => {
                    onAddColumn(parseInt(columnX));
                    setColumnX((parseInt(columnX) + 1).toString());
                  }}
                  size="icon"
                  variant="default"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => {
                    const currentVal = parseInt(columnX);
                    onRemoveColumn(currentVal - 1);
                    setColumnX((currentVal - 1).toString());
                  }}
                  size="icon"
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="row-y" className="text-sm font-medium">Row Y</Label>
              <div className="flex gap-2">
                <Button
                  onClick={() => setRowY((parseInt(rowY) - 1).toString())}
                  size="icon"
                  variant="outline"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="row-y"
                  type="number"
                  value={rowY}
                  onChange={(e) => setRowY(e.target.value)}
                  placeholder="Y"
                  className="flex-1"
                />
                <Button
                  onClick={() => setRowY((parseInt(rowY) + 1).toString())}
                  size="icon"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => {
                    onAddRow(parseInt(rowY));
                    setRowY((parseInt(rowY) + 1).toString());
                  }}
                  size="icon"
                  variant="default"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => {
                    const currentVal = parseInt(rowY);
                    onRemoveRow(currentVal - 1);
                    setRowY((currentVal - 1).toString());
                  }}
                  size="icon"
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
