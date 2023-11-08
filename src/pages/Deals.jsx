import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import ListingItem from '../components/ListingItem';

const Deals = () => {

  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchListings() {
      try {
        const listtingRef = collection(db, "listings")
        const q = query(listtingRef, orderBy("timestamp", "desc"), limit(8))
        const querySnap = await getDocs(q)
        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setListing(listings)
        setLoading(false)
      } catch (error) {
        toast.error("Could not Fetch Listing")
      }
    }
    fetchListings()
  }, [])



  return (
    <div className='max-w-6xl mx-auto px-3 font-poppins'>
      <h1 className='text-3xl text-center mt-6 font-bold mb-3'>
        Deals
      </h1>
      {loading ? (
        <Spinner />
      )
      : listing && listing.length > 0 ? (
        <>
          <main>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {listing.map((listing) => (
                <ListingItem 
                key={listing.id}
                id={listing.id}
                listing={listing.data} />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>
          There are no Current Offers
        </p>
      )}
    </div>
  )
}

export default Deals