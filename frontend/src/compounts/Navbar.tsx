import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar =()=>{
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn); // ✅ hook at top level
  const [logstate, setLogstate] = useState(null);

  useEffect(() => {
    setLogstate(isLoggedIn);
    console.log(isLoggedIn);
    
  }, [isLoggedIn]); 
    return(
    <header className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">🚚 LORRY TAXI</span>
        </div>
        <nav className="hidden md:flex space-x-6 text-lg">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Bookings</a>
          <a href="#" className="hover:underline">Help</a>
          <div className="">
            {
              logstate ? (
                <Link  to={'/logout'} className="bg-teal-700 text-white px-4 py-2 rounded">Logout</Link>                 
              ) : (
                 <>
                  <Link to={'/login'} className="bg-teal-700 text-white px-4 py-2 rounded">Login</Link>
                  <Link to={'/register'} className="bg-teal-700 text-white px-4 py-2 rounded">Sign in</Link>
                </>
              )
            }
          </div>
         
        </nav>


      </header>)
}

export default Navbar;