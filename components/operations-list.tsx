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
import { getMapPreviewThumbnail } from "@/lib/image-utils";
import { getStageType } from "@/lib/stage-utils";
import { Search, ChevronDown } from "lucide-react";

type Operation = {
  slug: string;
  id: string;
  name: string;
  code: string;
  stageType: string;
  difficulty: string;
  zoneId: string;
  apCost: number;
  isUnreleased: boolean;
};

export default function OperationsList({ operations, lang }: {
  operations: Operation[];
  lang: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  
  // Get unique stage types from the data
  const uniqueStageTypes = useMemo(() => {
    const types = new Set(operations.map(op => op.stageType));
    return Array.from(types).sort();
  }, [operations]);
  
  const [selectedTypes, setSelectedTypes] = useState<string[]>(uniqueStageTypes);
  const [releaseFilter, setReleaseFilter] = useState<string>("all");

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const filteredAndSortedOperations = useMemo(() => {
    let filtered = operations.filter(operation => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!operation.name.toLowerCase().includes(query) && 
            !operation.code.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Type filter
      if (!selectedTypes.includes(operation.stageType)) {
        return false;
      }

      // Release filter
      if (releaseFilter === "cn" && !operation.isUnreleased) return false;
      if (releaseFilter === "global" && operation.isUnreleased) return false;

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "type":
          const typeCompare = getStageType(a.stageType).localeCompare(getStageType(b.stageType));
          if (typeCompare !== 0) return typeCompare;
          // Secondary sort by code if types are the same
          return a.code.localeCompare(b.code);
        case "default":
        default:
          // Maintain original order - don't sort
          return 0;
      }
    });

    return filtered;
  }, [operations, searchQuery, selectedTypes, releaseFilter, sortBy]);

  // Update selectedTypes when uniqueStageTypes changes
  useMemo(() => {
    setSelectedTypes(uniqueStageTypes);
  }, [uniqueStageTypes]);

  return (
    <div className="flex flex-1 flex-col gap-4 w-full">
      {/* Results Count */}
      <div className="text-sm">
        <span className="text-muted-foreground">Showing </span>
        {filteredAndSortedOperations.length}
        <span className="text-muted-foreground"> of {operations.length} Operations</span>
      </div>

      {/* Controls Row */}
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
        {/* Left side - Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search operations..."
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
                Sort: {sortBy === "default" ? "Default" : sortBy === "name" ? "Name" : "Type"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="default">Default</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name">Name (A-Z)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="type">Type</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Type {selectedTypes.length < uniqueStageTypes.length && `(${selectedTypes.length})`}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto">
              {uniqueStageTypes.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => toggleType(type)}
                  onSelect={(e) => e.preventDefault()}
                >
                  {getStageType(type)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Release Toggle Group */}
          <ToggleGroup type="single" value={releaseFilter} onValueChange={(value) => value && setReleaseFilter(value)} className="border rounded-md">
            <ToggleGroupItem value="all" aria-label="Show all operations" size="sm">
              <span className="text-xs font-semibold">ALL</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="cn" aria-label="Show CN operations only" size="sm">
              <span className="text-xs font-semibold">CN</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="global" aria-label="Show global operations only" size="sm">
              <span className="text-xs font-semibold">EN</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredAndSortedOperations.map((stage) => (
          <a href={`/${lang}/operations/${stage.slug}`} key={stage.slug}>
            <div className="group relative aspect-square rounded overflow-hidden">
              <img
                src={getMapPreviewThumbnail(stage.id)}
                className="w-full h-full object-contain transition-transform duration-150 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute left-0 right-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-2 text-left font-semibold text-white text-sm">
                <span style={{
                  textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
                }}>
                  {stage.isUnreleased && <span className="text-yellow-300">[CN] </span>}
                  {stage.code}: {stage.name}
                </span>
                <br />
                <span className="text-muted-foreground">{getStageType(stage.stageType)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}