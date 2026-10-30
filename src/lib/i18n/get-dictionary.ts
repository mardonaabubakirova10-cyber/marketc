import { Locale } from "./config";
import { ru, Dictionary } from "./dictionaries/ru";
import { en } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = {
  ru,
  en,
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale] || dictionaries.ru;
}
