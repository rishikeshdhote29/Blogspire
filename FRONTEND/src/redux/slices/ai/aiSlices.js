import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../utils/apiConfig";

const INITIAL_STATE = {
    loading: false,
    error: null,
    titles: null,
    summary: null,
    success: false,
};

export const generateTitleAction = createAsyncThunk(
    "ai/generate-titles",
    async (content, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(apiUrl("/ai/generate-titles"), content);
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
    },
);

const aiSlice = createSlice({
    name: "ai",
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        builder.addCase(generateTitleAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(generateTitleAction.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.titles = action.payload.titles;
        });
        builder.addCase(generateTitleAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        });
    },
});

const aiReducers = aiSlice.reducer;
export default aiReducers;