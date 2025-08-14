import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

export const revalidate = 86400

export default async function Page() {
  const data: any = await fetch(`https://api.closure.wiki/en/operators`).then(
    (res) => res.json()
  )

  const characters = data.slice().sort((a: any, b: any) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-1 flex-col gap-4 p-8 mx-auto w-full max-w-5xl">
      <div>
        <h1 className="mb-2 text-3xl font-semibold">Operators</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/home">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>Operators</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Separator />
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {characters.map((char: any) => (
          <a href={`/operators/${char.slug}`} key={char.slug}>
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
              <div className="absolute bottom-0 left-0 right-0 text-white px-1 py-2 text-center font-semibold">
                {char.isUnreleased && <span className="text-yellow-300">[CN] </span>}
                {char.name}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}