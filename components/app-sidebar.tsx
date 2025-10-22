"use client"
import * as React from "react"
import { usePathname } from "next/navigation"
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const lang = pathname.split('/')[1] || 'en'

  const data = {
    navMain: [
      {
        title: "Navigation",
        url: "#",
        items: [
          {
            title: "Home",
            url: `/${lang}/home`,
            icon: Home,
          },
          {
            title: "Operators",
            url: `/${lang}/operators`,
            icon: Users,
          },
          {
            title: "Enemies",
            url: `/${lang}/enemies`,
            icon: Ghost,
          },
          {
            title: "Operations",
            url: `/${lang}/operations`,
            icon: Map,
          },
          {
            title: "Modules",
            url: `/${lang}/modules`,
            icon: WashingMachine,
          },
          {
            title: "Story Images",
            url: `/${lang}/gallery/images`,
            icon: Image,
          },
          {
            title: "Backgrounds",
            url: `/${lang}/gallery/backgrounds`,
            icon: Camera,
          },
        ],
      },
    ],
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href={`/${lang}/home`}>
                <div className="flex aspect-square size-8 items-center justify-center rounded">
                  <img src="https://static.closure.wiki/v1/icon.png" className="size-8 rounded"/>
                </div>
                <div className="flex flex-col gap-0.5 leading-none font-semibold">
                  <span>Closure Wiki</span>
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
          <a href={`/${lang}/home`} className="text-xs underline text-muted-foreground hover:text-foreground">About</a>
          <a href={`/${lang}/home`} className="text-xs underline text-muted-foreground hover:text-foreground">Contact</a>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}