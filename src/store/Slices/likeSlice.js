import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    likedVideos: [],
};

export const toggleVideoLike = createAsyncThunk(
    "toggleVideoLike",
    async (videoId) => {
        try {
            const response = await axiosInstance.post(
                `/like/toggle/v/${videoId}`,{accessToken: localStorage.getItem('accessToken')}
            );
            return response.data.data;
        } catch (error) {
            toast.error("Some Error Occured , try again..");
            throw error;
        }
    }
);

export const toggleTweetLike = createAsyncThunk(
    "toggleTweetLike",
    async (tweetId) => {
        try {
            const response = await axiosInstance.post(
                `/like/toggle/t/${tweetId}`,{accessToken: localStorage.getItem('accessToken')}
            );
            return response.data.data;
        } catch (error) {
            toast.error("Some Error Occured , try again..");
            throw error;
        }
    }
);

export const toggleCommentLike = createAsyncThunk(
    "toggleCommentLike",
    async (commentId) => {
        try {
            const response = await axiosInstance.post(
                `/like/toggle/c/${commentId}`,{accessToken: localStorage.getItem('accessToken')}
            );
            return response.data.data;
        } catch (error) {
            toast.error("Some Error Occured , try again..");
            throw error;
        }
    }
);

export const getLikedVideos = createAsyncThunk("getLikedVideos", async () => {
    try {
        const response = await axiosInstance.post("like/videos",{accessToken: localStorage.getItem('accessToken')});
        return response.data.data;
    } catch (error) {
        toast.error("Some Error Occured , try again..");
        throw error;
    }
});

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLikedVideos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getLikedVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.likedVideos = action.payload;
        });

    },
});

export default likeSlice.reducer;
