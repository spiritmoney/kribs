import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { MdLocationOn } from "react-icons/md";


const ListingItem = ({listing, id, onDelete, onEdit}) => {
  return (
    <li className='relative font-poppins bg-gray-100 flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-lg overflow-hidden transition duration-150 m-[10px]'>
        <Link className=' contents ' to={`./category/${listing.type}/${id}`}>
            <img className='h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in' loading='lazy' src={listing.imgUrls[0]} alt="" />
            <Moment fromNow className='uppercase absolute top-2 left-2 bg-sky-400 text-white text-xs font-semibold rounded-md px-2 py-1 shadow-md  '>{listing.timestamp?.toDate()}</Moment>
            <div className=' w-full p-[10px]'>
                <div className=' flex items-center space-x-1'>
                <MdLocationOn className='h-4 w-4 mb-2 text-green-500'/>
                <p className='font-semibold text-sm mb-2 text-gray-600 truncate'> {listing.address}</p>
                </div>
                <p className='font-semibold m-0 text-lg truncate'>{listing.name}</p>
                <p className='text-blue-500 font-semibold mt-2'>N{listing.offer 
                ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
                : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  {listing.type === "rent" && " / Year" }
                  </p>
                  <div className=' flex items-center space-x-2 mt-2'>
                    <div className=' flex items-center space-x-1'>
                        <img src="src\assets\svg\bed.svg" alt=" bed" />
                        <p className='font-semibold text-xs'>{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <img className=' h-6' src="src\assets\svg\bathtub.svg" alt="bath" />
                        <p className='font-semibold text-xs'>{listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}</p>
                    </div>
                  </div>
            </div>
        </Link>
        {onEdit && (
            <img src="src\assets\svg\edit.svg" alt="edit" className='absolute bottom-2 right-10 cursor-pointer ' onClick={() => onEdit(listing.id)} />
        )}
        {onDelete && (
            <img src="src\assets\svg\deletee.svg" alt="delete" className='absolute bottom-2 right-2 cursor-pointer' onClick={() => onDelete(listing.id)} />
        )}
    </li>
  )
}

export default ListingItem