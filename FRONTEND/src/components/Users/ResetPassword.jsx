import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetPasswordAction} from '../../redux/slices/users/usersSlices';
import LoadingComponent from "../Alert/LoadingComponent.jsx";
import ErrorMsg from "../Alert/ErrorMsg.jsx";
import SuccessMsg from "../Alert/SuccessMsg.jsx";
import {useNavigate, useParams} from "react-router-dom";

const ResetPassword = () => {
 const dispatch = useDispatch();
 const {loading, error,success} = useSelector((state) => state.users || {});
 const {resetToken} = useParams();
const [password, setPassword] = useState('')
const navigate= useNavigate();

 useEffect(() => {
   if (success) {
     navigate("/login");
   }
 }, [success, navigate]);

 const handleChange = (e) => {
   setPassword(e.target.value);
 };

 const handleSubmit = (e) => {
	 
   e.preventDefault();

   dispatch(resetPasswordAction({ password, resetToken }));
  
   
   
 };


 return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
       <h2 className="text-3xl font-bold mb-6 text-center">Reset Password</h2>
         {error && <ErrorMsg message={error.message} />}
                {success && <SuccessMsg message="password reset  successfully" />}
       <form onSubmit={handleSubmit}>
         <div className="mb-4">
           <label className="block text-gray-700">password</label>
           <input
             name="email"
             type="password"
             value={password}
             onChange={handleChange}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
             placeholder="password"
             required
           />
         </div>
         
         {error ? <p className="mb-4 text-sm text-red-600">{error?.message || 'reset link sending failed'}</p> : null}
           {loading?<LoadingComponent/>:<button
           type="submit"
           disabled={loading}
           className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
         >
           {loading ? 'submiting' : 'reset password'}
         </button>}
         
       </form>
     </div>
   </div>
 );
};
export default ResetPassword;