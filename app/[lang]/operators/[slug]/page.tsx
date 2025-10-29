import type { Metadata, ResolvingMetadata } from "next";
import PotentialsTable from "@/components/operators/potentials-table";
import SkillsTable from "@/components/operators/skills-table";
import StatsTable from "@/components/operators/stats-table";
import TalentsTable from "@/components/operators/talent-table";
import { Separator } from "@/components/ui/separator";
import UnreleasedNotice from "@/components/operators/unreleased-notice";
import { getCharClass, getCharRarity, getCharRarityColor } from "@/lib/char-utils";
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
import EntryTitle from "@/components/entry-title";
import BaseSkills from "@/components/operators/base-skills";

export const revalidate = 2419200;
export const dynamicParams = true;

export async function generateStaticParams() {
  const chars: any[] = await getOperators("en");
  return chars.slice(0, 3).map((char) => ({
    slug: char.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string, slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { lang, slug } = await params;
  const data: any = await getOperator(lang, slug);
  if (!data) notFound();

  const title = data.summary.name;
  const description = data.summary.desc;
  const image = getCharAvatar(data.summary.id);

  const siteName = "Closure Wiki";
  const url = `https://closure.wiki/${lang}/operators/${slug}`;

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
            { label: "Home", href: `/${lang}/home` },
            { label: "Operators", href: `/${lang}/operators` },
            { label: data.summary.name },
          ]} />
        </div>
        <EntryTitle
          title={data.summary.name}
          caption={`${getCharRarity(data.character.rarity)}★ ${getCharClass(data.character.profession)} Operator`}
          icon={getCharAvatar(data.summary.id)}
        />
        <Separator className="mb-4" />
        {data.summary.isUnreleased && <UnreleasedNotice contentType="operator" />}
        {data.charSkins && (
          <OperatorGallery charSkins={data.charSkins} />
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <Separator className="mb-4" />
        <OverviewTable character={data.character} />
        <CVTable charSkins={data.charSkins} voiceLangDict={data.voiceLangDict} />
      </section>

      {data.character.phases && data.character.phases.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Attributes</h2>
          <Separator className="mb-4" />
          <StatsTable phases={data.character.phases} favorKeyFrames={data.character.favorKeyFrames} />
        </section>
      )}

      {data.character.talents && data.character.talents.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Talents</h2>
          <Separator className="mb-4" />
          <TalentsTable talents={data.character.talents} />
        </section>
      )}

      {data.character.potentialRanks && data.character.potentialRanks.length === 5 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Potentials</h2>
          <Separator className="mb-4" />
          <PotentialsTable potentialRanks={data.character.potentialRanks} />
        </section>
      )}

      {data.character.skills && data.character.skills.length > 0 && data.charSkills && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <Separator className="mb-4" />
          <SkillsTable skills={data.character.skills} charSkills={data.charSkills} allSkillLvlup={data.character.allSkillLvlup} items={items} />
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-2">Promotion Cost</h2>
        <Separator className="mb-4" />
        <MaterialsTable phases={data.character.phases} items={items} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Base Skills</h2>
        <Separator className="mb-4" />
        <BaseSkills baseSkills={data.baseSkills} baseSkillData={data.baseSkillData} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Modules</h2>
        <Separator className="mb-4" />
        <div className="text-muted-foreground italic">TBD</div>
      </section>

      {data.handbookInfo && data.handbookInfo.storyTextAudio && data.handbookInfo.storyTextAudio.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Operator File</h2>
          <Separator className="mb-4" />
          <OperatorFile storyTextAudio={data.handbookInfo.storyTextAudio} />
        </section>
      )}

      {data.charWords && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Operator Dialogue</h2>
          <Separator className="mb-6" />
          <div className="bg-muted dark:bg-card rounded-lg shadow p-4">
            <ul className="space-y-4">
              {Object.entries(data.charWords).map(([key, dialogue]: [string, any]) => (
                <li className="flex flex-col" key={key}>
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
          <CodeBlock code={JSON.stringify(data.character ?? {}, null, 2)} language="json" />
          <h3 className="text-lg font-semibold mb-2 mt-8">handbook_info_table.json</h3>
          <CodeBlock code={JSON.stringify(data.handbookInfo ?? {}, null, 2)} language="json" />
          <h3 className="text-lg font-semibold mb-2 mt-8">charword_table.json</h3>
          <CodeBlock code={JSON.stringify(data.charWords ?? {}, null, 2)} language="json" />
          <h3 className="text-lg font-semibold mb-2 mt-8">skill_table.json</h3>
          <CodeBlock code={JSON.stringify(data.charSkills ?? {}, null, 2)} language="json" />
          <h3 className="text-lg font-semibold mb-2 mt-8">skin_table.json</h3>
          <CodeBlock code={JSON.stringify(data.charSkins ?? {}, null, 2)} language="json" />
          <h3 className="text-lg font-semibold mb-2 mt-8">building_data.json</h3>
          <CodeBlock code={JSON.stringify({chars: data.baseSkills, buffs: data.baseSkillData}, null, 2)} language="json" />
        </div>
      </section>
    </div>
  )
}