import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { axiosInstance } from '../../lib/axios'
import toast from 'react-hot-toast';




export const getUsers=createAsyncThunk('chat/getUsers',async (_,thunkAPI)=>{
    try{
        const res= await axiosInstance.get("/message/users");
        return res.data.filteredUser || res.data.users || []

    }catch(error){
      toast.error(error.response?.data.messages || "Fialed to fetch users");
      return thunkAPI.rejectWithValue(error.response?.data?.messages)
    }
})

export const getMessages = createAsyncThunk('chat/getMessages', async (reciverId, thunkAPI) => {
    try {
        const res = await axiosInstance.get(`/message/${reciverId}`);
        return res?.data?.messages || [];
    } catch (error) {
        const message = error?.response?.data?.message || 'Failed to fetch messages';
        toast.error(message);
        return thunkAPI.rejectWithValue(message);
    }
})

export const sendMessage = createAsyncThunk('chat/sendMessage', async ({ reciverId, text, media }, thunkAPI) => {
    try {
        const formData = new FormData();
        if (text && text.trim().length > 0) {
            formData.append('text', text.trim());
        }
        if (media) {
            formData.append('media', media);
        }

        const res = await axiosInstance.post(`/message/send/${reciverId}`, formData);

        return res.data;
    } catch (error) {
        const message = error?.response?.data?.message || 'Failed to send message';
        toast.error(message);
        return thunkAPI.rejectWithValue(message);
    }
})

const chatSlice =createSlice ({
    name:"chat",
    initialState:{
        messages:[],
        users:[],
        selectedUser:null,
        isUsersLodding:false,
        isMessageLoading:false,
        isSendingMessage:false,
    },
    reducers:{
        selectedUser:(state,action)=>{
            state.selectedUser=action.payload
            state.messages=[]
        },
        pushNewMessage:(state,action)=>{
            const alreadyExists = state.messages.some((msg) => msg._id === action.payload?._id);
            if (!alreadyExists) {
                state.messages.push(action.payload)
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getUsers.pending,(state)=>{
            state.isUsersLodding=true
        }).addCase(getUsers.fulfilled,(state,action)=>{
            state.users=action.payload;
            state.isUsersLodding=false

        }).addCase(getUsers.rejected,(state)=>{
            state.isUsersLodding=false
        }).addCase(getMessages.pending, (state) => {
            state.isMessageLoading = true;
        }).addCase(getMessages.fulfilled, (state, action) => {
            state.messages = action.payload;
            state.isMessageLoading = false;
        }).addCase(getMessages.rejected, (state) => {
            state.isMessageLoading = false;
        }).addCase(sendMessage.pending, (state) => {
            state.isSendingMessage = true;
        }).addCase(sendMessage.fulfilled, (state, action) => {
            state.messages.push(action.payload);
            state.isSendingMessage = false;
        }).addCase(sendMessage.rejected, (state) => {
            state.isSendingMessage = false;
        })
    }

})

export const { selectedUser, pushNewMessage}=chatSlice.actions;
export default chatSlice.reducer;