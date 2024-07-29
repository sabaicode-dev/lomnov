
import { IMenus } from '@/libs/types/api-menus/menu-response';

export async function fetchMenus(): Promise<IMenus[]> {
  const res = await fetch("https://lomnov.onrender.com/api/v1/menus?lang=eng");
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}
