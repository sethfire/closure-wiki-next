export const revalidate = 86400
 
export async function generateStaticParams() {
  const chars: any[] = await fetch('https://api.closure.wiki/en/operators').then((res) => res.json())
  return chars.slice(0, 10).map((char) => ({
    slug: String(char.slug),
  }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data: any = await fetch(`https://api.closure.wiki/en/operators/${slug}`).then(
    (res) => res.json()
  )
  
  return (
    <main>
      <h1>{data.char.name}</h1>
      <p>{data.char.description}</p>
      <p>{data.char.itemUsage}</p>
      <p>{data.char.itemDesc}</p>
    </main>
  )
}