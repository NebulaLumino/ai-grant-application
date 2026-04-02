"use client";

import { useState } from "react";

const ACCENT = "green";

export default function GrantApplicationGenerator() {
  const [form, setForm] = useState({
    agencyProgram: "",
    applicantOrg: "",
    projectDescription: "",
    fundingAmount: "",
    deadline: "",
    eligibility: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "user",
              content: `You are an expert government grant writer. Generate a complete grant application package.\n\nFUNDING AGENCY/PROGRAM: ${form.agencyProgram}\nAPPLICANT ORGANIZATION: ${form.applicantOrg}\nPROJECT DESCRIPTION: ${form.projectDescription}\nFUNDING AMOUNT REQUESTED: ${form.fundingAmount}\nAPPLICATION DEADLINE: ${form.deadline}\nELIGIBILITY REQUIREMENTS: ${form.eligibility}\n\nGenerate the following clearly labeled sections:\n1. GRANT APPLICATION NARRATIVE (4-5 paragraphs: statement of need, project goals, methodology/approach, evaluation plan, sustainability)\n2. BUDGET JUSTIFICATION (line-item budget narrative explaining each cost category and how it directly supports the project)\n3. WORK PLAN / TIMELINE (12-month work plan with major milestones and deliverables)\n4. EVALUATION CRITERIA RESPONSE (address each evaluation criterion listed by the agency with specific responses)\n5. SF-424 NOTES (guidance and tips for completing the SF-424 federal grant application form fields)\n\nUse formal, compelling grant-writing language. Be specific and evidence-based.`,
            },
          ],
          max_tokens: 3000,
          temperature: 0.7,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setOutput(data.choices?.[0]?.message?.content || "No output received.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const accentStyles: Record<string, { border: string; bg: string; text: string; heading: string; gradient: string }> = {
    green: { border: "border-green-500", bg: "bg-green-500/10", text: "text-green-300", heading: "text-green-400", gradient: "linear-gradient(to right, #16a34a, #15803d)" },
    blue: { border: "border-blue-500", bg: "bg-blue-500/10", text: "text-blue-300", heading: "text-blue-400", gradient: "linear-gradient(to right, #2563eb, #1d4ed8)" },
    violet: { border: "border-violet-500", bg: "bg-violet-500/10", text: "text-violet-300", heading: "text-violet-400", gradient: "linear-gradient(to right, #7c3aed, #6d28d9)" },
    amber: { border: "border-amber-500", bg: "bg-amber-500/10", text: "text-amber-300", heading: "text-amber-400", gradient: "linear-gradient(to right, #d97706, #b45309)" },
    rose: { border: "border-rose-500", bg: "bg-rose-500/10", text: "text-rose-300", heading: "text-rose-400", gradient: "linear-gradient(to right, #e11d48, #be123c)" },
    teal: { border: "border-teal-500", bg: "bg-teal-500/10", text: "text-teal-300", heading: "text-teal-400", gradient: "linear-gradient(to right, #0d9488, #0f766e)" },
    cyan: { border: "border-cyan-500", bg: "bg-cyan-500/10", text: "text-cyan-300", heading: "text-cyan-400", gradient: "linear-gradient(to right, #0891b2, #0e7490)" },
    orange: { border: "border-orange-500", bg: "bg-orange-500/10", text: "text-orange-300", heading: "text-orange-400", gradient: "linear-gradient(to right, #ea580c, #c2410c)" },
    pink: { border: "border-pink-500", bg: "bg-pink-500/10", text: "text-pink-300", heading: "text-pink-400", gradient: "linear-gradient(to right, #db2777, #be185d)" },
  };

  const s = accentStyles[ACCENT];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${s.heading} mb-2`}>
            💰 AI Grant Application Generator
          </h1>
          <p className="text-gray-400">
            Generate complete grant application packages including narratives, budgets, and
            SF-424 guidance — powered by DeepSeek.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Funding Agency / Program</label>
              <input
                name="agencyProgram"
                value={form.agencyProgram}
                onChange={handleChange}
                placeholder="e.g., EPA Environmental Justice Grants"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Applicant Organization</label>
              <input
                name="applicantOrg"
                value={form.applicantOrg}
                onChange={handleChange}
                placeholder="e.g., Green Valley Community Alliance"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Funding Amount Requested</label>
              <input
                name="fundingAmount"
                value={form.fundingAmount}
                onChange={handleChange}
                placeholder="e.g., $250,000"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Application Deadline</label>
              <input
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                placeholder="e.g., May 15, 2026"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Project Description</label>
            <textarea
              name="projectDescription"
              value={form.projectDescription}
              onChange={handleChange}
              placeholder="Describe your project goals, activities, target population, and expected outcomes..."
              rows={4}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Eligibility Requirements</label>
            <textarea
              name="eligibility"
              value={form.eligibility}
              onChange={handleChange}
              placeholder="List the eligibility requirements from the funding announcement..."
              rows={3}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ background: loading ? "#374151" : s.gradient }}
            className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Generating..." : "Generate Grant Application Package"}
          </button>

          {error && (
            <div className="border border-red-500 bg-red-500/10 text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </form>

        {output && (
          <div className={`border ${s.border} ${s.bg} rounded-xl p-6`}>
            <h2 className={`text-xl font-bold ${s.heading} mb-4`}>Generated Output</h2>
            <pre className="whitespace-pre-wrap text-gray-200 text-sm font-mono leading-relaxed">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
