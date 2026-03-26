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
import Followers from "./components/Users/Followers.jsx";
import Following from "./components/Users/Following.jsx";
import ProfileViewer from "./components/Users/ProfileViewer.jsx";
import BlockedUsers from "./components/Users/BlockedUsers.jsx";
import PublicUserPosts from "./components/Posts/PublicUserPosts.jsx";
import ForgetPassword from "./components/Users/ForgetPassword.jsx";
import ResetPassword from "./components/Users/ResetPassword.jsx";
import VerifyAccount from "./components/Users/VerifyAccount.jsx";

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
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/verify-account/:verificationToken" element={<VerifyAccount />} />
        

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
          <Route path="/user/followers" element={<Followers />} />
          <Route path="/user/profile-viewers" element={<ProfileViewer />} />
          <Route path="/user/following" element={<Following />} />
          
          <Route path="/user/blocked-users" element={<BlockedUsers />} />
          <Route path="/user/public-user-posts/:userId" element={<PublicUserPosts />} />
          
          
       
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}