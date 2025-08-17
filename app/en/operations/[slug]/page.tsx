import type { Metadata, ResolvingMetadata } from 'next'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { notFound } from 'next/navigation'

export const revalidate = 86400
export const dynamicParams = true

const getOperation = async (slug: string) => {
  const response: any = await fetch(`https://api.closure.wiki/en/operations/${slug}`);
  if (!response.ok) notFound();

  const data: any = await response.json();
  if (!data) notFound();

  return data;
}

export async function generateStaticParams() {
  const data: any = await fetch('https://api.closure.wiki/en/operations').then((res) => res.json())
  return data.stages.slice(0, 10).map((stage: any) => ({
    slug: stage.slug,
  }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const data: any = await getOperation(slug);
  return {
    title: `${data.stage.code}: ${data.stage.name}`,
    description: data.stage.description,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data: any = await getOperation(slug);

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 mx-auto w-full max-w-6xl">
      <section>
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/en/home">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbLink href="/en/operations">Operations</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>{data.stage.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-between mb-2">
          <h1 className="text-2xl font-semibold">{`${data.stage.code}: ${data.stage.name}`}</h1>
        </div>
        <div className="mb-4 text-sm flex flex-row gap-4">
          <span>
            <span className="text-muted-foreground">Release Date (CN): </span>
            {new Date(0).toLocaleDateString()}
          </span>
          <span>
            <span className="text-muted-foreground">Release Date (EN): </span>
            {data.meta.isUnreleased ? "Unreleased" : new Date(0).toLocaleDateString()}
          </span>
        </div>
        <Separator className="mb-4" />
        <div className="w-full aspect-video overflow-hidden">
          <img src={`https://static.closure.wiki/v1/mappreviews/${data.stage.stageId}.webp`} className="w-full h-full object-fill" />
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <Separator className="mb-2" />
        <div className="whitespace-pre-line">
          {data.stage.description.replace(/\\n/g, "\n")}
        </div>
      </section>

      {data.enemies && Object.entries(data.enemies).length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Enemies</h2>
          <Separator className="mb-2" />
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 list-disc pl-5">
              {Object.values(data.enemies).map((enemy: any) =>
                <li key={enemy.slug} className="list-disc list-item items-center gap-2 mb-1">
                  <img src={`https://static.closure.wiki/v1/enemies/${enemy.slug}.webp`} className="inline-block w-8 h-8 mr-1 align-middle" loading="lazy" decoding="async" />
                  <a href={`/en/enemies/${enemy.slug}`} className="hover:underline text-blue-600">{enemy.name}</a> x{enemy.count}
                </li>
              )}
          </ul>
        </section>
      )}
    </div>
  )
}