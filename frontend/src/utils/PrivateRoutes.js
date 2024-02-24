import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoutes = (children, ...rest) => {
    let {user} = useContext(AuthContext)
    // console.log("privvate route works")
    return(
        user ? <Outlet/> : <Navigate to="/login" />
    )
}


// const PrivateRoute = () => {
//     const authenticated = false; // determine if authorized, from context or however you're doing it
//     // console.log("private router called")
//     // If authorized, return an outlet that will render child elements
//     // If not, return element that will navigate to login page
//     return authenticated ? <Outlet/> : <Navigate to="/login" />;
// }

export default PrivateRoutes