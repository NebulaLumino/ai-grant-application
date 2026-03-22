"use client";

import { useState } from "react";

const GRANT_TYPES = ["Project Grant", "General Operating Grant", "Research Grant", "Capital Grant", "Fellowship", "Government Grant"];

export default function GrantApplicationPage() {
  const [form, setForm] = useState({
    orgName: "", projectTitle: "", grantType: "Project Grant",
    fundingAmount: "", focusArea: "", projectDescription: "",
    targetBeneficiaries: "", impactGoal: "", teamBackground: "",
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  function update(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  async function generate() {
    if (!form.orgName.trim() || !form.projectTitle.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.projectSummary) setResult(data);
    } finally {
      setLoading(false);
    }
  }

  function copySection(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Nonprofit & Grant Writing Tool
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">AI Grant Application Generator</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Generate complete grant proposals — statement of need, project plan, budget narrative, and impact statement.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Organization Name *</label>
              <input value={form.orgName} onChange={(e) => update("orgName", e.target.value)}
                placeholder="Green Earth Foundation"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Project Title *</label>
              <input value={form.projectTitle} onChange={(e) => update("projectTitle", e.target.value)}
                placeholder="Urban Reforestation Initiative 2025"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Grant Type</label>
              <select value={form.grantType} onChange={(e) => update("grantType", e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                {GRANT_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Funding Amount</label>
              <input value={form.fundingAmount} onChange={(e) => update("fundingAmount", e.target.value)}
                placeholder="$50,000"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Focus Area</label>
              <input value={form.focusArea} onChange={(e) => update("focusArea", e.target.value)}
                placeholder="Environmental sustainability, youth education, healthcare access"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Project Description</label>
              <textarea value={form.projectDescription} onChange={(e) => update("projectDescription", e.target.value)}
                placeholder="Detailed description of what the project does, how it works, and why it matters..."
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" rows={3} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Target Beneficiaries</label>
              <input value={form.targetBeneficiaries} onChange={(e) => update("targetBeneficiaries", e.target.value)}
                placeholder="Low-income urban communities, ages 5-18"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Impact Goal</label>
              <input value={form.impactGoal} onChange={(e) => update("impactGoal", e.target.value)}
                placeholder="10,000 trees planted, 500 youth trained by 2026"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Team / Organizational Background</label>
              <input value={form.teamBackground} onChange={(e) => update("teamBackground", e.target.value)}
                placeholder="Founded 2015, 501(c)(3), prior grants from Ford Foundation and local government"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>

          <button onClick={generate} disabled={loading || !form.orgName.trim() || !form.projectTitle.trim()}
            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-semibold py-4 rounded-xl transition-all text-lg shadow-lg shadow-emerald-200">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Writing Proposal...
              </span>
            ) : "Generate Grant Proposal"}
          </button>
        </div>

        {result && (
          <div className="space-y-6">
            {[
              { key: "summary", title: "📝 Project Summary", content: result.projectSummary },
              { key: "need", title: "⚠️ Statement of Need", content: result.statementOfNeed },
              { key: "impact", title: "🎯 Impact Statement", content: result.impactStatement },
              { key: "org", title: "🏛️ Organizational Background", content: result.organizationalBackground },
              { key: "sustain", title: "♻️ Sustainability Plan", content: result.sustainabilityPlan },
            ].map((s) => s.content ? (
              <div key={s.key} className="bg-white rounded-2xl shadow border border-slate-200 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-slate-800">{s.title}</h3>
                  <button onClick={() => copySection(s.content, s.key)}
                    className="text-sm px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-50">
                    {copied === s.key ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">{s.content}</p>
              </div>
            ) : null)}

            {result.projectDescription && (
              <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4">🎯 Project Description</h3>
                {result.projectDescription.goals && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-emerald-600 mb-2">Goals</p>
                    {result.projectDescription.goals.map((g: string, i: number) => (
                      <p key={i} className="text-slate-700 text-sm pl-3 border-l-2 border-emerald-200 mb-1">{g}</p>
                    ))}
                  </div>
                )}
                {result.projectDescription.objectives && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-emerald-600 mb-2">SMART Objectives</p>
                    {result.projectDescription.objectives.map((o: string, i: number) => (
                      <p key={i} className="text-slate-700 text-sm pl-3 border-l-2 border-emerald-200 mb-1">{o}</p>
                    ))}
                  </div>
                )}
                {result.projectDescription.activities && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-emerald-600 mb-2">Activities</p>
                    <div className="space-y-2">
                      {result.projectDescription.activities.map((a: any, i: number) => (
                        <div key={i} className="bg-slate-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-slate-800">{a.activity}</p>
                          <p className="text-xs text-slate-400">{a.timeline} · {a.responsible}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {result.projectDescription.timeline && (
                  <div>
                    <p className="text-sm font-semibold text-emerald-600 mb-1">Timeline</p>
                    <p className="text-sm text-slate-700">{result.projectDescription.timeline}</p>
                  </div>
                )}
              </div>
            )}

            {result.budgetNarrative && (
              <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4">💰 Budget & Justification</h3>
                <p className="text-sm font-semibold text-emerald-600 mb-3">Total: {result.budgetNarrative.totalBudget}</p>
                <div className="space-y-3">
                  {result.budgetNarrative.lineItems.map((item: any, i: number) => (
                    <div key={i} className="flex gap-4 items-start border-b border-slate-100 pb-3">
                      <div className="min-w-36">
                        <p className="text-sm font-semibold text-slate-700">{item.category}</p>
                        <p className="text-lg font-bold text-emerald-600">{item.amount}</p>
                      </div>
                      <p className="text-sm text-slate-600 flex-1">{item.justification}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
