import React, { useState,useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import NestedGrid from '../components/NestedGrid' 
import Header from '../components/Header'

const UserPage = () => {
  let [memes, setMemes] = useState([])
  let {authTokens,logOutUser} = useContext(AuthContext)

  useEffect(()=> {
    getMemes()
  }, [])

  let getMemes = async()=>{
    console.log("fetching response")
    let response = await fetch('http://127.0.0.1:8000/api/memes/', {
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+String(authTokens.access),
          }
    })

    console.log("response fetched")
    let data = await response.json()
    console.log("data set")
    console.log(data)
    if (response.status === 200) {
      setMemes(data);
      console.log('memes set')
  } else if (response.statusText === 'Unauthorized'){
    logOutUser()
  }  
}

  return (
    <>
    <Header/>
    <br />
    <div>        
          <NestedGrid memes={memes} saved={true} />
    </div>
    </>
  )
}


export default UserPage
