import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./components/languages/en-translation.json";
import da from "./components/languages/da-translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    da: { translation: da }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;