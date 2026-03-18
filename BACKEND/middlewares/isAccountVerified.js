const User= require(`../models/Users/User.js`);
const isAccountVerified= async (req,res,next) => {
	try {
		//Find user by id
		const user= await User.findById(req?.userAuth?._id);
		// check wheter the user is verified or not
		
		if(user.isVerified){
			next();
		}else
		return res.status(401).json({message:"User not verified"});
	}
	catch(err){
		return res.status(500).json({message:"Something went wrong"});
	}



}
module.exports=isAccountVerified;
