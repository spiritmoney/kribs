import { getAuth, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";

export const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const { email, password} = formData
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  async function onSubmit(e) {
    e.preventDefault()

    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent')
    } catch (error) {
      toast.error('Could not send Reset Password')
    }
  }

  return (
    <section className='font-poppins'>
      <div>
      <h1 className='text-3xl text-center font-bold mt-6'>Forgot Password</h1>
      <div className=' flex justify-center items-center px-6 py-12'>
        <div className='w-full md:w-[67%] lg:w-[40%] justify-center items-center'>
          <form onSubmit={onSubmit}>
            <input 
            type="email" 
            id='email' 
            value={email} 
            onChange={onChange} 
            placeholder='Email address' 
            className='w-full mb-3 px-4 py-2 text-md text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
            />
            <div className='flex justify-between whitespace-nowrap font-medium text-sm sm:text-lg'>
              <Link to="/sign-up" className='mb-6 text-red-600 hover:text-red-700 transition ease-in-out ml-1'>Register</Link>
              <Link to="/sign-in" className='mb-6 text-blue-500 hover:text-blue-700 transition ease-in-out mr-1'> Sign in Instead </Link>
            </div>
            <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm uppercase rounded-lg shadow-md hover:bg-blue-700 transition duration-150 hover:shadow-xl active:bg-blue-800' type='submit'> 
          Send reset email
          </button>
          </form>
        </div>
      </div>
      </div>
    </section>
  )
}
