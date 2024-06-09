import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    uploading: false,
    uploaded: false,
    videos: [],
    video: null,
    publishToggled: false,
};

export const getAllVideos = createAsyncThunk(
    "getAllVideos",
    async ({ userId, sortBy, sortType, query, page, limit }) => {
        try {
            let url = '/video';
        if (page) url += `?page=${page}`
        else url+='?page=1'
        if(userId) url+=`&userId=${userId}`
        if(query) url+=`&query=${query}`
        if(limit) url+=`&limit=${limit}`
        if(sortBy) url+=`&sortBy=${sortBy}`
        if (sortType) url += `&sortType=${sortType}`

        const response = await axiosInstance.get(url);

            return response.data.data;
        } catch (error) {
            toast.error("Some Error Occured , try again..");
            throw error;
        }
    }
);

export const publishAvideo = createAsyncThunk("publishAvideo", async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile[0]);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append('accessToken', localStorage.getItem('accessToken'))
    
    try {
        const response = await axiosInstance.post("/video/upload",formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
            }
        } );
        toast.success(response?.data?.message);
        return response.data.data;
    } catch (error) {
        toast.error("Some Error Occured , try again..");
        throw error;
    }
});

export const updateAVideo = createAsyncThunk(
    "updateAVideo",
    async ({ videoId, data }) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("thumbnail", data.thumbnail[0]);

        try {
            const response = await axiosInstance.patch(
                `/video/${videoId}`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                    }
                }
            );
            toast.success(response?.data?.message);
            return response.data.data;
        } catch (error) {
            toast.error("Some Error Occured , try again..");
            throw error;
        }
    }
);

export const deleteAVideo = createAsyncThunk(
    "deleteAVideo",
    async (videoId) => {
        try {
            const response = await axiosInstance.delete(`/video/${videoId}`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                }
            });
            toast.success(response?.data?.message);
            return response.data.data;
        } catch (error) {
            toast.error("Some Error Occured , try again..");
            throw error;
        }
    }
);

export const getVideoById = createAsyncThunk(
    "getVideoById",
    async ({ videoId }) => {
        try {
            const response = await axiosInstance.post(`/video/${videoId}`,null,{
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

export const togglePublishStatus = createAsyncThunk(
    "togglePublishStatus",
    async (videoId) => {
        try {
            const response = await axiosInstance.patch(
                `/video/status/${videoId}`,null, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                    }
                }
            );
            toast.success(response.data.message);
            return response.data.data.isPublished;
        } catch (error) {
            toast.error("Some Error Occured , try again..");
            throw error;
        }
    }
);

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        updateUploadState: (state) => {
            state.uploading = false;
            state.uploaded = false;
        },
        makeVideosNull: (state) => {
            state.videos = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllVideos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos= action.payload;
        });
        builder.addCase(publishAvideo.pending, (state) => {
            state.uploading = true;
        });
        builder.addCase(publishAvideo.fulfilled, (state) => {
            state.uploading = false;
            state.uploaded = true;
        });
        builder.addCase(updateAVideo.pending, (state) => {
            state.uploading = true;
        });
        builder.addCase(updateAVideo.fulfilled, (state) => {
            state.uploading = false;
            state.uploaded = true;
        });
        builder.addCase(deleteAVideo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteAVideo.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(getVideoById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getVideoById.fulfilled, (state, action) => {
            state.loading = false;
            state.video = action.payload;
        });
        builder.addCase(togglePublishStatus.fulfilled, (state) => {
            state.publishToggled = !state.publishToggled;
        });
    },
});

export const { updateUploadState, makeVideosNull } = videoSlice.actions;

export default videoSlice.reducer;
