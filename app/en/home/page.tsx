export default function Page() {
  return (
    <div className="p-8 mx-auto w-full max-w-6xl">
      <p className="text-xl mb-2">Welcome!</p>
      <p>closure.wiki is an unofficial resource archive for Arknights. This is still a work in progress, so some pages may be incomplete.</p>
      <p className="mb-4">Disclaimer: This is a hobby project and is not affiliated with Hypergryph or Yostar. All trademarks are property of their respective owners.</p>
      {/* <p>
        Contact: <a href="https://discord.gg/gY8V43aQdU" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Arknights Terra Wiki Discord</a>
      </p> */}
      
      <div className="flex justify-center mt-8">
        <img
          src="https://static.closure.wiki/v1/banner.png"
          className="max-w-md md:max-w-xl w-full h-auto"
          alt="Closure Wiki Banner"
        />
      </div>
    </div>
  )
}
