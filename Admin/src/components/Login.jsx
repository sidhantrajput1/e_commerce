import React, { useState } from "react";
import axios from 'axios'
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({setToken}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl+'/api/v1/user/admin', {email, password})
            // console.log(response)
            if(response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div  className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">
          Admin Panel
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Email Address
            </label>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="your@gmail.com"
              className="rounded-md w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Password
            </label>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              className="rounded-md w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold transition-all duration-300 hover:bg-blue-700 hover:shadow-md active:scale-95"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
