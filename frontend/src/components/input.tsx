import { useState } from "react";
import { Link2, Search, Zap, TrendingUp, Rocket } from "lucide-react";

type Recommendation = {
  title: string;
  type: string;
  impact: string;
  time_estimate: string;
  roi: string;
  description:
    | string
    | {
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
  const [branch, setBranch] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
    setBranch(null);
    setIsDone(false);

    try {
      const res = await fetch(`${API_BASE}/api/analyze-url`, {
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
      setBranch(data.branch);
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

   const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="w-24 h-24 border-8 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
        <p className="text-xl font-semibold tracking-wide animate-pulse bg-linear-to-r from-cyan-100 via-blue-200 to-indigo-300 bg-clip-text text-transparent">
          Analyserer data...
        </p>
      </div>
    </div>
  );

  const name = companyName ? companyName.replace(/[|–-].*$/, "").trim() : "";

  return (

  <div className="flex flex-col gap-20 w-full">
    {error && <p className="text-red-500 text-center">{error}</p>}

    {/* URL input + knap */}
    <div className="flex items-center w-4/6 mx-auto justify-between gap-2 bg-gray-900 p-2 rounded-lg">
      <div className="relative w-full">
        <Link2 className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.example.com"
          className="bg-[hsl(222_47%_5%)] rounded-md pl-8 sm:pl-12 pr-3 py-1 sm:py-2 w-full focus:border-lime-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!url || isLoading}
        className={`flex items-center text-[10px] sm:text-lg justify-center gap-2 font-semibold py-1 px-2 sm:py-2 sm:px-3 rounded-md
          ${isLoading || !url
            ? "bg-gray-600 text-gray-500 cursor-not-allowed"
            : "cursor-pointer bg-linear-to-r from-cyan-100 via-blue-200 to-indigo-300 text-gray-900 hover:from-cyan-300 to-emerald-900"
          }`}
      >
        <Search className="hidden sm:inline w-4 h-4" />
         Analyser
      </button>
    </div>

    {/* Loading eller resultat */}
    {isLoading ? (
      <LoadingSpinner />
    ) : (
      <>
        {/* Opsummering */}
        <div className="w-4/6 mx-auto">
          {summary && (
            <div className="flex flex-col gap-6 bg-gray-900 border border-stone-800 p-4 rounded-lg shadow-sm">
              <div className="flex gap-2 flex-row items-center justify-between">
                <h3 className="font-bold text-md sm:text-xl mb-1">{name}</h3>
                <label className="bg-blue-200 text-gray-900 text-[10px] sm:text-sm rounded-2xl py-1 px-2.5">{branch}</label>
              </div>              
              <p className="font-semibold text-sm sm:text-md">{summary}</p>
            </div>
          )}
        </div>

        {/* Roadmap titel */}
        {isDone && (
          <div className="flex flex-col items-center text-center justify-center w-4/6 mx-auto gap-4">
            <h3 className="text-shadow-sm text-xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 via-cyan-500 to-lime-300 bg-clip-text text-transparent">
              AI Implementerings roadmap
            </h3>
            <h4 className="sm:text-lg font-semibold">
              Skræddersyet anbefalinger til {name}
            </h4>
          </div>
        )}

        {/* Anbefalinger */}
        <div className="flex flex-col sm:flex-row items-start justify-center gap-8 mx-auto w-3/4 sm:w-full h-full">
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className="group flex flex-col gap-4 bg-gray-900 p-4 border border-stone-800 rounded-lg w-full h-140 sm:h-160
              transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:border-lime-400 "
            >
              <div className="flex items-center justify-between px-2">
                <div>
                  {icons.map(
                    (iconObj, idx) =>
                      i === idx && (
                        <span key={idx} className={iconObj.color}>
                          {iconObj.icon}
                        </span>
                      )
                  )}
                </div>
                <h3 className="font-semibold text-center">{rec.type}</h3>
                <p className="text-gray-200 text-sm">#{i + 1}</p>
              </div>

              {typeof rec.description === "string" ? (
                <p>{rec.description}</p>
              ) : (
                <div className="flex flex-col justify-between px-1.5 py-4 h-full">
                  {/* Øverste sektion – titel og beskrivelse */}
                  <div className="flex flex-col gap-2 sm:gap-6 h-3/6 sm:h-4/7">
                    <p className="text-xl font-semibold transition-colors duration-300 group-hover:text-lime-400 h-1/3">
                      {rec.title}
                    </p>
                    <p className="text-[13px] sm:text-sm h-2/3">{rec.description.ai_solution}</p>
                  </div>

                  {/* Midtersektion – tid, effekt, ROI */}
                  <div className="h-1/6 sm:h-1/7 mt-10">
                    <hr className="border-t border-gray-500" />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex flex-col justify-center gap-1">
                        <p className="text-[10px] sm:text-xs text-gray-400">Tid</p>
                        <p className="text-xs sm:text-sm text-white font-semibold">
                          {rec.time_estimate}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center gap-1">
                        <p className="text-[10px] sm:text-xs text-gray-400">Effekt</p>
                        <p className="text-xs sm:text-sm text-white font-semibold">
                          {rec.impact}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center gap-1">
                        <p className="text-[10px] sm:text-xs text-gray-400">ROI</p>
                        <p className="text-xs sm:text-sm text-white font-semibold">
                          {rec.roi}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Nederste sektion – outcomes */}
                  <div className="flex flex-col gap-4 justify-center h-1/6 sm:h-2/7">
                    <ul className="list-disc list-inside mt-1 space-y-1 marker:text-lime-400 text-gray-200 text-xs sm:text-sm">
                      {Array.isArray(rec.description.expected_outcome) ? (
                        rec.description.expected_outcome.map(
                          (item: string, idx: number) => <li key={idx}>{item}</li>
                        )
                      ) : (
                        <li>{rec.description.expected_outcome}</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);
}
