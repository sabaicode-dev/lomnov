"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
interface TranslationContextType {
  locale: "en" | "km";
  setLocaleState: (locale: "en" | "km") => void;
  t: (key: string) => string;
}

export const TranslationContext = createContext<TranslationContextType | null>(null);

export const TranslationProvider = ({ children, dictionary }: { children: React.ReactNode; dictionary: Record<string, any> }) => {
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<"en" | "km">("en");

  useEffect(() => {
    const localeFromPath = pathname.split("/")[1];
    if (localeFromPath === "en" || localeFromPath === "km") {
      setLocaleState(localeFromPath);
    }
  }, [pathname]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value = dictionary;

    for (const k of keys) {
      if (value[k] === undefined) {
        return key; // Fallback to key if translation not found
      }
      value = value[k] as unknown as Record<string, string>;
    }

    return value as unknown as string;
  };
  return (
    <TranslationContext.Provider value={{ locale, setLocaleState, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

