import { notFound } from "next/navigation";

const API_BASE_URL = "https://api.closure.wiki";
const LANG = "en";

export async function getOperators() {
  const response: any = await fetch(`${API_BASE_URL}/${LANG}/operators`);
  if (!response.ok) notFound();
  const data: any = await response.json();
  if (!data) notFound();
  return data;
}

export async function getOperator(slug: string) {
  const response: any = await fetch(`${API_BASE_URL}/${LANG}/operators/${slug}`);
  if (!response.ok) notFound();
  const data: any = await response.json();
  if (!data) notFound();
  return data;
}

export async function getEnemies() {
  const response: any = await fetch(`${API_BASE_URL}/${LANG}/enemies`);
  if (!response.ok) notFound();
  const data: any = await response.json();
  if (!data) notFound();
  return data;
}

export async function getEnemy(slug: string) {
  const response: any = await fetch(`${API_BASE_URL}/${LANG}/enemies/${slug}`);
  if (!response.ok) notFound();
  const data: any = await response.json();
  if (!data) notFound();
  return data;
}

export async function getOperations() {
  const response: any = await fetch(`${API_BASE_URL}/${LANG}/operations`);
  if (!response.ok) notFound();
  const data: any = await response.json();
  if (!data) notFound();
  return data;
}

export async function getOperation(slug: string) {
  const response: any = await fetch(`${API_BASE_URL}/${LANG}/operations/${slug}`);
  if (!response.ok) notFound();
  const data: any = await response.json();
  if (!data) notFound();
  return data;
}

export async function getModules() {
  const response: any = await fetch(`${API_BASE_URL}/${LANG}/modules`);
  if (!response.ok) notFound();
  const data: any = await response.json();
  if (!data) notFound();
  return data;
}

export async function getModule(slug: string) {
  const response: any = await fetch(`${API_BASE_URL}/${LANG}/modules/${slug}`);
  if (!response.ok) notFound();
  const data: any = await response.json();
  if (!data) notFound();
  return data;
}