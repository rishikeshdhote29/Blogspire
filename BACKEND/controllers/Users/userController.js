const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generateToken");
const User = require("../../models/Users/user")
const asyncHandler = require("express-async-handler");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const sendAccountVerificationEmail = require("../../utils/sendAccountVerificationEmail");
//@desc Regsiter new user
//@route POST /api/v1/users/register
//@access public

const saltRounds = 10;

exports.register = asyncHandler(async (req, res, next) => {
	
	const { name, username, password, email } = req.body;
	const userObj = await User.findOne({username}).select("-password");
	if (userObj) {
		throw new Error("User already exists");
	}
	const newUser = new User({
		name,
		username,
		email,
		password
	})
	const salt = await bcrypt.genSalt(10);
	
	newUser.password = await bcrypt.hash(password, salt);
	await newUser.save();
	res.json({
		status: "success",
		message: "user resgistered succesfully",
		
		_id: newUser?.id,
		name: newUser?.name,
		username: newUser?.username,
		email: newUser?.email,
		
	})
	
	
})


//@desc login  user
//@route POST /api/v1/users/login
//@access public
exports.login = asyncHandler(async (req, res, next) => {
	
	
	const {username, password} = req.body;
	if (!username || !password) {
		throw new Error("invalid credentials");
	}
	const user = await User.findOne({username});
	if (!user) {
		throw new Error("invalid credentials");
	}
	if (!user.password) {
		throw new Error("invalid credentials");
	}
	
	
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw new Error("invalid credentials");
		
	}
	user.lastLogin = new Date()
	await user.save();
	res.json({
		status: "success",
		email: user?.email,
		username: user?.username,
		role: user?.role,
		token: generateToken(user),
		profilePicture:user?.profilePicture,
		_id:user?._id
		
	})
	
	
})
//@desc profile view
//@route POST /api/v1/users/profile/:id
//@access private

exports.getProfile = asyncHandler(async (req, res, next) => {
		
		
		const user = await User.findById(req.userAuth.id).select("-password -passwordResetToken").populate({
			path:"posts",
			model:"Post"
		}).populate({
			path:"following",
			model:"User",
			select:"name profilePicture  title"
		}).populate({
			path:"followers",
			model:"User",
			select:"name profilePicture  title"
			
		}).populate({
			path:"blockedUser",
			model:"User",
			select:"name profilePicture  title"
		}).populate({
			path:"profileViewers",
			model:"User",
			select:"name profilePicture  title"
		})
		res.json({
			status: "success",
			message: "Profile fetched",
			user
		})
	}
)


//@desc Block  User
// @route PUT /api/v1/users/block/userIdToBlock
//@access private
exports.blockUser = asyncHandler(async (req, res, next) => {
	//Find the userId to  be blocked
	const userIdToBlock = req.params.userIdToBlock;
	//check whether  the uesr is present in DB or not
	const userToBlock = await User.findById(userIdToBlock).select("-password");
	if (!userToBlock) {
		let error = new Error("User not found");
		next(error);
		return;
		
	}
	// Get the current user id
	const userBlocking = req?.userAuth?._id;
	
	// check if it is self blocking
	if (userBlocking.toString() === userIdToBlock.toString()) {
		const error = new Error("can not block yourself")
		next(error);
		return;
		
		
	}
	//get the current user  object form DB
	const currentUser = await User.findById(userBlocking).select("-password");
	//check whether the uyserIdToBlock is already blocked
	if (currentUser.blockedUser.includes(userIdToBlock)) {
		const error = new Error("user aleardy blocked")
		
		next(error);
		return;
		
	}
	
	//push the user to bne blockedn the blockedUser array
	currentUser.blockedUser.push(userIdToBlock);
	await currentUser.save();
	res.json({
		status: "success",
		message: "User blocked succesfully"
	})
	
})
//@desc UnBlock  User
// @route PUT /api/v1/users/unblock/userIdToUnblock
//@access private

