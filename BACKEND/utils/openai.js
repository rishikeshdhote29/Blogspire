
const {OpenAI} = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
exports.generateTitle= async (content) => {
const response = await openai.responses.create({
    model: "gpt-5.6-luna",
    input: `Generate 5 engaging titles for this blog post.

Blog:
${content}

Return only the 5 titles as a numbered list.`,
  });
return response;
}