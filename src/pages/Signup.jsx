import React, { useState } from "react";
import bgimage from "../assets/netflixbg.jpg";
import { Link, useNavigate } from "react-router-dom";
import {UserAuth} from "../context/AuthContext";
import Lottie from "lottie-react";
import animationData from "../assets/thank-you.json";
import {AiFillGooglePlusCircle} from  "react-icons/ai"
import { signInWithPopup } from "firebase/auth";
const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [animation, setAnimation] = useState(false)
  const {user,signUp,handleGoogle} = UserAuth()
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      await signUp(email,password)
      setAnimation(true)
      setTimeout(() => {
        navigate("/")
      },3000)
      
    } catch (error) {
      console.log(error)
    }
  }
  const handleGoogleSign = async (e) => {
    e.preventDefault()
    try {
      await handleGoogle(user)
      setAnimation(true)
      setTimeout(() => {
        navigate("/")
      },3000)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover "
          src={bgimage}
          alt=""
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen">
          <div className="fixed w-full px-4 py-24 z-50">
            <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white ">
              <div className="max-w-[320px] mx-auto py-16 ">
                <h1 className="text-3xl font-bold ">Sign Up</h1>
                <form onSubmit={handleSubmit} className={animation ? "hidden":"w-full flex flex-col py-4"}>
                  <input
                    className="p-3 my-2 bg-gray-700 rounded"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="p-3 my-2 bg-gray-700 rounded "
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="bg-red-600 py-3 my-6 rounded font-bold ">
                    Sign Up
                  </button>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <p><input className="mr-2" type="checkbox" />Remember me</p>
                    <p>Need Help?</p>
                  </div>
                  <p className="py-8 text-center"><span className="text-gray-600">Already subscribed to Netflix? </span><Link to="/login">Sign In</Link></p>
                 <button type="button" onClick={handleGoogleSign} className="flex items-center gap-3">Sign in with Google <AiFillGooglePlusCircle size={30}/> </button></form>
               {animation &&  <div className=" mb-40 flex items-center justify-center ">
                <Lottie animationData={animationData}/>
              </div>
              }
              </div>
             
              
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default Signup;
