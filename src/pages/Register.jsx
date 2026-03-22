import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { useState } from "react";

import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/slices/authSlice";

import AuthImagePattern from "../components/AuthImagePattern";

const Register = () => {
  const navigate = useNavigate();
  const[showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName:"",
    email:"",
    password:"",
    
  });

  const dispatch = useDispatch();
  const {isSigningUp}=useSelector((state)=>state.auth);
  const handleSubmit =async (e)=>{
    e.preventDefault();
    dispatch(signup(formData));
  }




  return <>
   <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
     <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-8 ">
       <div className="w-full max-w-md">
       <div className="flex flex-col  items-center text-center mb-10">
            <div className="bg-blue-100 p-3 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">Create Account</h1>
            <p className="text-gray-500 text-sm mt-2">Get started with our platform</p>
          </div>
            {/* Register Form */}
           <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
  
      
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <User className="w-5 h-5" />
                </span>
                <input type="text" placeholder="Enter your full name" className="w-full border-gray-300 rounded-md py-2 pl-10 pr-3 focus-within:outline-none focus:ring-blue-500" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />


              </div>
            </div>


            <div className="rounded-md shadow-sm -space-y-px">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </span>
                <input type="email" placeholder="Enter your email" className="w-full border-gray-300 rounded-md py-2 pl-10 pr-3 focus-within:outline-none focus:ring-blue-500" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />


              </div>
            </div>


            <div className="rounded-md shadow-sm -space-y-px">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </span>
                <input type={showPassword ? "text" : "password"} placeholder="********" className="w-full border-gray-300 rounded-md py-2 pl-10 pr-3 focus-within:outline-none focus:ring-blue-500"
                  value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={isSigningUp} // when user click on button to submit form to backend then isLogginIn true ho jayega aur button disable ho jayega taki user dobara click na kr paye jab tk response na aa jaye
             className="bg-blue-600 hover:bg-blue-300 text-white font-medium py-2 rounded-full w-full transition duration-200 flex justify-center items-center gap-2">
              {
                isSigningUp ? (
                  <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing Up...
                  </>
                ): (
                  "Create Account"
                )
              }
            
            </button>
          </form>
          {/*Footer */}
          <div className="mt-6 text-center">
            <p onClick={() => {navigate('/login')}} className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer">
              Already have an account? 
              <span className="text-blue-600 hover:underline ml-1">
               Log In
              </span>
            </p>
          </div>
       </div>
     </div>
     <div className="hidden lg:flex item-center jsutify-center p-14  rounded-l-3xl">
     <AuthImagePattern title={"Join our Community!"} subtitle={"Connect with friends and build your network today. "} />
     </div>
    </div>
  </>;

};

export default Register;
