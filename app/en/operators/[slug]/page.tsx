import type { Metadata, ResolvingMetadata } from 'next'
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
import { Alert, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'

export const revalidate = 86400
export const dynamicParams = true

function getOperatorClass(value:string): string {
  switch (value) {
    case "PIONEER": return "Vanguard";
    case "WARRIOR": return "Guard";
    case "SNIPER": return "Sniper";
    case "CASTER": return "Caster";
    case "MEDIC": return "Medic";
    case "SUPPORT": return "Supporter";
    case "TANK": return "Defender";
    case "SPECIAL": return "Specialist";
    case "TRAP": return "Trap";
    case "TOKEN": return "Token";
    default: return "???";
  }
}

function getOperatorRarity(value: string): number {
  switch (value) {
    case "TIER_6": return 6;
    case "TIER_5": return 5;
    case "TIER_4": return 4;
    case "TIER_3": return 3;
    case "TIER_2": return 2;
    case "TIER_1": return 1;
    default: return 0;
  }
}

const getOperator = async (slug: string) => {
  const response: any = await fetch(`https://api.closure.wiki/en/operators/${slug}`);
  if (!response.ok) notFound();

  const data: any = await response.json();
  if (!data) notFound();

  return data;
}

export async function generateStaticParams() {
  const chars: any[] = await fetch('https://api.closure.wiki/en/operators').then((res) => res.json())
  return chars.slice(0, 10).map((char) => ({
    slug: char.slug,
  }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const data: any = await getOperator(slug);
  return {
    title: data.meta.name,
    description: data.char.itemUsage,
    openGraph: {
      title: data.meta.name,
      description: data.char.itemUsage,
      siteName: "Closure Wiki",
      url: `https://arknights.closure.wiki/en/operations/${slug}`,
      images: [{ url: `https://static.closure.wiki/v1/charavatars/${data.charProfile.charID}.webp` }]
    },
    twitter: {
      title: data.meta.name,
      description: data.char.itemUsage,
      card: "summary",
      images: `https://static.closure.wiki/v1/charavatars/${data.charProfile.charID}.webp`,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data: any = await getOperator(slug);

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

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 mx-auto w-full max-w-6xl mb-16">
      <section>
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/en/home">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbLink href="/en/operators">Operators</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>{data.meta.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-between mb-2">
          <h1 className="text-2xl font-semibold">{data.meta.name}</h1>
          <span className="text-2xl text-yellow-400">
            {"★".repeat(getOperatorRarity(data.char.rarity))}
          </span>
        </div>
        <div className="mb-4 text-sm flex flex-row gap-4">
          {/* <span>
            <span className="text-muted-foreground">Release Date (CN): </span>
            {new Date(0).toLocaleDateString()}
          </span>
          <span>
            <span className="text-muted-foreground">Release Date (EN): </span>
            {data.meta.isUnreleased ? "Unreleased" : new Date(0).toLocaleDateString()}
          </span> */}
          <span className="text-muted-foreground">{getOperatorRarity(data.char.rarity)}★ {getOperatorClass(data.char.profession)} Operator</span>
        </div>
        <Separator className="mb-4" />
        
        {data.meta.isUnreleased && (
          <Alert className="mb-4">
            <AlertCircleIcon />
            <AlertTitle>This operator is not yet available on the Global server of Arknights.</AlertTitle>
          </Alert>
        )}

        {charArts && charArts.length > 0 && (
          <section>
            <CarouselGallery images={charArts} />
          </section>
        )}
      </section>

      {/* <section>
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <Separator className="mb-4" />
        <p>Trait: {data.char.description}</p>
        <p>Nation: {data.char.nationId}</p>
        <p>Group: {data.char.groupId}</p>
        <p>Team: {data.char.teamId}</p>
        <p>Display No.: {data.char.displayNumber}</p>
        <p>Position: {data.char.position}</p>
        <p>Tags: {data.char.tagList.join(", ")}</p>
        <p>Obtainable via: {data.char.itemObtainApproach}</p>
        <p>Limited: {data.charProfile.isLimited ? "Yes" : "No"}</p>
        <p>Class: {data.char.profession}</p>
        <p>Branch: {data.char.subProfessionId}</p>
        <p>Voice Actors: {voiceActors}</p>
      </section> */}

      <section>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <Separator className="mb-4" />
        <p>{data.char.itemUsage}</p><br /><p className="italic">{data.char.itemDesc}</p>
      </section>

      {data.char.phases && data.char.phases.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Attributes</h2>
          <Separator className="mb-4" />
          <StatsTable phases={data.char.phases} favorKeyFrames={data.char.favorKeyFrames} />
        </section>
      )}

      {data.char.talents && data.char.talents.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Talents</h2>
          <Separator className="mb-4" />
          <TalentsTable talents={data.char.talents} />
        </section>
      )}

      {data.char.potentialRanks && data.char.potentialRanks.length === 5 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Potentials</h2>
          <Separator className="mb-4" />
          <PotentialsTable potentialRanks={data.char.potentialRanks} />
        </section>
      )}

      {data.charSkills && data.charSkills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <Separator className="mb-4" />
          <SkillsTable skills={data.charSkills} />
        </section>
      )}

      {data.charProfile && data.charProfile.storyTextAudio && data.charProfile.storyTextAudio.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Operator File</h2>
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
          <h2 className="text-xl font-semibold mb-2">Operator Dialogue</h2>
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