import React, { useState, use } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";


const Register = () => {
  const { createUser, setUser,updateUser,googleSignUp } = use(AuthContext);
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.');
      return;
    }

    setPasswordError('');

    createUser(email, password)
      .then((res) => {
        const user = res.user;
        updateUser({displayName : name, photoURL: photo}).then(()=>{
           setUser({...user, displayName : name, photoURL: photo});
           navigate("/");
        }).catch((error)=>{
           toast.error(error.message);
        });
        
        toast.success('✅ Account registered successfully!');
        form.reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  
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
        navigate(`${location.state ? location.state : '/'}`);
      })
      .catch(error=>{
        toast.error(error.message);
      })
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 mt-20">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-sm p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account 🐾
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label text-gray-600">Full Name</label>
            <input
              name="name"
              type="text"
              className="input input-bordered w-full"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="label text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full"
              placeholder="Your email"
              required
            />
          </div>

          <div>
            <label className="label text-gray-600">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="input input-bordered w-full"
              placeholder="Profile picture link"
              required
            />
          </div>

          <div className="relative">
            <label className="label text-gray-600">Password</label>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="input input-bordered w-full pr-10"
              placeholder="Create a password"
              required
            />

            
            <button
              type="button"
              onClick={handleToggle}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700">
              {showPassword ? <IoIosEyeOff /> : <FaEye />}
            </button>

            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button type="submit" className="btn btn-neutral w-full mt-2">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login
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

export default Register;
