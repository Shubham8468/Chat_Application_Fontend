import {io} from 'socket.io-client'
let socket=null;

export const connectSocket=(userId)=>{
    const serverUrl = import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? "https://chat-application-backend-peach.vercel.app" : "http://localhost:4800");
    const isProd = import.meta.env.PROD;

    socket=io(
        serverUrl,
        {
            withCredentials:true,
            // Vercel serverless often rejects websocket upgrades; polling is safer in production.
            transports:isProd ? ["polling"] : ["websocket","polling"],
            upgrade: !isProd,
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