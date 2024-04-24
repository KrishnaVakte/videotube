import { configureStore } from "@reduxjs/toolkit" 
import authSliceReducer from "./slices/authSlice";
import userSliceReducer from "./slices/userSlice";
import videoSliceReducer from "./slices/videoSlice";
import tweetSliceReducer from "./slices/tweetSlice";
import subscriptionSliceReducer from "./slices/subscriptionSlice";
import likeSliceReducer from "./slices/likeSlice";
import commentSliceReducer from "./slices/commentSlice";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        user: userSliceReducer,
        video: videoSliceReducer,
        tweet: tweetSliceReducer,
        subscription: subscriptionSliceReducer,
        like: likeSliceReducer,
        comment: commentSliceReducer,
    }
})

export default store;