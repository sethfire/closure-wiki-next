import type { Metadata, ResolvingMetadata } from "next";
import { Separator } from "@/components/ui/separator";
import UnreleasedNotice from "@/components/operators/unreleased-notice";
import { getCharClass, getCharRarity, getCharRarityColor } from "@/lib/char-utils";
import { getCharacter, getCharAvatar } from "@/lib/image-utils";
import { getItems, getOperator, getOperators, getOutfit } from "@/lib/fetch-utils";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/dynamic-breadcrumb";
import EntryTitle from "@/components/entry-title";
import CarouselGallery from "@/components/carousel-gallery";
import CodeBlock from "@/components/code-block";

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
  const data: any = await getOutfit(lang, slug);
  if (!data) notFound();

  const title = data.summary.name;
  const description = data.summary.desc;
  const image = getCharAvatar(encodeURIComponent(data.skin.avatarId.toLowerCase()));

  const siteName = "Closure Wiki";
  const url = `https://closure.wiki/${lang}/outfits/${slug}`;

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
  const data: any = await getOutfit(lang, slug);
  if (!data) notFound();

  return (
    <div className="flex flex-1 flex-col gap-4 w-full px-4 md:px-0 mb-32">
      <section>
        <div className="mb-2">
          <Breadcrumbs items={[
            { label: "Home", href: `/${lang}/home` },
            { label: "Outfits", href: `/${lang}/outfits` },
            { label: data.summary.name },
          ]} />
        </div>
        <EntryTitle
          title={data.summary.name}
          caption={`Outfit`}
          icon={getCharAvatar(encodeURIComponent(data.skin.avatarId.toLowerCase()))}
        />
        <Separator />
      </section>

      {data.summary.isUnreleased && <UnreleasedNotice contentType="outfit" />}

      <section id="gallery">
        <CarouselGallery images={[{
          src: getCharacter(encodeURIComponent(data.skin.portraitId.toLowerCase())),
          thumb: getCharAvatar(encodeURIComponent(data.skin.avatarId.toLowerCase())),
          download: getCharacter(encodeURIComponent(data.skin.portraitId.toLowerCase())),
          title: `${data.skin.displaySkin.skinGroupName} ${data.skin.displaySkin.skinName}`,
          desc: data.skin.displaySkin.usage,
          display: "object-cover",
        }]} changeAspectonMobile={true} />
      </section>

      <section id="description">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <Separator className="mb-4" />
        <p>{data.skin.displaySkin.dialog}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Reference Data</h2>
        <Separator className="mb-4" />
        <div>
          <h3 className="text-lg font-semibold mb-2">skin_table.json</h3>
          <CodeBlock code={JSON.stringify(data.skin ? data.skin : {}, null, 2)} language="json" />
        </div>
      </section>
    </div>
  )
}