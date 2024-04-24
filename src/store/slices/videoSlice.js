import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../data";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    uploading: false,
    uploaded: false,
    videos: {
        docs: [],
        hasNextPage: false,

    },
    video: null,
    publish: false
}

export const getAllVideos = createAsyncThunk("getAllVideos", async ({ userId, sortBy, sortType, query, page, limit }) => {
    try {
        let url = '/video';
        if (page) url += `/?page=${page}`
        else url+='/?page=1'
        if(userId) url+=`&userId=${userId}`
        if(query) url+=`&query=${query}`
        if(limit) url+=`&limit=${limit}`
        if(sortBy) url+=`&sortBy=${sortBy}`
        if (sortType) url += `&sortType=${sortType}`
        
        const response = await axiosInstance.get(url);
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error while fetching videos.")
        throw error;
    }
})

export const publishAVideo = createAsyncThunk("publishAVideo", async (data) => {
    try {
        const response = await axiosInstance.post('/video/upload', data);
        toast.success(response.data.message || "Video uploaded successfully.");
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error while publish a video.")
        throw error;
    }
})

export const updateVideo = createAsyncThunk("updateVideo", async (videoId, data) => {
    try {
        const response = await axiosInstance.patch(`/video/${videoId}`, data);
        toast.success(response.data.message || "Video updated successfully.")
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error while updating video.")
        throw error;
    }
})

export const deleteVideo = createAsyncThunk("deleteVideo", async (videoId) => {
    try {
        const response = await axiosInstance.delete(videoId);
        toast.success(response.data.message || "Video deleted successfully.")
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error while fetching videos.")
        throw error;
    }
})

export const getVideoById = createAsyncThunk("getVideoById", async (videoId) => {
    try {
        const response = await axiosInstance.get(`/video/${videoId}`);
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error! No Video Found.")
        throw error;
    }
})

export const togglePublishStatus = createAsyncThunk("togglePublishStatus", async (videoId) => {
    try {
        const response = await axiosInstance.patch(`/video/status/${videoId}`);
        toast.success(response.data.message || "Publish Status Changed successfully.")
        return response.data.data.isPublished;
    } catch (error) {
        toast.error(error.message || "Error! publish status not changed.")
        throw error;
    }
})

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        updateUploadState: (state) => {
            state.uploading = false;
            state.uploaded = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllVideos.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos.docs = [...state.videos.docs, ...action.payload.docs];
            state.videos.hasNextPage = action.payload.hasNextPage;
        })
        builder.addCase(getAllVideos.rejected, (state) => {
            state.loading = false;
        })
        
        builder.addCase(publishAVideo.pending, (state) => {
            state.uploading = true;
        })
        builder.addCase(publishAVideo.fulfilled, (state, action) => {
            state.uploaded = true;
            state.uploading = false;
        })
        builder.addCase(publishAVideo.rejected, (state) => {
            state.uploaded = false;
            state.uploading = false;
        })

        builder.addCase(updateVideo.pending, (state) => {
            state.uploading = true;
        })
        builder.addCase(updateVideo.fulfilled, (state, action) => {
            state.uploading = false;
            state.uploaded = true;
        })
        builder.addCase(updateVideo.rejected, (state) => {
            state.uploading = false;
            state.uploaded = false;
        })

        builder.addCase(deleteVideo.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteVideo.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(deleteVideo.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(getVideoById.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getVideoById.fulfilled, (state, action) => {
            state.loading = false;
            state.video = action.payload;
        })
        builder.addCase(getVideoById.rejected, (state) => {
            state.loading = false;
            state.video = null;
        })

        builder.addCase(togglePublishStatus.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(togglePublishStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.publish = action.payload;
        })
        builder.addCase(togglePublishStatus.rejected, (state) => {
            state.loading = false;
        })

    }
})

export const { updateUploadState } = videoSlice.actions;
export default videoSlice.reducer;