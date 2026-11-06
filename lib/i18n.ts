export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

/** A value that exists once per supported locale. */
export type Localized<T = string> = Record<Locale, T>;

export const htmlLang: Record<Locale, string> = {
  es: "es-ES",
  en: "en",
};

export const ogLocale: Record<Locale, string> = {
  es: "es_ES",
  en: "en_US",
};
