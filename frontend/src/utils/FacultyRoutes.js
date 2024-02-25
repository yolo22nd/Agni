import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


const FacultyRoutes = (children, ...rest) => {
    let {user} = useContext(AuthContext)
    console.log("user.is_faculty: "+user.is_faculty)
    return(
        user.is_faculty ? <Outlet/> : <Navigate to="/login" />
        // user ? <Outlet/> : <Outlet/>
    )
}

export default FacultyRoutes