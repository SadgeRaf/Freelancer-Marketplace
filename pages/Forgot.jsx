import React, { use } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const { resetPassword } = use(AuthContext);
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    const email = e.target.email.value
    resetPassword(email)
      .then(() => {
        toast.success("Password reset email sent! Check your inbox.");
        e.target.reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  
  const handleNavigate = () => {
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Forgot Password
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your registered email, and we'll send you a password reset link.
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            name="email"
            required
          />

          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all">
            Send Reset Link
          </button>
        </form>
        <button onClick={handleNavigate} className="w-full bg-base-200 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all mt-4">Go Back</button>
      </div>
      
    </div>
  );
};

export default ForgotPassword;
