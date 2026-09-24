const asyncHandler = require("express-async-handler");
const {suggestBlogTitles} = require("../../utils/Gemini");
exports.suggestBlogTitles = asyncHandler( async (req, res) => {
	
	 const content = req.body.content;
	 if (!content) {
		 throw new Error("Content is required");
	 }
	 
	const titles = await suggestBlogTitles(content);
	 
	 
	 console.log("titles", titles);
	 res.status(200).json({
		 success: true,
		 
		 message: "titles generated successfully",
		 
		 titles: titles });
	 
	 
	
})