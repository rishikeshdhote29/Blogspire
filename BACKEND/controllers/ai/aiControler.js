const { generateTitle } = require("../../utils/openai");
const asyncHandler = require("express-async-handler");
const {suggestBlogTitles} = require("../../utils/Gemini");
exports.suggestBlogTitles = asyncHandler( async (req, res) => {
	
	 const content = req.body.content;
	console.log("content", content);
	 if (!content) {
		 throw new Error("Content is required");
	 }
	 
	const titles = await suggestBlogTitles(content);
	 res.status(200).json({
		 success: true,
		 
		 message: "titles generated successfully",
		 
		 titles: titles });
	 
	 
	
})