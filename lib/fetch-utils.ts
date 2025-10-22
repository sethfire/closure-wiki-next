const API_BASE_URL = "https://api.closure.wiki";

const ALLOWED_LANGS = ["en", "cn", "jp"];
const ALLOWED_TYPES = ["operators", "enemies", "operations", "modules", "items"];

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

export const getOperators = async (lang: string) => getDataItems(lang, "operators");
export const getOperator = async (lang: string, slug: string) => getDataItem(lang, "operators", slug);

export const getEnemies = async (lang: string) => getDataItems(lang, "enemies");
export const getEnemy = async (lang: string, slug: string) => getDataItem(lang, "enemies", slug);

export const getOperations = async (lang: string) => getDataItems(lang, "operations");
export const getOperation = async (lang: string, slug: string) => getDataItem(lang, "operations", slug);

export const getModules = async (lang: string) => getDataItems(lang, "modules");
export const getModule = async (lang: string, slug: string) => getDataItem(lang, "modules", slug);

export const getItems = async (lang: string) => getDataItems(lang, "items");
export const getItem = async (lang: string, slug: string) => getDataItem(lang, "items", slug);

// export const getMedals = async (lang: string) => getDataItems(lang, "medals");
// export const getMedal = async (lang: string, slug: string) => getDataItem(lang, "medals", slug);