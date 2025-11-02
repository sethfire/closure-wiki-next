import Breadcrumbs from "@/components/ui/dynamic-breadcrumb";
import { getEnemies } from "@/lib/fetch-utils";
import { notFound } from "next/navigation";
import EnemiesList from "@/components/enemies-list";

export const revalidate = 86400;

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const data: any = await getEnemies(lang);
  
  if (!data) notFound();
  
  const enemies = data.filter((enemy: any) => !enemy.hideInHandbook);

  return (
    <div className="flex flex-1 flex-col gap-2 w-full px-4 md:px-0">
      <div>
        <div className="mb-2">
          <Breadcrumbs items={[
            { label: "Home", href: `/${lang}/home` },
            { label: "Enemies" },
          ]} />
        </div>
        <h1 className="text-2xl font-semibold">Enemies</h1>
      </div>
      
      <EnemiesList 
        enemies={enemies}
        lang={lang}
      />
    </div>
  );
}