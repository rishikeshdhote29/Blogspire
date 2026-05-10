import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../utils/apiConfig";

import {
    resetErrorAction,
    resetSuccessAction,
} from "../globalSlice/globalSlice";



const INITIAL_STATE = {
    loading: false,
    error: null,
    categories: [],
    category: null,
    success: false,
};

//!Fetch categories

export const fetchCategoriesAction = createAsyncThunk(
    "categories/lists",
    async(_, {rejectWithValue})=> {
        try {
            const {data} = await axios.get(
                apiUrl("/categories")
            );
            return data;
        } catch (error) {
            return  rejectWithValue(error?.response?.data);
        }
    }
);

//!Create category
export const createCategoryAction = createAsyncThunk(
    "categories/create",
    async(payload, {rejectWithValue, getState})=> {
        try {
            const state = getState();
            const token = state?.users?.userAuth?.userInfo?.token;
            
            console.log("Creating category with payload:", payload);
            console.log("Token:", token);
            
            if(!token) {
                return rejectWithValue({message: "Authentication token not found. Please login first."});
            }
            
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const {data} = await axios.post(
                apiUrl("/categories"),
                {name: payload},
                config
            );
            console.log("Category created successfully:", data);
            return data;
        } catch (error) {
            console.log("Error creating category:", error);
            console.log("Error response:", error?.response?.data);
            return  rejectWithValue(error?.response?.data);
        }
    }
);

//!categories slices

const categoriesSlice = createSlice({
    name: "categories",
    initialState: INITIAL_STATE,
    extraReducers:(builder)=> {
        //fetch categories
        builder.addCase(fetchCategoriesAction.pending,(state)=> {
            state.loading = true;
        });
        //handle fulfilled state
        builder.addCase(fetchCategoriesAction.fulfilled,(state,action)=> {
            state.categories = action.payload;
            state.success = true;
            state.loading = false;
            state.error= null;
        });

        //*Handle the rejection
        builder.addCase(fetchCategoriesAction.rejected,(state,action)=> {
            state.error = action.payload;
            state.loading = false;
        });

        //!Create category pending
        builder.addCase(createCategoryAction.pending,(state)=> {
            state.loading = true;
        });
        //!Create category fulfilled
        builder.addCase(createCategoryAction.fulfilled,(state,action)=> {
            console.log("Create category fulfilled:", action.payload);
            // Check if state.categories has allCategories property
            if(state.categories && state.categories.allCategories && Array.isArray(state.categories.allCategories)) {
                state.categories.allCategories.push(action.payload.category);
            }
            state.success = true;
            state.loading = false;
            state.error = null;
        });
        //!Create category rejected
        builder.addCase(createCategoryAction.rejected,(state,action)=> {
            console.log("Create category rejected:", action.payload);
            state.error = action.payload;
            state.loading = false;
            state.success = false;
        });

        //!Reset error action
        builder.addCase(resetErrorAction,(state)=> {
            state.error = null;
        })
        //!Reset success action
        builder.addCase(resetSuccessAction,(state)=> {
            state.success = false;
        });
    },
});

//!generate Reducer

const categoriesReducer = categoriesSlice.reducer;

export default categoriesReducer;