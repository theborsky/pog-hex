import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, Plus, Trash2 } from "lucide-react";
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
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Manage Columns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label htmlFor="column-x">Column X</Label>
                <Input
                  id="column-x"
                  type="number"
                  value={columnX}
                  onChange={(e) => setColumnX(e.target.value)}
                  placeholder="Enter X coordinate"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => onAddColumn(parseInt(columnX))}
                  className="flex-1"
                  size="sm"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add
                </Button>
                <Button
                  onClick={() => onRemoveColumn(parseInt(columnX))}
                  variant="destructive"
                  className="flex-1"
                  size="sm"
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Manage Rows</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label htmlFor="row-y">Row Y</Label>
                <Input
                  id="row-y"
                  type="number"
                  value={rowY}
                  onChange={(e) => setRowY(e.target.value)}
                  placeholder="Enter Y coordinate"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => onAddRow(parseInt(rowY))}
                  className="flex-1"
                  size="sm"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add
                </Button>
                <Button
                  onClick={() => onRemoveRow(parseInt(rowY))}
                  variant="destructive"
                  className="flex-1"
                  size="sm"
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
