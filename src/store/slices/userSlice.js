import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../data";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    channelData: null,
    history: []
}

export const getChannelProfile = createAsyncThunk('getChannelProfile', async (username) => {
    try {
        const response = await axiosInstance.get(`/user/c/${username}`);
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error while fetching channel profile.");
        throw error;
    }
})

export const getWatchHistory = createAsyncThunk("getWatchHistory", async () => {
    try {
        const response = await axiosInstance.get('user/history');
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error while getting watch history.")
        throw error;
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getChannelProfile.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getChannelProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.channelData = action.payload;
        })
        builder.addCase(getChannelProfile.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(getWatchHistory.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getWatchHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.history = action.payload;
        })
        builder.addCase(getWatchHistory.rejected, (state) => {
            state.loading = false;
        })
    }
})

export default userSlice.reducer;