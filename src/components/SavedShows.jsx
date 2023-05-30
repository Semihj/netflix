import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {TiDelete} from "react-icons/ti"
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { deleteField, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

import Movie from "./Movie";
import { Link } from "react-router-dom";

const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);
  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef,{
        savedShows:result
      })
    }
    catch (err) {
      console.error(err);
    }
  }
  console.log(movies)

  return (
    <div className="relative flex items-center group">
    <MdChevronLeft
      onClick={slideLeft}
      size={40}
      className="bg-black rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block "
    />

    <div
      className="flex w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
      id={"slider"}
    >
      <div className="flex gap-2">
      {movies?.map((movie) => (

          <div className=" flex-none">
    
       <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 ">
                <img
                  className="w-full h-auto block "
                  src={`https://image.tmdb.org/t/p/w500/${movie?.img}`}
                  alt={movie?.title}
                />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-10 hover:opacity-100 text-white">
                   <Link to={`/watchnow/${movie?.id}`}><p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                    {movie?.title}
                  </p></Link>
                  <p className="absolute top-2 left-2  " onClick={() => deleteShow(movie?.id)}>
                    <TiDelete size={20}/>
                  </p>
                
                </div>
              </div>
        
       </div>
      ))}</div>
    </div>
    <MdChevronRight 
      onClick={slideRight}
      size={40}
      className="bg-black right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block "
    />
  </div>
         
) };

export default SavedShows;
