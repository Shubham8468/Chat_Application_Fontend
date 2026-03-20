import {io} from 'socket.io-client'
let socket=null;

export const connectSocket=(userId)=>{
    socket=io(
        import.meta.env.MODE=== "http://localhost:4800",
        {
            query:{userId} // yahi to backend to pass krenge 
        }
    );
    return socket;
}
export const getSocket=()=>socket;

export const disconnectSocket=()=>{
    if(socket){
        socket.disconnet();
        socket=null;
    }
}