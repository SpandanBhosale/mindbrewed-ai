import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        max_tokens: 700,
        temperature: 0.2
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Hmm, I couldn’t think of a reply.";

    res.status(200).json({ reply });

  } catch (err) {
    res.status(500).json({ reply: "💀 Server error: " + err.message });
  }
}
