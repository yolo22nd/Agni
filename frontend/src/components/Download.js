import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import React, { useEffect, useState, useContext } from "react";
import FileSaver from "file-saver";
import AuthContext from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';

function Download({handleClose, url, open, saved}) {
    const navigate = useNavigate();
    let {authTokens,logOutUser} = useContext(AuthContext);
    let [isSaved,setIsSaved]= useState(saved);

    const saveManual = () => {
        FileSaver.saveAs(url, "meme.jpg");
    };

    let save = async()=>{
        console.log("posting meme");
        let response = await fetch('http://127.0.0.1:8000/api/memes/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+String(authTokens.access),
            },
            body: JSON.stringify({
                url:url
            }),
        });
        console.log(response);
        setIsSaved(true);
    };

    // Add this useEffect hook
    useEffect(() => {
        if (isSaved) {
            console.log(isSaved);
            navigate('/memes',{state:{saved:isSaved}});
        }
    }, [isSaved, navigate]);

    return (
        <div>
        <Dialog onClose={handleClose} open={open} onBackdropClick={handleClose}>
            <DialogTitle align="center">Generated Meme</DialogTitle>
            <img src={url} height={350} alt=""/>
            <DialogActions style={{alignSelf:"center"}} >
                <Button variant="outlined" color="secondary" onClick={saveManual}>Download Meme</Button>

                {!isSaved && (
                    <Button variant="outlined" color="secondary" onClick={save}>Save</Button>
                )}
            </DialogActions>
        </Dialog>
        <Backdrop open={open} onClick={handleClose} />
        </div>
    );
}
export default Download;
