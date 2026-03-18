const globalErrorHandler=(error,req,res,next)=>{
const status=error?.status ?error.status:"failed"
	const stack= error?.stack;
res.status(500).json({status:status,message:error?.message, stack:stack});
}

const notFoundHnadler=(req,res,next)=>{
	let error= new Error (`Cannot find the route for ${req.originalUrl} at the server`);
	next(error)
}
module.exports = {globalErrorHandler,notFoundHnadler}