import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading]= useState(false)

    const navigate = useNavigate() 

    let loginUser = async (username, password) => {
        console.log("form submitted")
        let response = await fetch('http://127.0.0.1:8000/api/token/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username, password})
        })
        let data = await response.json()
        console.log('data:', data)
        // console.log('response:', response)

        if(response.status ===200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))

            localStorage.setItem('authTokens',JSON.stringify(data))
            // console.log(authTokens)
            // console.log(user)
            navigate('/')
        }else{
            alert("something went wrong?")
        }
    }

    let registerUser = async (username, password) => {
        console.log("form submitted")
        let response = await fetch('http://127.0.0.1:8000/api/register/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username, password})
        })
        let data = await response.json()
        console.log('data:', data)

        if(response.status ===201){
            console.log("User registered successfully")
            navigate('/login')
        }else{
            alert("something went wrong?")
        }
    }


    let updateToken = async() => {
        // setLoading(true)  // Set loading to true at the start of the function
        console.log("update token called")
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            
        }else{
            logOutUser()
        }
        if(loading){
            setLoading(false)
        }    }



    let logOutUser = () => {
        console.log("logout called")
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        navigate('/login')
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        registerUser:registerUser,
        logOutUser:logOutUser,
    }


    useEffect(()=> {
        if (loading) {
            updateToken()
        }
        let fourMinutes = 1000 * 60 * 4
        let halfMinute= 1000 * 30
        let interval = setInterval(()=> {
            if (authTokens) {
                updateToken()
            }
        }, halfMinute)

        // console.log(authTokens);
        // console.log(user);
        return ()=> clearInterval(interval)

    }, [authTokens, user, loading])

    return(
        // <AuthContext.Provider value={{'name':'admin'}}>
        <AuthContext.Provider value={contextData}>
            {loading? null: children}
        </AuthContext.Provider>
    )
}