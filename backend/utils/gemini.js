const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getDoctorReply(message) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a helpful healthcare assistant doctor.

Rules:
- Greet the patient if they greet you.
- Provide general health advice based on symptoms.
- Suggest common medicines like paracetamol only when appropriate.
- Always advise consulting a real doctor if symptoms persist.

Patient message: ${message}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("Gemini error:", error);
    return "Sorry, I couldn't process your request right now.";
  }
}

module.exports = getDoctorReply;