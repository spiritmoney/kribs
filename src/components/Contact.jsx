import React, { useEffect, useState } from 'react'
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from 'react-toastify';
import { MdPhone } from "react-icons/md";

const Contact = ({userRef, listing}) => {

    const [landlord, setLandlord] = useState(null)
    const [message, setMessage] = useState("");

    useEffect(() => {
     async function getLandlord() {
        const docRef = doc(db, "users", userRef)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()) {
            setLandlord(docSnap.data())
        } else {
            toast.error("Could not get Landlord Data")
        }
     } getLandlord()
    }, [userRef])

    useEffect(() => {
      async function getLandlord() {
         const docRef = doc(db, "listings", listing)
         const docSnap = await getDoc(docRef)
         if(docSnap.exists()) {
             setLandlord(docSnap.data())
         } else {
             toast.error("Could not get Landlord Data")
         }
      } getLandlord()
     }, [listing])
    
    function onChange(e) {
        setMessage(e.target.value);
      }
      return (
        <>
          {landlord !== null && (
            <div className="flex flex-col w-full mt-5">
              <p className='font-semibold text-orange-400'>
                Contact {landlord.name} for the {listing.name.toLowerCase()}
              </p>
              <a
                className='mt-3'
                href={`https://api.whatsapp.com/send?phone=${+listing.number}`}
              >
                <button className="px-7 py-3 bg-green-600 text-white rounded text-sm uppercase shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-1" type="button">
                  Whatsapp
                </button>
              </a>
              <div className='flex items-center my-2 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300 '>
                <p className='text-center mx-4'>OR</p>
              </div>
              <a
                href={`tel:${listing.number}`}
              >
                <button className="px-7 py-3 bg-green-600 text-white rounded text-sm uppercase shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-1" type="button">
                  Call
                </button>
              </a>
            </div>
          )}
        </>
      );
}

export default Contact