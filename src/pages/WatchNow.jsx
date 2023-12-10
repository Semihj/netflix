import React, {  useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import requests, { details } from '../Request';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import { arrayUnion, doc, updateDoc} from 'firebase/firestore';
import { db } from '../firebase';
import Movie from "../components/Movie"
const WatchNow = () => {
   const {id} = useParams()
  
   const [movie, setMovie] = useState(null)
   const [similarMovie, setSimilarMovie] = useState([])
   /* const Similarmovies = movies[Math.floor(Math.random() * movies.length)]; */
   useEffect(() => {
    axios
      .get(details(id))
      .then((response) => setMovie(response.data));
  }, [id]);
  
  useEffect(() => {
    axios
      .get(requests.requestPopular)
      .then((response) => setSimilarMovie(response.data.results))
  },[id])



  const {user} = UserAuth();

  const moviedb = doc(db,"users",`${user?.email}`)
  const saveShow = async () => {
   
    if(user?.email) {
   
      await updateDoc(moviedb,{
        savedShows:arrayUnion({
          id:movie.id,
          title:movie.title,
          img:movie.backdrop_path,
        })
      })
    } else {
      alert("Please login to save a movie")
    }
  }

  return (
    <div className="">
    <div className="w-full h-[700px] sm:h-[800px] text-white">
      <div className="w-full h-full">
        <div className=" absolute w-full h-[800px] bg-gradient-to-tr from-black"></div>
          <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt="" />
          <div className="absolute top-[20%] w-full p-10 mt-10">
            <h1 className='font-bold text-[40px] '>{movie?.title} </h1>
            <div className=" flex sm:hidden gap-6 ">
                <button className='bg-transparent border p-3 rounded-md hover:scale-125'>Watch Now</button>
                <button className='bg-black border p-3 rounded-md hover:scale-125' onClick={saveShow}>Add to List</button>

              </div>
            <div className="py-10 w-[300px] sm:w-[500px] ">
              <p>{movie?.overview} </p>
              <div className="hidden sm:flex p-10 gap-6 ">
                <button className='bg-transparent border p-3 rounded-md hover:scale-125 transition-all'>Watch Now</button>
                <button className='bg-black border p-3 rounded-md  hover:scale-125 transition-all' onClick={saveShow}>Add to List</button>

              </div>
            </div>
          </div>
        
      </div>
    </div>
    <div className="flex justify-center  mt-[70px] sm:mt-5 text-white flex-wrap">
      {similarMovie.map((movie) => (
        
          <Movie key={movie.id} onClick(() => location.reload() ) item={movie}/>
        
      ))}
    </div>
    </div>

  )
}

export default WatchNow
