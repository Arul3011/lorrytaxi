import { Route, Routes } from "react-router-dom"
import Dashbord from "./pages/Dashboard"
import Profile from "./pages/Profile"
import Dashboardroute from "./routes/Dashboadroute"
import Register from "./pages/Register"
import Login from "./pages/Login"


function App() {


  return (
    <>
     <Routes>
      <Route path="/" element={<Dashboardroute />  }/>
        <Route path="/dashboard" element={<Dashbord />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>


     </Routes>
    </>
  )
}

export default App
