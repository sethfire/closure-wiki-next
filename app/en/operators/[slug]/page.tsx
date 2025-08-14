import CarouselGallery from "@/components/carousel-gallery"
import PotentialsTable from "@/components/operators/potentials-table"
import SkillsTable from "@/components/operators/skills-table"
import StatsTable from "@/components/operators/stats-table"
import TalentsTable from "@/components/operators/talent-table"
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
export const dynamicParams = true

export async function generateStaticParams() {
  const chars: any[] = await fetch('https://api.closure.wiki/en/operators').then((res) => res.json())
  return chars.map((char) => ({
    slug: String(char.slug),
  }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const response: any = await fetch(`https://api.closure.wiki/en/operators/${slug}`)

  if (!response.ok) notFound()
  const data: any = await response.json()
  if (!data) notFound()

  const charArts: any[] = [];
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

    charArts.push({
      src: `https://static.closure.wiki/v1/characters/${skinId}.webp`,
      thumb: avatar.toLowerCase(),
      title: title,
      desc: `Illustrator: ${skin.displaySkin.drawerList.join(", ")}`,
      display: (skin.displaySkin.skinGroupId === "ILLUST_0") ? "object-contain" : "object-cover",
    });
  });

  const charRarityMap: Record<string, number> = {
    TIER_6: 6,
    TIER_5: 5,
    TIER_4: 4,
    TIER_3: 3,
    TIER_2: 2,
    TIER_1: 1,
    TIER_0: 0,
  };

  return (
    <div className="flex flex-1 flex-col gap-8 p-8 mx-auto w-full max-w-6xl">
      <section>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-semibold">{data.meta.name}</h1>
          <div className="flex items-center ml-4">
            <span className="flex text-yellow-400 text-3xl font-bold">
              {"★".repeat(charRarityMap[data.char.rarity] ?? 0)}
            </span>
          </div>
        </div>
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/en/home">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbLink href="/en/operators">Operators</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>{data.meta.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Separator className="mb-4" />
        {charArts && charArts.length > 0 && (
          <section>
            <CarouselGallery images={charArts} />
          </section>
        )}
      </section>

      {data.char.phases && data.char.phases.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Attributes</h2>
          <Separator className="mb-4" />
          <StatsTable phases={data.char.phases} favorKeyFrames={data.char.favorKeyFrames} />
        </section>
      )}

      {data.char.talents && data.char.talents.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Talents</h2>
          <Separator className="mb-4" />
          <TalentsTable talents={data.char.talents} />
        </section>
      )}

      {data.char.potentialRanks && data.char.potentialRanks.length === 5 && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Potentials</h2>
          <Separator className="mb-4" />
          <PotentialsTable potentialRanks={data.char.potentialRanks} />
        </section>
      )}

      {data.charSkills && data.charSkills.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Skills</h2>
          <Separator className="mb-4" />
          <SkillsTable skills={data.charSkills} />
        </section>
      )}

      {data.charProfile && data.charProfile.storyTextAudio && data.charProfile.storyTextAudio.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Operator File</h2>
          <Separator className="mb-4" />
          <div className="grid gap-4">
            {data.charProfile.storyTextAudio.map((profile: any, idx: number) => (
              <div className="p-6 bg-muted dark:bg-card rounded-lg shadow" key={idx} style={{ overflowWrap: 'anywhere' }}>
                <h3 className="font-semibold mb-2">{profile.storyTitle}</h3>
                <Separator className="mb-2" />
                {profile.stories && profile.stories[0]?.storyText &&
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {profile.stories[0].storyText}
                  </div>
                }
              </div>
            ))}
          </div>
        </section>
      )}

      {data.charDialog && data.charDialog.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Operator Dialogue</h2>
          <Separator className="mb-6" />
          <div className="bg-muted dark:bg-card rounded-lg shadow p-4">
            <ul className="space-y-4">
              {data.charDialog.map((dialogue: any, idx: number) => (
                <li className="flex flex-col" key={idx}>
                  <span className="font-semibold">{dialogue.voiceTitle}</span>
                  <span className="text-muted-foreground">{dialogue.voiceText}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  )
}