import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getPostAction } from "../posts/postSlices";
import { apiUrl } from "../../../utils/apiConfig";
import {
    resetErrorAction,
    resetSuccessAction
} from "../globalSlice/globalSlice";

//initial State

const INITIAL_STATE = {
    loading: false,
    error: null,
    comments: [],
    comment: null,
    success: false,
}

//! Create Comment
export const createCommentAction = createAsyncThunk(
    "comment/create",
    async(payload,{rejectWithValue,getState,dispatch})=> {
        try {
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const {data} = await axios.post(
                apiUrl(`/comments/${payload?.postId}`),
                {
                    message: payload?.message,
                },
                config
            );
            dispatch(getPostAction(payload?.postId));
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//! comment slices

const commentSlice = createSlice({
    name: "comments",
    initialState: INITIAL_STATE,
    extraReducers: (builder)=> {
        //create comment
        builder.addCase(createCommentAction.pending,(state, action)=> {
            state.loading = true;
        });
        builder.addCase(createCommentAction.fulfilled,(state,action)=> {
            state.comment.push = action.payload;
            state.loading = false;
            state.error = null;
            state.success= true;
        });
        builder.addCase(createCommentAction.rejected,(state,action)=> {
            state.error = action.payload;
            state.loading = false;
            state.success = false;
        })

        //! Reset error Action
        builder.addCase(resetErrorAction,(state)=> {
            state.error = null;
        });
        //! Reset Success Action
        builder.addCase(resetSuccessAction,(state)=> {
            state.success = false;
        });

    },
});

//! generate reducer
const commentReducer = commentSlice.reducer;

export default commentReducer;