import React, {useEffect, useState} from "react";
import DeleteConfirmModal from "./DeleteConfirmModal"; // adjust path if needed

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deletePostAction,
  getPostAction,
  postViewCountAction,
} from "../../redux/slices/posts/postSlices";
import PostStats from "./PostStats";
import ErrorMsg from "../Alert/ErrorMsg";
import LoadingComponent from "../Alert/LoadingComponent";
import calculateReadingTime from "../../utils/calculateReadingTime.js";
import AddComments from "../Comments/AddComments";

const PostDetails = () => {
  //! navigation
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { post, error } = useSelector((state) => state?.posts || {});
  const postData = post?.post;

  //!Get params
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { userAuth } = useSelector((state) => state?.users || {});
  const token = userAuth?.userInfo?.token;

  const { postId } = useParams();

  // Check if current user has liked/disliked the post
  const isLiked = postData?.likes?.includes(userAuth?.userInfo?._id);
  const isDisliked = postData?.dislikes?.includes(userAuth?.userInfo?._id);

  useEffect(() => {
    dispatch(getPostAction(postId));
    
  }, [dispatch, postId]);

  //!Post view Count
  useEffect(() => {
    // Post view count endpoint is protected; skip when token is missing.
    if (postId && token) {
      dispatch(postViewCountAction(postId));
    }
  }, [dispatch, postId, token]);

  //Get the creator id of the post
  const creator =
    typeof postData?.author === "object"
      ? postData?.author?._id?.toString()
      : postData?.author?.toString?.();
  //Get th login id of the user
  const loginUser = userAuth?.userInfo?._id?.toString();

  //Check wheather the login user is the creator

  const isCreator = creator === loginUser;

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await dispatch(deletePostAction(postId)).unwrap();
      setShowConfirm(false);
      navigate("/posts");
    } catch (deleteError) {
      console.error("Failed to delete post:", deleteError);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {!postData && error ? (
        <ErrorMsg message={error?.message} />
      ) : !postData ? (
        <LoadingComponent />
      ) : (
        <section
          className="py-16 bg-white md:py-24"
          style={{
            backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
          }}
        >
          <div className="container px-4 mx-auto">
            <div className="mx-auto mb-12 text-center md:max-w-2xl">
              <div className="inline-block px-3 py-1 mb-6 text-xs font-medium leading-5 text-green-500 uppercase bg-green-100 rounded-full shadow-sm">
                {postData?.category?.name || "Uncategorized"}
              </div>
              <div className="flex items-center justify-center">
                <p className="inline-block font-medium text-green-500">
                  {postData?.author?.username || "Unknown author"}
                </p>
                <span className="mx-1 text-green-500">•</span>
                <p className="inline-block font-medium text-green-500">
                  {postData?.createdAt ? new Date(postData.createdAt).toDateString() : "Unknown date"}
                </p>
              </div>
              <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tighter md:text-5xl text-darkCoolGray-900">
                {postData?.title || "Untitled post"}
              </h2>
           
      
              <Link to={postData?.author?._id ? `/users/public-profile/${postData.author._id}` : "#"}>
                <div className="flex items-center justify-center -mx-2 text-left">
                  <div className="w-auto px-2">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={
                        postData?.author?.profilePicture ||
                        "https://cdn.pixabay.com/photo/2017/11/27/21/31/computer-2982270_960_720.jpg"
                      }
                      alt
                    />
                  </div>
                  <div className="w-auto px-2">
                    <h4 className="text-base font-bold md:text-lg text-coolGray-800">
                      {postData?.author?.username || "Unknown author"}
                    </h4>
                    
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <img
            className="w-[700px] h-[400px] object-cover mx-auto mb-4 mb-10"
            src={
              postData?.image ||
              "https://cdn.pixabay.com/photo/2017/11/27/21/31/computer-2982270_960_720.jpg"
            }
            alt
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
          
            <PostStats
              views={postData?.postViews?.length ?? 0}
              likes={postData?.likes?.length ?? 0}
              dislikes={postData?.dislikes?.length ?? 0}
              totalComments={postData?.comments?.length ?? 0}
              createdAt={postData?.createdAt}
              readingTime={calculateReadingTime(postData?.content)}
              postId={postData?._id}
              claps={postData?.claps ?? 0}
              isLiked={isLiked} // New prop
              isDisliked={isDisliked}
            />
          </div>
          <div className="container px-4 mx-auto">
            <div className="mx-auto md:max-w-3xl">
              <p className="pb-10 mb-8 text-lg font-medium border-b md:text-xl text-coolGray-500 border-coolGray-100">
                {postData?.content || "No content available"}
              </p>
              {/* Delete and Update icons */}
              
              {isCreator && (
                
                <div className="flex justify-end mb-4">
                  <Link
                    to={`/posts/${postData?._id}/update`}
                    className="p-2 mr-2 text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </Link>
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              )}

              <h3 className="mb-4 text-2xl font-semibold md:text-3xl text-coolGray-800">
                Add a comment
              </h3>

              {/* Comment form */}
              <AddComments
                postId={postId}
                comments={postData?.comments|| []}
              />
            </div>
          </div>
        </section>
      )}
      <DeleteConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />

    </>
  );
};

export default PostDetails;