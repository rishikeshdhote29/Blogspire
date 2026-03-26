const express= require("express");
const {register,login,getProfile, blockUser, unBlockUser, unblockUser, viewOtherProfile, followingUser, unfollowingUser,
	forgotPassword, resetPassword, accountVerificationEmail, accountVerification, getPublicProfile, updateProfile
}=require("../../controllers/Users/userController");
const usersRouter=express.Router();
 const multer=require("multer")
const storage= require("../../utils/fileUpload")
const upload= multer({storage});

const isLoggedIn=require("../../middlewares/isLoggedIn");

//register route
usersRouter.post('/register',upload.single("file"),register);
//login route
usersRouter.post('/login',login);
// get profile route
usersRouter.get('/profile',isLoggedIn,getProfile);
// update profile route
usersRouter.put(
	'/update-profile',
	isLoggedIn,
	upload.any(),
	updateProfile
);
// block user route
usersRouter.put('/block/:userIdToBlock',isLoggedIn,blockUser);
//! Public Profile
usersRouter.get("/public-profile/:userId", isLoggedIn,getPublicProfile);
//unnBlock user route
usersRouter.put('/unblock/:userIdToUnblock',isLoggedIn,unblockUser);
//profile view of another user route
usersRouter.get("/view-other-profile/:userProfileId",isLoggedIn,viewOtherProfile);
//follow route
usersRouter.put("/following/:userIdToFollow",isLoggedIn,followingUser);
//unfollow route
usersRouter.put("/unfollowing/:userIdToFollow",isLoggedIn,unfollowingUser);
// forgot password route
usersRouter.post("/forgot-password",forgotPassword);
//reset password route
usersRouter.put("/reset-password/:resetToken",resetPassword)
//send account verification email send
usersRouter.put("/account-verification-email",isLoggedIn,accountVerificationEmail);
// account verification route
usersRouter.put("/verify-account/:verificationToken",accountVerification);


module.exports=usersRouter;