import type { Metadata, ResolvingMetadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { AlertCircleIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { parseRichText } from "@/lib/parse";
import { getModule, getModules } from "@/lib/fetch-utils";
import { getModuleImg } from "@/lib/image-utils";
import CarouselGallery from "@/components/carousel-gallery";

export const revalidate = 2419200;
export const dynamicParams = true;

export async function generateStaticParams() {
  const modules: any[] = await getModules("en");
  return modules.slice(0, 10).map((module) => ({
    slug: module.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const data: any = await getModule("en", slug);
  if (!data) notFound();

  const title = data.module.uniEquipName;
  const description = data.module.uniEquipDesc ? (data.module.uniEquipDesc as string).split("\n")[0] : "";
  const image = getModuleImg(data.module.uniEquipIcon);

  const siteName = "Closure Wiki";
  const url = `https://closure.wiki/en/modules/${slug}`;

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
  const data: any = await getModule("en", slug);
  if (!data) notFound();

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 mx-auto w-full max-w-6xl mb-16">
      <section>
        <div className="flex justify-between mb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/en/home">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbLink href="/en/modules">Modules</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbPage>{data.module.uniEquipName}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex justify-between mb-2">
          <h1 className="text-2xl font-semibold">{data.module.uniEquipName}</h1>
        </div>
        <div className="mb-4 text-sm flex flex-row gap-4">
          {/* <span>
            <span className="text-muted-foreground">Release Date ({data.meta.isUnreleased ? "CN" : "Global"}): </span>
            {new Date(data.module.uniEquipGetTime * 1000).toLocaleDateString()}
          </span> */}
          <span className="text-muted-foreground">Operator Module</span>
        </div>
        <Separator className="mb-4" />
        {data.meta.isUnreleased && (
          <Alert className="mb-4">
            <AlertCircleIcon />
            <AlertTitle>This module is not yet available on the EN server of Arknights.</AlertTitle>
          </Alert>
        )}
        {/* <div className="flex flex-col md:flex-row gap-4 items-start">
          <img src={getModuleImg(data.module.uniEquipIcon)}
            className="w-[180px] h-[180px] md:w-32 md:h-32 object-contain" />

          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-row gap-4 text-sm overflow-x-auto">
              <span>
                <span className="text-muted-foreground">Type: </span>
                {data.module.typeName1}-{data.module.typeName2}
              </span>
              <span>
                <span className="text-muted-foreground">Operator: </span>
                {data.module.charId}
              </span>
            </div>
            <p className="flex-1">{data.module.uniEquipDesc ? (data.module.uniEquipDesc as string).split("\n")[0] : null}</p>
          </div>
        </div> */}
        <div>
          <CarouselGallery images={[{
            src: getModuleImg(data.module.uniEquipIcon),
            thumb: getModuleImg(data.module.uniEquipIcon),
            download: getModuleImg(data.module.uniEquipIcon),
            title: `${data.module.typeName1}-${data.module.typeName2} ${data.module.uniEquipName}`,
            desc: "",
            display: "object-contain",
          }]} changeAspectonMobile={true} showThumbnails={false} />
        </div>
      </section>

      {data.module.hasUnlockMission && data.missions && data.missions.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Missions</h2>
          <Separator className="mb-2" />
          <ul className="ml-6">
            {data.missions.map((mission: any, index: number) =>
              <li key={index} className="list-disc list-item items-center mb-1">{parseRichText(mission.desc)}</li>
            )}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <Separator className="mb-2" />
        <p className="whitespace-pre-line">
          {data.module.uniEquipDesc}
        </p>
      </section>
    </div>
  );
}