import { Sparkles, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";


export default function Header() {

    const { i18n, t } = useTranslation();

    const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "da" ? "en" : "da");
    };

    return (
      <header className="sm:pt-10 pt-4 sm:w-4/6 w-5/6">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="grid grid-cols-[.1fr_auto_auto] items-center justify-between w-full">
            <p></p>
            <div className="flex items-center justify-center gap-2.5">
              <Sparkles className="sm:w-10 sm:h-10 text-sky-100"/>
              <h1
                  className="text-shadow-sm text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-100 via-cyan-300 to-sky-500 bg-clip-text text-transparent"
                >
                  VisionAI
              </h1>
            </div>            
            <div>
              <button
                onClick={toggleLanguage}
                className="sm:text-xs text-[10px] flex items-center justify-center gap-1 bg-gray-800 px-1 py-1 sm:w-17 rounded-md cursor-pointer hover:bg-gray-700 transition-colors duration-200"
              >
                <Globe className="size-3" />
                {i18n.language === "da" ? "Dansk" : "English"}
              </button>
            </div>
          </div>
                  
        <div className="text-center">
          <h2 className="font-bold text-md sm:text-xl">
            {i18n.language === "da"
              ? t("intro")
              : t("intro")}
          </h2>
        </div>
          
        </div>
      </header>
    
    )
}