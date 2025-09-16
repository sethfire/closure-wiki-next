import { getCharacter, getCharAvatar } from "@/lib/image-utils";
import CarouselGallery from "../carousel-gallery";

export default function OperatorGallery({ charSkins }: { charSkins: any }) {
  if (!charSkins || !Array.isArray(charSkins) || charSkins.length === 0) return null;

  const charArts: any[] = [];
  charSkins.forEach((skin: any) => {
    let skinId = skin.skinId.toLowerCase();
    let avatar = "";
    if (!skin.isBuySkin) {
      skinId = skinId.replace('@', '_').replace('#', '_');
      avatar = getCharAvatar(skin.avatarId);
    } else {
      skinId = skinId.replace('@', '_').replace('#', '%23');
      avatar = getCharAvatar(skinId);
      
    }

    let title = skin.displaySkin.skinName ?? skin.displaySkin.skinGroupName;
    if (skin.displaySkin.skinGroupId === "ILLUST_0") {
      title = `Default`;
    } else if (skin.displaySkin.skinGroupId === "ILLUST_1") {
      title = `Elite 1`;
    } else if (skin.displaySkin.skinGroupId === "ILLUST_2") {
      title = `Elite 2`;
    }

    charArts.push({
      // src: `https://static.closure.wiki/v1/characters/${skinId}.webp`,
      src: getCharacter(skinId),
      thumb: avatar.toLowerCase(),
      title: title,
      desc: `Illustrator: ${skin.displaySkin.drawerList.join(", ")}`,
      display: (skin.displaySkin.skinGroupId === "ILLUST_0") ? "object-contain" : "object-cover",
    });
  });

  return (
    <div>
      <CarouselGallery images={charArts} changeAspectonMobile={true} />
    </div>
  );
}