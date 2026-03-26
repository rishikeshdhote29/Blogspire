import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {forgetPasswordAction, loginAction} from '../../redux/slices/users/usersSlices';
import LoadingComponent from "../Alert/LoadingComponent.jsx";
import ErrorMsg from "../Alert/ErrorMsg.jsx";
import SuccessMsg from "../Alert/SuccessMsg.jsx";
import {useNavigate} from "react-router-dom";

const Login = () => {
 const dispatch = useDispatch();
 const {loading, error,success} = useSelector((state) => state.users || {});
 
 const [formData, setFormData] = useState({
  username: '',
   password: ''
 });
const navigate= useNavigate();
 const handleChange = (e) => {
   setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
 };

 const handleSubmit = (e) => {
   e.preventDefault();
  
   dispatch(loginAction({ username: formData.username,password:formData.password}));
   
   
 };

 // forget password handle

function handleForget(e) {
   e.preventDefault();
navigate("/forget-password")

}

 return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
       <h2 className="text-3xl font-bold mb-6 text-center">Login To Your Account</h2>
         {error && <ErrorMsg message={error.message} />}
                {success && <SuccessMsg message="Login successful" />}
         {success && navigate("/user/Profile")    }
       <form onSubmit={handleSubmit}>
         <div className="mb-4">
           <label className="block text-gray-700">username</label>
           <input
             name="username"
             type="text"
             value={formData.username}
             onChange={handleChange}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
             placeholder="Enter your username"
             required
           />
         </div>
         <div className="mb-6">
           <label className="block text-gray-700">Password</label>
           <input
             name="password"
             type="password"
             value={formData.password}
             onChange={handleChange}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
             placeholder="Enter your password"
             required
           />
         </div>
           <a className={"mb-5 text-blue-600"} onClick={handleForget}>Forget Password</a>
         {error ? <p className="mb-4 text-sm text-red-600">{error?.message || 'Login failed'}</p> : null}
           {loading?<LoadingComponent/>:<button
           type="submit"
           disabled={loading}
           className="w-full mt-5 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
         >
           {loading ? 'Logging in...' : 'Login'}
         </button>}
         
       </form>
     </div>
   </div>
 );
};
export default Login;