
import { Metadata, ResolvingMetadata } from "next/types";
import { notFound } from "next/navigation";


export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const title = "Closure Wiki";
  const description = "Welcome to Closure's Wiki, Doctor!\n\nclosure.wiki is an unofficial resource archive for Arknights. This is still a work in progress, so some pages may be incomplete.";
  const image = "https://static.closure.wiki/v1/icon.png";

  const siteName = "Closure Wiki";
  // const url = `https://closure.wiki/en/operators`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      siteName: siteName,
      // url: url,
      images: [{ url: image }]
    },
    twitter: {
      title: title,
      description: description,
      card: "summary",
      images: image,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const languages = ["en", "jp", "cn"];
  if (!languages.includes(lang)) notFound();

  return (
    <div className="flex flex-1 flex-col gap-4 w-full px-4 md:px-0">
      <div>
        <h2 className="text-lg font-semibold mb-2">Welcome!</h2>
        <p>closure.wiki is an unofficial resource archive for Arknights. This is still a work in progress, so some pages may be incomplete.</p>
        <p>Disclaimer: This is a hobby project and is not affiliated with Hypergryph or Yostar. All trademarks are property of their respective owners.</p>
        <br/>
        <p>If there are any requests/issues, feel free to send me a message request on Discord at @sethfire (Closure) or open an issue on Github.</p>
        <br/>
        <p>Github Repository: <a href="https://github.com/sethfire/closure-wiki-next" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            https://github.com/sethfire/closure-wiki-next
          </a></p>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Changelog</h2>
        <ul className="list-disc pl-5">
          <li>2025/10/13 - Added promotion and skill material costs</li>
          <li>2025/10/16 - Updated enemy resistances table</li>
          <li>2025/10/29 - Add operator base skills and modules</li>
          <li>2025/11/02 - Sorting/filtering on operators, enemies, and operations lists</li>
        </ul> 
      </div>
    </div>
  );
}