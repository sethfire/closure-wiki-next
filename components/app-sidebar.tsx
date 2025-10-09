"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Ghost, Home, Image, Map, Medal, Users, WashingMachine, PictureInPicture, Camera } from "lucide-react"
import { ModeToggle } from "./mode-toggle"


const data = {
  navMain: [
    {
      title: "Navigation",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/en/home",
          icon: Home,
        },
        {
          title: "Operators",
          url: "/en/operators",
          icon: Users,
        },
        {
          title: "Enemies",
          url: "/en/enemies",
          icon: Ghost,
        },
        {
          title: "Operations",
          url: "/en/operations",
          icon: Map,
        },
        {
          title: "Modules",
          url: "/en/modules",
          icon: WashingMachine,
        },
        {
          title: "Story Images",
          url: "/en/gallery/images",
          icon: Image,
        },
        {
          title: "Backgrounds",
          url: "/en/gallery/backgrounds",
          icon: Camera,
        },
        // {
        //   title: "Medals",
        //   url: "/en/medals",
        //   icon: Medal,
        // },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/en/home">
                <div className="flex aspect-square size-8 items-center justify-center rounded">
                  <img src="https://static.closure.wiki/v1/icon.png" className="size-8 rounded"/>
                </div>
                <div className="flex flex-col gap-0.5 leading-none font-semibold">
                  <span>Closure Wiki</span>
                  {/* <span>closure.wiki</span> */}
                  {/* <span>Work in progress!</span> */}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        {item.icon && <item.icon />} {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="text-xs text-muted-foreground px-2 py-1 text-left">
          closure.wiki is a fan-made unofficial resource archive for Arknights. This is a hobby project and is not affiliated with Hypergryph or Yostar.
        </div>
        <div className="px-2 pb-2 text-left flex gap-3">
          <a href="https://arknights.wiki.gg" target="_blank" rel="noopener noreferrer" className="text-xs underline text-muted-foreground hover:text-foreground">Terra Wiki</a>
          <a href="/en/home" className="text-xs underline text-muted-foreground hover:text-foreground">About</a>
          <a href="/en/home" className="text-xs underline text-muted-foreground hover:text-foreground">Contact</a>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
