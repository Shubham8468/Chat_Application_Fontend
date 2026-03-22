import "./App.css";
import { connectSocket } from "./lib/socket";
import { setOnlineUsers } from "./store/slices/authSlice";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./store/slices/authSlice";
import { updatePresence } from "./store/slices/authSlice";
import { disconnectSocket } from "./lib/socket";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
const App = () => {
  const {isCheckingAuth,authUser}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const shouldUseSocket = import.meta.env.VITE_ENABLE_SOCKET === "true" && !import.meta.env.PROD;
  useEffect(()=>{
    dispatch(getUser());

  },[]) // Only run once on mount, not on dispatch changes

  useEffect(() => {
    if (!authUser) return;

    dispatch(updatePresence());
    const intervalId = setInterval(() => {
      dispatch(updatePresence());
    }, 20000);

    return () => clearInterval(intervalId);
  }, [authUser, dispatch]);

  useEffect(()=>{
    if (!shouldUseSocket) return;
    if(authUser){
      const socket=connectSocket(authUser._id);
      socket.off('getOnlineUsers');
      socket.on('getOnlineUsers',(users)=>{
        dispatch(setOnlineUsers(users))
      })
      return()=>disconnectSocket();
    }
    
  },[authUser, dispatch, shouldUseSocket]);
  if(isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }
  return <>
  
  <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={authUser ? <Home/> : <Navigate to={"/login"}/>}/>
      <Route path="/register" element={!authUser ? <Register/> : <Navigate to={"/"}/>}/>
      <Route path="/login" element={!authUser ? <Login/> : <Navigate to={"/"}/>}/>
      <Route path="/profile" element={authUser ? <Profile/> : <Navigate to={"/login"}/>}/>
    </Routes>
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "var(--bg-tertiary)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-md)",
          fontFamily: "Inter, sans-serif",
          fontSize: "0.9rem",
          borderRadius: "8px",
          padding: "12px 12px",
          boxShadow: "10px 10px 10px rgba(20, 9, 60, 0.15)",
          backgroundcolor:"var(--bg-secondary)",
        },
        success: {
          iconTheme: { primary: "#00d48a", secondary: "#fff" },
        },
        error: {
          iconTheme: { primary: "#ff6b6b", secondary: "#fff" },
        },
      }}
    />
  </Router>


  </>;
};

export default App;
