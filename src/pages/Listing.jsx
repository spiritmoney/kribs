import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide} from "swiper/react"
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules"
import "swiper/css/bundle"
import { FaShare } from "react-icons/fa";
import { MdLocationOn, MdOutlineKingBed, MdOutlineBathtub, MdChair } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { getAuth } from "firebase/auth"
import Contact from '../components/Contact';

const Listing = () => {

  const auth = getAuth
  const params = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLink, setShareLink] = useState(false)
  const [contactLandlord, setContactLandlord] = useState(false)

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId)
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }
    fetchListing()
  }, [params.listingId])
  if (loading) {
    return <Spinner />
  }
  

  return (
    <main className='font-poppins'>
      <Swiper
      modules={[ Navigation, Autoplay, Pagination, EffectFade ]} 
      slidesPerView={1} 
      navigation={true}
      pagination={{ type: "progressbar", clickable: true }} 
      effect='fade'
      autoplay={{ delay: 3000 }}>

        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div className='w-full overflow-hidden h-[300px]' style={{
              background: `url(${listing.imgUrls[index]}) center no-repeat`,
              backgroundSize: "cover"
              }}>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-black rounded-full w-10 h-10 flex justify-center items-center' 
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setShareLink(true)
          setTimeout(() => {
            setShareLink(false)
          }, 2000)
        }}
      >
        <FaShare className='text-lg text-black'/>
      </div>
      {shareLink && (
        <p className='fixed top-[19%] right-[1%] font-semibold border-2 border-black rounded-md bg-white z-10 p-2'>
          Link Copied
        </p>
      )}

      <div className='flex flex-col md:flex-row max-w-6xl lg:mx-auto m-4 p-4 rounded-lg border-3 shadow-lg bg-white lg:space-x-5'>
        <div className='w-full lg-[400px]'>
          <p className='text-2xl font-bold text-blue-900'>
            {listing.name} - N {listing.offer ? 
            listing.discountedPrice.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
            listing.regularPrice.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / year" : ""}
          </p>
          <p className='flex items-center mt-3 mb-3 font-semibold'>
            <MdLocationOn className='text-green-600 mr-1' />
            {listing.address}
          </p>
          <div className='flex space-x-4 w-[75%]'>
            <p className='bg-red-700 sm:w-full max-w-[200px] rounded-md sm:p-1 px-2 py-1 text-white sm:text-center font-semibold shadow-md '>
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className='w-full max-w-[200px] bg-green-600 rounded-md p-1 text-white text-center font-semibold shadow-md '>
                N {+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className='mt-3 mb-3'>
            <span className='font-semibold'>Description -</span> 
          {listing.description}
          </p>
          <ul className='flex items-center space-x-2 sm:space-x-10 text-xs font-semibold sm:text-sm'>
            <li className='flex items-center whitespace-nowrap'>
              <MdOutlineKingBed className='text-xl sm:text-2xl mr-2' />
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className='flex items-center whitespace-nowrap'>
              <MdOutlineBathtub className='text-xl sm:text-2xl mr-2' />
              {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className='flex items-center sm:whitespace-nowrap'>
              <FaParking className='text-xl sm:text-2xl mr-2' />
              {listing.parking ? "Parking" : "No Parking"}
            </li>
            <li className='flex items-center sm:whitespace-nowrap'>
              <MdChair className='text-xl sm:text-2xl mr-2' />
              {listing.parking ? "Furnished" : "Not Furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className='mt-6' onClick={() => setContactLandlord(true)}>
              <button className='px-7 py-3 bg-blue-600 font-medium text-white text-sm uppercase rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full transition duration ease-in-out'>
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && <Contact 
          userRef={listing.userRef}
          listing={listing} />}
        </div>
      </div>
    </main>
  )
}

export default Listing