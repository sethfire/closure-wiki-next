import Breadcrumbs from "@/components/ui/dynamic-breadcrumb";
import { getOperations } from "@/lib/fetch-utils";
import { notFound } from "next/navigation";
import OperationsList from "@/components/operations-list";

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
    "act1bossrush_zone1",
    "act2bossrush_zone1",
    "act3bossrush_zone1",
    "act4bossrush_zone1",
    "act5bossrush_zone1",
    "act1lock_zone1",
  ];
  
  const stages = data.filter(
    (stage: any) => 
      !excludedZoneIds.includes(stage.zoneId) && 
      stage.stageType !== "CLIMB_TOWER" &&
      stage.stageType !== "GUIDE"
  );

  return (
    <div className="flex flex-1 flex-col gap-2 w-full px-4 md:px-0">
      <div>
        <div className="mb-2">
          <Breadcrumbs items={[
            { label: "Home", href: `/${lang}/home` },
            { label: "Operations" },
          ]} />
        </div>
        <h1 className="text-2xl font-semibold">Operations</h1>
      </div>
      
      <OperationsList 
        operations={stages}
        lang={lang}
      />
    </div>
  );
}