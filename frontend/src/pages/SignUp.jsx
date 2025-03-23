import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import Logo from '../assets/Logo.png'
import { Link, Navigate, useNavigate } from 'react-router'
import { useState } from 'react'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import {auth} from '/firebase/config'
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth';




const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const navigate=useNavigate()



    const handleGoogleSignIn = async () => {
      const provider = new GoogleAuthProvider();
    
      signInWithPopup(auth, provider)
        .then(async (result) => {
          console.log(result);
    
          if (result.user) {
            toast.success("User logged in successfully", {
              position: "top-center",
            });
    
            // Store user details in cookies (expires in 7 days)
            Cookies.set("user", JSON.stringify({
              name: result.user.displayName,
              email: result.user.email,
              photoURL: result.user.photoURL
            }), { expires: 7 });
    
            // Send user data to backend
            try {
              await axios.post(`${import.meta.env.VITE_PORT}/api/google-login`, {
                name: result.user.displayName,
                email: result.user.email,
              }, { headers: { "Content-Type": "application/json" } });
            } catch (error) {
              console.error("Error sending user data to backend:", error);
             }
    
            // Redirect to home
            window.location.href = "/home";
          }
        })
        .catch((error) => {
          console.error("Google Sign-In Error:", error);
          toast.error("Google login failed. Please try again.");
        });
    };
  

  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const userData = { name, email, phoneNumber, password, confirmPassword };
    
      try {
        const response = await axios.post(`${import.meta.env.VITE_PORT}/api/signup`, userData, {
          headers: { "Content-Type": "application/json" },
        }); 

        console.log(response)

       

        navigate("/home")
    
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNumber("");
      } catch (error) {
        if (error.response) {
          if (error.response.status === 409) {
            // User already exists
            toast.error("User already exists. Please log in.");
          } else if (error.response.data.errors) {
            // Handle other validation errors
            toast.error(error.response.data.errors.join("\n"));
          } else {
            toast.error(error.response.data.message || "Signup failed. Please try again.");
          }
        } else {
          toast.error("Server error. Please try again later.");
        }
      }
    };
    
  return (
    <div class="flex flex-row-reverse h-screen">
  <div class="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
  <div class="w-full h-full">
    <img className='w-full h-full object-cover' src='https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
  </div>
</div>

  <div class="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
    <div class="max-w-md w-full p-6">
      <img src={Logo} className='mb-4'/>
      <h1 class="text-sm font-semibold mb-6 text-gray-500 text-center">Explore More. Experience Life. </h1>
      <div class="mt-4 flex flex-col lg:flex-row items-center justify-between gap-4">
      <button type="submit" class="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign Up</button>
      <Link to='/login' type="submit" class=" text-center w-full border-2 p-2 rounded-md hover:bg-gray-800 hover:text-white focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Login In</Link>
      </div>
      <div class="mt-4 flex flex-col lg:flex-row items-center justify-between">
        <div class="w-full mb-2 lg:mb-0">
          <button onClick={handleGoogleSignIn} type="button" class="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4" id="google">
              <path fill="#fbbb00" d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"></path>
              <path fill="#518ef8" d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"></path>
              <path fill="#28b446" d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"></path>
              <path fill="#f14336" d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"></path>
            </svg> Sign Up with Google </button>
        </div>
      </div>
      <div class="mt-4 text-sm text-gray-600 text-center">
        <p>or with email</p>
      </div>
      <form onSubmit={handleSubmit} action="#" method="POST" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input onChange={(e)=>setName(e.target.value)} value={name}  type="text" id="name" name="name" class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" id="email" name="email" class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
        </div>
        <div>
          <label for="contact" class="block text-sm font-medium text-gray-700">Contact Number</label>
          <input onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber} type="number" id="contact" name="contact" class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" id="password" name="password" class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
        </div>
        <div>
          <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} type="password" id="confirm-password" name="confirm-password" class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
        </div>
        <div>
          <button type="submit" class="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Let's Start</button>
        </div>
        <ToastContainer />
      </form>
    </div>
  </div>
</div>
  )
}

export default SignUp
