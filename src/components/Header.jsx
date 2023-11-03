import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

export const Header = () => {

    const [pageState, setPageState] = useState("SignIn")

    const location = useLocation()
    const navigate = useNavigate()
    const pathMatchRoute = (route) => {
        if (route === location.pathname) {
            return true
        }
    }

    const auth = getAuth()
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
            setPageState("Profile")
        } else {
            setPageState("Sign In")
        }
      })
    }, [auth])
    

  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50 font-poppins'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
            <div>
                <img src="/Kribs-removebg-preview.svg" alt="logo" onClick={() => navigate("/")} className='cursor-pointer h-14 w-20'/>
            </div>
            <div>
                <ul className='flex space-x-5'>
                    <li className={`py-1 cursor-pointer hover:text-orange-400 ${pathMatchRoute("/deals") && "text-orange-400"}`} onClick={() => navigate("/deals")}>Deals</li>
                    <li>
                        <button 
                        type='submit'
                        className={`text-orange-400 bg-white px-4 py-1 border border-orange-400 rounded-md hover:bg-orange-400 active:bg-orange-400 hover:text-white hover:border-white ${pathMatchRoute("/list") && " bg-orange-400 border-orange-400 text-orange-400"} `} onClick={() => navigate("/list")}>
                            <Link to="/list">
                                List a Property
                            </Link>
                        </button>
                    </li>
                    <li>
                        <button className={`-ml-3 px-5 py-1 bg-orange-400 text-white rounded-3xl hover:text-orange-400 active:bg-orange-400 active:text-white hover:bg-white hover:border-orange-400 focus:bg-orange-400 focus:text-white ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "bg-orange-400 text-white"}`} onClick={() => navigate("/profile")}>
                            {pageState}
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    </div>
  )
}
