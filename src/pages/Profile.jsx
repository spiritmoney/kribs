import React, { useEffect, useState } from 'react'
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from "../firebase.config";
import ListingItem from '../components/ListingItem';

export const Profile = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [changeDetails, setChangeDetails] = useState(false)
  const navigate = useNavigate()
  const auth = getAuth()

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name
        })
        toast.success("Profile details Updated")
      }
    } catch (error) {
      toast.error("Something went Wrong")
    }
  }

  useEffect(() => {
    async function fetchUserListings() {
      
      const listingRef = collection(db, "listings")
      const q = query(listingRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"))
      const querySnap = await getDocs(q)
      let listings = []
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setListings(listings)
      setLoading(false)
    }
    fetchUserListings()
  }, [auth.currentUser.uid])

  const {name, email} = formData
  function handleLogOut() {
    auth.signOut()
    navigate("/")
  }
  return (
    <>
      <section className=' max-w-6xl mx-auto flex justify-center items-center flex-col font-poppins'>
        <h1 className='text-3xl text-center font-bold mt-6 mb-5'>My Profile</h1>
        <div className=' w-full mt-6 px-3 md:w-[50%]'>
          <form >
            {/*Name*/}
            <input 
            type="text" 
            id='name' 
            value={name} 
            disabled={!changeDetails} 
            onChange={onChange} 
            className={`w-full px-6 py-1 text-xl text-gray-700 text-center border border-gray-300 rounded-lg bg-white transition ease-in-out ${changeDetails && 'bg-red-100 focus:bg-red-100 border border-gray-400 rounded-lg'}`}/>

            {/*Email Input*/}
            <input 
            type="text" 
            id='email' 
            value={email} 
            disabled
            className={`w-full px-6 py-1 text-xl text-gray-700 text-center border border-gray-300 rounded-lg bg-white transition ease-in-out mt-3 mb-3 ${changeDetails && 'bg-red-100 focus:bg-red-100 border border-gray-400 rounded-lg'}`} />

            <div className='w-full flex justify-center items-center flex-col text-sm sm:text-base mb-6'>
              <button type='button' className=' bg-red-600 hover:bg-red-700 text-white rounded-lg px-6 uppercase py-1 mb-2 w-full  '>
                <span 
                onClick={() => {
                changeDetails && onSubmit()
                setChangeDetails((prevState) => !prevState)
              }} 
              className='cursor-pointer transition ease-in-out font-semibold'>
                {changeDetails ? "Update" : "Update"}
                </span>
              </button>
              <button type='button' className='bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 uppercase py-1 mb-2 w-full'><p
              onClick={handleLogOut} 
              className='cursor-pointer text-sm sm:text-base transition ease-in-out font-semibold'>Log out</p></button>
            </div>
          </form>
        </div>
      </section>
      <div className='font-poppins'>
        {!loading && listings.length > 0 && (
          <>
          <h2 className=' text-2xl text-center font-semibold'>My Listiing</h2>
          <ul>
            {listings.map((listing) => (
              <ListingItem
              key={listing.id} 
              id={listing.id} 
              listing={listing.data} />
            ))}
          </ul>
          </>
        )}
      </div>
    </>
  )
}
