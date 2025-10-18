import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Upload, Download, Plus, Trash2, ChevronDown } from "lucide-react";
import { useState } from "react";

interface GridControlsProps {
  onImport: (file: File) => void;
  onExport: () => void;
  onAddColumn: (x: number) => void;
  onRemoveColumn: (x: number) => void;
  onAddRow: (y: number) => void;
  onRemoveRow: (y: number) => void;
}

export const GridControls = ({
  onImport,
  onExport,
  onAddColumn,
  onRemoveColumn,
  onAddRow,
  onRemoveRow,
}: GridControlsProps) => {
  const [columnX, setColumnX] = useState("0");
  const [rowY, setRowY] = useState("0");
  const [importExportOpen, setImportExportOpen] = useState(true);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [rowsOpen, setRowsOpen] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <Collapsible open={importExportOpen} onOpenChange={setImportExportOpen}>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg">Import/Export</CardTitle>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${importExportOpen ? 'rotate-180' : ''}`} />
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
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
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible open={columnsOpen} onOpenChange={setColumnsOpen}>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg">Manage Columns</CardTitle>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${columnsOpen ? 'rotate-180' : ''}`} />
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
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
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible open={rowsOpen} onOpenChange={setRowsOpen}>
        <Card>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg">Manage Rows</CardTitle>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${rowsOpen ? 'rotate-180' : ''}`} />
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
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
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};
