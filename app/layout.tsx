import { Input } from "@/components/ui/input";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Analytics } from "@vercel/analytics/next"
import { ModeToggle } from "@/components/mode-toggle";

export const metadata: Metadata = {
  title: "Closure Wiki",
  description: "",
  openGraph: {
    title: "Closure Wiki",
    description: "",
    siteName: "Closure Wiki",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto w-full max-w-7xl">
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 px-4 mb-4 bg-background">
                  <SidebarTrigger className="md:hidden" />
                  <div className="ml-auto flex items-center gap-4">
                    <Input type="search" disabled placeholder="Search (Not currently available)" className="w-64" />
                    <ModeToggle />
                  </div>
                </header>
                {children}
              </SidebarInset>
            </SidebarProvider>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
