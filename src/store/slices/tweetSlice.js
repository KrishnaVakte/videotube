import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../data";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    tweets: []
}

export const createTweet = createAsyncThunk("createTweet", async (content) => {
    try {
        const response = await axiosInstance.post('/tweet', content);
        toast.success(response.data.message || "Tweet uploaded successfully.");
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error while creating tweet.")
        throw error;
    }
})

export const getUserTweet = createAsyncThunk("getUserTweet", async (username) => {
    try {
        const response = await axiosInstance.get(`/tweet/${username}`);
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error while get user tweet.")
        throw error;
    }
})

export const updateTweet = createAsyncThunk("updateTweet", async (tweetId,content) => {
    try {
        const response = await axiosInstance.patch(`/tweet/${tweetId}`, content);
        toast.success(response.data.message || "Tweet updated successfully.")
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error while updating tweet.")
        throw error;
    }
})

export const deleteTweet = createAsyncThunk("deleteTweet", async (tweetId) => {
    try {
        const response = await axiosInstance.delete(`/tweet/${tweetId}`, content);
        toast.success(response.data.message || "Tweet deleted successfully.")
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error while deleting tweet.")
        throw error;
    }
})

const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createTweet.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createTweet.fulfilled, (state,action) => {
            state.loading = false;
        })
        builder.addCase(createTweet.pending, (state) => {
            state.loading = false;
        })
        
        builder.addCase(updateTweet.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateTweet.fulfilled, (state,action) => {
            state.loading = false;
        })
        builder.addCase(updateTweet.pending, (state) => {
            state.loading = false;
        })

        builder.addCase(deleteTweet.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteTweet.fulfilled, (state,action) => {
            state.loading = false;
        })
        builder.addCase(deleteTweet.pending, (state) => {
            state.loading = false;
        })

        builder.addCase(getUserTweet.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUserTweet.fulfilled, (state,action) => {
            state.loading = false;
            state.tweets = action.payload;
        })
        builder.addCase(getUserTweet.pending, (state) => {
            state.loading = false;
        })

    }
})

export default tweetSlice.reducer;