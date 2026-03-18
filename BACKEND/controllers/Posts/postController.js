const asyncHandler = require("express-async-handler")
const Post = require("../../models/Posts/Post")
const User = require("../../models/Users/User")
const Category = require("../../models/Categories/Category")

//@desc Create a new post
//@route POST /api/v1/post
//@access private
exports.createPost = asyncHandler(async (req, res, next) => {
	//Get the paylaod
	const {title,content,categoryId}= req?.body;
	const uploadedFile = req.file || req.files?.file?.[0] || req.files?.image?.[0];

	if (!title || !content || !categoryId) {
		return res.status(400).json({
			status: "failed",
			message: "title, content and categoryId are required",
		});
	}

	if (!uploadedFile?.path) {
		return res.status(400).json({
			status: "failed",
			message: "Image is required. Send multipart/form-data with field name 'file' (or 'image').",
		});
	}

	//Check if the post is present
	const isPresent =await Post.findOne({title});
	if (isPresent) {
		let error= new Error("post is already present");
		next(error);
		return;

	}

	//Create the post object
	const postCreated= await Post.create({
		title,
		content,
		category: categoryId,
		author: req?.userAuth?._id,
		image: uploadedFile.path,
	});
	//Update user by adding post in it
	await User.findByIdAndUpdate(req?.userAuth?._id,{$push:{posts:postCreated._id}});
	//Update category adding post in it
	await Category.findByIdAndUpdate(categoryId,{$push:{posts:postCreated._id}});



	//send the response
	
	res.json({
		status:"success",
		message:"Post successfully added",
		// postCreated,


	})
})
//@desc fetch all  posts
//@route GET /api/v1/posts
//@access private

exports.fetchAllPosts=asyncHandler(async(req,res,next)=>{
	//get the current user id
	const currentUserId=req?.userAuth?._id;
	//get the current time
	const currentTime=Date.now();
	
	//Get all those users who have blocked the current users
	const userBlokingCurrentUser=  await User.find({blockedUser:currentUserId});
	
	// extract the id ofte user who have blocked the current user
	
	const blokingUsersId=userBlokingCurrentUser.map((userObj)=>userObj._id);

	const query={author:{$nin:blokingUsersId},$or:[{scheduledPublished:{$lte:currentTime},scheduledPublished:null}]};
	//fetch those posts who author is not availble in blockingUsersId
	 const allPosts=	await Post.find(query).populate({
		 path:"author",
		 model:"User",
		 select:"email username role "
	 }).populate({
		 path:"category",
		 model:"Category",
		 select:"name ",
		 
	 });
	 //
	 res.json({
		 status:"success",
		 message:"All posts have been successfully",
		allPosts
	 })


})
//@desc fetch all  posts
//@route GET /api/v1/posts
//@access private

exports.fetchUsersAllPosts=asyncHandler(async(req,res,next)=>{
	//get the current user id
	const currentUserId=req?.userAuth?._id;
	//get the current time
	const currentTime=Date.now();
	
	
	

	//fetch those posts who author is not availble in blockingUsersId
	 const allPosts=	await Post.find({author:currentUserId}).populate({
		 path:"author",
		 model:"User",
		 select:"email username role "
	 }).populate({
		 path:"category",
		 model:"Category",
		 select:"name ",
		 
	 });
	 //
	 res.json({
		 status:"success",
		 message:"All posts have been successfully",
		allPosts
	 })


})
//@desc fetch single  post
//@route GET /api/v1/post/:id
//@access Public
exports.fetchSinglePost = asyncHandler(async (req, res, next) => {
	const postId = req.params.id;
	const post = await Post.findById(postId).populate("author").populate("category").populate({
    path: "comments",
    populate: {
      path: "author",
      model: "User",select:('-password')
    }
  });
	if (post) {
		
		
		res.json({
			status: "success",
			message: "Post fetched successfully",
			post: post
		})
	}
	 else {
		res.json({
			status: "success",
			message: "no post availble for given id",
		})
	
	
	}
})
//@desc delete posts
//@route DELETE /api/v1/post/:id
//@access private

exports.deletePost = asyncHandler(async (req, res, next) => {
	const postId = req.params.id;
	//fetch post details form Db
	const  post= await Post.findById(postId);
	const isAuthor=req.userAuth?._id?.toString()==post?.author?._id.toString();
	if(!isAuthor){
		return res.status(400).json({
			status: "failed",
			message:"this is user is not authorized to delete this post"
		})
	}
	const postIsDeleted = await Post.findByIdAndDelete(postId);
	if (post) {
		
		
		res.json({
			status: "success",
			message: "Post Deleted successfully",
			post: postIsDeleted
		})
	}
	 else {
		res.json({
			status: "success",
			message: "no post availble for given id",
		})
	
	
	}
})

//@desc update  posts
//@route PUT /api/v1/post/:id
//@access private

