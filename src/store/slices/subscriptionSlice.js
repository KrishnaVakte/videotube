import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../data";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    subcribedChannels: [],
    channelSubscribers: [],
    isSubscribed: false
}

export const toggleSubscription = createAsyncThunk("toggleSubscription", async (channelId) => {
    try {
        const response = await axiosInstance.post(`/subscription/c/${channelId}`);
        toast.success(response.data.message || "Subscription status changed.")
        return response.data.data.subscribed;
    } catch (error) {
        toast.error(error.message || "Error! subscribe status not changed.")
        throw error;
    }
})

export const getUserChannelSubscribers = createAsyncThunk("getUserChannelSubscribers", async (channelId) => {
    try {
        const response = await axiosInstance.get(`/subscription/u/${channelId}`);
        return response.data.data.subscribers;
    } catch (error) {
        toast.error(error.message || "Error while fetching subscriber list.")
        throw error;
    }
})

export const getSubscribedChannels = createAsyncThunk("getSubscribedChannels", async (channelId) => {
    try {
        const response = await axiosInstance.get(`/subscription/c/${channelId}`);
        return response.data.data.subscribedChannels;
    } catch (error) {
        toast.error(error.message || "Error while fetching subscribed channel list.")
        throw error;
    }
})

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(toggleSubscription.fulfilled, (state,action) => {
            state.isSubscribed = action.payload;
        })

        builder.addCase(getUserChannelSubscribers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUserChannelSubscribers.fulfilled, (state,action) => {
            state.loading = true;
            state.channelSubscribers = action.payload;
        })
        builder.addCase(getUserChannelSubscribers.rejected, (state,action) => {
            state.loading = false;
            state.channelSubscribers =[];
        })

        builder.addCase(getSubscribedChannels.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getSubscribedChannels.fulfilled, (state,action) => {
            state.loading = true;
            state.subcribedChannels = action.payload;
        })
        builder.addCase(getSubscribedChannels.rejected, (state,action) => {
            state.loading = false;
            state.subcribedChannels =[];
        })
    }
})

export default subscriptionSlice.reducer;