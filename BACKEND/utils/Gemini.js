const {GoogleGenAI}= require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
exports.suggestBlogTitles = async (content) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents:  `Generate 5 engaging titles for this blog post.

Blog:
${content}

Return only the 5 titles as a numbered list.`,
  
  });
  return response.text;
};