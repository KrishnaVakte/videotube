import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../data";
import toast from 'react-hot-toast'

const initialState = {
    status: false,
    loading: false,
    userData: {}
}

export const registerUser = createAsyncThunk("registerUser", async (data) => {
    try {
        const response = await axiosInstance.post("/user/register", data);
        toast.success("User Register Successfully.")
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Error while register user.")
        throw error;
    }
} )

export const loginUser = createAsyncThunk("loginUser", async (data) => {
    try {
        const response = await axiosInstance.post("/user/login", data);
        toast.success("User Login Successfully.")
        return response.data.data.user;
    } catch (error) {
        toast.error(error.message || "Error while login user.");
        throw error;
    }
})

export const getUser = createAsyncThunk("getUser", async () => {
    try {
        const response = await axiosInstance.get("/user/current-user");
        return response.data.data;
    } catch (error) {
        throw error;
    }
})

export const logoutUser = createAsyncThunk('logoutUser', async () => {
    try {
        const response = await axiosInstance.post('/user/logout')
        toast.success("User Logout Successfully.");
        return response.data;
    } catch (error) {
        toast.error(error.message || "ERROR! logout user.")
        throw error;
    }
    
})

export const refreshAccessToken = createAsyncThunk('refreshAccessToken', async () => {
    try {
        const response = await axiosInstance.post("/user/refresh-token");
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "ERROR! refresh token")
        throw error;
    }
})

export const changePassword = createAsyncThunk("changePassword", async (data) => {
    try {
        const response = await axiosInstance.post("/user/chagne-password", data);
        toast.success(response?.data?.message)
        return response.data;
    } catch (error) {
        toast.error(error.message || "ERROR! Password not changed.")
    }
})

export const updateUser = createAsyncThunk("updateUser", async (data) => {
    try {
        const response = await axiosInstance.post("/user/update-account",data)
        toast.success(response?.data?.message)
        return response.data.data;
    } catch (error) {
        
    }
})

export const updateAvatar = createAsyncThunk("updateAvatar", async (avatar) => {
    try {
        const response = await axiosInstance.post('/user/avatar', avatar);
        toast.success(response?.data?.message || "Avatar updated successfully.")
        return response.data.data;
    } catch (error) {
        toast.error("ERROR! avatar not updated.")
        throw error;
    }
})
export const updateCoverImage = createAsyncThunk("updateCoverImage", async (coverImage) => {
    try {
        const response = await axiosInstance.post('/user/cover-image', coverImage);
        toast.success(response?.data?.message)
        return response.data.data;
    } catch (error) {
        toast.error("ERROR! Cover image not updated.")
        throw error;
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        })
        builder.addCase(loginUser.rejected, (state) => {
            state.loading = false
        })
         
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        })
        builder.addCase(registerUser.rejected, (state) => {
            state.loading = false
        })
         
        builder.addCase(getUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        })
        builder.addCase(getUser.rejected, (state) => {
            state.loading = false;
            state.userData = null;
            state.status = false;
        })
         
        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.status = false;
            state.userData = null;
        })
        builder.addCase(logoutUser.rejected, (state) => {
            state.loading = false;
        })
         
        builder.addCase(refreshAccessToken.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(refreshAccessToken.rejected, (state) => {
            state.loading = false;
        })
         
        builder.addCase(updateAvatar.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAvatar.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        })
        builder.addCase(updateAvatar.rejected, (state) => {
            state.loading = false
        })
         
        builder.addCase(updateCoverImage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCoverImage.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        })
        builder.addCase(updateCoverImage.rejected, (state) => {
            state.loading = false
        })
         
        builder.addCase(changePassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(changePassword.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        })
        builder.addCase(updateUser.rejected, (state) => {
            state.loading = false
        })
         
    }
})



export default authSlice.reducer;