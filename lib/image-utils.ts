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

export function getPreviewCharAvatar(id: string): string {
  return `${ASSET_URL}/${VERSION}/preview/charavatars/${id}.png`;
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