exports.updatePost = asyncHandler(async (req, res, next) => {
	//get id from params
	const postId = req.params.id;
	//get the post obj
	const {title,category,content}=req.body;
	const postFound= await Post.findById(postId);
	if (!postFound) {
		throw new Error(`post not found`);
		
	}
	
	//updating the post
	const updatedPost = await Post.findByIdAndUpdate(postId, {
		image:req.file?.path ? req.file?.path : postFound.image,
		title:title?title:postFound.title,
		category:category?category:postFound.category,
		content: content? content:postFound.content,
	},{new:true,runValidators:true});

		
		
		res.json({
			status: "success",
			message: "Post updaed successfully",
			updatedPost
		})
	
})


//@desc liking a Post
//@ route PUT /api/v1/posts/like/:postId
//@access Private

exports.likePost = asyncHandler(async (req, res, next) => {
  //Get the id of the post
  const { postId } = req.params;
  //get the login user
  const CurrUserId = req.userAuth._id;
  // Find the post
  const post = await Post.findById(postId);
  if (!post) {
    let error = new Error("Post not found");
    next(error);
    return;
  }

  // Check if user already liked
  const alreadyLiked = post.likes.includes(CurrUserId);
  let updatedPost;

  if (!alreadyLiked) {
    // Add like and remove dislike if present
    post.likes.push(CurrUserId);
    post.dislikes = post.dislikes.filter(
      (dislike) => dislike.toString() !== CurrUserId.toString()
    );

	await post.save();
  }

  updatedPost = await Post.findById(postId)
	.populate({})
	.populate("category");

  res.status(200).json({
	  status: "success",
    message: "Post Like Successfully!",
	post: updatedPost,
  });
});

//@desc DisLike a post
//@route PUT /api/v1/posts/dislikes/:postId
//@access private
exports.dislikePost= asyncHandler(async(req,res,next)=>{
	const postId = req.params.postId;
	//get the current user
	const currentUser=req.userAuth._id;
	const post=await Post.findById(postId);
	if(!post){
		let error = new Error("post does not exist");
		next(error);
		return;
	}
	//Add the currentUserId to dislikers array
	if (!post.dislikes.includes(currentUser)) {
		post.dislikes.push(currentUser);
	}
	// remove the current user id form like array if available
	post.likes=post.likes.filter((userId)=>{
		return userId.toString()!==currentUser.toString();
	});
	await post.save();
	const updatedPost = await Post.findById(postId)
		.populate({
      path: "author",
      model: "User",select:('-password')
    })
		.populate("category");
	res.json({
		status:"success",
		message:"post disliked succesfully",
		post:updatedPost
	})
})
//@desc clap a post
//@route PUT /api/v1/posts/claps/:postId
//@access private

exports.clapPost= asyncHandler(async(req,res,next)=>{
	const postId = req.params.postId || req.params.postid;
	//get the current user
	const post=await Post.findById(postId);
	if(!post){
		let error = new Error("post does not exist");
		next(error);
		return;
	}
	// implemets claps
	post.claps = (post.claps || 0) + 1;
	await post.save();
	const updatedPost = await Post.findById(postId)
		.populate({
      path: "author",
      model: "User",select:('-password')
    })
		.populate("category");

	res.json({
		status:"success",
		message:"post claps succesfully",
		post:updatedPost
	})
})
//@desc  shecduling  the post
//@route PUT /api/v1/posts/schedule/:postId
//access private
exports.schedulePost= asyncHandler(async(req,res,next)=>{
	//get the data
	const postId = req.params.postId;
	const {scheduledPublish}=req?.body;
	//check if postId and scheduledPublish are present
	if(!postId || !scheduledPublish) {
		let error = new Error("post Id and scheduled date are required");
		next(error);
		return ;
	}
	//Find the post from DB
	const post =await Post.findById(postId);
	if(!post) {
		let error = new Error("post not found");
		next(error);
		return;
	}
	// check if the currentUseris the authoe
	if (post.author.toString()!==req.userAuth._id.toString()){
		let error = new Error("you can only schedule only  your post");

	}
	
	const scheduleDate= new Date(scheduledPublish);
	const currentDate= new Date();
	if(scheduleDate<currentDate){
		let error = new Error("scheduled date can not be previous date");
		next(error);
		return ;
		
	}
	post.scheduledPublished=scheduleDate;
	await post.save();
	res.json({
		status:"success",
		message:"post scheduled succesfully",
		post
	})
	
})

//@desc Get only 4 posts
//@route GET /api/v1/posts/public
//@access PUBLIc

exports.getPublicPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
	.limit(4)
	.populate("category")
	.populate({ path: "author", model: "User", select: "username email role profilePicture" });
  res.status(201).json({
    status: "success",
    message: "Posts successfully fetched",
    posts,
  });
});


//@desc view post count
//@ route PUT /api/v1/posts/:postId/post-view-count
//@access Private

exports.postViewCount = asyncHandler(async (req, res, next) => {
  //Get the id of the post
  const { postId } = req.params;
  //get the login user
  const currUserId = req.userAuth._id;
  // Find the post
  const post = await Post.findById(postId);
  if (!post) {
    let error = new Error("Post not found");
    next(error);
    return;
  }

  const updatedPost = await Post.findByIdAndUpdate(
  postId,
  { $addToSet: { postViews: currUserId } },
  { new: true }
)
	
  

  res.status(200).json({
	  status: "success",
    message: "Post viewed Successfully!",
	post: updatedPost
  });
});