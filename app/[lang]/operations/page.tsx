import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { getOperations } from "@/lib/fetch-utils";
import { getMapPreviewThumbnail } from "@/lib/image-utils";
import { getStageType } from "@/lib/stage-utils";
import { notFound } from "next/navigation";

export const revalidate = 86400;

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const data: any = await getOperations(lang);
  if (!data) notFound();

  const excludedZoneIds = [
    "act1multi_zone1",
    "act2vmulti_zone1",
    "act2multi_zone1",
    "act2enemyduel_zone1",
    // "act1break_zone1",
    // "act1break_zone2",
    // "act1break_zone3",
    // "act1vecb_zone1",
    // "act1vecb_zone2",
    // "act1vecb_zone3",
    "act1bossrush_zone1",
    "act2bossrush_zone1",
    "act3bossrush_zone1",
    "act4bossrush_zone1",
    "act5bossrush_zone1",
    // "act1vautochess_zone1"
    "act1lock_zone1",
  ];

  const filteredStages = data.filter(
    (stage: any) => 
      !excludedZoneIds.includes(stage.zoneId) && 
      stage.stageType !== "CLIMB_TOWER" &&
      stage.stageType !== "GUIDE"
  );

  const stages = filteredStages.sort((a: any, b: any) => {
    if (a.isUnreleased !== b.isUnreleased) return b.isUnreleased ? 1 : -1;
  });

  return (
    <div className="flex flex-1 flex-col gap-4 w-full px-4 md:px-0">
      <div>
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href={`/${lang}/home`}>Home</BreadcrumbLink></BreadcrumbItem>
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
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {stages.map((stage: any) => (
          <a href={`/${lang}/operations/${stage.slug}`} key={stage.slug}>
            <div className="group relative aspect-square rounded overflow-hidden">
              <img
                src={getMapPreviewThumbnail(stage.id)}
                className="w-full h-full object-contain transition-transform duration-150 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute left-0 right-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-2 text-left font-semibold text-white text-sm">
                <span style={{
                  textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
                }}>
                  {stage.isUnreleased && <span className="text-yellow-300">[CN] </span>}
                  {stage.code}: {stage.name}
                </span>
                <br />
                <span className="text-muted-foreground">{getStageType(stage.stageType)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}