export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 w-full px-4 md:px-0">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Welcome!</h2>
        <p>closure.wiki is an unofficial resource archive for Arknights. This is still a work in progress, so some pages may be incomplete.</p>
        <p>Disclaimer: This is a hobby project and is not affiliated with Hypergryph or Yostar. All trademarks are property of their respective owners.</p>
        <br/>
        <p>If there are any issues, feel free to ping me @sethfire (Closure) on the RIHQ discord (
          <a href="https://discord.gg/rihq" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            https://discord.gg/rihq
          </a>
        ) in the #aceship-toolbox channel</p>
      </div>
      
      {/* <div className="flex justify-center mb-8">
        <img
          src="https://static.closure.wiki/v1/banner.png"
          className="max-w-md md:max-w-xl w-full h-auto"
        />
      </div> */}

      <div>
        <h2 className="text-lg font-semibold mb-2">Navigation</h2>
        <ul className="list-disc pl-5">
          <li><a href="/en/operators" className="text-blue-600 hover:underline">Operators</a></li>
          <li><a href="/en/enemies" className="text-blue-600 hover:underline">Enemies</a></li>
          <li><a href="/en/operations" className="text-blue-600 hover:underline">Operations</a></li>
          <li><a href="/en/modules" className="text-blue-600 hover:underline">Modules</a></li>
          <li><a href="/en/gallery/images" className="text-blue-600 hover:underline">Story Image Gallery</a></li>
          <li><a href="/en/gallery/backgrounds" className="text-blue-600 hover:underline">Story BG Gallery</a></li>
        </ul> 
      </div>
    </div>
  )
}
