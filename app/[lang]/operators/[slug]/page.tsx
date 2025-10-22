import type { Metadata, ResolvingMetadata } from "next";
import PotentialsTable from "@/components/operators/potentials-table";
import SkillsTable from "@/components/operators/skills-table";
import StatsTable from "@/components/operators/stats-table";
import TalentsTable from "@/components/operators/talent-table";
import { Separator } from "@/components/ui/separator";
import UnreleasedNotice from "@/components/operators/unreleased-notice";
import { getCharClass, getCharRarity } from "@/lib/char-utils";
import { getCharAvatar } from "@/lib/image-utils";
import { getItems, getOperator, getOperators } from "@/lib/fetch-utils";
import { notFound } from "next/navigation";
import CodeBlock from "@/components/code-block";
import OverviewTable from "@/components/operators/overview-table";
import CVTable from "@/components/operators/cv-table";
import OperatorFile from "@/components/operators/operator-file";
import OperatorGallery from "@/components/operators/operator-gallery";
import Breadcrumbs from "@/components/ui/dynamic-breadcrumb";
import MaterialsTable from "@/components/operators/materials-table";

export const revalidate = 2419200;
export const dynamicParams = true;

export async function generateStaticParams() {
  const chars: any[] = await getOperators("en");
  return chars.slice(0, 3).map((char) => ({
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

export default async function Page({ params }: { params: Promise<{ lang: string, slug: string }> }) {
  const { lang, slug } = await params;
  const data: any = await getOperator(lang, slug);
  if (!data) notFound();

  const items: any = await getItems(lang);

  return (
    <div className="flex flex-1 flex-col gap-8 w-full px-4 md:px-0 mb-32">
      <section>
        <div className="mb-2">
          <Breadcrumbs items={[
            { label: "Home", href: "/en/home" },
            { label: "Operators", href: "/en/operators" },
            { label: data.meta.name },
          ]} />
        </div>
        <div className="flex justify-between mb-2">
          <h1 className="text-2xl font-semibold">{data.meta.name}</h1>
          <div className="text-2xl text-yellow-400">{"★".repeat(getCharRarity(data.char.rarity))}</div>
        </div>
        <div className="mb-4 text-sm flex flex-row gap-4">
          <div className="text-muted-foreground">
            {getCharRarity(data.char.rarity)}★ {getCharClass(data.char.profession)} Operator
          </div>
        </div>

        <Separator className="mb-4" />

        {data.meta.isUnreleased && <UnreleasedNotice contentType="operator" />}

        {data.charSkins && Array.isArray(data.charSkins) && data.charSkins.length > 0 && (
          <OperatorGallery charSkins={data.charSkins} />
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <Separator className="mb-4" />
        <OverviewTable character={data.char} />
        <CVTable charSkins={data.charSkins} voiceLangDict={data.voiceLangDict} />
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

      {data.char.skills && data.char.skills.length > 0 && data.charSkills && data.charSkills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <Separator className="mb-4" />
          <SkillsTable skills={data.char.skills} charSkills={data.charSkills} allSkillLvlup={data.char.allSkillLvlup} items={items} />
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-2">Promotion Cost</h2>
        <Separator className="mb-4" />
        <MaterialsTable phases={data.char.phases} items={items} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Base Skills</h2>
        <Separator className="mb-4" />
        <div className="text-muted-foreground italic">TBD</div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Modules</h2>
        <Separator className="mb-4" />
        <div className="text-muted-foreground italic">TBD</div>
      </section>

      {data.charProfile && data.charProfile.storyTextAudio && data.charProfile.storyTextAudio.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Operator File</h2>
          <Separator className="mb-4" />
          <OperatorFile storyTextAudio={data.charProfile.storyTextAudio} />
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

      <section>
        <h2 className="text-xl font-semibold mb-2">Reference Data</h2>
        <Separator className="mb-4" />
        <div>
          <h3 className="text-lg font-semibold mb-2">character_table.json</h3>
          <CodeBlock code={JSON.stringify(data.char ?? {}, null, 2)} language="json" />
          <h3 className="text-lg font-semibold mb-2 mt-8">handbook_info_table.json</h3>
          <CodeBlock code={JSON.stringify(data.charProfile ?? {}, null, 2)} language="json" />
          <h3 className="text-lg font-semibold mb-2 mt-8">charword_table.json</h3>
          <CodeBlock code={JSON.stringify(data.charDialog ?? {}, null, 2)} language="json" />
          <h3 className="text-lg font-semibold mb-2 mt-8">skill_table.json</h3>
          <CodeBlock code={JSON.stringify(data.charSkills ?? {}, null, 2)} language="json" />
          <h3 className="text-lg font-semibold mb-2 mt-8">uniequip_table.json</h3>
          <CodeBlock code={JSON.stringify(data.charModules ?? {}, null, 2)} language="json" />
          <h3 className="text-lg font-semibold mb-2 mt-8">skin_table.json</h3>
          <CodeBlock code={JSON.stringify(data.charSkins ?? {}, null, 2)} language="json" />
        </div>
      </section>
    </div>
  )
}