import { TranslationContext } from "@/context/translationProvider";
import { useContext } from "react";

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
