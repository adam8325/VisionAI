import React, { useState } from "react";
import { Sparkles } from "lucide-react";

type Recommendation = {
  type: string;
  description:
    | string
    | {
        business_need: string;
        proposed_solution: string;
        expected_outcome: string;
      };
};

export default function Input() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!url) return alert("Indtast en URL først.");

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

      // ✅ Vis summary først
      setSummary(data.summary);

      // Efter lidt delay (eller streaming senere)
      setRecommendations(data.recommendations);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center justify-center gap-2 w-2/3">
           <label className="w-1/5 text-left font-medium">Webadresse:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.example.com"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!url || isLoading}
          className={`flex items-center justify-center gap-2 font-semibold py-2 px-3 rounded-md cursor-pointer
            ${isLoading || !url
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-linear-to-r from-cyan-300 via-blue-400 to-indigo-500 text-white hover:from-indigo-500 hover:to-purple-700"
            }`}
        >
          <Sparkles className="w-5 h-5" />
          {isLoading ? "Analyserer..." : "Generer AI-forslag"}
        </button>
      </div>

      {summary && (
        <div className="bg-linear-to-r from-cyan-100 via-blue-200 to-indigo-300 border border-stone-300 p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-black mb-1">Kort beskrivelse:</h3>
          <p className="text-black font-semibold ">{summary}</p>
        </div>
      )}

     <div className="flex items-start justify-center gap-4">
      {recommendations.map((rec, i) => (
        <div key={i} className="flex flex-col gap-4 bg-linear-to-r from-cyan-50 to-indigo-100 p-4 border border-stone-300 rounded-lg ">
            <h3 className="font-semibold text-center">{rec.type}</h3>

            {typeof rec.description === "string" ? (
            <p>{rec.description}</p>
            ) : (
            <div className="flex flex-col gap-4">
                <p><strong>Foreslået løsning:</strong> {rec.description.proposed_solution}</p>
                <p><strong>Forretningsbehov:</strong> {rec.description.business_need}</p>
                <p><strong>Forventet resultat:</strong> {rec.description.expected_outcome}</p>
            </div>
            )}  
        </div>
        ))}

      </div>
    </div>
  );  
}
