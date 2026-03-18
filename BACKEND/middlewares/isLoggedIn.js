const jwt = require("jsonwebtoken");
const User = require("../models/Users/User");

const isLoggedIn =  (req, res, next) => {
	
	
	// Fetch token from request
	const token = req.headers.authorization?.split(" ")[1];

	// verify token
	jwt.verify(token,process.env.SECRET_KEY,async (err, decoded) => {
		// authenticate user
	if(err){
		const error = new Error(err?.message)
		next(error);
	}else{{
		const userId= decoded?.user?.id;
		const user = await User.findById(userId).select("username email  role  _id",);
		req.userAuth=user;
			next();
	
	}}
	
	})
	
	

	
}
module.exports=isLoggedIn;