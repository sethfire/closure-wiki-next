import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { getEnemyRarityColor } from "@/lib/enemy-utils";
import { getEnemies } from "@/lib/fetch-utils";
import { getEnemyIconThumbnail } from "@/lib/image-utils";
import { notFound } from "next/navigation";

export const revalidate = 86400;

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const data: any = await getEnemies(lang);
  if (!data) notFound();

  const enemies = data
    .filter((enemy: any) => !enemy.hideInHandbook)
    .sort((a: any, b: any) => {
      if (a.isUnreleased !== b.isUnreleased) return b.isUnreleased ? 1 : -1;
    });

  return (
    <div className="flex flex-1 flex-col gap-4 w-full px-4 md:px-0">
      <div>
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href={`/${lang}/home`}>Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>Enemies</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mb-2 text-2xl font-semibold">Enemies</h1>
        <div className="text-sm">
          <span>
            <span className="text-muted-foreground">Showing </span>
            <span>{enemies.length}</span>
            <span className="text-muted-foreground"> Enemies</span>
          </span>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {enemies.map((enemy: any) => (
          <a href={`/${lang}/enemies/${enemy.slug}`} key={enemy.slug}>
            <div className="group relative aspect-square rounded overflow-hidden bg-muted dark:bg-transparent">
              <img
                src={getEnemyIconThumbnail(enemy.slug)}
                className="w-full h-full object-contain transition-transform duration-150 scale-115 group-hover:scale-120"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute left-0 right-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 text-white px-1 py-2 text-center font-semibold text-sm" style={{ 
                  textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
                }}>
                {enemy.isUnreleased && <span className="text-yellow-300">[CN] </span>}
                {enemy.enemyIndex}: {enemy.name}
              </div>
              <div className="absolute left-0 right-0 bottom-0 h-[4px]" style={{ backgroundColor: getEnemyRarityColor(enemy.enemyLevel) }}></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}