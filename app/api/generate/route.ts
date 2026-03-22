import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
});

export async function POST(req: NextRequest) {
  try {
    const { orgName, projectTitle, grantType, fundingAmount, focusArea, projectDescription, targetBeneficiaries, impactGoal, teamBackground } = await req.json();

    if (!orgName || !projectTitle) {
      return NextResponse.json({ error: "Organization name and project title are required" }, { status: 400 });
    }

    const prompt = `You are an expert grant writer with deep experience in nonprofit, government, and foundation funding. Generate a complete grant proposal for:

Organization: ${orgName}
Project Title: ${projectTitle}
Grant Type: ${grantType || "General Operating / Project Grant"}
Funding Amount: ${fundingAmount || "$50,000"}
Focus Area: ${focusArea || "Community development, education, social impact"}
Project Description: ${projectDescription || "Detailed description of the project"}
Target Beneficiaries: ${targetBeneficiaries || "Who this project serves"}
Impact Goal: ${impactGoal || "Measurable outcomes and impact"}
Team Background: ${teamBackground || "Organizational track record and key team members"}

Generate a complete grant proposal in this JSON format (no markdown):
{
  "projectSummary": "150-200 word executive project summary for the grant application",
  "statementOfNeed": "250-300 word statement of need — the problem, data, urgency, who is affected and how",
  "projectDescription": {
    "goals": ["Primary goal and 2-3 secondary goals"],
    "objectives": ["SMART objectives — specific, measurable, achievable, relevant, time-bound"],
    "activities": [
      {
        "activity": "Description of key activity",
        "timeline": "When it happens",
        "responsible": "Who is responsible"
      }
    ],
    "timeline": "Overall project timeline overview"
  },
  "impactStatement": "200-250 word impact statement — expected outcomes, long-term change, how you'll measure success",
  "budgetNarrative": {
    "totalBudget": "Total funding requested",
    "lineItems": [
      {
        "category": "Personnel",
        "amount": "Amount",
        "justification": "Why this cost is necessary"
      },
      {
        "category": "Equipment / Materials",
        "amount": "Amount",
        "justification": "Why this cost is necessary"
      },
      {
        "category": "Program Activities",
        "amount": "Amount",
        "justification": "Why this cost is necessary"
      },
      {
        "category": "Administration / Overhead",
        "amount": "Amount",
        "justification": "Why this cost is necessary"
      }
    ]
  },
  "organizationalBackground": "150-200 word description of ${orgName} — history, mission, past achievements relevant to this project, and capacity to deliver",
  "sustainabilityPlan": "100-150 word sustainability plan — how the project continues after grant funding ends"
}`;

    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.75,
    });

    const raw = completion.choices[0]?.message?.content || "";
    const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const data = JSON.parse(cleaned);

    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
