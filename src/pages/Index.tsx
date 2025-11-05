import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import pogLogo from "@/assets/pog-logo.webp";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { HexGrid as HexGridType, HexTile, Position, Troop } from "@/types/hex";
import { HexGrid } from "@/components/HexGrid";
import { TilePropertiesPanel } from "@/components/TilePropertiesPanel";
import { TroopPropertiesPanel } from "@/components/TroopPropertiesPanel";
import { TroopControls } from "@/components/TroopControls";
import { TroopList } from "@/components/TroopList";
import { GridControls } from "@/components/GridControls";
import { Legend } from "@/components/Legend";
import { MapSelector } from "@/components/MapSelector";
import { QuickStart } from "@/components/QuickStart";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PREDEFINED_MAPS } from "@/data/maps";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { hexToPixel } from "@/utils/hexUtils";

const Index = () => {
  const [tiles, setTiles] = useState<HexTile[]>([]);
  const [troops, setTroops] = useState<Troop[]>([]);
  const [selectedTile, setSelectedTile] = useState<Position | null>(null);
  const [selectedTroopId, setSelectedTroopId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"tiles" | "troops">("tiles");
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportFilename, setExportFilename] = useState("hex-grid");
  const [showJsonEditor, setShowJsonEditor] = useState(false);
  const [jsonEditorContent, setJsonEditorContent] = useState("");
  
  // Calculate next available column and row numbers
  const getNextColumnX = () => {
    if (tiles.length === 0) return 0;
    const allX = tiles.map(t => t.Pos.x);
    return Math.max(...allX) + 1;
  };
  
  const getNextRowY = () => {
    if (tiles.length === 0) return 0;
    const allY = tiles.map(t => t.Pos.y);
    return Math.max(...allY) + 1;
  };
  
  // Get current max column and row
  const getCurrentMaxX = () => {
    if (tiles.length === 0) return 0;
    const allX = tiles.map(t => t.Pos.x);
    return Math.max(...allX);
  };
  
  const getCurrentMaxY = () => {
    if (tiles.length === 0) return 0;
    const allY = tiles.map(t => t.Pos.y);
    return Math.max(...allY);
  };

  // Send EDITOR_READY message when component mounts
  useEffect(() => {
    window.parent.postMessage({ type: 'EDITOR_READY' }, '*');
  }, []);

  // Listen for LOAD_MAP_DATA messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'LOAD_MAP_DATA') {
        const { tiles, troops } = event.data;
        if (tiles) {
          setTiles(tiles);
          setTroops(troops || []);
          setSelectedTile(null);
          setSelectedTroopId(null);
          toast.success(`Loaded map data from Quest Builder`);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string) as HexGridType;
        setTiles(json.Tiles);
        setTroops(json.Troops || []);
        setSelectedTile(null);
        setSelectedTroopId(null);
        toast.success(`Imported ${json.Tiles.length} tiles and ${json.Troops?.length || 0} troops`);
      } catch (error) {
        toast.error("Failed to import JSON file");
        console.error(error);
      }
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    setShowExportDialog(true);
  };

  const handleConfirmExport = () => {
    const gridData: HexGridType = { Tiles: tiles, Troops: troops };
    const json = JSON.stringify(gridData, null, 4);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportFilename}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportDialog(false);
    toast.success("Grid exported successfully");
  };

  const handleLoadPredefinedMap = (mapName: string) => {
    const map = PREDEFINED_MAPS.find(m => m.name === mapName);
    if (map) {
      setTiles(map.data.Tiles);
      setTroops(map.data.Troops || []);
      setSelectedTile(null);
      setSelectedTroopId(null);
      toast.success(`Loaded ${mapName}`);
    }
  };

  const handleClearMap = () => {
    setTiles([]);
    setTroops([]);
    setSelectedTile(null);
    setSelectedTroopId(null);
    toast.success("Map cleared");
  };

  const handleClearTroops = () => {
    setTroops([]);
    setSelectedTroopId(null);
    toast.success("All troops cleared");
  };

  const handleResetTiles = () => {
    const resetTiles = tiles.map(tile => ({
      ...tile,
      IsWalkable: true,
      IsHole: false,
      IsBonus: false,
      IsObstacle: false,
      IsSpawnP1: false,
      IsSpawnP2: false
    }));
    setTiles(resetTiles);
    toast.success("All tiles reset to walkable");
  };

  const handleSendToQuestBuilder = () => {
    const mapData = {
      type: 'MAP_DATA',
      tiles: tiles,
      troops: troops
    };
    
    // Send to parent window (Quest Forge)
    window.parent.postMessage(mapData, '*');
    toast.success("Map sent to Quest Builder");
  };

  const handleTileClick = (pos: Position) => {
    if (viewMode === "tiles") {
      setSelectedTile(pos);
      setSelectedTroopId(null);
    } else {
      // In troops mode, first clean up any Type None troops
      let cleanedTroops = troops;
      if (selectedTroopId !== null) {
        const currentTroop = troops.find(t => t.EntityId === selectedTroopId);
        if (currentTroop && currentTroop.Type === 0) {
          cleanedTroops = troops.filter(t => t.EntityId !== selectedTroopId);
          setTroops(cleanedTroops);
        }
      }
      
      // Set selected tile for visual feedback
      setSelectedTile(pos);
      
      // Find troop at this position in the cleaned troops array
      const troopAtPos = cleanedTroops.find(t => t.Pos.x === pos.x && t.Pos.y === pos.y);
      if (troopAtPos) {
        setSelectedTroopId(troopAtPos.EntityId);
      } else {
        // No troop at this position, create a new one using cleaned array
        const newEntityId = cleanedTroops.length > 0 ? Math.max(...cleanedTroops.map(t => t.EntityId)) + 1 : 1;
        const newTroop: Troop = {
          EntityId: newEntityId,
          Pos: { x: pos.x, y: pos.y },
          Type: 0,
          Owner: 1,
        };
        setTroops([...cleanedTroops, newTroop]);
        setSelectedTroopId(newEntityId);
        toast.success(`Added troop at (${pos.x}, ${pos.y})`);
      }
    }
  };

  const handleUpdateTile = (updates: Partial<HexTile>) => {
    if (!selectedTile) return;

    // If Obstacle is being set to true, automatically set Walkable to false
    if (updates.IsObstacle === true) {
      updates.IsWalkable = false;
    }
    // If Obstacle is being set to false, automatically set Walkable to true
    else if (updates.IsObstacle === false) {
      updates.IsWalkable = true;
    }

    // If Hole is being set to true, automatically set Walkable to false
    if (updates.IsHole === true) {
      updates.IsWalkable = false;
    }
    // If Hole is being set to false, automatically set Walkable to true
    else if (updates.IsHole === false) {
      updates.IsWalkable = true;
    }

    setTiles((prevTiles) =>
      prevTiles.map((tile) =>
        tile.Pos.x === selectedTile.x && tile.Pos.y === selectedTile.y
          ? { ...tile, ...updates }
          : tile
      )
    );
  };

  const handleAddColumn = (x: number) => {
    if (isNaN(x)) {
      toast.error("Please enter a valid X coordinate");
      return;
    }

    // Check if column already exists
    const existingTiles = tiles.filter((t) => t.Pos.x === x);
    if (existingTiles.length > 0) {
      toast.error(`Column X=${x} already exists`);
      return;
    }

    // Find Y range from existing tiles
    const allY = tiles.map((t) => t.Pos.y);
    const minY = allY.length > 0 ? Math.min(...allY) : 0;
    const maxY = allY.length > 0 ? Math.max(...allY) : 0;

    // Create new tiles for this column
    const newTiles: HexTile[] = [];
    for (let y = minY; y <= maxY; y++) {
      newTiles.push({
        Pos: { x, y },
        IsWalkable: true,
        IsHole: false,
        IsBonus: false,
        IsObstacle: false,
        IsSpawnP1: false,
        IsSpawnP2: false,
      });
    }

    setTiles([...tiles, ...newTiles]);
    toast.success(`Added column X=${x} with ${newTiles.length} tiles`);
  };

  const handleRemoveColumn = (x: number) => {
    if (isNaN(x)) {
      toast.error("Please enter a valid X coordinate");
      return;
    }

    const tilesInColumn = tiles.filter((t) => t.Pos.x === x);
    if (tilesInColumn.length === 0) {
      toast.error(`No tiles found in column X=${x}`);
      return;
    }

    setTiles(tiles.filter((t) => t.Pos.x !== x));
    if (selectedTile?.x === x) {
      setSelectedTile(null);
    }
    toast.success(`Removed column X=${x} (${tilesInColumn.length} tiles)`);
  };

  const handleAddRow = (y: number) => {
    if (isNaN(y)) {
      toast.error("Please enter a valid Y coordinate");
      return;
    }

    // Check if row already exists
    const existingTiles = tiles.filter((t) => t.Pos.y === y);
    if (existingTiles.length > 0) {
      toast.error(`Row Y=${y} already exists`);
      return;
    }

    // Find X range from existing tiles
    const allX = tiles.map((t) => t.Pos.x);
    const minX = allX.length > 0 ? Math.min(...allX) : 0;
    const maxX = allX.length > 0 ? Math.max(...allX) : 0;

    // Create new tiles for this row
    const newTiles: HexTile[] = [];
    for (let x = minX; x <= maxX; x++) {
      newTiles.push({
        Pos: { x, y },
        IsWalkable: true,
        IsHole: false,
        IsBonus: false,
        IsObstacle: false,
        IsSpawnP1: false,
        IsSpawnP2: false,
      });
    }

    setTiles([...tiles, ...newTiles]);
    toast.success(`Added row Y=${y} with ${newTiles.length} tiles`);
  };

  const handleRemoveRow = (y: number) => {
    if (isNaN(y)) {
      toast.error("Please enter a valid Y coordinate");
      return;
    }

    const tilesInRow = tiles.filter((t) => t.Pos.y === y);
    if (tilesInRow.length === 0) {
      toast.error(`No tiles found in row Y=${y}`);
      return;
    }

    setTiles(tiles.filter((t) => t.Pos.y !== y));
    if (selectedTile?.y === y) {
      setSelectedTile(null);
    }
    toast.success(`Removed row Y=${y} (${tilesInRow.length} tiles)`);
  };

  const handleRemoveTile = () => {
    if (!selectedTile) return;

    setTiles(tiles.filter((t) => !(t.Pos.x === selectedTile.x && t.Pos.y === selectedTile.y)));
    toast.success(`Removed tile at (${selectedTile.x}, ${selectedTile.y})`);
    setSelectedTile(null);
  };

  const handleAddTileAbove = () => {
    if (!selectedTile) return;

    const newPos = { x: selectedTile.x, y: selectedTile.y + 1 };
    
    // Check if tile already exists
    if (tiles.some((t) => t.Pos.x === newPos.x && t.Pos.y === newPos.y)) {
      toast.error(`Tile already exists at (${newPos.x}, ${newPos.y})`);
      return;
    }

    const newTile: HexTile = {
      Pos: newPos,
      IsWalkable: true,
      IsHole: false,
      IsBonus: false,
      IsObstacle: false,
      IsSpawnP1: false,
      IsSpawnP2: false,
    };

    setTiles([...tiles, newTile]);
    toast.success(`Added tile at (${newPos.x}, ${newPos.y})`);
  };

  const handleAddTileBelow = () => {
    if (!selectedTile) return;

    const newPos = { x: selectedTile.x, y: selectedTile.y - 1 };
    
    // Check if tile already exists
    if (tiles.some((t) => t.Pos.x === newPos.x && t.Pos.y === newPos.y)) {
      toast.error(`Tile already exists at (${newPos.x}, ${newPos.y})`);
      return;
    }

    const newTile: HexTile = {
      Pos: newPos,
      IsWalkable: true,
      IsHole: false,
      IsBonus: false,
      IsObstacle: false,
      IsSpawnP1: false,
      IsSpawnP2: false,
    };

    setTiles([...tiles, newTile]);
    toast.success(`Added tile at (${newPos.x}, ${newPos.y})`);
  };

  const handleAddTroop = (x: number, y: number) => {
    const newEntityId = troops.length > 0 ? Math.max(...troops.map(t => t.EntityId)) + 1 : 1;
    const newTroop: Troop = {
      EntityId: newEntityId,
      Pos: { x, y },
      Type: 0,
      Owner: 1,
    };
    setTroops([...troops, newTroop]);
    toast.success(`Added troop at (${x}, ${y})`);
    return newEntityId;
  };

  const handleUpdateTroop = (updates: Partial<Troop>) => {
    if (selectedTroopId === null) return;
    setTroops((prevTroops) =>
      prevTroops.map((troop) =>
        troop.EntityId === selectedTroopId ? { ...troop, ...updates } : troop
      )
    );
  };

  const handleRemoveTroop = () => {
    if (selectedTroopId === null) return;
    setTroops(troops.filter((t) => t.EntityId !== selectedTroopId));
    const troop = troops.find(t => t.EntityId === selectedTroopId);
    if (troop) {
      toast.success(`Removed troop at (${troop.Pos.x}, ${troop.Pos.y})`);
    }
    setSelectedTroopId(null);
  };

  const selectedTileData = selectedTile
    ? tiles.find((t) => t.Pos.x === selectedTile.x && t.Pos.y === selectedTile.y) || null
    : null;

  const selectedTroopData = selectedTroopId !== null
    ? troops.find((t) => t.EntityId === selectedTroopId) || null
    : null;

  const handleOpenJsonEditor = () => {
    const gridData: HexGridType = { Tiles: tiles, Troops: troops };
    const json = JSON.stringify(gridData, null, 2);
    setJsonEditorContent(json);
    setShowJsonEditor(true);
  };

  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonEditorContent) as HexGridType;
      setTiles(parsed.Tiles);
      setTroops(parsed.Troops || []);
      setSelectedTile(null);
      setSelectedTroopId(null);
      setShowJsonEditor(false);
      toast.success("JSON applied successfully");
    } catch (error) {
      toast.error("Invalid JSON format");
      console.error(error);
    }
  };

  return (
    <>
      <Dialog open={showJsonEditor} onOpenChange={setShowJsonEditor}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Edit JSON</DialogTitle>
            <DialogDescription>
              View and edit the raw JSON structure of your map
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <CodeEditor
              value={jsonEditorContent}
              language="json"
              placeholder="JSON content"
              onChange={(e) => setJsonEditorContent(e.target.value)}
              padding={15}
              style={{
                fontSize: 12,
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                height: '50vh',
                overflow: 'auto',
                borderRadius: '0.375rem',
                border: '1px solid hsl(var(--border))',
                backgroundColor: 'hsl(var(--background))',
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowJsonEditor(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyJson}>Apply Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Grid</DialogTitle>
            <DialogDescription>
              Enter a name for your exported file
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="filename">Filename</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="filename"
                  value={exportFilename}
                  onChange={(e) => setExportFilename(e.target.value)}
                  placeholder="hex-grid"
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">.json</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmExport}>Export</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-96 border-r border-border bg-card text-card-foreground overflow-y-auto flex-shrink-0">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-center mb-3">
            <a href="https://priceofglorygame.com/" target="_blank" rel="noopener noreferrer">
              <img src={pogLogo} alt="POG Logo" className="h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity" />
            </a>
          </div>
          <h1 className="text-2xl font-bold text-foreground text-center">Battlefield Editor</h1>
          <p className="text-sm text-muted-foreground mt-1 text-center">Customize layout and troops</p>
        </div>
        <div className="p-4 space-y-4">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Import/Export */}
          <GridControls
            onImport={handleImport}
            onExport={handleExport}
            onAddColumn={handleAddColumn}
            onRemoveColumn={handleRemoveColumn}
            onAddRow={handleAddRow}
            onRemoveRow={handleRemoveRow}
            showImportExportOnly
          />
          
          {/* Current Maps */}
          <MapSelector onLoadMap={handleLoadPredefinedMap} />

          {/* Edit Grid Section - Only show when map is loaded */}
          {tiles.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground pb-2 px-6">
                Edit Grid
              </h2>
              <GridControls
                onImport={handleImport}
                onExport={handleExport}
                onAddColumn={handleAddColumn}
                onRemoveColumn={handleRemoveColumn}
                onAddRow={handleAddRow}
                onRemoveRow={handleRemoveRow}
                showGridControlsOnly
                defaultColumnX={getNextColumnX()}
                defaultRowY={getNextRowY()}
                currentMaxX={getCurrentMaxX()}
                currentMaxY={getCurrentMaxY()}
              />
            </div>
          )}

          {/* Troops Section - Only show when map is loaded */}
          {tiles.length > 0 && (
            <TroopList
              troops={troops}
              selectedTroopId={selectedTroopId}
              onSelectTroop={(troopId) => {
                const troop = troops.find(t => t.EntityId === troopId);
                if (troop) {
                  setViewMode("troops");
                  setSelectedTile(troop.Pos);
                  setSelectedTroopId(troopId);
                }
              }}
              onRemoveTroop={(troopId) => {
                setTroops(troops.filter((t) => t.EntityId !== troopId));
                const troop = troops.find(t => t.EntityId === troopId);
                if (troop) {
                  toast.success(`Removed troop at (${troop.Pos.x}, ${troop.Pos.y})`);
                }
                if (selectedTroopId === troopId) {
                  setSelectedTroopId(null);
                }
              }}
            />
          )}
        </div>
      </aside>

      {/* Main Canvas */}
      <main 
        className="flex-1 overflow-hidden relative transition-colors duration-300 bg-background"
        onClick={() => {
          // Before deselecting, remove any selected troop with Type None (0)
          if (selectedTroopId !== null && viewMode === "troops") {
            const currentTroop = troops.find(t => t.EntityId === selectedTroopId);
            if (currentTroop && currentTroop.Type === 0) {
              setTroops(troops.filter(t => t.EntityId !== selectedTroopId));
            }
          }
          setSelectedTile(null);
          setSelectedTroopId(null);
        }}
      >
        {/* Top Controls Bar */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              handleClearMap();
            }}
            variant="destructive"
          >
            Clear Map
          </Button>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              handleClearTroops();
            }}
            variant="default"
            disabled={troops.length === 0}
          >
            Clear Troops
          </Button>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              handleResetTiles();
            }}
            variant="default"
            disabled={tiles.length === 0}
          >
            Reset Tiles
          </Button>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedTile(null);
            }}
            variant="outline"
            disabled={!selectedTile}
          >
            Clear Selected Tile
          </Button>
        </div>
        
        <div className="absolute top-4 left-0 right-0 z-10 flex items-center justify-center px-4">
          <Tabs 
            value={viewMode} 
            onValueChange={(v) => setViewMode(v as "tiles" | "troops")}
            className="w-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <TabsList>
              <TabsTrigger value="tiles">Tiles</TabsTrigger>
              <TabsTrigger value="troops">Troops</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              handleOpenJsonEditor();
            }}
            variant="outline"
          >
            Edit JSON
          </Button>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              handleSendToQuestBuilder();
            }}
            variant="default"
          >
            Send to Quest Forge
          </Button>
        </div>
        
        {/* Floating Tile Properties Panel */}
        {selectedTileData && viewMode === "tiles" && (() => {
          const pixelPos = hexToPixel(selectedTileData.Pos);
          const panelWidth = 300;
          const spacing = 50; // Gap between tile and panel
          
          // Position panel to the left or right of tile based on x position
          const isRightSide = selectedTileData.Pos.x >= 1;
          const horizontalOffset = isRightSide ? -spacing : spacing;
          
          return (
            <div
              className="absolute z-20 pointer-events-auto"
              style={{
                left: isRightSide 
                  ? `calc(50% + ${pixelPos.x - panelWidth - spacing}px)` 
                  : `calc(50% + ${pixelPos.x + spacing}px)`,
                top: `calc(50% + ${pixelPos.y - 150}px)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <TilePropertiesPanel 
                tile={selectedTileData} 
                onUpdateTile={handleUpdateTile} 
                onRemoveTile={handleRemoveTile}
                onAddTileAbove={handleAddTileAbove}
                onAddTileBelow={handleAddTileBelow}
                onClose={() => setSelectedTile(null)}
              />
            </div>
          );
        })()}
        
        {/* Floating Troop Properties Panel */}
        {selectedTroopData && viewMode === "troops" && (() => {
          const pixelPos = hexToPixel(selectedTroopData.Pos);
          const panelWidth = 300;
          const spacing = 50; // Gap between troop and panel
          
          // Position panel to the left or right of troop based on x position
          const isRightSide = selectedTroopData.Pos.x >= 1;
          
          return (
            <div
              className="absolute z-20 pointer-events-auto"
              style={{
                left: isRightSide 
                  ? `calc(50% + ${pixelPos.x - panelWidth - spacing}px)` 
                  : `calc(50% + ${pixelPos.x + spacing}px)`,
                top: `calc(50% + ${pixelPos.y - 150}px)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <TroopPropertiesPanel 
                troop={selectedTroopData}
                onUpdateTroop={handleUpdateTroop}
                onRemoveTroop={handleRemoveTroop}
                onClose={() => setSelectedTroopId(null)}
              />
            </div>
          );
        })()}
        
        {tiles.length === 0 ? (
          <QuickStart 
            onLoadMap={(loadedTiles, loadedTroops) => {
              setTiles(loadedTiles);
              setTroops(loadedTroops);
              setSelectedTile(null);
              setSelectedTroopId(null);
              toast.success(`Loaded map with ${loadedTiles.length} tiles`);
            }} 
          />
        ) : (
          <HexGrid tiles={tiles} selectedTile={selectedTile} onTileClick={handleTileClick} troops={troops} viewMode={viewMode} />
        )}
        
        {/* Legend at bottom - only show when tiles loaded and in tiles mode */}
        {tiles.length > 0 && viewMode === "tiles" && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <Legend />
          </div>
        )}
      </main>
    </div>
    </>
  );
};

export default Index;
