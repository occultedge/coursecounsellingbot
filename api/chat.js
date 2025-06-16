export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  const { message } = req.body;

  const context = {
    name: "CourseEdge – Occultedge India",
    summary: `
<strong>🎓 Course Counselling by Occultedge</strong>
<ul>
  <li>Diplomas and Certifications in Nursing, IT, Agriculture, Education, and Healthcare</li>
  <li>UG/PG Degrees via top Indian universities (Jain, Chandigarh, MGR, DY Patil, etc.)</li>
  <li>British Online School (K–12) for African students</li>
  <li>1000+ skill courses: Fashion, Retail, Telecom, Beauty, Hotel Management, etc.</li>
  <li>India-based certified internships with practical exposure</li>
</ul>

<strong>🌍 Learning Modes:</strong>
<ul>
  <li>100% Online (Live Zoom + LMS)</li>
  <li>Hybrid (Online + Local Mentorship)</li>
  <li>Optional On-campus Training in India</li>
</ul>

<strong>🛠️ Key Features:</strong>
<ul>
  <li>Digital course delivery through our platform</li>
  <li>Academic support, live sessions, and LMS access</li>
  <li>Placement support available for many programs</li>
  <li>Internship + Certification = Better career outcomes</li>
</ul>

<strong>🎯 Who Can Apply:</strong>
<ul>
  <li>School passouts, working professionals, and career switchers</li>
  <li>International students from Africa, Asia, America</li>
</ul>

📞 <strong>Contact Counsellor:</strong>
<ul>
  <li>Email: <a href="mailto:info@occultedge.com">info@occultedge.com</a></li>
  <li>WhatsApp: <a href="https://wa.me/919953330039" target="_blank">+91 99533 30039</a></li>
</ul>
    `.trim()
  };

  const systemPrompt = `
You are <strong>CourseEdge</strong> — a friendly Course Counsellor from Occultedge India. Your job is to help students explore the right programs based on their goals.

📘 Here is what we offer:
${context.summary}

✅ Your Role:
<ul>
  <li>Explain suitable courses based on user's message</li>
  <li>Answer in a helpful, simple tone (English only)</li>
  <li>Use <strong>, <ul>, <li>, <a href=""></a> for formatting</li>
  <li>Do not mention Groq, OpenAI, LLMs, or APIs</li>
</ul>

End your message with:
<strong>“Would you like to get a recommendation or help with the admission form? 😊”</strong>
  `.trim();

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: message }
  ];

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "AI could not respond.";
    res.status(200).json({ reply });

  } catch (error) {
    console.error("❌ Chat API error:", error);
    res.status(500).json({ reply: "Server error. Please try again later." });
  }
}
