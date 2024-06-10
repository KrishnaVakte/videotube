import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";


const initialState = {
    loading: false,
    comments: [],
    totalComments: null,
    hasNextPage: false,
};

export const createAComment = createAsyncThunk(
    "createAComment",
    async ({ videoId, content }) => {
        try {
            const response = await axiosInstance.post(`/comment/v/${videoId}`,{content},{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                }
            });
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const editAComment = createAsyncThunk(
    "editAComment",
    async ({ commentId, content }) => {
        try {
            const response = await axiosInstance.patch(
                `/comment/c/${commentId}`,
                content,{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                    }
                }
            );
            toast.success(response.data?.message);
            return response.data.data;
        } catch (error) {
            toast.error("Some Error Occured , try again..");
            throw error;
        }
    }
);

export const deleteAComment = createAsyncThunk(
    "deleteAComment",
    async (commentId) => {
        try {
            const response = await axiosInstance.delete(
                `/comment/c/${commentId}`,{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                    }
                }
            );
            toast.success(response.data.message);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            toast.error("Some Error Occured , try again..");
            throw error;
        }
    }
);

export const getVideoComments = createAsyncThunk(
    "getVideoComments",
    async ({ videoId, page, limit }) => {

        try {
            const response = await axiosInstance.patch(`/comment/v/${videoId}?page=${page || 1}&limit=${limit || 10}`,null,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                }
            });
            return response.data.data;
        } catch (error) {
            toast.error("Some Error Occured , try again..");
            throw error;
        }
    }
);

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        cleanUpComments: (state) => {
            state.comments = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getVideoComments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getVideoComments.fulfilled, (state, action) => {
            state.loading = false;
            state.comments = [...state.comments, ...action.payload];
            if (action.payload.length) {
                state.hasNextPage = true;
            }
            else {
                state.hasNextPage = false;
            } 
            state.totalComments = state.comments.length;
        });
        builder.addCase(createAComment.fulfilled, (state, action) => {
            // state.comments.unshift(action.payload);
            // state.totalComments++;
            // console.log(state.comments)
        });
        builder.addCase(deleteAComment.fulfilled, (state, action) => {
            state.comments = state.comments.filter(
                (comment) => comment._id !== action.payload._id
            );
            state.totalComments--;
        });
    },
});

export const { cleanUpComments } = commentSlice.actions;

export default commentSlice.reducer;
