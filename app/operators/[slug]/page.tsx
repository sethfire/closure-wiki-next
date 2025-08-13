import { AppSidebar } from "@/components/app-sidebar"
import CarouselGallery from "@/components/carousel-gallery"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export const revalidate = 86400
 
export async function generateStaticParams() {
  const chars: any[] = await fetch('https://api.closure.wiki/en/operators').then((res) => res.json())
  return chars.slice(0, 10).map((char) => ({
    slug: String(char.slug),
  }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data: any = await fetch(`https://api.closure.wiki/en/operators/${slug}`).then(
    (res) => res.json()
  )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-8 mx-auto w-full max-w-7xl">
          <div>
            <h1 className="mb-2 text-3xl font-semibold">{data.meta.name}</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="/home">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem><BreadcrumbLink href="/operators">Operators</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem><BreadcrumbPage>{data.meta.name}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div>
            <p className="mb-2">{data.char.itemUsage}</p>
            <p>{data.char.itemDesc}</p>
          </div>
          <CarouselGallery />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}