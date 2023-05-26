import React from 'react'
import SavedShows from '../components/SavedShows'
import bgimage from "../assets/netflixbg.jpg"
const Account = () => {
  
 
  return (
    <>
    <div className='w-full text-white h-[1000px] '>
        <img
        className=" w-full h-[400px] object-cover "
        src={bgimage}
        alt="/"
      />
      <div className='bg-black/60 fixed top-0 left-0 w-full h-[1000px] '>
        <div className="absolute top-[25%] p-4 md:p-8  ">
          <h1 className='text-3xl md:text-5xl font-bold h-full  '>My Shows :</h1>

        </div>
        
      </div>
      <SavedShows/>
    </div>
    
    
    </>
  )
}

export default Account
