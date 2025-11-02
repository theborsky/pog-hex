import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-center">
      <Tabs value={theme} onValueChange={setTheme}>
        <TabsList>
          <TabsTrigger value="light" className="gap-2">
            <Sun className="h-4 w-4" />
            Light
          </TabsTrigger>
          <TabsTrigger value="dark" className="gap-2">
            <Moon className="h-4 w-4" />
            Dark
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
