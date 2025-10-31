import Breadcrumbs from "@/components/ui/dynamic-breadcrumb";
import { Separator } from "@/components/ui/separator";
import { getOutfits } from "@/lib/fetch-utils";
import { getCharPortraitThumbnail } from "@/lib/image-utils";
import { notFound } from "next/navigation";

export const revalidate = 86400;

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const data: any = await getOutfits(lang);
  if (!data) notFound();

  const skins = [...data].sort((a: any, b: any) => b.obtainDate - a.obtainDate);

  return (
    <div className="flex flex-1 flex-col gap-4 w-full px-4 md:px-0">
      <div>
        <div className="mb-2">
          <Breadcrumbs items={[
            { label: "Home", href: `/${lang}/home` },
            { label: "Outfits" },
          ]} />
        </div>
        <h1 className="mb-2 text-2xl font-semibold">Outfits</h1>
        <div className="text-sm">
          <span>
            <span className="text-muted-foreground">Showing </span>
            <span>{skins.length}</span>
            <span className="text-muted-foreground"> Outfits</span>
          </span>
        </div>
      </div>
      <Separator />
      
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {skins.map((skin: any) => (
          <a href={`/${lang}/outfits/${skin.slug}`} key={skin.slug}>
            <div className="group relative aspect-1/2 bg-muted dark:bg-card rounded overflow-hidden hover:opacity-80 transition-opacity">
              <img className="object-contain w-full h-full rounded"
                src={getCharPortraitThumbnail(encodeURIComponent(skin.portraitId.toLowerCase()))}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-linear-to-t from-[rgba(0,0,0,1)] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2 text-left font-semibold text-white">
                <span style={{
                  textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
                }}>
                  {skin.isUnreleased && <span className="text-yellow-300">[CN] </span>}
                  {skin.name}
                </span>
                <br />
                <span className="text-muted-foreground">{skin.modelName}</span>
              </div>
              <div className="absolute left-0 right-0 bottom-0 h-1" style={{ backgroundColor: skin.color }}></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}