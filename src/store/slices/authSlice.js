import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../lib/axios';
import toast from 'react-hot-toast';

import { disconnectSocket } from '../../lib/socket';


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
}
)

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
        })
    }, 
})
export const {setOnlineUsers} =authSlice.actions;
export default authSlice.reducer;