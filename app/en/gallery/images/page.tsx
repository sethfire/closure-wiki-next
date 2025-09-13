import CarouselGallery from "@/components/carousel-gallery";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { storyGroupLabels } from "@/lib/gallery-utils";

export const revalidate = 86400;

export default async function Page() {
  const data: any = await fetch("https://api.closure.wiki/v2/en/avg/images");
  const imgs = await data.json();

  const imgNames = imgs.map((img: string) => {
    const parts = img.split("/");
    const filename = parts[parts.length - 1];
    return filename;
  });

  const imgGroups: Record<string, string[]> = {};

  imgNames.forEach((imgName: string) => {
    const id = imgName.split("_")[0];
    if (!imgGroups[id]) {
      imgGroups[id] = [];
    }
    imgGroups[id].push(imgName);
  });

  // imgGroupNames moved to config/bgGroupNames.ts as bgGroupNames

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 mx-auto w-full max-w-6xl">
      <div>
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/en/home">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbLink>Gallery</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>Images</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mb-2 text-2xl font-semibold">Story Images</h1>
        <div className="text-sm">
          <span>
            <span className="text-muted-foreground">Showing </span>
            <span>{imgs.length}</span>
            <span className="text-muted-foreground"> Images</span>
          </span>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-12">
        {Object.entries(imgGroups).map(([key, images]) => {
          const imageItems: any[] = [];
          images.forEach((img: string) => {
            imageItems.push({
              src: `https://static.closure.wiki/v2/avg/images/${img}`,
              thumb: `https://static.closure.wiki/v2/thumb/avg/images/${img.split(".")[0]}.webp`,
              title: img,
              desc: "",
              display: "object-contain",
            });
          });
          const groupName = storyGroupLabels[key] || `Group ${key}`;
          return (
            images.length > 0 && (
              <div key={key}>
                <h2 className="mb-4 text-xl font-bold">{groupName}</h2>
                <CarouselGallery images={imageItems} />
              </div>
            )
          );
        })}
      </div>
    </div>
  )
}