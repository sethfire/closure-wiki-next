"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { getCharRarity, getCharRarityColor, getCharClass } from "@/lib/char-utils";
import { getBranchIcon, getCharPortraitThumbnail, getClassIcon } from "@/lib/image-utils";
import { Search, ChevronDown, X, Globe, Sparkles } from "lucide-react";

type Operator = {
  slug: string;
  name: string;
  id: string;
  position: string;
  rarity: string;
  profession: string;
  subProfessionId: string;
  isUnreleased: boolean;
};

export default function OperatorList({ characters, sortOrderMap, lang }: {
  characters: Operator[];
  sortOrderMap: Record<string, number>;
  lang: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("release");
  const [selectedRarities, setSelectedRarities] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([
    "PIONEER", "WARRIOR", "TANK", "SNIPER", "CASTER", "MEDIC", "SUPPORT", "SPECIAL"
  ]);
  const [releaseFilter, setReleaseFilter] = useState<string>("all");

  const toggleRarity = (rarity: number) => {
    setSelectedRarities(prev =>
      prev.includes(rarity) ? prev.filter(r => r !== rarity) : [...prev, rarity]
    );
  };

  const toggleClass = (className: string) => {
    setSelectedClasses(prev =>
      prev.includes(className) ? prev.filter(c => c !== className) : [...prev, className]
    );
  };

  const filteredAndSortedCharacters = useMemo(() => {
    let filtered = characters.filter(char => {
      // Search filter
      if (searchQuery && !char.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Rarity filter
      if (!selectedRarities.includes(getCharRarity(char.rarity))) {
        return false;
      }

      // Class filter
      if (!selectedClasses.includes(char.profession)) {
        return false;
      }

      // Release filter
      if (releaseFilter === "cn" && !char.isUnreleased) return false;
      if (releaseFilter === "global" && char.isUnreleased) return false;

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "release":
          const aOrder = sortOrderMap[a.id] ?? Number.MAX_SAFE_INTEGER;
          const bOrder = sortOrderMap[b.id] ?? Number.MAX_SAFE_INTEGER;
          return bOrder - aOrder;
        case "rarity":
          return getCharRarity(b.rarity) - getCharRarity(a.rarity);
        case "name":
          return a.name.localeCompare(b.name);
        case "class":
          return getCharClass(a.profession).localeCompare(getCharClass(b.profession));
        default:
          return 0;
      }
    });

    return filtered;
  }, [characters, searchQuery, selectedRarities, selectedClasses, releaseFilter, sortBy, sortOrderMap]);

  return (
    <div className="flex flex-1 flex-col gap-4 w-full">
      {/* Results Count */}
      <div className="text-sm">
        <span className="text-muted-foreground">Showing </span>
        {filteredAndSortedCharacters.length}
        <span className="text-muted-foreground"> of {characters.length} Operators</span>
      </div>

      {/* Controls Row */}
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
        {/* Left side - Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search operators..."
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
                Sort: {sortBy === "release" ? "Release" : sortBy === "rarity" ? "Rarity" : sortBy === "name" ? "Name" : "Class"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="release">Release (Newest)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="rarity">Rarity (High to Low)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name">Name (A-Z)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="class">Class</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Rarity Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Rarity {selectedRarities.length < 6 && `(${selectedRarities.length})`}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem 
                checked={selectedRarities.includes(6)} 
                onCheckedChange={() => toggleRarity(6)}
                onSelect={(e) => e.preventDefault()}
              >
                6★
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedRarities.includes(5)} 
                onCheckedChange={() => toggleRarity(5)}
                onSelect={(e) => e.preventDefault()}
              >
                5★
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedRarities.includes(4)} 
                onCheckedChange={() => toggleRarity(4)}
                onSelect={(e) => e.preventDefault()}
              >
                4★
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedRarities.includes(3)} 
                onCheckedChange={() => toggleRarity(3)}
                onSelect={(e) => e.preventDefault()}
              >
                3★
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedRarities.includes(2)} 
                onCheckedChange={() => toggleRarity(2)}
                onSelect={(e) => e.preventDefault()}
              >
                2★
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedRarities.includes(1)} 
                onCheckedChange={() => toggleRarity(1)}
                onSelect={(e) => e.preventDefault()}
              >
                1★
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Class Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Class {selectedClasses.length < 8 && `(${selectedClasses.length})`}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem 
                checked={selectedClasses.includes("PIONEER")} 
                onCheckedChange={() => toggleClass("PIONEER")}
                onSelect={(e) => e.preventDefault()}
              >
                Vanguard
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedClasses.includes("WARRIOR")} 
                onCheckedChange={() => toggleClass("WARRIOR")}
                onSelect={(e) => e.preventDefault()}
              >
                Guard
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedClasses.includes("TANK")} 
                onCheckedChange={() => toggleClass("TANK")}
                onSelect={(e) => e.preventDefault()}
              >
                Defender
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedClasses.includes("SNIPER")} 
                onCheckedChange={() => toggleClass("SNIPER")}
                onSelect={(e) => e.preventDefault()}
              >
                Sniper
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedClasses.includes("CASTER")} 
                onCheckedChange={() => toggleClass("CASTER")}
                onSelect={(e) => e.preventDefault()}
              >
                Caster
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedClasses.includes("MEDIC")} 
                onCheckedChange={() => toggleClass("MEDIC")}
                onSelect={(e) => e.preventDefault()}
              >
                Medic
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedClasses.includes("SUPPORT")} 
                onCheckedChange={() => toggleClass("SUPPORT")}
                onSelect={(e) => e.preventDefault()}
              >
                Supporter
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedClasses.includes("SPECIAL")} 
                onCheckedChange={() => toggleClass("SPECIAL")}
                onSelect={(e) => e.preventDefault()}
              >
                Specialist
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Release Toggle Group */}
          <ToggleGroup type="single" value={releaseFilter} onValueChange={(value) => value && setReleaseFilter(value)} className="border rounded-md">
            <ToggleGroupItem value="all" aria-label="Show all operators" size="sm">
              <span className="text-xs font-semibold">ALL</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="cn" aria-label="Show CN operators only" size="sm">
              <span className="text-xs font-semibold">CN</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="global" aria-label="Show global operators only" size="sm">
              <span className="text-xs font-semibold">EN</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredAndSortedCharacters.map((char) => (
          <a href={`/${lang}/operators/${char.slug}`} key={char.slug}>
            <div className="group relative aspect-[1/2] bg-muted dark:bg-card rounded overflow-hidden hover:opacity-80 transition-opacity">
              <img
                src={getCharPortraitThumbnail(`${char.id}_1`)}
                className="w-full h-full object-contain absolute inset-0"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute left-[4px] top-[4px] h-[24px] w-[24px] p-0.5 rounded bg-black/70">
                <img src={getClassIcon(char.profession)} className="h-full w-full object-contain" loading="lazy" decoding="async" />
              </div>
              <div className="absolute left-[32px] top-[4px] h-[24px] w-[24px] p-0.5 rounded bg-black/70">
                <img src={getBranchIcon(char.subProfessionId)} className="h-full w-full object-contain" loading="lazy" decoding="async" />
              </div>
              <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(0,0,0,1)] to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-2 text-left font-semibold text-white">
                <span style={{
                  textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
                }}>
                  {char.isUnreleased && <span className="text-yellow-300">[CN] </span>}
                  {char.name}
                </span>
                <br />
                <span style={{ color: getCharRarityColor(char.rarity) }}>
                  {"★".repeat(getCharRarity(char.rarity))}
                </span>
              </div>
              <div className="absolute left-0 right-0 bottom-0 h-[4px]" style={{ backgroundColor: getCharRarityColor(char.rarity) }}></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}