import CarouselGallery from "@/components/carousel-gallery"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { notFound } from 'next/navigation'

export const revalidate = 86400
 
export async function generateStaticParams() {
  const chars: any[] = await fetch('https://api.closure.wiki/en/operators').then((res) => res.json())
  return chars.slice(0, 10).map((char) => ({
    slug: String(char.slug),
  }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const response: any = await fetch(`https://api.closure.wiki/en/operators/${slug}`)

  if (!response.ok) notFound()
  const data: any = await response.json()
  if (!data) notFound()

  const images: any[] = [];
  data.charSkins.forEach((skin: any) => {
    let skinId = skin.skinId.toLowerCase();
    let avatar = "";
    if (!skin.isBuySkin) {
      skinId = skinId.replace('@', '_').replace('#', '_');
      avatar = `https://static.closure.wiki/v1/charavatars/${skin.avatarId}.webp`;
    } else {
      skinId = skinId.replace('@', '_').replace('#', '%23');
      avatar = `https://static.closure.wiki/v1/charavatars/${skinId}.webp`;
    }

    let title = skin.displaySkin.skinName ?? skin.displaySkin.skinGroupName;
    if (skin.displaySkin.skinGroupId === "ILLUST_0") {
      title = `Default`;
    } else if (skin.displaySkin.skinGroupId === "ILLUST_1") {
      title = `Elite 1`;
    } else if (skin.displaySkin.skinGroupId === "ILLUST_2") {
      title = `Elite 2`;
    }

    images.push({
      src: `https://static.closure.wiki/v1/characters/${skinId}.webp`,
      thumb: avatar.toLowerCase(),
      title: title,
      desc: `Illustrator: ${skin.displaySkin.drawerList.join(", ")}`,
      display: (skin.displaySkin.skinGroupId === "ILLUST_0") ? "object-contain" : "object-cover",
    });
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-8 mx-auto w-full max-w-5xl">
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
      <Separator />
      <CarouselGallery images={images} />

            {data.char.phases && data.char.phases.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-1">Stats</h2>
          <Separator className="mb-4" />
          <div className="flex flex-col gap-4">
            {(() => {
  try {
    return (
      <table className="w-full table-fixed border-collapse bg-muted">
        <thead className="bg-gray-200 dark:bg-card text-sm md:text-sm">
          <tr>
            <th />
            <th className="p-1 text-center">E0 Lv1</th>
            {data.char.phases[0] && (<th className="p-1 text-center">E0 Lv{data.char.phases[0].attributesKeyFrames[1].level}</th>)}
            {data.char.phases[1] && (<th className="p-1 text-center">E1 Lv{data.char.phases[1].attributesKeyFrames[1].level}</th>)}
            {data.char.phases[2] && (<th className="p-1 text-center">E2 Lv{data.char.phases[2].attributesKeyFrames[1].level}</th>)}
            <th className="p-1 text-center">Trust Bonus</th>
          </tr>
        </thead>
        <tbody className="text-sm md:text-sm">
          <tr>
            <td className="bg-gray-200 dark:bg-card p-1 text-center font-semibold">HP</td>
            <td className="border-t p-1 text-center">{data.char.phases[0].attributesKeyFrames[0].data.maxHp}</td>
            {data.char.phases[0] && (<td className="border-t p-1 text-center">{data.char.phases[0].attributesKeyFrames[1].data.maxHp}</td>)}
            {data.char.phases[1] && (<td className="border-t p-1 text-center">{data.char.phases[1].attributesKeyFrames[1].data.maxHp}</td>)}
            {data.char.phases[2] && (<td className="border-t p-1 text-center">{data.char.phases[2].attributesKeyFrames[1].data.maxHp}</td>)}
            <td className="border-t p-1 text-center">{data.char.favorKeyFrames[1].data.maxHp}</td>
          </tr>
          <tr>
            <td className="bg-gray-200 dark:bg-card p-1 text-center font-semibold">ATK</td>
            <td className="border-t p-1 text-center">{data.char.phases[0].attributesKeyFrames[0].data.atk}</td>
            {data.char.phases[0] && (<td className="border-t p-1 text-center">{data.char.phases[0].attributesKeyFrames[1].data.atk}</td>)}
            {data.char.phases[1] && (<td className="border-t p-1 text-center">{data.char.phases[1].attributesKeyFrames[1].data.atk}</td>)}
            {data.char.phases[2] && (<td className="border-t p-1 text-center">{data.char.phases[2].attributesKeyFrames[1].data.atk}</td>)}
            <td className="border-t p-1 text-center">{data.char.favorKeyFrames[1].data.atk}</td>
          </tr>
          <tr>
            <td className="bg-gray-200 dark:bg-card p-1 text-center font-semibold">DEF</td>
            <td className="border-t p-1 text-center">{data.char.phases[0].attributesKeyFrames[0].data.def}</td>
            {data.char.phases[0] && (<td className="border-t p-1 text-center">{data.char.phases[0].attributesKeyFrames[1].data.def}</td>)}
            {data.char.phases[1] && (<td className="border-t p-1 text-center">{data.char.phases[1].attributesKeyFrames[1].data.def}</td>)}
            {data.char.phases[2] && (<td className="border-t p-1 text-center">{data.char.phases[2].attributesKeyFrames[1].data.def}</td>)}
            <td className="border-t p-1 text-center">{data.char.favorKeyFrames[1].data.def}</td>
          </tr>
          <tr>
            <td className="bg-gray-200 dark:bg-card p-1 text-center font-semibold">RES</td>
            <td className="border-t p-1 text-center">{data.char.phases[0].attributesKeyFrames[0].data.magicResistance}</td>
            {data.char.phases[0] && (<td className="border-t p-1 text-center">{data.char.phases[0].attributesKeyFrames[1].data.magicResistance}</td>)}
            {data.char.phases[1] && (<td className="border-t p-1 text-center">{data.char.phases[1].attributesKeyFrames[1].data.magicResistance}</td>)}
            {data.char.phases[2] && (<td className="border-t p-1 text-center">{data.char.phases[2].attributesKeyFrames[1].data.magicResistance}</td>)}
            <td className="border-t p-1 text-center">{data.char.favorKeyFrames[1].data.magicResistance}</td>
          </tr>
        </tbody>
      </table>
    );
  } catch (e) {
    console.error('Error rendering stats:', e);
    return null;
  }
            })()}
            {(() => {
  try {
    return (
      <table className="w-full table-fixed border-collapse bg-muted text-sm md:text-sm">
        <colgroup>
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <tbody>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Redeployment Time</th>
            <td className="px-2 py-1 text-center">
              {data.char.phases[0].attributesKeyFrames[0].data.respawnTime}s
              {data.char.phases[1] && data.char.phases[1].attributesKeyFrames[0].data.respawnTime !== data.char.phases[0].attributesKeyFrames[0].data.respawnTime &&
                ` / ${data.char.phases[1].attributesKeyFrames[0].data.respawnTime}s`}
              {data.char.phases[2] && data.char.phases[2].attributesKeyFrames[0].data.respawnTime !== data.char.phases[1].attributesKeyFrames[0].data.respawnTime &&
                ` / ${data.char.phases[2].attributesKeyFrames[0].data.respawnTime}s`}
            </td>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">DP Cost</th>
            <td className="px-2 py-1 text-center">
              {data.char.phases[0].attributesKeyFrames[0].data.cost}
              {data.char.phases[1] && data.char.phases[1].attributesKeyFrames[0].data.cost !== data.char.phases[0].attributesKeyFrames[0].data.cost &&
                ` / ${data.char.phases[1].attributesKeyFrames[0].data.cost}`}
              {data.char.phases[2] && data.char.phases[2].attributesKeyFrames[0].data.cost !== data.char.phases[1].attributesKeyFrames[0].data.cost &&
                ` / ${data.char.phases[2].attributesKeyFrames[0].data.cost}`}
            </td>
          </tr>
          <tr>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Block Count</th>
            <td className="border-t px-2 py-1 text-center">
              {data.char.phases[0].attributesKeyFrames[0].data.blockCnt}
              {data.char.phases[1] && data.char.phases[1].attributesKeyFrames[0].data.blockCnt !== data.char.phases[0].attributesKeyFrames[0].data.blockCnt &&
                ` / ${data.char.phases[1].attributesKeyFrames[0].data.blockCnt}`}
              {data.char.phases[2] && data.char.phases[2].attributesKeyFrames[0].data.blockCnt !== data.char.phases[1].attributesKeyFrames[0].data.blockCnt &&
                ` / ${data.char.phases[2].attributesKeyFrames[0].data.blockCnt}`}
            </td>
            <th className="bg-gray-200 dark:bg-card p-1 text-center">Attack Interval</th>
            <td className="border-t px-2 py-1 text-center">
              {data.char.phases[0].attributesKeyFrames[0].data.baseAttackTime}s
              {data.char.phases[1] && data.char.phases[1].attributesKeyFrames[0].data.baseAttackTime !== data.char.phases[0].attributesKeyFrames[0].data.baseAttackTime &&
                ` / ${data.char.phases[1].attributesKeyFrames[0].data.baseAttackTime}s`}
              {data.char.phases[2] && data.char.phases[2].attributesKeyFrames[0].data.baseAttackTime !== data.char.phases[1].attributesKeyFrames[0].data.baseAttackTime &&
                ` / ${data.char.phases[2].attributesKeyFrames[0].data.baseAttackTime}s`}
            </td>
          </tr>
        </tbody>
      </table>
    );
  } catch (e) {
    console.error('Error rendering stats:', e);
    return null;
  }
            })()}
          </div>
        </section>
      )}
    </div>
  )
}