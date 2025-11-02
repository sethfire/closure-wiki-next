"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getEnemyLevelType, getEnemyRarityColor } from "@/lib/enemy-utils";
import { getEnemyIconThumbnail } from "@/lib/image-utils";
import { Search, ChevronDown } from "lucide-react";

type Enemy = {
  slug: string;
  name: string;
  enemyIndex: string;
  enemyLevel: string;
  isUnreleased: boolean;
  hideInHandbook: boolean;
};

export default function EnemiesList({ enemies, lang }: {
  enemies: Enemy[];
  lang: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([
    "NORMAL", "ELITE", "BOSS"
  ]);
  const [releaseFilter, setReleaseFilter] = useState<string>("all");

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const filteredAndSortedEnemies = useMemo(() => {
    let filtered = enemies.filter(enemy => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!enemy.name.toLowerCase().includes(query) && 
            !enemy.enemyIndex.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Level filter
      if (!selectedLevels.includes(enemy.enemyLevel)) {
        return false;
      }

      // Release filter
      if (releaseFilter === "cn" && !enemy.isUnreleased) return false;
      if (releaseFilter === "global" && enemy.isUnreleased) return false;

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "level":
          const levelOrder = { "NORMAL": 0, "ELITE": 1, "BOSS": 2 };
          return (levelOrder[b.enemyLevel as keyof typeof levelOrder] || 0) - 
                 (levelOrder[a.enemyLevel as keyof typeof levelOrder] || 0);
        case "default":
        default:
          return 0;
      }
    });

    return filtered;
  }, [enemies, searchQuery, selectedLevels, releaseFilter, sortBy]);

  return (
    <div className="flex flex-1 flex-col gap-4 w-full">
      {/* Results Count */}
      <div className="text-sm">
        <span className="text-muted-foreground">Showing </span>
        {filteredAndSortedEnemies.length}
        <span className="text-muted-foreground"> of {enemies.length} Enemies</span>
      </div>

      {/* Controls Row */}
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
        {/* Left side - Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search enemies..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Right side - Sort and Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Sort: {sortBy === "default" ? "Default" : sortBy === "name" ? "Name" : "Level"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="default">Default</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name">Name (A-Z)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="level">Level (High to Low)</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Level Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Level {selectedLevels.length < 3 && `(${selectedLevels.length})`}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem 
                checked={selectedLevels.includes("BOSS")} 
                onCheckedChange={() => toggleLevel("BOSS")}
                onSelect={(e) => e.preventDefault()}
              >
                Boss
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedLevels.includes("ELITE")} 
                onCheckedChange={() => toggleLevel("ELITE")}
                onSelect={(e) => e.preventDefault()}
              >
                Elite
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedLevels.includes("NORMAL")} 
                onCheckedChange={() => toggleLevel("NORMAL")}
                onSelect={(e) => e.preventDefault()}
              >
                Normal
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Release Toggle Group */}
          <ToggleGroup type="single" value={releaseFilter} onValueChange={(value) => value && setReleaseFilter(value)} className="border rounded-md">
            <ToggleGroupItem value="all" aria-label="Show all enemies" size="sm">
              <span className="text-xs font-semibold">ALL</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="cn" aria-label="Show CN enemies only" size="sm">
              <span className="text-xs font-semibold">CN</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="global" aria-label="Show global enemies only" size="sm">
              <span className="text-xs font-semibold">EN</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredAndSortedEnemies.map((enemy) => (
          <a href={`/${lang}/enemies/${enemy.slug}`} key={enemy.slug}>
            <div className="group relative aspect-square rounded overflow-hidden bg-muted dark:bg-transparent hover:opacity-80 transition-opacity">
              <img
                src={getEnemyIconThumbnail(enemy.slug)}
                className="w-full h-full object-contain scale-115"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute left-0 right-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-2 text-left font-semibold text-white text-sm">
                <span style={{
                  textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
                }}>
                  {enemy.isUnreleased && <span className="text-yellow-300">[CN] </span>}
                  {enemy.enemyIndex}: {enemy.name}
                </span>
                <br />
                <span className="text-muted-foreground">
                  {getEnemyLevelType(enemy.enemyLevel)}
                </span>
              </div>
              <div className="absolute left-0 right-0 bottom-0 h-[4px]" style={{ backgroundColor: getEnemyRarityColor(enemy.enemyLevel) }}></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}