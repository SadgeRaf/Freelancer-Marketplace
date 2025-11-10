import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const {logIn,setUser,googleSignUp} = use(AuthContext);
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    
    const pattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!pattern.test(password)){
      setPasswordError('Password must be atlest 6 characters long and needs to have atleast 1 uppercase and 1 lowercase');
      return ;
    }

    setPasswordError('');

    logIn(email,password).then((res)=>{
      const user = res.user;
      setUser(user);
      toast.success("Logged in Succesfully");
      navigate(`${location.state ? location.state : '/'}`);
      form.reset();
    }).catch((error)=>{
      toast.error(error.message);
      setPasswordError(error.message);
    })
    
  }

  const handleToggle = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  const handleGoogle = () => {
    googleSignUp()
    .then(res => {
      const user = res.user;
      setUser(user);
      toast.success("Signed up with Google!")
    })
    .catch(error=>{
      toast.error(error.message);
    })
  }

  const handlePasswordReset = () => {
    navigate("/forgot");
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 mt-20">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-sm p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label text-gray-600">Email</label>
            <input
              name='email'
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className='relative'>
            <label className="label text-gray-600">Password</label>
            <input
              name='password'
              type={showPassword ? 'text' : "password"}
              className="input input-bordered w-full"
              placeholder="Enter your password"
              required
            />
            <button onClick={handleToggle} className='absolute right-3 top-9'>
              {showPassword ? <IoIosEyeOff /> : <FaEye />}
            </button>

            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button onClick={handlePasswordReset} className="text-blue-500 text-sm hover:underline">
              Forgot Password?
            </button>
          </div>

          <button type='submit' className="btn btn-neutral w-full mt-2">Login</button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{' '}
          <Link to='/auth/registration' className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>

        <div className='flex justify-center items-center flex-row relative'>
          <button onClick={handleGoogle} className="btn w-full mt-2 ">Sign up with <span className='text-blue-500'>Google</span></button>
          <FaGoogle className='absolute left-57 top-5'/>
        </div>
      </div>
    </div>
  );
};

export default Login;
