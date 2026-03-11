const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function generateSummary(data) {
  const dataString = JSON.stringify(data);

  const completion = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      {
        role: "system",
        content:
          "You are a senior business analyst. Write executive-level narrative summaries of sales data. Be specific with numbers. Be concise. Use clear sections: Overview, Key Performers, Concerns, Recommendations. No bullet points — write in flowing professional prose.",
      },
      {
        role: "user",
        content: `Here is the sales data in JSON format: ${dataString}. Write a professional summary suitable for executive leadership.`,
      },
    ],
    temperature: 0.4,
    max_tokens: 2048,
  });

  return completion.choices[0].message.content;
}

module.exports = generateSummary;
