import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {forgetPasswordAction} from '../../redux/slices/users/usersSlices';
import LoadingComponent from "../Alert/LoadingComponent.jsx";
import ErrorMsg from "../Alert/ErrorMsg.jsx";
import SuccessMsg from "../Alert/SuccessMsg.jsx";
import {useNavigate} from "react-router-dom";

const ForgetPassword = () => {
 const dispatch = useDispatch();
 const {loading, error,success} = useSelector((state) => state.users || {});
 
const [email, setEmail] = useState('')
const navigate= useNavigate();
 const handleChange = (e) => {
   setEmail(e.target.value);
 };

 const handleSubmit = (e) => {
	 
   e.preventDefault();
  
   dispatch(forgetPasswordAction(email));
   email('');
   
   
 };


 return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
       <h2 className="text-3xl font-bold mb-6 text-center">Forget Password</h2>
         {error && <ErrorMsg message={error.message} />}
                {success && <SuccessMsg message="reset link sended successfully" />}
         {success && navigate("/login")    }
       <form onSubmit={handleSubmit}>
         <div className="mb-4">
           <label className="block text-gray-700">Email</label>
           <input
             name="email"
             type="text"
             value={email}
             onChange={handleChange}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
             placeholder="Enter your email"
             required
           />
         </div>
         
         {error ? <p className="mb-4 text-sm text-red-600">{error?.message || 'reset link sending failed'}</p> : null}
           {loading?<LoadingComponent/>:<button
           type="submit"
           disabled={loading}
           className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
         >
           {loading ? 'sending' : 'send reset link'}
         </button>}
         
       </form>
     </div>
   </div>
 );
};
export default ForgetPassword;