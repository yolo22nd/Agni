import React, { useState,useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import NestedGrid from '../components/NestedGrid' 
import Header from '../components/Header'
import SaveBanner from '../components/SaveBanner'

const baseURL = "https://api.imgflip.com/get_memes";


const Memepage = () => {
  const location = useLocation();
  
  const temp = location.state?.saved;
  
  let [memes, setMemes] = useState([])
  let [saved,setSaved] = useState(temp)
  let {authTokens,logOutUser} = useContext(AuthContext)
  
  
  useEffect(()=> {
    getMemes()
    console.log(location.state?.saved);
  }, [])


  let getMemes = async () => {
    console.log("fetching response");
    let response = await fetch(baseURL);
  
    console.log("response fetched");
    if (response.status === 200) {
      let data = await response.json();
      console.log("data set");
      console.log(data);
      setMemes(data.data.memes);
      console.log('memes set');
    } else if (response.statusText === 'Unauthorized') {
      logOutUser();
    }
  };



  return (
    <>
        <Header/>
        {saved && <SaveBanner/>}
        <br />

    <div>

          <NestedGrid memes={memes}/>
      
    </div>
        </>
  )
}

export default Memepage
