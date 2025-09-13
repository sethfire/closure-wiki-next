import type { Metadata, ResolvingMetadata } from "next";
import CarouselGallery from "@/components/carousel-gallery";
import PotentialsTable from "@/components/operators/potentials-table";
import SkillsTable from "@/components/operators/skills-table";
import StatsTable from "@/components/operators/stats-table";
import TalentsTable from "@/components/operators/talent-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { getCharBranch, getCharClass, getCharRarity, getFaction } from "@/lib/char-utils";
import { getClassIcon, getBranchIcon, getFactionLogo, getCharAvatar, getCharacter } from "@/lib/image-utils";
import { getOperator, getOperators } from "@/lib/fetch-utils";
import { notFound } from "next/navigation";
import { parseRichText } from "@/lib/parse";

export const revalidate = 2419200;
export const dynamicParams = true;

export async function generateStaticParams() {
  const chars: any[] = await getOperators("en");
  return chars.slice(0, 10).map((char) => ({
    slug: char.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const data: any = await getOperator("en", slug);
  if (!data) notFound();

  const title = data.meta.name;
  const description = data.char.itemUsage;
  const image = getCharAvatar(data.charProfile.charID);

  const siteName = "Closure Wiki";
  const url = `https://closure.wiki/en/operators/${slug}`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      siteName: siteName,
      url: url,
      images: [{ url: image }],
    },
    twitter: {
      title: title,
      description: description,
      card: "summary",
      images: image,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data: any = await getOperator("en", slug);
  if (!data) notFound();

  const charArts: any[] = [];
  data.charSkins.forEach((skin: any) => {
    let skinId = skin.skinId.toLowerCase();
    let avatar = "";
    if (!skin.isBuySkin) {
      skinId = skinId.replace('@', '_').replace('#', '_');
      avatar = getCharAvatar(skin.avatarId);
    } else {
      skinId = skinId.replace('@', '_').replace('#', '%23');
      avatar = getCharAvatar(skinId);
      
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
      // src: `https://static.closure.wiki/v1/characters/${skinId}.webp`,
      src: getCharacter(skinId),
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
            {"★".repeat(getCharRarity(data.char.rarity))}
          </span>
        </div>
        <div className="mb-4 text-sm flex flex-row gap-4">
          <span className="text-muted-foreground">{getCharRarity(data.char.rarity)}★ {getCharClass(data.char.profession)} Operator</span>
        </div>
        <Separator className="mb-4" />
        
        {data.meta.isUnreleased && (
          <Alert className="mb-4">
            <AlertCircleIcon />
            <AlertTitle>This operator is not yet available on the EN server of Arknights.</AlertTitle>
          </Alert>
        )}

        {charArts && charArts.length > 0 && (
          <div>
            <CarouselGallery images={charArts} changeAspectonMobile={true} />
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <Separator className="mb-4" />
        <table className="w-full table-fixed border-collapse bg-muted text-sm mb-4">
          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
          </colgroup>
          <tbody>
            <tr>
              <th className="bg-gray-200 dark:bg-card p-1 text-center" colSpan={4}>Overview</th>
            </tr>
            <tr>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">Name</th>
              <td className="px-2 py-1 text-center">{data.char.name}</td>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">Display No.</th>
              <td className="px-2 py-1 text-center">{data.char.displayNumber}</td>
            </tr>
            <tr>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">Description</th>
              <td className="border-t px-2 py-1 text-center" colSpan={3}>{data.char.itemUsage}<br />{data.char.itemDesc}</td>
            </tr>
            <tr>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">Trait</th>
              <td className="border-t px-2 py-1 text-center" colSpan={3}><span dangerouslySetInnerHTML={{ __html: parseRichText(data.char.description)}} /></td>
            </tr>
            <tr>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">Position</th>
              <td className="border-t px-2 py-1 text-center">{data.char.position ? data.char.position.charAt(0).toUpperCase() + data.char.position.slice(1).toLowerCase() : "N/A"}</td>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">Tags</th>
              <td className="border-t px-2 py-1 text-center">{data.char.tagList.join(", ")}</td>
            </tr>
            <tr>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">Class</th>
              <td className="border-t px-2 py-1 text-center">
                <span className="flex items-center justify-center gap-2">
                  <img src={getClassIcon(data.char.profession)} className="w-auto h-6" />
                  {getCharClass(data.char.profession)}
                </span>
              </td>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">Subbranch</th>
              <td className="border-t px-2 py-1 text-center">
                <span className="flex items-center justify-center gap-2">
                  <img src={getBranchIcon(data.char.subProfessionId)} className="w-auto h-6" />
                  {getCharBranch(data.char.subProfessionId)}
                </span>
              </td>
            </tr>
            <tr>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">Nation</th>
              <td className="border-t px-2 py-1 text-center">
                {/* {data.char.nationId ? (
                  <span className="flex items-center justify-center gap-2">
                    <img src={getFactionLogo(data.char.nationId)} className="w-auto h-6" />
                    {getFaction(data.char.nationId)}
                  </span>
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )} */}
                {getFaction(data.char.nationId)}
              </td>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">Faction</th>
              <td className="border-t px-2 py-1 text-center">
                {/* {data.char.groupId ? (
                  <span className="flex items-center justify-center gap-2">
                    <img src={getFactionLogo(data.char.groupId)} className="w-auto h-6" />
                    {getFaction(data.char.groupId)}
                  </span>
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )} */}
                {getFaction(data.char.groupId)}
              </td>
            </tr>
          </tbody>
        </table>
        
        <table className="w-full table-fixed border-collapse bg-muted text-sm">
          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
          </colgroup>
          <tbody>
            <tr>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">Illustrator(s)</th>
              <td className="px-2 py-1 text-center" colSpan={3}>
                {Array.isArray(data.charSkins) && data.charSkins.length > 0
                  ? Array.from(new Set(data.charSkins.flatMap((skin: any) => skin?.displaySkin?.drawerList ?? []))).join(", ") || "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">JP Voice</th>
              <td className="border-t px-2 py-1 text-center">{data.voiceLangDict?.dict["JP"]?.cvName.join(", ") ?? "N/A"}</td>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">CN Voice</th>
              <td className="border-t px-2 py-1 text-center">{data.voiceLangDict?.dict["CN_MANDARIN"]?.cvName.join(", ") ?? "N/A"}</td>
            </tr>
            <tr>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">EN Voice</th>
              <td className="border-t px-2 py-1 text-center">{data.voiceLangDict?.dict["EN"]?.cvName.join(", ") ?? "N/A"}</td>
              <th className="bg-gray-200 dark:bg-card p-1 text-center">KR Voice</th>
              <td className="border-t px-2 py-1 text-center">{data.voiceLangDict?.dict["KR"]?.cvName.join(", ") ?? "N/A"}</td>
            </tr>
          </tbody>
        </table>
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