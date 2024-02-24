import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


const StudentRoutes = (children, ...rest) => {
    let {user} = useContext(AuthContext)
    console.log("student route works")
    return(
        user.is_student ? <Outlet/> : <Navigate to="/login" />
        // user ? <Outlet/> : <Outlet/>
    )
}

export default StudentRoutes