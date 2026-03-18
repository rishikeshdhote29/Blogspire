const express= require('express');
const {createComment, deleteComment, updateComment} =require('../../controllers/Comments/commentsController');
const isLoggedIn = require("../../middlewares/isLoggedIn");

const commentRouter=express.Router();
commentRouter.post('/:postId',isLoggedIn,createComment);
commentRouter.delete('/:commentId',isLoggedIn,deleteComment);
commentRouter.put('/:commentId',isLoggedIn,updateComment);


module.exports = commentRouter;