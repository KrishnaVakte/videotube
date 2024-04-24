import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../data"
import toast from 'react-hot-toast'

const initialState = {
    loading: false,
    likedVidos: []
}

export const toggleCommentLike = createAsyncThunk("toggleCommentLike", async (commentId) => {
    try {
        const response = await axiosInstance.post(`/like/toggle/c/${commentId}`)
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error! comment not liked.")
        throw error;
    }
})

export const toggleTweetLike = createAsyncThunk("toggleTweetLike", async (tweetId) => {
    try {
        const response = await axiosInstance.post(`/like/toggle/t/${tweetId}`)
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error! tweet not liked.")
        throw error;
    }
})

export const toggleVideoLike = createAsyncThunk("toggleVideoLike", async (videoaId) => {
    try {
        const response = await axiosInstance.post(`/like/toggle/c/${videoaId}`)
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error! video not liked.")
        throw error;
    }
})

export const getLikedVideos = createAsyncThunk("getLikedVideos", async () => {
    try {
        const response = await axiosInstance.get(`/like/videos`)
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error! Videos not fetched.")
        throw error;
    }
})

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLikedVideos.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getLikedVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.likedVidos = action.payload;
        })
        builder.addCase(getLikedVideos.rejected, (state) => {
            state.loading = false;
        })
    }
})

export default likeSlice.reducer;