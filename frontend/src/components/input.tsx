import React, { useState } from "react";
import { Sparkles } from "lucide-react";

export default function Input() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!url) return alert("Indtast en URL først.");

    setIsLoading(true);
    setError(null);
    setSummary(null);
    setRecommendations(null);

    try {
      const res = await fetch("http://localhost:8000/api/analyze-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

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
    <div className="flex flex-col gap-6 w-2/4">
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex items-center justify-between gap-4">
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
        className={`flex items-center justify-center gap-2 font-semibold py-2 px-3 rounded-md 
          ${isLoading || !url
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-400 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-700"
          }`}
      >
        <Sparkles className="w-5 h-5" />
        {isLoading ? "Analyserer..." : "Generer AI-forslag"}
      </button>

      {/* ✅ Kort beskrivelse vises straks */}
      {summary && (
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-1">Kort beskrivelse:</h3>
          <p className="text-gray-700 text-sm">{summary}</p>
        </div>
      )}

      {/* 💡 AI-anbefalinger vises efter analyse */}
      {recommendations && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-2">AI-anbefalinger:</h3>
          <p className="whitespace-pre-line text-gray-700 text-sm">{recommendations}</p>
        </div>
      )}
    </div>
  );
}
