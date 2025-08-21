import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

export const revalidate = 3600

export default async function Page() {
  const data: any = await fetch(`https://api.closure.wiki/en/modules`).then(
    (res) => res.json()
  )

  const modules = data
    .filter((module: any) => module.type === "ADVANCED")
    .sort((a: any, b: any) => {
      if (a.isUnreleased !== b.isUnreleased) return b.isUnreleased ? 1 : -1;
      return b.getTime - a.getTime;
    });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 mx-auto w-full max-w-6xl">
      <div>
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/en/home">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>Modules</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mb-2 text-2xl font-semibold">Modules</h1>
        <div className="text-sm">
          <span>
            <span className="text-muted-foreground">Showing </span>
            <span>{modules.length}</span>
            <span className="text-muted-foreground"> Modules</span>
          </span>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
        {modules.map((module: any) => (
          <a href={`/en/modules/${module.slug}`} key={module.slug}>
            <div className="group relative aspect-square rounded overflow-hidden">
              <img
                src={`https://static.closure.wiki/v1/uniequipimgsmall/${module.slug}.webp`}
                className="w-full h-full object-contain transition-transform duration-150 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute left-0 right-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 text-white px-1 py-2 text-center font-semibold text-sm" style={{ 
                  textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
                }}>
                {module.isUnreleased && <span className="text-yellow-300">[CN] </span>}
                {module.name}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}