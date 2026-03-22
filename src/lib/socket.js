import {io} from 'socket.io-client'
let socket=null;

export const connectSocket=(userId)=>{
    const serverUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? "https://chat-application-backend-rust.vercel.app" : "http://localhost:4800");
    socket=io(
        serverUrl,
        {
            withCredentials:true,
            transports:["websocket","polling"],
            reconnection:true,
            query:{userId} // yahi to backend to pass krenge 
        }
    );
    return socket;
}
export const getSocket=()=>socket;

export const disconnectSocket=()=>{
    if(socket){
        socket.disconnect();
        socket=null;
    }
}