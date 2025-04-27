import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  
  const {token, setToken, backendURL} = useContext(ShopContext)
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  },[token, navigate])

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendURL+"/api/v1/user/register", {name, email, password})
        // console.log(response.data)

        if (response.data.success) {
          setToken(response.data.token) 
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }


      } else {
        const response = await axios.post(backendURL+"/api/v1/user/login", {email,password})
        // console.log(response.data)

        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="">
      <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 text-gray-800">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-700" />
        </div>
        {currentState === "Login" ? (
          ""
        ) : (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        )}
        <input
          type="email"
          className="w-full px-3 py-2 border mt-2 border-gray-800"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          className="w-full px-3 py-2 border mt-2 border-gray-800"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="w-full flex justify-between text-sm mt-[4px]">
          <p className="cursor-pointer ">Forget Your Password</p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer"
            >
              Login Here
            </p>
          )}
        </div>
        <button className="mt-6 bg-black text-white font-light px-8 py-2 cursor-pointer">
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
