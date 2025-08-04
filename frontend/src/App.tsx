import { Route, Routes } from "react-router-dom"
import Dashbord from "./pages/Dashboard"
import Profile from "./pages/Profile"
import Dashboardroute from "./routes/Dashboadroute"
import Register from "./pages/Register"
import Login from "./pages/login/Login"
import Logout from "./pages/Logout"
import { useDispatch } from "react-redux"
import { useLayoutEffect } from "react"
import Cookies from "js-cookie";
import { isLogin, islogout } from "./store/slice/login/loginSlice"
import RouteMap from "./pages/Map"


function App() {


  const dispatch = useDispatch();
useLayoutEffect(()=>{
  const value = Cookies.get('token');
  if(value){
      dispatch(isLogin())
  }else(
      dispatch(islogout())

  )
})


  return (
    <>
     <Routes>
      <Route path="/" element={<Dashboardroute />  }/>
        <Route path="/dashboard" element={<Dashbord />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>


        <Route path="/logout" element={<Logout />}/>
        <Route path="/map" element={<RouteMap />}/>


     </Routes>

    </>
  )
}

export default App
