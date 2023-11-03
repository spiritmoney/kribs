import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { OAuth } from '../components/OAuth'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../firebase.config'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"


export const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const { fullName, email, password} = formData
  const  navigate = useNavigate()
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  async function onSubmit (e) {
    e.preventDefault()

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(auth.currentUser, {
        displayName: fullName
      })
      const user = userCredential.user;
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timeStamp = serverTimestamp()
      await setDoc(doc(db, "users", user.uid), formDataCopy)
      navigate("/home")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  return (
    <section className='font-poppins'>
      <h1 className='text-3xl text-center font-bold mt-6'>Sign Up</h1>
      <div className=' flex justify-center items-center px-6 py-12'>
        <div className='w-full md:w-[67%] lg:w-[40%] justify-center items-center'>
          <form onSubmit={onSubmit}>
          <input 
            type="text" 
            id='fullName' 
            value={fullName} 
            onChange={onChange} 
            placeholder='Full Name' 
            className='w-full mb-3 px-4 py-2 text-md text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
            />
            <input 
            type="email" 
            id='email' 
            value={email} 
            onChange={onChange} 
            placeholder='Email address' 
            className='w-full mb-3 px-4 py-2 text-md text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
            />
            <div className='relative mb-3'>
            <input 
            type={showPassword ? "text" : "password"} 
            id='password' 
            value={password} 
            onChange={onChange} 
            placeholder='Password' 
            className='w-full px-4 py-2 text-md text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
            />
            {showPassword ? (<FaEyeSlash className='absolute right-3 items-center text-xl top-3 cursor-pointer ' onClick={() => setShowPassword((prevState)=>!prevState)} />): 
            (<FaEye className='absolute right-3 top-3 cursor-pointer text-xl' onClick={() => setShowPassword((prevState)=>!prevState)}/> )}
            </div>
            <div className='flex justify-between whitespace-nowrap font-medium text-sm sm:text-lg'>
              <Link to="/sign-in" className='mb-6 text-red-600 hover:text-red-700 transition ease-in-out ml-1'>Sign In</Link>
              <Link to="/forgot-password" className='mb-6 text-blue-500 hover:text-blue-700 transition ease-in-out mr-1'> Forgot Password </Link>
            </div>
            <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded-lg shadow-md hover:bg-blue-700 transition duration-150 hover:shadow-xl active:bg-blue-800' type='submit'> 
          Sign Up
          </button>
          <div className='flex items-center my-2 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300 '>
          <p className='text-center font-semibold mx-4'>OR</p>
          </div>
          <div>
            <OAuth />
          </div>
          </form>
        </div>
      </div>
    </section>
  )
}
