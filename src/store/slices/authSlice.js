import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance, setAuthToken } from '../../lib/axios';
import toast from 'react-hot-toast';

import { connectSocket, disconnectSocket } from '../../lib/socket';


export const getUser=createAsyncThunk("user/me",async(_,thunkAPI)=>{
    try{
        const res=await axiosInstance.get("/user/me")
        return res.data.user;

    }catch(err){
      console.log(`Error fetching user :${err}`)
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to fetch user");
    }
});
 export const  logout=createAsyncThunk("user/sign-out",async(_,thunkAPI)=>{
   try{
    await axiosInstance.get("/user/sign-out");
        setAuthToken(null);
    disconnectSocket();
    toast.success("Logged out successfully")
    return null;

   }catch(err){
        const message = err?.response?.data?.message || "Failed to logout";
        toast.error(message);
        return thunkAPI.rejectWithValue(message)
   }
})

export const  login=createAsyncThunk("user/sign-in",async (data,thunkAPI)=>{
    try{
        const res = await axiosInstance.post('/user/sign-in', data);
        if (!res?.data?.success) {
            throw new Error(res?.data?.message || 'Login failed');
        }

        if (res?.data?.token) {
            setAuthToken(res.data.token);
        }

        if (res?.data?.user) {
            toast.success('Logged in successfully.');
            return res.data.user;
        }

        const meRes = await axiosInstance.get('/user/me');
        if (!meRes?.data?.user) {
            throw new Error('Unable to load logged-in user');
    }
    toast.success('Logged in successfully.');
        return meRes.data.user;
    }catch(error){
        const message = error?.response?.data?.message || error?.message || "Login failed";
        toast.error(message);
        return thunkAPI.rejectWithValue(message)
    }
})
export const signup= createAsyncThunk("/auth/sign-up",async (data,thunkAPI)=>{
    try{
      const res = await axiosInstance.post("/user/sign-up",data)
      if (res?.data?.token) {
          setAuthToken(res.data.token);
      }

      if (res?.data?.user) {
          connectSocket(res.data.user?._id);
          toast.success("Account created successfully")
          return res.data.user;
      }

     const meRes = await axiosInstance.get('/user/me');
     if (!meRes?.data?.user) {
        throw new Error('Unable to load signed-up user');
     }
     connectSocket(meRes.data.user?._id);

     toast.success("Account created successfully")
     return meRes.data.user
    }catch(error){
        const message = error?.response?.data?.message || error?.message || "Signup failed";
        toast.error(message);
        return thunkAPI.rejectWithValue(message)

    }
})

export const updateProfile = createAsyncThunk("user/update-profile", async (data, thunkAPI) => {
    try {
        const res = await axiosInstance.put("/user/update-profile", data);

        toast.success(res?.data?.message || "Profile updated successfully");
        return res?.data?.user;
    } catch (error) {
        const message = error?.response?.data?.message || "Failed to update profile";
        toast.error(message);
        return thunkAPI.rejectWithValue(message);
    }
})

export const updatePresence = createAsyncThunk("user/presence", async (_, thunkAPI) => {
    try {
        const res = await axiosInstance.put('/user/presence');
        return res?.data?.lastSeen;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Presence update failed');
    }
})


const authSlice= createSlice({
    name:"auth",
    initialState:{
        authUser:null,
        isSigningUp:false,
        isLogginIn:false,
        isUpdatingProfile:false,
        isCheckingAuth:true,
        onlineUsers:[],
    },
    reducers:{
        setOnlineUsers(state,action){
            state.onlineUsers=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getUser.fulfilled,(state,action)=>{
            state.authUser=action.payload,
            state.isCheckingAuth=false;
        })
        builder.addCase(getUser.rejected,(state,action)=>{
            state.authUser=null;
            state.isCheckingAuth=false
        }).addCase(logout.fulfilled,(state)=>{
            state.authUser=null;  
        }).addCase(logout.rejected,(state)=>{
            state.authUser=state.authUser;
        }).addCase(login.pending,(state)=>{
            state.isLogginIn=true;
        }).addCase(login.fulfilled,(state,action)=>{
            state.authUser=action.payload;
            state.isLogginIn=false
        }).addCase(login.rejected,(state)=>{
            state.isLogginIn=false;
        }).addCase(signup.pending,(state)=>{
            state.isSigningUp=true;
        }).addCase(signup.fulfilled,(state,action)=>{
            state.authUser=action.payload;
            state.isSigningUp=false
        }).addCase(signup.rejected,(state)=>{
            state.isSigningUp=false;
        }).addCase(updateProfile.pending,(state)=>{
            state.isUpdatingProfile=true;
        }).addCase(updateProfile.fulfilled,(state,action)=>{
            state.authUser=action.payload;
            state.isUpdatingProfile=false;
        }).addCase(updateProfile.rejected,(state)=>{
            state.isUpdatingProfile=false;
        }).addCase(updatePresence.fulfilled,(state,action)=>{
            // Don't update UI on presence heartbeat - just keeping backend in sync
        })
    }, 
})
export const {setOnlineUsers} =authSlice.actions;
export default authSlice.reducer;