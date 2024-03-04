import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {

  const {user,logOut} = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsSidebar(false)
  }, [location])
  
  const [isSidebar,setIsSidebar] = useState(false)
  console.log(user)
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-between p-4 z-[100] absolute w-full">
      {isSidebar && <div className="fixed top-0 left-0 w-screen h-screen bg-black " >
        <div className="m-5">
        <Link to="/">
        <h1 className="text-red-600 text-4xl cursor-pointer font-bold">
          Netflix
        </h1>
        <button className="p-4 text-white absolute right-0  top-0 text-[31px]" onClick={() => setIsSidebar(false)  }  >X</button>
      </Link>
        <div className="mt-10 flex flex-col gap-10">
        <Link to="/account">
            <button className="text-white  bg-red-600  px-6 py-2 rounded">Account</button>
          </Link>
          
            <button onClick={handleLogout} className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white w-max">
              Logout
            </button>
        </div>
        </div>

      </div> }
      <Link to="/">
        <h1 className="text-red-600 text-4xl cursor-pointer font-bold">
          Netflix
        </h1>
      </Link>
      <div className="sm:hidden flex flex-col ">
      <GiHamburgerMenu onClick={() => setIsSidebar(true) } className="text-white text-[41px] "  />
      </div>
      {}
    {user?.email ? (
          <div className="hidden sm:flex items-center" >
          <Link to="/account">
            <button className="text-white pr-4 ">Account</button>
          </Link>
          
            <button onClick={handleLogout} className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Logout
            </button>
          
        </div>
    ):     <div className="hidden sm:flex items-center" >
    <Link to="/login">
      <button className="text-white pr-4 ">Sign In</button>
    </Link>
    <Link to="/signup">
      <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
        Sign Up
      </button>
    </Link>
  </div> }
    </div>
  );
};

export default Navbar;
