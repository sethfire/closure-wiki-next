import Breadcrumbs from "@/components/ui/dynamic-breadcrumb";
import { Separator } from "@/components/ui/separator";
import { getOperators } from "@/lib/fetch-utils";
import { notFound } from "next/navigation";
import OperatorsList from "@/components/operators-list";

export const revalidate = 86400;

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const data: any = await getOperators(lang);
  if (!data) notFound();

  const sortOrderResponse: any = await fetch("https://api.closure.wiki/v2/en/operators/order");
  const sortOrderMap = await sortOrderResponse.json();

  return (
    <div className="flex flex-1 flex-col gap-2 w-full px-4 md:px-0">
      <div>
        <div className="mb-2">
          <Breadcrumbs items={[
            { label: "Home", href: `/${lang}/home` },
            { label: "Operators" },
          ]} />
        </div>
        <h1 className="text-2xl font-semibold">Operators</h1>
      </div>
      
      <OperatorsList 
        characters={data}
        sortOrderMap={sortOrderMap}
        lang={lang}
      />
    </div>
  )
}