exports.unblockUser = asyncHandler(async (req, res, next) => {
	//Find the userId to  be unBlocked
	const userIdToUnblock = req.params.userIdToUnblock;
	//check whether  the uesr is present in DB or not
	const userToUnblock = await User.findById(userIdToUnblock).select("-password");
	
	if (!userToUnblock) {
		let error = new Error("User not found");
		next(error);
		return;
		
	}
	// Get the current user id
	const userUnblocking = req?.userAuth?._id;
	
	//get the current user  object form DB
	const currentUser = await User.findById(userUnblocking).select("-password");
	//check wheter the user is blocked is not
	const isAvailable = currentUser.blockedUser.includes(userIdToUnblock);
	if (!isAvailable) {
		const error = new Error("user is not blocked")
		
		next(error);
		return;
		
	}
	
	//Remove the user from blockedUser array using filter to handle ObjectId comparison
	currentUser.blockedUser = currentUser.blockedUser.filter(
		id => id.toString() !== userIdToUnblock
	);
	
	await currentUser.save();
	res.json({
		status: "success",
		message: "User Unblocked succesfully"
	})
	
})
//@desc View another user profile
// @route GET /api/v1/users/view-other-profile/:userProfileId
//@access private
exports.viewOtherProfile = asyncHandler(async (req, res, next) => {
	//get the userId whose profile is to be views
	
	const userProfileId = req.params.userProfileId;
	
	const userProfile = await User.findById(userProfileId).select("-password");
	
	if (!userProfile) {
		let error = new Error("User not found");
		next(error);
		return;
		
	}
	//geting the current user
	const currentUserId = req?.userAuth?._id;
	// chewck if we have already view the profle of userProfile
	if (userProfile.profileViewers.includes(currentUserId)) {
		// const error = new Error("you have aleardy view the profile")
		//
		// next(error);
		res.json({
			status: "success",
			message:"you have aleardy view the profile"
		})
		return;
	}
	
	//push the currentUserId into the array od userProfile;
	userProfile.profileViewers.push(currentUserId);
	await userProfile.save();
	res.json({
		status: "success",
		message: "User Profile viwed successfully",
	})
	
	
})


//@desc Follow user
//@route PUT /api/v1/user/following/:userIdToFollow
//@access private
exports.followingUser = asyncHandler(async (req, res, next) => {
	//the uesr to be followed
	const userToFollow = req.params.userIdToFollow;
	//find the current user id
	const currentUserId = req?.userAuth?._id;
	const currentUserProfile = await User.findById(userToFollow).select("-password");
	if (!currentUserProfile) {
		let error = new Error("user not found");
		next(error);
		return;
	}
	//Avoiding user to self follow
	if (currentUserId.toString() === userToFollow.toString()) {
		const error = new Error("user tries to follow himself");
		next(error);
		return;
	}
	//Push the id to of userToFollow inside following array of the current user
	await User.findByIdAndUpdate(
		currentUserId, {
			$addToSet: {following: userToFollow}
		}, {new: true}
	).select("-password");
	//push the current user id into the follow array of userToFollow
	await User.findByIdAndUpdate(
		userToFollow, {
			$addToSet: {followers: currentUserId}
		}, {new: true}).select("-password")
	
	// send the response
	res.json({
		status: "success",
		message: "User follow successfully",
		
	})
})

//@desc unFollow user
//@route PUT /api/v1/user/following/:userIdToUnFollow
//@access private
exports.unfollowingUser = asyncHandler(async (req, res, next) => {
	//the uesr to be followed
	const userToUnFollow = req.params.userIdToFollow;
	//find the current user id
	const currentUserId = req?.userAuth?._id;
	//check wheter uset is exists
	const currentUserProfile = await User.findById(userToUnFollow).select("-password");
	if (!currentUserProfile) {
		let error = new Error("user not found");
		next(error);
		return;
	}
	//Avoiding user to self Unfollow
	if (currentUserId.toString() === userToUnFollow.toString()) {
		const error = new Error("user tries to Unfollow himself");
		next(error);
		return;
	}
	//check whete user to be unfollolwe isfollowed or not
	
	const currentUserObj = await User.findById(currentUserId).select("-password");
	
	if (!currentUserObj.following.includes(userToUnFollow)) {
		const error = new Error("user tries to Unfollow which is not followed by him");
		next(error);
		return;
	}
	//Remove the userIdToUnFollow from the following array
	await User.findByIdAndUpdate(currentUserId, {$pull: {following: userToUnFollow}}, {new: true}).select("-password")
	//Remove the currentUserId from the followers array
	await User.findByIdAndUpdate(userToUnFollow, {$pull: {followers: currentUserId}}, {new: true}).select("-password")
	
	// send the response
	res.json({
		status: "success",
		message: "User Unfollow successfully",
		
	})
})

// @desc forgot password
//@route POST /api/v1/users/forgot-password
//@access Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	//FETCH EMAIL
	const {email} = req.body;
	//find email in the DB
	const userFound = await User.findOne({email}).select("-password");
	if (!userFound) {
		const error = new Error("user not found");
		next(error);
		return;
	}
	
	//get the reset token
	const resetToken = await userFound.generatePasswordResetToken();
	await userFound.save();
	sendEmail(email, resetToken);
	res.json({
		status: "success",
		message: "password reset token to your email succesfully"
	})
})

