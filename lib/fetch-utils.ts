const API_BASE_URL = "https://api.closure.wiki";

const ALLOWED_LANGS = ["en", "cn", "jp"];
const ALLOWED_TYPES = ["operators", "enemies", "operations", "modules", "items", "outfits"];

async function getDataItems(lang: string, type: string) {
  if (!ALLOWED_LANGS.includes(lang)) return null;
  if (!ALLOWED_TYPES.includes(type)) return null;

  const response: any = await fetch(`${API_BASE_URL}/${lang}/${type}`);
  if (!response.ok) return null;
  
  const data: any = await response.json();
  return data;
}

async function getDataItem(lang: string, type: string, slug: string) {
  if (!ALLOWED_LANGS.includes(lang)) return null;
  if (!ALLOWED_TYPES.includes(type)) return null;

  const response: any = await fetch(`${API_BASE_URL}/${lang}/${type}/${slug}`);
  if (!response.ok) return null;

  const data: any = await response.json();
  return data;
}

async function getDataItemsv2(lang: string, type: string) {
  if (!ALLOWED_LANGS.includes(lang)) return null;
  if (!ALLOWED_TYPES.includes(type)) return null;

  const response: any = await fetch(`${API_BASE_URL}/v2/${lang}/${type}`);
  if (!response.ok) return null;
  
  const data: any = await response.json();
  return data;
}

async function getDataItemv2(lang: string, type: string, slug: string) {
  if (!ALLOWED_LANGS.includes(lang)) return null;
  if (!ALLOWED_TYPES.includes(type)) return null;

  const response: any = await fetch(`${API_BASE_URL}/v2/${lang}/${type}/${slug}`);
  if (!response.ok) return null;

  const data: any = await response.json();
  return data;
}

export const getOperators = async (lang: string) => getDataItemsv2(lang, "operators");
export const getOperator = async (lang: string, slug: string) => getDataItemv2(lang, "operators", slug);

export const getEnemies = async (lang: string) => getDataItemsv2(lang, "enemies");
export const getEnemy = async (lang: string, slug: string) => getDataItemv2(lang, "enemies", slug);

export const getOperations = async (lang: string) => getDataItemsv2(lang, "operations");
export const getOperation = async (lang: string, slug: string) => getDataItemv2(lang, "operations", slug);

export const getOutfits = async (lang: string) => getDataItemsv2(lang, "outfits");
export const getOutfit = async (lang: string, slug: string) => getDataItemv2(lang, "outfits", slug);

export const getModules = async (lang: string) => getDataItems(lang, "modules");
export const getModule = async (lang: string, slug: string) => getDataItem(lang, "modules", slug);

export const getItems = async (lang: string) => getDataItems(lang, "items");
export const getItem = async (lang: string, slug: string) => getDataItem(lang, "items", slug);

// export const getMedals = async (lang: string) => getDataItems(lang, "medals");
// export const getMedal = async (lang: string, slug: string) => getDataItem(lang, "medals", slug);