import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from 'react'
import { FcGoogle } from "react-icons/fc"
import { toast } from "react-toastify";
import { db } from "../firebase.config"
import { useNavigate } from "react-router-dom"

export const OAuth = () => {

  const navigate = useNavigate()
  async function onGoogleClick() {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log(user);
      
      //check user
      const docRef =  doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
      })
      }
      navigate("/home")
    } catch (error) {
      toast.error("Could not Authenticate with Google")
    }

  }

  return (
    <button type='button' onClick={onGoogleClick} className='flex justify-center items-center w-full bg-red-500 text-white px-7 py-3 uppercase rounded-lg text-sm font-medium hover:bg-red-600 active:bg-red-700 shadow-md active:shadow-lg transition duration-150' >
        <FcGoogle className='mr-2 text-2xl bg-white rounded-full' /> 
        Continue with Google
    </button>
  )
}
