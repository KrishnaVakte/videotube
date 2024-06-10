import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    subscribed: null,
    channelSubscribers: [],
    mySubscriptions: [],
};

export const toggleSubscription = createAsyncThunk(
    "toggleSubscription",
    async (channelId) => {
        try {
            const response = await axiosInstance.patch(
                `subscription/c/${channelId}`,null, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                    }
                }
            );
            return response.data.data.subscribed;
        } catch (error) {
            toast.error("Some Error Occured , try again..");
            throw error;
        }
    }
);

export const getUserChannelSubscribers = createAsyncThunk(
    "getUserChannelSubscribers",
    async (channelId) => {
        try {
            const response = await axiosInstance.post(
                `subscription/c/${channelId}`,null,{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                    }
                }
            );
            return response.data.data;
        } catch (error) { 
            toast.error("Some Error Occured , try again..");
            throw error;
        }
    }
);

export const getSubscribedChannels = createAsyncThunk(
    "getSubscribedChannels",
    async (subscriberId) => {
        try {
            const response = await axiosInstance.post(
                `subscription/u/${subscriberId}`,null,{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                    }
                }
            );
            return response.data.data[0].subscribedChannels;
        } catch (error) {
            return error;
        }
    }
);

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(toggleSubscription.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(toggleSubscription.fulfilled, (state, action) => {
            state.loading = false;
            state.subscribed = action.payload;
        });
        builder.addCase(getUserChannelSubscribers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            getUserChannelSubscribers.fulfilled,
            (state, action) => {
                state.loading = false;
                state.channelSubscribers = action.payload;
            }
        );
        builder.addCase(getSubscribedChannels.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getSubscribedChannels.fulfilled, (state, action) => {
            state.loading = false;
            state.mySubscriptions = action.payload;
        });
    },
});

export default subscriptionSlice.reducer;
