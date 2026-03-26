import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice/globalSlice";

const INITIAL_STATE = {
  loading: false,
  error: null,
  posts: [],
  post: null,
  success: false,
};

//!Fetch Public Post Action

export const fetchPublicPostAction = createAsyncThunk(
  "posts/fetch-public-posts",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/posts/public"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//!Fetch private post
 export const fetchPrivatePostsAction = createAsyncThunk(
  "posts/fetch-private-posts",
  async(payload,{rejectWithValue,getState,dispatch})=> {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {data} = await axios.get(
        "http://localhost:3000/api/v1/posts/",
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
 );
 //!Fetch private post
 export const fetchMyPostsAction = createAsyncThunk(
  "posts/fetch-my-posts",
  async(payload,{rejectWithValue,getState,dispatch})=> {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {data} = await axios.get(
        "http://localhost:3000/api/v1/posts/my-posts",
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
 );
 //!Fetch public user  post
 export const fetchPublicUserPostsAction = createAsyncThunk(
  "posts/fetch-public-user-posts",
      async (userId, { rejectWithValue, getState }) => {
    //make request
    try {
        const normalizedUserId =
          typeof userId === "object" && userId !== null ? userId.userId : userId;

        if (!normalizedUserId || typeof normalizedUserId !== "string") {
          return rejectWithValue({ message: "Invalid user id" });
        }

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {data} = await axios.get(
          `http://localhost:3000/api/v1/posts/public-user-posts/${normalizedUserId}`,
        config
      );
    
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
 );

//! Create Post
export const addPostAction = createAsyncThunk(
  "post/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("content", payload?.content);
      formData.append("categoryId", payload?.category);
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:3000/api/v1/posts`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

  //!fetch single posts
        
  export const getPostAction = createAsyncThunk(
    "posts/get-post",
    async(postId,{rejectWithValue,getState,dispatch}) => {
      //make request
      try {
        const {data} = await axios.get(
          `http://localhost:3000/api/v1/posts/${postId}`
        );
        return data;
      } catch(error) {
        return rejectWithValue(error?.response?.data);
      }
    }
  )

  //! Update post
  export const updatePostAction = createAsyncThunk(
    "post/update",
    async (payload, {rejectWithValue, getState, dispatch}) => {
      try {
        //convert the payload to formData
        const formData = new FormData();
        formData.append("title", payload?.title);
        formData.append("content", payload?.content);
        formData.append("categoryId", payload?.category);
        formData.append("file", payload?.image);

        const token = 
          getState().users?.userAuth?.userInfo?.token;
           const config = {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
           };
           const {data} = await axios.put(
               `http://localhost:3000/api/v1/posts/${payload?.postId}`,
                formData,
                config
           );
           return data;
          } catch (error) {
            return rejectWithValue(error?.response?.data);
          }
      }
    
  );

  //!Delete Post
  export const deletePostAction = createAsyncThunk(
    "posts/delete-post",
    async(postId,{rejectWithValue,getState,dispatch})=> {
      //make request
      try {
        const token = getState().users?.userAuth?.userInfo?.token;
        const config = {
          headers: {
            Authorization : `Bearer ${token}`,
          },
        };
        const {data} = await axios.delete(
          `http://localhost:3000/api/v1/posts/${postId}`,
          config
        );
        
        return data;
      } catch (error) {
        return rejectWithValue(error?.response?.data)
      
      }
    }
    );

    //! like post
    export const likePostAction = createAsyncThunk(
      "posts/like",
      async (postId, {rejectWithValue, getState, dispatch}) => {
        //make request
        try {
          const token = getState().users?.userAuth?.userInfo?.token;
          const config = {
            headers : {
              Authorization: `Bearer ${token}`,

            },
          };
          const {data} = await axios.put(
              `http://localhost:3000/api/v1/posts/likes/${postId}`,
              {},
              config
          );
          return data;

        } catch (error) {
         return rejectWithValue(error?.response?.data);
        }
      }
    );

     //! dislike post
     export const dislikePostAction = createAsyncThunk(
      "posts/dislike",
      async (postId, {rejectWithValue, getState, dispatch}) => {
        //make request
        try {
          const token = getState().users?.userAuth?.userInfo?.token;
          const config = {
            headers : {
              Authorization: `Bearer ${token}`,

            },
          };
          const {data} = await axios.put(
              `http://localhost:3000/api/v1/posts/dislikes/${postId}`,
              {},
              config
          );
          return data;

        } catch (error) {
         return rejectWithValue(error?.response?.data);
        }
      }
    );

    //! clapping a post
    export const clapPostAction = createAsyncThunk(
      "posts/clap",
      async(postId, {rejectWithValue, getState, dispatch}) => {
        //make request
        try {
          const token = getState().users?.userAuth?.userInfo?.token;
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          };
          const {data} =  await axios.put(
              `http://localhost:3000/api/v1/posts/claps/${postId}`,
              {},
              config
          );
          return data;
        } catch (error) {
          return rejectWithValue(error?.response?.data);
        }
      } 
    );

    // //!post view count
    export const postViewCountAction = createAsyncThunk(
      "posts/post-view",
      async (postId, {rejectWithValue, getState,
        dispatch})=> {
          //make request
          try {
            const token = getState().users?.userAuth?.userInfo?.token;
             const config = {
              headers: {
                Authorization: `Bearer ${token}`,
                 
              },
             };
             const {data} = await axios.put(
              `http://localhost:3000/api/v1/posts/${postId}/post-view-count`,
              {},
              config
             );
             return data;
          } catch (error) {
            return rejectWithValue(error?.response?.data);
          }
        }

    );
  

//!Posts slices

const postsSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //! Fetch public post
    builder.addCase(fetchPublicPostAction.pending, (state, action) => {
      console.log("pending", fetchPublicPostAction.pending);
      state.loading = true;
    });
    builder.addCase(fetchPublicPostAction.fulfilled, (state, action) => {
      console.log("success", action.payload);
      console.log("fetchPublicPostAction", fetchPublicPostAction.fulfilled);
      // state.success = true;
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchPublicPostAction.rejected, (state, action) => {
      console.log("failed", action.payload);
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    });

    //!Fetch Private post

    builder.addCase(fetchPrivatePostsAction.pending, (state, action) => {
      console.log("pending", fetchPrivatePostsAction.pending);
      state.loading = true;
    });
    
    builder.addCase(fetchPrivatePostsAction.fulfilled, (state, action) => {
      console.log("success", action.payload)
      console.log("fetchePrivatePostAction", fetchPrivatePostsAction.fulfilled);
      // state.success = true;
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    });
    
    builder.addCase(fetchPrivatePostsAction.rejected, (state, action) => {
      console.log("failed", action.payload);
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    });
    //!Fetch My posts
builder.addCase(fetchMyPostsAction.pending, (state, action) => {
      
      state.loading = true;
    });
    
    builder.addCase(fetchMyPostsAction.fulfilled, (state, action) => {
      
      // state.success = true;
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    });
    
    builder.addCase(fetchMyPostsAction.rejected, (state, action) => {
      console.log("failed", action.payload);
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    });
    //fetch public user posts
      builder.addCase(fetchPublicUserPostsAction.pending, (state, action) => {
      
      state.loading = true;
    });
    
    builder.addCase(fetchPublicUserPostsAction.fulfilled, (state, action) => {
      
      // state.success = true;
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    });
    
    builder.addCase(fetchPublicUserPostsAction.rejected, (state, action) => {
      console.log("failed", action.payload);
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    });
    
    //! create post
        builder.addCase(addPostAction.pending, (state,action)=> {
            state.loading = true;
            state.success = false; 
             state.error = null;

        });
        builder.addCase(addPostAction.fulfilled,(state,action)=> {
            state.post = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(addPostAction.rejected,(state,action)=> {
            state.error = action.payload;
            state.loading = false;
            state.success = false;

        });

        //! get single post
        builder.addCase(getPostAction.pending,(state,action)=> {
          state.loading = true;
        });
        builder.addCase(getPostAction.fulfilled,(state,action)=> {
          state.post = action.payload;
          console.log(action.payload)
          state.loading = false;
         // state.success = true;
          state.error = null;
        });
        builder.addCase(getPostAction.rejected,(state,action)=> {
          state.error = action.payload;
          state.loading = false;
          state.success = false;
        });

        //! Update Post
          builder.addCase(updatePostAction.pending,(state,action)=> {
            state.loading = true;

          });
          builder.addCase(updatePostAction.fulfilled,(state,action)=> {
            state.post = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null;
          });
          builder.addCase(updatePostAction.rejected,(state,action)=> {
            state.error = action.payload;
            state.loading = false; 
          });

        //! Delete post
        builder.addCase(deletePostAction.pending,(state,action)=> {
          state.loading = true;
        });
        //handle fulfilled State
        builder.addCase(deletePostAction.fulfilled,(state,action)=> {
          state.success = true;
          state.loading = false;
          state.error = null;
        });
        //*Handle the rejection
        builder.addCase(deletePostAction.rejected,(state,action)=> {
          state.error = action.payload;
          state.success = false;
          state.loading = false;
        });

        //!like post
        builder.addCase(likePostAction.pending,(state,action)=> {
          state.loading = true;
        });
        builder.addCase(likePostAction.fulfilled,(state,action)=> {
          state.post = action.payload;
          state.loading = false;
          state.error = null;
        });
        builder.addCase(likePostAction.rejected,(state,action)=> {
          state.error = action.payload;
          state.loading = false;
        });

        //!dislike post
        builder.addCase(dislikePostAction.pending,(state,action)=> {
          state.loading = true;
        });
        builder.addCase(dislikePostAction.fulfilled,(state,action)=> {
          state.post = action.payload;
          state.loading = false;
          state.error = null;
        });
        builder.addCase(dislikePostAction.rejected,(state,action)=> {
          state.error = action.payload;
          state.loading = false;
        });

        //! clap post
        builder.addCase(clapPostAction.pending,(state,action)=> {
          state.loading = true;
        });
        builder.addCase(clapPostAction.fulfilled,(state,action)=> {
          state.post = action.payload;
          state.loading = false;
          state.error = null;
        });
        builder.addCase(clapPostAction.rejected,(state,action)=> {
          state.error = action.payload;
          state.loading = false;
        });

        //  //! post-view-Count
         builder.addCase(postViewCountAction.pending,(state,action)=> {
          state.loading = true;
        });
        builder.addCase(postViewCountAction.fulfilled,(state,action)=> {
          state.post = action.payload;
          state.loading = false;
          state.error = null;
        });
        builder.addCase(postViewCountAction.rejected,(state,action)=> {
          state.error = action.payload;
          state.loading = false;
        });






    //! Reset error action
    builder.addCase(resetErrorAction, (state) => {
      state.error = null;
    });
    //!Reset success action
    builder.addCase(resetSuccessAction, (state) => {
      state.success = false;
    });
  },
});






//!Post Slices
// const postsSlice = createSlice({
//     name: "posts",
//     initialState: INITIAL_STATE,
//     extraReducers: (builder) => {
//         //! Fetch public post
//         builder.addCase(fetchPublicPostAction.pending,(state,action)=> {
//             console.log("pending", fetchPublicPostAction.pending);
//             state.loading = true;
//         });
//         builder.addCase(fetchPublicPostAction.fulfilled,(state,action)=> {
//             console.log("success", action.payload);
//             console.log("fetchPublicPostAction", fetchPublicPostAction.fulfilled);
//             state.success = true;
//             state.posts = action.payload;
//             state.loading = false;
//             state.error = null;
//         });
//         //! create post
//         builder.addCase(addPostAction.pending, (state,action)=> {
//             state.loading = true;

//         });
//         builder.addCase(addPostAction.fulfilled,(state,action)=> {
//             state.post = action.payload;
//             state.success = true;
//             state.loading = false;
//             state.error = null;
//         });
//         builder.addCase(addPostAction.rejected,(state,action)=> {
//             state.error = action.payload;
//             state.loading = false;
//             state.success = false;

//         });

//         //! Reset error action
//         builder.addCase(resetErrorAction,(state)=> {
//             state.error = null;
//         })

//         //! Reset success action
//         builder.addCase(resetSuccessAction,(state)=> {
//             state.success = false;
//         });
//     },
// });

//! generate reducer

const postsReducer = postsSlice.reducer;

export default postsReducer;