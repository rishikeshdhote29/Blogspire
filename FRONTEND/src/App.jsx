import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import PublicUserProfile from "./components/Users/PublicUserProfile";
import PublicNavbar from "./components/Navbar/PublicNavBar";
import PrivateNavbar from "./components/Navbar/PrivateNavBar";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/AuthRoute/ProtectedRoute";
import AddPost from "./components/Posts/AddPost";
import PublicPosts from "./components/Posts/PublicPosts";
import PostDetails from "./components/Posts/PostDetails";
import PostList from "./components/Posts/PostList";
import UpdatePost from "./components/Posts/UpdatePost";
import NotFound from "./components/NotFound";
import UserProfile from "./components/Users/UserProfile.jsx";
import UpdateProfile from "./components/Users/UpdateProfile.jsx";
import MyPosts from "./components/Posts/MyPosts.jsx";

export default function App() {
  const { userAuth } = useSelector((state) => state.users);
  const isLoggedIn = userAuth?.userInfo?.token;

  // Choose proper Navbar based on auth state
  const Navbar = isLoggedIn ? PrivateNavbar : PublicNavbar;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/public-posts" element={<PublicPosts />} />

        {/* Group protected routes under ProtectedRoute wrapper */}
        <Route element={<ProtectedRoute />}>
          <Route path="/posts/:postId" element={<PostDetails />} />
          <Route path="/posts/:postId/update" element={<UpdatePost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/users/public-profile/:userId" element={<PublicUserProfile />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/update-profile" element={<UpdateProfile />} />
          <Route path="/user/my-posts" element={<MyPosts />} />
          
       
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}