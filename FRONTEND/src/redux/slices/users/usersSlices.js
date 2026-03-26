import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../globalSlice/globalSlice.js";
import { apiUrl } from "../../../utils/apiConfig";


const INITIAL_STATE = {
    loading: false,
    error: null,
    users:[],
    success: false,
    isUpdated: false,
    isDeleted: false,
    isEmailSent: false,
    isPasswordReset: false,
    publicUser:{},
    profile: {},
    userAuth: {
        error: null,
        userInfo: localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null,
    },
};

//! Login Action
export const loginAction = createAsyncThunk(
    'users/login',
    async (payload, {rejectWithValue, getState, dispatch}) => {
        //make request
        try{
          const {data} = await axios.post(
            apiUrl("/users/login"),
            payload
          );
          localStorage.setItem("userInfo",JSON.stringify(data));
          return data;
          
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);


//! Get User Public Profile Action
export const userProfileAction = createAsyncThunk(
    "users/user-profile",
    async(userId,{rejectWithValue,getState,dispatch})=> {
        //make request
        try {
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const {data} = await axios.get(
                apiUrl("/users/profile"),
                config
            );
            return data;
        } catch(error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)


//! Get User Public Profile Action
export const userPublicProfileAction = createAsyncThunk(
    "users/user-public-profile",
    async(userId,{rejectWithValue,getState,dispatch})=> {
        //make request
        try {
            const token = getState().users?.userAuth?.userInfo?.token;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const {data} = await axios.get(
                apiUrl(`/users/public-profile/${userId}`),
                config
            );
            
            return data;
        } catch(error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)

// view profile action
export const viewProfileAction= createAsyncThunk("users/view-profile",
   
    async(userId,{rejectWithValue,getState,dispatch})=> {
        //make request
        try {
            const token = getState().users?.userAuth?.userInfo?.token;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const {data} = await axios.get(
                apiUrl(`/users/view-other-profile/${userId}`),
                config
            );
            
            return data;
        } catch(error) {
            return rejectWithValue(error?.response?.data);
        }
    })

//! Update Profile Action
export const updateProfileAction = createAsyncThunk(
    "users/update-profile",
    async (payload, { rejectWithValue, getState }) => {
        try {
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const formData = new FormData();
            if (payload.name !== undefined)     formData.append("name", payload.name);
            if (payload.email !== undefined)    formData.append("email", payload.email);
            if (payload.bio !== undefined)      formData.append("bio", payload.bio);
            if (payload.location !== undefined) formData.append("location", payload.location);
            if (payload.phone !== undefined)    formData.append("phone", payload.phone);
            if (payload.gender !== undefined && payload.gender !== "") {
                formData.append("gender", payload.gender);
            }
            if (payload.title !== undefined)    formData.append("title", payload.title);
            if (payload.dob !== undefined && payload.dob !== "") {
                formData.append("dob", payload.dob);
            }
            if (payload.profilePicture)         formData.append("profilePicture", payload.profilePicture);
            if (payload.coverImage)         formData.append("coverImage", payload.coverImage);

            const { data } = await axios.put(
                apiUrl("/users/update-profile"),
                formData,
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//Code after loginAction

//!Logout action
export const logoutAction = createAsyncThunk("users/logout", async()=> {
    //remove token from localstorage
    localStorage.removeItem("userInfo");
    return true;
});

export const registerAction = createAsyncThunk(
    "users/register",
    async(payload,{rejectWithValue,getState,dispatch})=> {
        //make request
        try {
            const {data} = await axios.post(
                apiUrl("/users/register"),
                payload
            );
            return data;
        } catch(error) {
            return
            rejectWithValue(error?.response?.data);
        
        }
    }
);

// Follow user action
export const followUserAction= createAsyncThunk("users/follow",
    async(userId,{rejectWithValue,getState,dispatch})=>{
        try{
    const token = getState().users?.userAuth?.userInfo?.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

        const {data}=await axios.put(apiUrl(`/users/following/${userId}`),{},config);
        return data;
    }catch(error){
         
            return rejectWithValue(error?.response?.data);
        }
    })



// unfollow user action
export const unfollowUserAction= createAsyncThunk("users/unfollow",
    async(userId,{rejectWithValue,getState,dispatch})=>{
        try{
    const token = getState().users?.userAuth?.userInfo?.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

        const {data}=await axios.put(apiUrl(`/users/unfollowing/${userId}`),{},config);
        return data;
    }catch(error){
         
            return rejectWithValue(error?.response?.data);
        }
    })



// block user action
export const blockUserAction= createAsyncThunk("users/block",
    async(userId,{rejectWithValue,getState,dispatch})=>{
        try{
    const token = getState().users?.userAuth?.userInfo?.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

        const {data}=await axios.put(apiUrl(`/users/block/${userId}`),{},config);
        return data;
    }catch(error){
         
            return rejectWithValue(error?.response?.data);
        }
    })

// unblock user action
export const unblockUserAction= createAsyncThunk("users/unblock",
    async(userId,{rejectWithValue,getState,dispatch})=>{
        try{
    const token = getState().users?.userAuth?.userInfo?.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

        const {data}=await axios.put(apiUrl(`/users/unblock/${userId}`),{},config);
        return data;
    }catch(error){
         
            return rejectWithValue(error?.response?.data);
        }
    })


// profile verification email send
export const sendVerificationEmailAction = createAsyncThunk(
    "users/account-verification-email",
async(_, {rejectWithValue, getState})=> {
        try{
            const token = getState().users?.userAuth?.userInfo?.token;
            
            const config={
                headers:{
                    Authorization: `Bearer ${token}`,
                    
                }
            }
            
          const {data} = await axios.put(apiUrl("/users/account-verification-email"),{},config);

            return data;
            
        }
        catch(error) {
            return rejectWithValue(error?.response?.data);
        }
}
)

//handle forget password action
export  const forgetPasswordAction = createAsyncThunk(
    "users/forget-password",
    async(email,{rejectWithValue})=> {
        try{
            
            await axios.post(apiUrl("/users/forgot-password"),{email});
        }catch(error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)
//handle reset password action
export  const resetPasswordAction = createAsyncThunk(
    "users/reset-password",
    async({password, resetToken},{rejectWithValue})=> {
        try{
            await axios.put(
                apiUrl(`/users/reset-password/${resetToken}`),
                {password}
            );
        }catch(error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)

//handle verify account action
export  const verifyAccountAction = createAsyncThunk(
    "users/verify-account",
    async(verificationToken,{rejectWithValue})=> {
        try{
            await axios.put(
                apiUrl(`/users/verify-account/${verificationToken}`),
                
            );
        }catch(error) {
            return rejectWithValue(error?.response?.data);
        }
    }
)
//! Users slices

const usersSlice = createSlice({
    name:"users",
    initialState:INITIAL_STATE,
    extraReducers:(builder)=> {
        //Login
        builder.addCase(loginAction.pending,(state,action)=> {
            console.log("pending", loginAction.pending);
            state.loading = true;
        });
        builder.addCase(loginAction.fulfilled,(state,action)=> {
            console.log("success",action.payload);
            console.log("loginAction",loginAction.fulfilled);
            state.success= true;
            state.userAuth.userInfo = action.payload;
            state.loading = false;
            state.error = null;
        });

        builder.addCase(loginAction.rejected,(state,action)=> {
            console.log("failed",action.payload);
            state.error= action.payload;
            state.loading = false;
            state.success = false;
        });

        //Register
        builder.addCase(registerAction.pending,(state,action)=> {
            console.log("pending",registerAction.pending);
            state.loading = true;
        });

        builder.addCase(registerAction.fulfilled,(state,action)=>{
            console.log("success",action.payload);
            console.log("registerAction",registerAction.fulfilled);
            state.success = true;
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(registerAction.rejected,(state,action)=> {
            console.log("failed",action.payload);
            state.error = action.payload;
            state.loading = false;
            state.success = false;
        });

        //get user public profile
        builder.addCase(userPublicProfileAction.pending,(state,action)=> {
            state.loading = true;
        });
         builder.addCase(userPublicProfileAction.fulfilled,(state,action)=> {
            state.publicUser = action.payload;
            
            
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(userPublicProfileAction.rejected,(state,action)=> {
            state.error = action.payload;
            state.loading = false;
        });

        //!Reset error action
        builder.addCase(resetErrorAction,(state)=> {
            state.error = null;
        });

        //!Reset Success action
        builder.addCase(resetSuccessAction,(state)=> {
            state.success = false;
        })

        //get user  profile
        builder.addCase(userProfileAction.pending,(state,action)=> {
            state.loading = true;
        });
         builder.addCase(userProfileAction.fulfilled,(state,action)=> {
            console.log(action.payload);
             state.profile = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(userProfileAction.rejected,(state,action)=> {
            state.error = action.payload;
            state.loading = false;
        });
        
        //get view profile
        builder.addCase(viewProfileAction.pending,(state,action)=> {
            state.loading = true;
        });
         builder.addCase(viewProfileAction.fulfilled,(state,action)=> {
      
            
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(viewProfileAction.rejected,(state,action)=> {
            state.error = action.payload;
            state.loading = false;
        });


        //! Update Profile
        builder.addCase(updateProfileAction.pending,(state)=> {
            state.loading = true;
            state.isUpdated = false;
        });
        builder.addCase(updateProfileAction.fulfilled,(state,action)=> {
            state.profile = action.payload;
            state.isUpdated = true;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(updateProfileAction.rejected,(state,action)=> {
            state.error = action.payload;
            state.loading = false;
            state.isUpdated = false;
        });
        // follow user
        builder.addCase(followUserAction.pending,(state)=> {
            state.loading = true;
            
        });
        builder.addCase(followUserAction.fulfilled,(state)=> {
            state.loading = false;
            state.success = true;
            
            
        });
        builder.addCase(followUserAction.rejected,(state,action)=> {
            state.loading = false;
            state.error=action.payload;
             state.success = false;
            
        })
        // unfollow user
        builder.addCase(unfollowUserAction.pending,(state)=> {
            state.loading = true;
            
        });
        builder.addCase(unfollowUserAction.fulfilled,(state)=> {
            state.loading = false;
            state.success = true;
            
            
        });
        builder.addCase(unfollowUserAction.rejected,(state,action)=> {
            state.loading = false;
            state.error=action.payload;
             state.success = false;
            
        })// block user
        builder.addCase(blockUserAction.pending,(state)=> {
            state.loading = true;
            
        });
        builder.addCase(blockUserAction.fulfilled,(state)=> {
            state.loading = false;
            state.success = true;
            
            
        });
        builder.addCase(blockUserAction.rejected,(state,action)=> {
            state.loading = false;
            state.error=action.payload;
             state.success = false;
            
        })// Unblock user
        builder.addCase(unblockUserAction.pending,(state)=> {
            state.loading = true;
            
        });
        builder.addCase(unblockUserAction.fulfilled,(state)=> {
            state.loading = false;
            state.success = true;
            
            
        });
        builder.addCase(unblockUserAction.rejected,(state,action)=> {
            state.loading = false;
            state.error=action.payload;
             state.success = false;
            
        })
        
        // send verification email
        
        
        builder.addCase(sendVerificationEmailAction.pending,(state)=> {
            state.loading = true;
            
        });
        builder.addCase(sendVerificationEmailAction.fulfilled,(state)=> {
            state.loading = false;
            state.success = true;
            
            
        });
        builder.addCase(sendVerificationEmailAction.rejected,(state,action)=> {
            state.loading = false;
             state.success = false;
            
        })
        
        // forget password
        builder.addCase(forgetPasswordAction.pending,(state)=>{
            state.loading = true;
            state.error = null;
            
        });
         builder.addCase(forgetPasswordAction.fulfilled,(state)=>{
            state.loading = false;
            state.error = null;
            state.success = true;
            
        });
         builder.addCase(forgetPasswordAction.rejected,(state,action)=>{
            state.loading = false;
            state.error =action.payload;
            
        })
        //reset password
        builder.addCase(resetPasswordAction.pending,(state)=>{
            state.loading = true;
            state.error = null;
            
        });
         builder.addCase(resetPasswordAction.fulfilled,(state)=>{
            state.loading = false;
            state.error = null;
            state.success = true;
            
        });
         builder.addCase(resetPasswordAction.rejected,(state,action)=>{
            state.loading = false;
            state.error =action.payload;
            
        })
        //verify account
        builder.addCase(verifyAccountAction.pending,(state)=>{
            state.loading = true;
            state.error = null;
            
        });
         builder.addCase(verifyAccountAction.fulfilled,(state)=>{
            state.loading = false;
            state.error = null;
            state.success = true;
            
        });
         builder.addCase(verifyAccountAction.rejected,(state,action)=>{
            state.loading = false;
            state.error =action.payload;
            
        })
    },
});

//! generate reducer

const usersReducer = usersSlice.reducer;

export default usersReducer;