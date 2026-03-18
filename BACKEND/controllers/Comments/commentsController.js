const asyncHandler= require("express-async-handler");
const Comment = require("../../models/Comments/Comment");
const Post = require("../../models/Posts/Post");
//@desc Create a new commnet
//@route POST /api/v1/commets/:postId
//@access private

exports.createComment = asyncHandler(async (req, res) => {
	//get the post id
	 const postId = req.params.postId;
	 
	 //get the paylaod
	 const {message} = req.body;
	 //create the commnet
	const comment=await Comment.create({message,author:req?.userAuth?._id,postId});
	
	//associate comment with post
await  Post.findByIdAndUpdate(postId,{$push:{comments:comment._id}})
	
	
	res.status(201).json(
	{
		
		status:"success",
			message:"comment succesfullty created",
		comment
		
	});
	
	
})
//@desc delete  comment
//@route DELETE /api/v1/comments/:commentId
//@access private
 exports.deleteComment= asyncHandler(async(req, res) => {
	 //!Get the comment id to be deleted
	 const commentId = req.params.commentId;
	 const comment= await Comment.findByIdAndDelete(commentId);

	 res.status(200).json({
		 status:"success",
		 message:"comment successfully deleted",
		 comment
	 })
 })

//@desc Update  commnet
//@route PUT /api/v1/comments/:commentId
//@access private
 exports.updateComment= asyncHandler(async(req, res) => {
	 //!Get the comment id to be deleted
	 const commentId = req.params.commentId;
	 const message = req.body;
	 const comment= await Comment.findByIdAndUpdate(commentId,message,{new:true,runValidators:true});

	 res.status(200).json({
		 status:"success",
		 message:"comment successfully updated",
		 comment
	 })
 })