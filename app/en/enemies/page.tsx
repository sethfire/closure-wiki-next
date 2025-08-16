import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

export const revalidate = 3600

export default async function Page() {
  const data: any = await fetch(`https://api.closure.wiki/en/enemies`).then(
    (res) => res.json()
  )

  const enemies = data
    .filter((enemy: any) => !enemy.hideInHandbook)
    .sort((a: any, b: any) => {
      if (a.isUnreleased !== b.isUnreleased) return b.isUnreleased ? 1 : -1;
    });

  const enemyRarityColors: Record<string, string> = {
    NORMAL: '#A0A0A0',
    ELITE: '#FFFFA9',
    BOSS: '#FF0000',
  };


  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:pt-8 mx-auto w-full max-w-6xl">
      <div>
        <h1 className="mb-2 text-2xl font-semibold">Enemies</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/en/home">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>Enemies</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Separator />
      <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
        {enemies.map((enemy: any) => (
          <a href={`/en/enemies/${enemy.slug}`} key={enemy.slug}>
            <div className="group relative aspect-square rounded overflow-hidden">
              <img
                src={`https://static.closure.wiki/v1/enemies/${enemy.slug}.webp`}
                className="w-full h-full object-contain transition-transform duration-150 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute left-0 right-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 text-white px-1 py-2 text-center font-semibold text-sm" style={{ 
                  textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
                }}>
                {enemy.isUnreleased && <span className="text-yellow-300">[CN] </span>}
                {enemy.name}
              </div>
              <div className="absolute left-0 right-0 bottom-0 h-[4px]" style={{ backgroundColor: enemyRarityColors[enemy.enemyLevel] }}></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}