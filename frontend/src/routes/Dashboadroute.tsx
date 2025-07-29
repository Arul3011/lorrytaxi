import { Navigate } from "react-router-dom";

const Dashboardroute = ()=>{
   const login : boolean = true;
   return (
   login ? <Navigate to="/dashboard" replace /> :  <Navigate to="/login" replace />
   )
   
}

export default Dashboardroute;