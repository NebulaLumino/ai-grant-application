"use client";
import { useState } from "react";

function renderMarkdown(text: string) {
  return text.split("\n").map((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("# ")) return <h1 key={i} className="text-2xl font-bold text-emerald-100 mt-6 mb-3">{trimmed.replace("# ","")}</h1>;
    if (trimmed.startsWith("## ")) return <h2 key={i} className="text-xl font-bold text-white mt-7 mb-3">{trimmed.replace("## ","")}</h2>;
    if (trimmed.startsWith("### ")) return <h3 key={i} className="text-base font-bold text-emerald-300 mt-4 mb-2">{trimmed.replace("### ","")}</h3>;
    if (trimmed.startsWith("- ")) return <li key={i} className="text-slate-300 text-sm ml-4 mb-1 list-disc">{trimmed.replace("- ","")}</li>;
    if (trimmed.startsWith("| ")) return <div key={i} className="text-emerald-200 text-sm font-mono my-0.5">{trimmed}</div>;
    if (trimmed.startsWith("> ")) return <blockquote key={i} className="border-l-4 border-emerald-400 pl-4 italic text-slate-400 text-sm my-3">{trimmed.replace("> ","")}</blockquote>;
    if (trimmed === "") return <div key={i} className="h-2" />;
    return <p key={i} className="text-slate-300 text-sm leading-relaxed mb-1">{trimmed}</p>;
  });
}

export default function Home() {
  const [orgName, setOrgName] = useState("");
  const [grantType, setGrantType] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [timeline, setTimeline] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const generate = async () => {
    if (!orgName.trim()) { setError("Organization name is required."); return; }
    setLoading(true); setError(""); setResult(""); setDone(false);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgName, grantType, projectDesc, amount, timeline }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Generation failed."); return; }
      setResult(data.result); setDone(true);
    } catch { setError("Failed to connect."); }
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-950">
      <header className="border-b border-white/10 sticky top-0 z-10 bg-slate-950/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-3">
          <span className="text-3xl">📝</span>
          <div>
            <h1 className="text-xl font-bold text-white">AI Grant Application Generator</h1>
            <p className="text-xs text-slate-400">Nonprofit proposals · Foundation grants · DeepSeek</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Write Grant Proposals That Win 📝</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto mt-1">Generate a complete, compelling grant proposal with narrative, budget justification, and evaluation plan.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white font-semibold text-sm block mb-2">🏢 Organization Name *</label>
              <input value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="e.g. Green Futures Foundation"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>
            <div>
              <label className="text-white font-semibold text-sm block mb-2">🏛️ Grant Type / Funder</label>
              <input value={grantType} onChange={(e) => setGrantType(e.target.value)} placeholder="e.g. NSF Research Grant"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>
          </div>
          <div>
            <label className="text-white font-semibold text-sm block mb-2">📋 Project Description *</label>
            <textarea value={projectDesc} onChange={(e) => setProjectDesc(e.target.value)} rows={3}
              placeholder="Describe the project this grant would fund — be specific about what, who benefits, and why it matters..."
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white font-semibold text-sm block mb-2">💵 Amount Requested</label>
              <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. $50,000"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>
            <div>
              <label className="text-white font-semibold text-sm block mb-2">📅 Project Timeline</label>
              <input value={timeline} onChange={(e) => setTimeline(e.target.value)} placeholder="e.g. 18 months"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>
          </div>
          <button onClick={generate} disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2">
            {loading ? <><span className="animate-spin text-xl">⚙️</span> Writing grant proposal...</> : <><span>📝</span> Generate Grant Proposal</>}
          </button>
        </div>

        {error && <div className="bg-red-500/20 border border-red-500/40 rounded-xl px-5 py-3 text-red-300 text-sm">{error}</div>}

        {done && result && (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 bg-emerald-500/10 border-b border-emerald-500/20">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📝</span>
                <p className="text-emerald-300 font-bold text-sm">Grant Proposal: {orgName}</p>
              </div>
              <button onClick={() => navigator.clipboard?.writeText(result)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-xs border border-white/10 transition-all">
                📋 Copy All
              </button>
            </div>
            <div className="px-6 py-5">
              {renderMarkdown(result)}
            </div>
          </div>
        )}

        <p className="text-center text-xs text-slate-600">AI Grant Application Generator · {new Date().getFullYear()} · DeepSeek</p>
      </div>
    </main>
  );
}
