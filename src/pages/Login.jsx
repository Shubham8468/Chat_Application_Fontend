import { Eye, EyeOff, Link, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { login } from "../store/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { isLogginIn } = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();// isko form ke submit hone se pehle page reload hone se rokta hai
    const resultAction = await dispatch(login(formData));
    if (login.fulfilled.match(resultAction)) {
      navigate("/");
    }
  }

  return <>
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Lift Side - FORM */}
      <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-md">
          {/* LOGO & HEADING */}
          <div className="flex flex-col  items-center text-center mb-10">
            <div className="bg-blue-100 p-3 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-2">Sign in to your account</p>
          </div>

          {/* FORM   */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
            <button type="submit" disabled={isLogginIn} // when user click on button to submit form to backend then isLogginIn true ho jayega aur button disable ho jayega taki user dobara click na kr paye jab tk response na aa jaye
              className="bg-blue-600 hover:bg-blue-300 text-white font-medium py-2 rounded-full w-full transition duration-200 flex justify-center items-center gap-2">
              {
                isLogginIn ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Logging In...
                  </>

                ) : (
                  "Sign In"
                )
              }

            </button>
          </form>
          {/*Footer */}
          <div className="mt-6 text-center">
            <p onClick={() => { navigate('/register') }} className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer">
              Don't have an account?
              <span className="text-blue-600 hover:underline ml-1">
                Register
              </span>
            </p>
          </div>

        </div>
      </div>
      {/* Right Side - IMAGE */}
      <div className="hidden lg:flex item-center jsutify-center p-2  rounded-l-3xl">  
      <AuthImagePattern title={"Welcome Back!"} subtitle={"Stay connected with your friends, teams, and communities through seamless real-time conversations.  "} />
        </div>
    </div>

  </>;
};

export default Login;
