
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicPostAction } from "../../redux/slices/posts/postSlices.js";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import { Link } from "react-router-dom";

const DEFAULT_IMAGE = "https://cdn.pixabay.com/photo/2017/11/27/21/31/computer-2982270_960_720.jpg";
const DEFAULT_AVATAR = "https://randomuser.me/api/portraits/lego/1.jpg";

const categoryColors = {
  Technology: "bg-blue-100 text-blue-700",
  Food: "bg-yellow-100 text-yellow-700",
  Automobile: "bg-red-100 text-red-700",
  // Add more categories and colors here as needed.
};

function getCategoryColor(category) {
  return categoryColors[category] || "bg-gray-100 text-gray-700";
}

function getRelativeDate(dateString) {
  const postDate = new Date(dateString);
  const today = new Date();
  const diffMs = today - postDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return postDate.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

const PublicPosts = () => {
  const dispatch = useDispatch();
  const { posts, error, loading } = useSelector((state) => state.posts || {});
console.log(posts);
  useEffect(() => {
    dispatch(fetchPublicPostAction());
  }, [dispatch]);

  if (loading) return <LoadingComponent />;
  if (error)
    return (
      <ErrorMsg message={error?.message || "Failed to load posts, please try again."} />
    );
  if (!posts?.posts || posts.posts.length === 0)
    return (
      <div className="flex flex-col items-center py-20">
        <p className="text-gray-500 text-lg">No posts found at this moment.</p>
      </div>
    );

  return (
    <section className="relative py-24 bg-gradient-to-br ">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold text-green-600 bg-green-100 uppercase rounded-full shadow-sm">
            Blog
          </span>
          <h3 className="text-4xl font-extrabold text-coolGray-900 tracking-tight">
            Read our Trending Articles
          </h3>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          {posts.posts.map((post) => (
            <div
              key={post._id}
              className="w-full max-w-xs bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col transition-transform hover:scale-[1.03] hover:shadow-2xl duration-300"
            >
              <Link to={`/posts/${post._id}`} className="block overflow-hidden rounded-t-2xl">
                <img
                  src={post.image || DEFAULT_IMAGE}
                  alt={post.title || "Post image"}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_IMAGE;
                  }}
                  className="h-40 w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <div className="p-6 flex flex-col flex-grow">
                <span
                  className={`inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                    post.category?.name
                  )}`}
                >
                  {post.category?.name || "Uncategorized"}
                </span>
                <h2
                  className="text-lg font-bold text-gray-900 mb-2 truncate"
                  title={post.title}
                >
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm flex-grow mb-4 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex items-center gap-3 mt-auto pt-4">
                  <img
                    src={post.author?.profilePicture || DEFAULT_AVATAR}
                    alt={post.author?.name || "Author"}
                    className="w-8 h-8 rounded-full border"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DEFAULT_AVATAR;
                    }}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {post.author?.username || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {getRelativeDate(post.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicPosts;