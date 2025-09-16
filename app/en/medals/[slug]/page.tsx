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
import { getMedal, getMedals } from "@/lib/fetch-utils";

export const revalidate = 2419200;
export const dynamicParams = true;

export async function generateStaticParams() {
  const medals: any[] = await getMedals("en");
  return medals.slice(0, 1).map((medal) => ({
    slug: medal.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const data: any = await getMedal("en", slug);
  if (!data) notFound();

  const title = data.medal.medalName;
  const description = data.medal.description;
  const image = `https://static.closure.wiki/v1/medalicon/${data.medal.medalId}.webp`;
  
  const siteName = "Closure Wiki";
  const url = `https://closure.wiki/en/medals/${slug}`;

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
  const data: any = await getMedal("en", slug);
  if (!data) notFound();

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 mx-auto w-full max-w-6xl mb-16">
      <section>
        <div className="flex justify-between mb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/en/home">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbLink href="/en/medals">Medals</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem><BreadcrumbPage>{data.medal.medalName}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex justify-between mb-2"><h1 className="text-2xl font-semibold">{data.medal.medalName}</h1></div>
        <div className="mb-4 text-sm flex flex-row gap-4"><span className="text-muted-foreground">Medal</span></div>
        <Separator className="mb-4" />
        {data.meta.isUnreleased && (
          <Alert className="mb-4">
            <AlertCircleIcon />
            <AlertTitle>This medal is not yet available on the EN server of Arknights.</AlertTitle>
          </Alert>
        )}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <img src={`https://static.closure.wiki/v1/medalicon/${data.medal.medalId}.webp`}
            className="w-[180px] h-[180px] md:w-32 md:h-32 object-contain" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-row gap-4 text-sm overflow-x-auto">
              <span><span className="text-muted-foreground">Type: </span>{data.medal.medalType}</span>
              <span><span className="text-muted-foreground">Rarity: </span>{data.medal.rarity}</span>
            </div>
            <p className="flex-1">{data.medal.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}