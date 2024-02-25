import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


const CommitteeRoutes = (children, ...rest) => {
    let {user} = useContext(AuthContext)
    console.log("user.is_committee: "+user.is_committee)

    return(
        user.is_committee ? <Outlet/> : <Navigate to="/login" />
        // user ? <Outlet/> : <Outlet/>
    )
}

export default CommitteeRoutes