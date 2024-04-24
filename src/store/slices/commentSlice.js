import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../data";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    comments: [],
    hasNextPage: true
}


export const addComment = createAsyncThunk("addComment", async (videoId, content) => {
    try {
        const response = await axiosInstance.post(`/comment/v/${videoId}`, content);
        toast.success(response.data.message || "Comment posted.")
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error! comment not created.")
        throw error;
    }
})

export const updateComment = createAsyncThunk("updateComment", async (commentId, content) => {
    try {
        const response = await axiosInstance.post(`/comment/c/${commentId}`, content);
        toast.success(response.data.message || "Comment Edited successfully.")
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error! comment not edited.")
        throw error;
    }
})


export const deleteComment = createAsyncThunk("deleteComment", async (commentId) => {
    try {
        const response = await axiosInstance.delete(`/comment/c/${commentId}`);
        toast.success(response.data.message || "Comment deleted successfully.")
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error! comment not deleted.")
        throw error;
    }
})

export const getVideoComments = createAsyncThunk("getVideoComments", async (videoId, {page,limit}) => {
    try {
        const response = await axiosInstance.get(`/comment/v/${videoId}?page=${page || 1}&limit=${limit || 10}`);
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error! comment not created.")
        throw error;
    }
})

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        cleanComments: (state) => {
            state.comments = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getVideoComments.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getVideoComments.fulfilled, (state,action) => {
            state.loading = false;
            state.comments = [...state.comments, ...action.payload];            
        })
    }
})

export const { cleanComments } = commentSlice.actions;
export default commentSlice.reducer;