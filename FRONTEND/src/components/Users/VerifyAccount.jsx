import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { verifyAccountAction} from '../../redux/slices/users/usersSlices';
import LoadingComponent from "../Alert/LoadingComponent.jsx";
import ErrorMsg from "../Alert/ErrorMsg.jsx";
import SuccessMsg from "../Alert/SuccessMsg.jsx";
import {useNavigate, useParams} from "react-router-dom";

const ResetPassword = () => {
 const dispatch = useDispatch();
 const {loading, error,success} = useSelector((state) => state.users || {});
 const {verificationToken} = useParams();
const navigate= useNavigate();

 useEffect(() => {
   if (success) {
     navigate("/");
   }
 }, [success, navigate]);

 const handleSubmit = (e) => {
	 
   e.preventDefault();

   dispatch(verifyAccountAction(verificationToken));
  
   
   
 };


 return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
       <h2 className="text-3xl font-bold mb-6 text-center">Verify Account</h2>
         {error && <ErrorMsg message={error.message} />}
                {success && <SuccessMsg message="account verification is successful" />}
       <form onSubmit={handleSubmit}>
         <div className="mb-4">
          <p>by clicking verify button you can verify your account </p>
         </div>
         
         {error ? <p className="mb-4 text-sm text-red-600">{error?.message || 'verification failed'}</p> : null}
           {loading?<LoadingComponent/>:<button
           type="submit"
           disabled={loading}
           className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
         >
           {loading ? 'verifying...' : 'verify account'}
         </button>}
         
       </form>
     </div>
   </div>
 );
};
export default ResetPassword;