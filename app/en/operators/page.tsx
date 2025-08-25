import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { getCharRarity, getCharRarityColor } from "@/lib/char-utils";
import { getOperators } from "@/lib/fetch-utils";

export const revalidate = 86400;

export default async function Page() {
  const data: any = await getOperators("en");

  const sortOrderResponse: any = await fetch("https://api.closure.wiki/v2/en/operators/order");
  const sortOrderMap = await sortOrderResponse.json();

  const characters = data.slice().sort((a: any, b: any) => {
    // if (a.isUnreleased !== b.isUnreleased) return b.isUnreleased ? 1 : -1;
    if (getCharRarity(b.rarity) !== getCharRarity(a.rarity)) return getCharRarity(b.rarity) - getCharRarity(a.rarity);
    return sortOrderMap[b.id] - sortOrderMap[a.id];
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 mx-auto w-full max-w-6xl">
      <div>
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/en/home">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>Operators</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mb-2 text-2xl font-semibold">Operators</h1>
        <div className="text-sm">
          <span>
            <span className="text-muted-foreground">Showing </span>
            <span>{characters.length}</span>
            <span className="text-muted-foreground"> Operators</span>
          </span>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
        {characters.map((char: any) => (
          <a href={`/en/operators/${char.slug}`} key={char.slug}>
            <div className="group relative aspect-square bg-card rounded overflow-hidden">
              <img
                src={`https://static.closure.wiki/v1/charavatars/${char.id}.webp`}
                className="w-full h-full object-contain transition-transform duration-150 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute left-[4px] top-[4px] h-[24px] w-[24px] p-0.5 rounded bg-black/70">
                <img
                  src={`https://static.closure.wiki/v1/profession/icon_profession_${char.profession.toLowerCase()}.webp`}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute left-[32px] top-[4px] h-[24px] w-[24px] p-0.5 rounded bg-black/70">
                <img
                  src={`https://static.closure.wiki/v1/subprofession/sub_${char.subProfessionId.toLowerCase()}_icon.webp`}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute left-0 right-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 text-white px-1 py-2 text-center font-semibold text-sm" style={{ 
                  textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
                }}>
                {char.isUnreleased && <span className="text-yellow-300">[CN] </span>}
                {char.name}
              </div>
              <div className="absolute left-0 right-0 bottom-0 h-[4px]" style={{ backgroundColor: getCharRarityColor(char.rarity) }}></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}