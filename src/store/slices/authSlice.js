import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../lib/axios';

import { connectSocket, disconnectSocket } from '../../lib/socket';


export const getUser=createAsyncThunk("user/me",async(_,thunkAPI)=>{
    try{
        const res=await axiosInstance.get("/user/me")
        connectSocket(res.data.user);
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
    return null;

   }catch(err){
        toast.error(err.response.data.message);
        return thunkAPI.rejectWithValue(err.response.data.message)
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
        })
    },


})
export const {setOnlineUsers} =authSlice.actions;
export default authSlice.reducer;