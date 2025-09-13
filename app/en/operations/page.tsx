import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { getOperations } from "@/lib/fetch-utils";
import { getMapPreviewThumbnail } from "@/lib/image-utils";
import { notFound } from "next/navigation";

export const revalidate = 86400;

export default async function Page() {
  const data: any = await getOperations("en");
  if (!data) notFound();

  const stages = data.stages.sort((a: any, b: any) => {
    if (a.isUnreleased !== b.isUnreleased) return b.isUnreleased ? 1 : -1;
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 mx-auto w-full max-w-6xl">
      <div>
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/en/home">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>Operations</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mb-2 text-2xl font-semibold">Operations</h1>
        <div className="text-sm">
          <span>
            <span className="text-muted-foreground">Showing </span>
            <span>{stages.length}</span>
            <span className="text-muted-foreground"> Operations</span>
          </span>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
        {stages.map((stage: any) => (
          <a href={`/en/operations/${stage.slug}`} key={stage.slug}>
            <div className="group relative aspect-square rounded overflow-hidden">
              <img
                src={getMapPreviewThumbnail(stage.stageId)}
                className="w-full h-full object-contain transition-transform duration-150 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute left-0 right-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 text-white px-1 py-2 text-center font-semibold text-sm" style={{ 
                  textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
                }}>
                {stage.isUnreleased && <span className="text-yellow-300">[CN] </span>}
                {stage.code}: {stage.name}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}