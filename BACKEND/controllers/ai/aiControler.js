const asyncHandler = require("express-async-handler");
const {suggestBlogTitles,ContentSummary} = require("../../utils/Gemini");
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

exports.postSummary= asyncHandler(async(req,res)=>{
 const postId = req.params.id;
 
 if(!postId){
	 throw new Error (" poist  is required");
	 
}
 const summary= await ContentSummary(postId);
 res.status(200).json({
	success: true,
	 message :" summary is  generated",
	 
	summary
 })
 
	
	
})