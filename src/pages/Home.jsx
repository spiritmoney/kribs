import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase.config";
import { Link } from "react-router-dom";
import ListingItem  from "../components/ListingItem";

const Home = () => {
//Offers
  const [offerListings, setOfferListings] = useState(null)
  useEffect(() => {
    async function fetchListings() {
      try {
        //get reference
        const listingsRef = collection(db, "listings")
        //create the query
        const q = query(listingsRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(4))
        //exxcute the query
        const querySnap = await getDocs(q)
        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setOfferListings(listings)
      } catch (error) {
      }
    } fetchListings()
  }, [])
//Rentals
  const [rentListings, setRentListings] = useState(null)
  useEffect(() => {
    async function fetchListings() {
      try {
        //get reference
        const listingsRef = collection(db, "listings")
        //create the query
        const q = query(listingsRef, where("type", "==", "rent"), orderBy("timestamp", "desc"), limit(4))
        //exxcute the query
        const querySnap = await getDocs(q)
        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setRentListings(listings)
      } catch (error) {
        console.log(error);
      }
    } fetchListings()
  }, [])
//On Sale
  const [saleListings, setSaleListings] = useState(null)
  useEffect(() => {
    async function fetchListings() {
      try {
        //get reference
        const listingsRef = collection(db, "listings")
        //create the query
        const q = query(listingsRef, where("type", "==", "sale"), orderBy("timestamp", "desc"), limit(4))
        //exxcute the query
        const querySnap = await getDocs(q)
        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setSaleListings(listings)
      } catch (error) {
        console.log(error);
      }
    } fetchListings()
  }, [])

  const brightness = 50;
  

  return (
    <div className='font-poppins bg-gray-100'>
        <div className='' style={{
        background: `url("https://propertylagos.net/wp-content/uploads/2020/08/pexels-vecislavas-popa-1571460-scaled.jpg") center no-repeat`,
        backgroundSize: "cover", height: "400px"
        }}>
          <div className='w-full h-full flex justify-center items-center text-4xl font-semibold font-poppins text-white backdrop-brightness-75'>
            <p className='text-center'>Discover Homes that fit your Style and Budget.</p>
        </div>
      </div>
    <div className='max-w-6xl mx-auto p-4 space-x-3 space-y-6'>
      {offerListings && offerListings.length > 0 && (
        <div className='m-2 mb-6'>
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent Offers</h2>
          <Link to="/deals">
            <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more Offers</p>
          </Link>
          <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {offerListings.map((listing) => (
              <ListingItem 
              key={listing.id}
              listing={listing.data}
              id={listing.id} 
              />
            ))}
          </ul>
        </div>
      )}
    </div>
    <div className='max-w-6xl mx-auto p-4 space-x-3 space-y-6 '>
      {rentListings && rentListings.length > 0 && (
        <div className='m-2 mb-6'>
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Newest Rentals</h2>
          <Link to="/deals">
            <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more Rentals</p>
          </Link>
          <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {rentListings.map((listing) => (
              <ListingItem 
              key={listing.id}
              listing={listing.data}
              id={listing.id} 
              />
            ))}
          </ul>
        </div>
      )}
    </div>
    <div className='max-w-6xl mx-auto p-4 space-x-3 space-y-6 '>
      {saleListings && saleListings.length > 0 && (
        <div className='m-2 mb-6'>
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Places for Sale</h2>
          <Link to="/deals">
            <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more places for Sale</p>
          </Link>
          <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {saleListings.map((listing) => (
              <ListingItem 
              key={listing.id}
              listing={listing.data}
              id={listing.id} 
              />
            ))}
          </ul>
        </div>
      )}
    </div>
    <footer class="bg-white rounded-lg shadow font-poppins m-4">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="" class="hover:underline">Kribs™</a>. All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
            </li>
            <li>
                <a href="https://api.whatsapp.com/send?phone=2349168956401" class="hover:underline">Contact</a>
            </li>
        </ul>
        </div>
    </footer>
    </div>
  )
}

export default Home