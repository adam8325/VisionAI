import React, { useState } from "react";
import { Sparkles, Link2, Search, Zap, TrendingUp, Rocket } from "lucide-react";

type Recommendation = {
  title: string;
  type: string;
  description:
    | string
    | {
        business_need: string;
        ai_solution: string;
        expected_outcome: string;
      };
};

export default function Input() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);


  const isValidUrl = (value: string) => {
    try {
      new URL(value); // native browser-validering
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!url) {
      setError("Indtast en URL først.");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Indtast en gyldig URL. F.eks. https://www.example.com");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary(null);
    setRecommendations([]);

    try {
      const res = await fetch("http://localhost:8000/api/analyze-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      console.log("API response:", data);

      if (!res.ok) throw new Error(data.detail || "Fejl ved API-kald.");

      setSummary(data.summary);
      setCompanyName(data.company_name);
      setRecommendations(data.recommendations);
      setIsDone(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const icons = [
    { icon: <Zap className="w-6 h-6"/>, color: "text-lime-400" },
    { icon: <TrendingUp className="w-6 h-6"/>, color: "text-cyan-400" },
    { icon: <Rocket className="w-6 h-6"/>, color: "text-purple-400" },
  ]

  const name = companyName ? companyName.replace(/[|–-].*$/, "").trim() : "";

  return (
    <div className="flex flex-col gap-20 w-full">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex items-center w-4/6 mx-auto justify-between gap-2 bg-gray-900 p-2 rounded-lg">
         <div className="relative w-full">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.example.com"
              className="bg-[hsl(222_47%_5%)] rounded-md pl-12 pr-3 py-2 w-full focus:border-lime-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
        <button
          onClick={handleSubmit}
          disabled={!url || isLoading}
          className={`flex items-center justify-center gap-2 font-semibold py-2 px-3 rounded-md
            ${isLoading || !url
              ? "bg-linear-to-r from-cyan-100 via-blue-200 to-indigo-300 text-gray-500 cursor-not-allowed"
              : "cursor-pointer bg-gradient-to-r from-lime-500 to-green-700 text-white hover:from-lime-600 to-emerald-700"
            }`}
        >
          <Search className="w-4 h-4" />
          {isLoading ? "Analyserer..." : "Generér"}
        </button>
      </div>
      
        <div className="w-4/6 mx-auto">
           {summary && (
            <div className="bg-gray-900 border border-stone-300 p-4 rounded-lg shadow-sm">
              <h3 className="font-bold mb-1">{name}</h3>
              <p className= "font-semibold ">{summary}</p>
            </div>
          )}   
        </div> 

        {isDone && (
          <div className="flex flex-col items-center justify-center w-4/6 mx-auto gap-4">
            <h3 className="text-shadow-sm text-xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 via-cyan-500 to-lime-300 bg-clip-text text-transparent">AI Implementerings roadmap</h3>
            <h4 className="sm:text-lg font-semibold">Skræddersyet anbefalinger til {name}</h4>
          </div>        
        )}

        <div className="flex items-start justify-center gap-6 w-full">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex flex-col gap-4 bg-gray-900 p-4 border border-stone-300 rounded-lg w-full h-150">
              <div className="flex items-center justify-between px-2">
                <div>
                  {icons.map((iconObj, idx) => i === idx && (
                    <span key={idx} className={iconObj.color}>
                      {iconObj.icon}
                    </span>
                  ))}
                </div>
                <h3 className="font-semibold text-center">{rec.type}</h3>
                <p className="text-gray-200 text-sm">#{i+1}</p>
              </div>
                
                {typeof rec.description === "string" ? (
                <p>{rec.description}</p>
                ) : (
                <div className="flex flex-col justify-between h-full px-2 py-4">
                  <div className="flex flex-col gap-6 h-2/5">
                    <p className="text-xl font-semibold">{rec.title}</p>
                    <p className="text-sm ">{rec.description.ai_solution}</p>
                  </div>
                  <div className="h-1/5">
                    <hr className="border-t-2 border-indigo-200" />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-300">Tid</p>
                      <p className="text-xs text-gray-300">Effekt</p>
                      <p className="text-xs text-gray-300">ROI</p>
                    </div>
                  </div>                   
                  <div className="h-2/5 flex flex-col gap-4">
                    <p className="text-sm "><strong>Forretningsbehov:</strong> {rec.description.business_need}</p>
                    <p className="text-sm "><strong>Forventet resultat:</strong> {rec.description.expected_outcome}</p>
                  </div>
                </div>                
                )}  
            </div>
            ))}
        </div>     
    </div>
  );  
}
