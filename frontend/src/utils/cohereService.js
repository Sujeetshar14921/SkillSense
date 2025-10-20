import cohere from "cohere-ai";
cohere.init(process.env.COHERE_API_KEY);

/**
 * 🧠 Analyze or Chat with AI in structured format
 */
export async function analyzeResume(text) {
  try {
    const structuredPrompt = `
You are a professional ATS and resume analysis assistant.
Always respond in this exact format:

📄 Resume Analysis Report

🧠 Summary:
<Write a 2-3 line summary about the resume>

📊 ATS Score: <Give a score between 0–100>

✅ Strengths:
• <List 3-4 strengths>

⚠️ Areas to Improve:
• <List 3-4 weaknesses or suggestions>

💡 Suggestions:
<Give specific improvements or formatting tips>

Now analyze this resume text below:
"${text}"
`;

    const response = await cohere.chat({
      model: "command-r", // ✅ Updated working model
      message: structuredPrompt,
      temperature: 0.7,
    });

    const reply = response.text || response.message?.content || "No response";

    // ✅ Extract score (number) if found
    const scoreMatch = reply.match(/(\d{1,3})%?/);
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 70;

    return {
      reply,
      score,
      details: { raw: reply },
    };
  } catch (err) {
    console.error("❌ Cohere AI Error:", err);
    throw err;
  }
}
