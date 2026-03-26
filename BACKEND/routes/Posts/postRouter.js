const express = require('express');

const {createPost,fetchAllPosts} = require('../../controllers/posts/postController');
 const isLoggedIn= require('../../middlewares/isLoggedIn');
const {fetchSinglePost,deletePost,updatePost, likePost, dislikePost, clapPost, schedulePost,
 getPublicPosts, postViewCount, fetchUsersAllPosts, fetchPublicUserPosts
} = require("../../controllers/Posts/postController");
const isAccountVerified = require("../../middlewares/isAccountVerified");
const postRouter = express.Router();
const multer = require("multer");
const storage= require("../../utils/fileUpload")
const upload= multer({storage});
const postImageUpload = upload.fields([
  { name: "file", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);


postRouter.post('/',isLoggedIn,isAccountVerified,postImageUpload,createPost);
//get all post route
postRouter.get('/',isLoggedIn,fetchAllPosts);
//get all post route
postRouter.get('/my-posts',isLoggedIn,fetchUsersAllPosts);
//get all post route
postRouter.get('/public-user-posts/:userId',isLoggedIn,fetchPublicUserPosts);
// fetch 4 posts
postRouter.get('/public',getPublicPosts)
postRouter.get('/:id',fetchSinglePost);

postRouter.delete('/:id',isLoggedIn,deletePost);

postRouter.put('/:id',isLoggedIn,postImageUpload,updatePost);
//like post route
postRouter.put('/likes/:postId',isLoggedIn,likePost);

//dislike post route
postRouter.put('/dislikes/:postId',isLoggedIn,dislikePost);

//schedule  post route
postRouter.put('/schedule/:postId',isLoggedIn,schedulePost);


//claps post route
postRouter.put('/claps/:postId',isLoggedIn,clapPost);
//view count route
postRouter.put('/:postId/post-view-count',isLoggedIn,postViewCount);
module.exports = postRouter;