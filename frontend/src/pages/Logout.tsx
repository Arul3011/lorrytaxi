import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
// import { islogout , islogin } from "../store/slice/login";
import {  islogout} from "../store/slice/login/loginSlice";

const Logout = ()=>{
    const dispatch = useDispatch();
    localStorage.clear();
    Cookies.remove("token");
    dispatch(islogout())
    return <Navigate to={'/'}/>

}

export default Logout;