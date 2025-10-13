const ASSET_URL = "https://static.closure.wiki";
const VERSION = "v2";

export function getClassIcon(profession: string): string {
  return `${ASSET_URL}/${VERSION}/profession/icon_profession_${profession.toLowerCase()}.png`;
}

export function getBranchIcon(subProfession: string): string {
  return `${ASSET_URL}/${VERSION}/subprofession/sub_${subProfession.toLowerCase()}_icon.png`;
}

export function getSkillIcon(skill: string): string {
  return `${ASSET_URL}/${VERSION}/skills/skill_icon_${skill.toLowerCase()}.png`;
}

export function getFactionLogo(faction: string): string {
  return `${ASSET_URL}/${VERSION}/factions/logo_${faction.toLowerCase()}.png`;
}

export function getCharacter(id: string): string {
  return `${ASSET_URL}/${VERSION}/characters/${id}.png`;
}

export function getCharAvatar(id: string): string {
  return `${ASSET_URL}/${VERSION}/charavatars/${id}.png`;
}

export function getCharPortrait(id: string): string {
  return `${ASSET_URL}/${VERSION}/charportraits/${id}.png`;
}

export function getEnemyIcon(id: string): string {
  return `${ASSET_URL}/${VERSION}/enemies/${id}.png`;
}

export function getMapPreview(id: string): string {
  return `${ASSET_URL}/${VERSION}/mappreviews/${id}.png`;
}

export function getModuleImg(id: string): string {
  return `${ASSET_URL}/${VERSION}/modules/${id}.png`;
}

export function getCharAvatarThumbnail(id: string): string {
  return `${ASSET_URL}/${VERSION}/thumb/charavatars/${id}.webp`;
}

export function getCharPortraitThumbnail(id: string): string {
  return `${ASSET_URL}/${VERSION}/thumb/charportraits/${id}.webp`;
}

export function getMapPreviewThumbnail(id: string): string {
  return `${ASSET_URL}/${VERSION}/thumb/mappreviews/${id}.webp`;
}

export function getEnemyIconThumbnail(id: string): string {
  return `${ASSET_URL}/${VERSION}/thumb/enemies/${id}.webp`;
}

export function getModuleImgThumbnail(id: string): string {
  return `${ASSET_URL}/${VERSION}/thumb/modules/${id}.webp`;
}

export function getItemIcon(id: string): string {
  return `${ASSET_URL}/${VERSION}/items/${id}.png`;
}
