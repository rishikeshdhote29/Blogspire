import React from "react";
import {useSelector} from "react-redux";

const CommentsList = ({comments }) => {
 
	
	
	
	return (
		<div className="flex flex-col space-y-4">
			
          {comments?.length <= 0 ? (
            <h2>No Comments</h2>
          ): (
            comments?.map((comment)=> {
              return (
                <React.Fragment key={comment?._id || comment?.createdAt}>
	                <div className="flex space-x-4">
				<div className="flex-none">
					<img
						src={comment?.author?.profilePicture}
						alt="avatar"
						className="rounded-full h-12 w-12"
					/>
				</div>
				<div className="flex-grow">
				</div>
			</div>
		
                  	<div className="bg-blue-50 px-4 py-3 sm:px-6 flex justify-between items-center">
						<div>
							<h4 className="text-sm font-medium text-blue-600">{comment?.author?.username || "Anonymous"}</h4>
							<p className="text-sm text-gray-500">{new Date(comment?.createdAt).toDateString()}</p>
						</div>
					</div>
					<div className="bg-blue-50 px-4 py-3 sm:px-6">
						<p className="mt-1 text-sm text-gray-700">
							{comment?.message}
						</p>
					</div>
                </React.Fragment>
              )
            })
          )}
			</div>
	);
};

export default CommentsList;
