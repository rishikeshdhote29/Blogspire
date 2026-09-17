const generateTitle= require("../../utils/openai");
const asyncHandler = require("express-async-handler");
export const  suggestBlogTitles = asyncHandler( async (req, res) => {
	 const content = req.body.content;
	 if (!content) {
		 throw new Error("Content is required");
	 }
	 
	const titles = await generateTitle(content);
	 res.status(200).json({
		 success: true,
		 
		 message: "titles generated successfully",
		 
		 titles: titles });
	 
	 
	
})