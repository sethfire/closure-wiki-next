import CarouselGallery from "@/components/carousel-gallery";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { storyGroupLabels } from "@/lib/gallery-utils";

export const revalidate = 86400;

export default async function Page() {
  const data: any = await fetch("https://api.closure.wiki/v2/en/avg/backgrounds");
  const backgrounds = await data.json();
  
  const bgNames = backgrounds.map((bg: string) => {
    const parts = bg.split("/");
    const filename = parts[parts.length - 1];
    return filename;
  });

  const bgGroups: Record<string, string[]> = {};

  bgNames.forEach((bgName: string) => {
    const id = bgName.split("_")[0];
    if (!bgGroups[id]) {
      bgGroups[id] = [];
    }
    bgGroups[id].push(bgName);
  });

  Object.values(bgGroups).forEach((group) =>
    group.sort((a, b) => {
      const numA = parseInt(a.split("_")[1].replace(/^g/, ""), 10);
      const numB = parseInt(b.split("_")[1].replace(/^g/, ""), 10);
      return numA - numB;
    })
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 mx-auto w-full max-w-6xl">
      <div>
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/en/home">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbLink>Gallery</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>Backgrounds</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mb-2 text-2xl font-semibold">Story Backgrounds</h1>
        <div className="text-sm">
          <span>
            <span className="text-muted-foreground">Showing </span>
            <span>{bgNames.length}</span>
            <span className="text-muted-foreground"> Backgrounds</span>
          </span>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-12">
        {Object.entries(bgGroups).map(([key, backgrounds]) => {
          const backgroundImages: any[] = [];
          backgrounds.forEach((bg: string) => {
            backgroundImages.push({
              src: `https://static.closure.wiki/v2/preview/avg/backgrounds/${bg.split(".")[0]}.webp`,
              thumb: `https://static.closure.wiki/v2/thumb/avg/backgrounds/${bg.split(".")[0]}.webp`,
              download: `https://static.closure.wiki/v2/avg/backgrounds/${bg}`,
              title: bg,
              desc: "",
              display: "object-contain",
            });
          });
          const groupName = storyGroupLabels[key] || `Group ${key}`;
          return (
            backgrounds.length > 0 && (
              <div key={key}>
                <h2 className="mb-4 text-xl font-bold">{groupName}</h2>
                <CarouselGallery images={backgroundImages} />
              </div>
            )
          );
        })}
      </div>
    </div>
  )
}