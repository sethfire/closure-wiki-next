import { Metadata, ResolvingMetadata } from "next/types";


export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const title = "Closure Wiki";
  const description = "Welcome to Closure's Wiki, Doctor!\n\nclosure.wiki is an unofficial resource archive for Arknights. This is still a work in progress, so some pages may be incomplete.";
  const image = "https://static.closure.wiki/v1/icon.png";

  const siteName = "Closure Wiki";
  const url = `https://closure.wiki/en/operators`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      siteName: siteName,
      url: url,
      images: [{ url: image }]
    },
    twitter: {
      title: title,
      description: description,
      card: "summary",
      images: image,
    },
  }
}

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 w-full px-4 md:px-0">
      <div>
        <h2 className="text-lg font-semibold mb-2">Welcome!</h2>
        <p>closure.wiki is an unofficial resource archive for Arknights. This is still a work in progress, so some pages may be incomplete.</p>
        <p>Disclaimer: This is a hobby project and is not affiliated with Hypergryph or Yostar. All trademarks are property of their respective owners.</p>
        <br/>
        <p>If there are any issues, feel free to ping me @sethfire (Closure) on the RIHQ discord (
          <a href="https://discord.gg/rihq" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            https://discord.gg/rihq
          </a>
        )</p>
        <br/>
        <p>Github Repository: <a href="https://github.com/sethfire/closure-wiki-next" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            https://github.com/sethfire/closure-wiki-next
          </a></p>
      </div>
      
      {/* <div className="flex justify-center mb-8">
        <img
          src="https://static.closure.wiki/v1/banner.png"
          className="max-w-md md:max-w-xl w-full h-auto"
        />
      </div> */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Changelog</h2>
        <ul className="list-disc pl-5">
          <li>2025/10/13 - Added promotion and skill material costs</li>
        </ul> 
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Todo stuff (in no particular order)</h2>
        <ul className="list-disc pl-5">
          <li>Operator base skills</li>
          <li>Operator modules</li>
          <li>Search functionality</li>
          <li>Sorting and filtering on lists</li>
          <li>Table of contents on entry pages</li>
          <li>Multiple language support</li>
        </ul> 
      </div>

      {/* <div>
        <h2 className="text-lg font-semibold mb-2">Navigation</h2>
        <ul className="list-disc pl-5">
          <li><a href="/en/operators" className="text-blue-600 hover:underline">Operators</a></li>
          <li><a href="/en/enemies" className="text-blue-600 hover:underline">Enemies</a></li>
          <li><a href="/en/operations" className="text-blue-600 hover:underline">Operations</a></li>
          <li><a href="/en/modules" className="text-blue-600 hover:underline">Modules</a></li>
          <li><a href="/en/gallery/images" className="text-blue-600 hover:underline">Story Image Gallery</a></li>
          <li><a href="/en/gallery/backgrounds" className="text-blue-600 hover:underline">Story BG Gallery</a></li>
        </ul> 
      </div> */}
    </div>
  )
}
