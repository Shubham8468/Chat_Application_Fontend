import {io} from 'socket.io-client'
let socket=null;

export const connectSocket=(userId)=>{
    const serverUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4800";
    socket=io(
        serverUrl,
        {
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