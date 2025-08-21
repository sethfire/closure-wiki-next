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
import { Ghost, Home, Map, Users, WashingMachine } from "lucide-react"
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
                  <img src="https://static.closure.wiki/v1/closure.webp" className="size-8 rounded"/>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span>Closure Wiki [BETA]</span>
                  <span>v25-07-31</span>
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
        {/* <NavUser user={data.user} /> */}
        <ModeToggle />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