//@desc password reset
//@route PUT /api/v1/users/reset-password/:resetToken
//@access public
exports.resetPassword = asyncHandler(async (req, res, next) => {
	//Get the token form params
	const {resetToken} = req.params;
	// Get the password
	const {password} = req.body;
	//convert resetToken into hashed token
	const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
	//verify the token with DB
	const tokenUser = await User.findOne({passwordResetToken: hashedToken, passwordResetExprires: {$gt: Date.now()}}).select("-password");
	//if user is not found
	
	if (!tokenUser) {
		let erroe = new ERROR("password token is invalid or expired");
		next(error);
		return;
	}
	//UPDATE the new password
	let salt = await bcrypt.genSalt(10);
	let hash = await bcrypt.hash(password, salt);
	tokenUser.password = hash;
	tokenUser.passwordResetToken = undefined;
	tokenUser.passwordResetExpires = undefined;
	await tokenUser.save();
	res.json({
		status: "success",
		message: "Password reset  successfully",
	})
	
})

// @desc account verification email send
//@route post api/v1/users/account-verification-email
//access private

exports.accountVerificationEmail = asyncHandler(async (req, res, next) => {
	// get the emailof current user
	const currentUser = await User.findById(req?.userAuth?._id).select("-password");
	// get the token from cuurent user object
	const verificationToken = await currentUser.generateAccountVerificationToken();
	// Save the token to the database
	await currentUser.save();
	await sendAccountVerificationEmail(currentUser?.email, verificationToken);
	res.json({
		status: "success",
		message: "Account verification email successfully sended",
	})
	
	
})
// @desc account verification
//@route put api/v1/users/verify-account/:verificationToken
//access private

exports.accountVerification = asyncHandler(async (req, res, next) => {
	
	// get the token from url
	const verificationToken = req.params.verificationToken;
	//converto token to hash to compare
	
	const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");




	//verify the token with DB
	const tokenUser = await User.findOne({
		accountVerificationToken: hashedToken,
		accountVerificationExpires: {$gt: Date.now()}
	});

	if (!tokenUser) {
		const error = new Error("user verification email is invalid or expired");
		next(error);
		return;
	}
	tokenUser.isVerified = true;
	tokenUser.accountVerificationToken = undefined;
	tokenUser.accountVerificationExpires = undefined;
	await tokenUser.save();
	
	res.json({
		status: "success",
		message: "Account verification successfully completed",
	})
	
	
})


//@desc Update Profile
//@route PUT /api/v1/users/update-profile
//@access Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
	const { name, email, bio, location, phone, gender,title,dob} = req.body;
	const userId = req?.userAuth?._id;

	const updatedFields = {};
	if (name !== undefined && String(name).trim() !== "") {
		updatedFields.name = typeof name === "string" ? name.trim() : name;
	}
	if (email !== undefined && String(email).trim() !== "") {
		updatedFields.email = typeof email === "string" ? email.trim() : email;
	}
	if (bio !== undefined)      updatedFields.bio = typeof bio === "string" ? bio.trim() : bio;
	if (location !== undefined) updatedFields.location = typeof location === "string" ? location.trim() : location;
	if (phone !== undefined)    updatedFields.phone = typeof phone === "string" ? phone.trim() : phone;
	if (title !== undefined)    updatedFields.title = typeof title === "string" ? title.trim() : title;
	if (dob !== undefined)      updatedFields.dob = dob === "" ? null : dob;
	if (gender !== undefined && gender !== "")   updatedFields.gender = gender;
	

	// Handle multer payload from both upload.any() (array) and upload.fields() (object)
	const getFileByField = (fieldName) => {
		if (Array.isArray(req.files)) {
			return req.files.find((fileObj) => fileObj.fieldname === fieldName);
		}
		return req.files?.[fieldName]?.[0];
	};

	const profilePictureFile =
		req.file || getFileByField("profilePicture") || getFileByField("file");
	const coverImageFile = getFileByField("coverImage") || getFileByField("image");

	if (profilePictureFile?.path) {
		updatedFields.profilePicture = profilePictureFile.path;
	}
	if (coverImageFile?.path) {
		updatedFields.coverImage = coverImageFile.path;
	}
	
	const updated = await User.findByIdAndUpdate(
		userId,
		{ $set: updatedFields },
		{ new: true, runValidators: true }
	).select("-password");

	if (!updated) {
		throw new Error("User not found");
	}

	res.json({
		status: "success",
		message: "Profile updated successfully",
		user: updated,
	});
});

//@desc Get Profile
//@route GET /api/v1/users/public-profile/:userId
//@access Public

exports.getPublicProfile = asyncHandler(async(req,res,next)=> {
  //! get user id from params
  const userId = req.params.userId;
  const user = await User.findById(userId).select("-password").populate("posts");
  

  res.json({
    status: "success",
    message: "Public Profile fetched",
    user,
  });
});