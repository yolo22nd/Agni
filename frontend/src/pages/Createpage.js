import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom"
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Download from "../components/Download";
import axios from 'axios';
import Header from "../components/Header";

const fonts = [
    {
        value: 'impact',
        label: 'impact',
    },
    {
        value: 'arial',
        label: 'arial',
    },
];

function CreatePage() {
    const location = useLocation();
    const meme = location.state?.meme;
    const [generatedMeme, setGeneratedMeme] = useState("");
    const [open, setOpen] = useState(false);
    const [textBoxes, setTextBoxes] = useState({});

    const handleClose = () => {
        setOpen(!open);
    };
    let formData = new FormData();
    formData.append("template_id", meme.id);
    formData.append("username", "omtank22");
    formData.append("password", "imgflipp");
    const changeForm = (key) => (event) => {
            setTextBoxes({
                ...textBoxes, [key]: event.target.value,
            });
    };
    const setForm = (key) =>  (event) => {
            setTextBoxes({
                ...textBoxes, [key]: event.target.value,
            });
    };
    const generateMeme = () => {
        // formData.set("font", font);
        for (const key in textBoxes) {
            console.log(key, textBoxes[key]);
            formData.append(key, textBoxes[key]);
        }
        createMeme(formData).then(r => {
                if (r.success === true) {
                    setGeneratedMeme(r.data.url);
                    setOpen(true);

                } else {
                    console.log(r.error_message)
                }
            }
        ).catch(e => console.log(e));
    };
    const arr = [...Array(meme.box_count).keys()].map(i => i + 1);

    return (
        <>
         <Header/>
         <br />
        <div className="content" style={{right: 0, left: 0, margin: "auto"}}>
            <Grid container
                  direction="row"
                  alignItems="center"
                  rowSpacing={1}
                  justify="center">
                <Grid item xs={12} align="center">
                    <Typography variant={"h4"}>{meme.name}</Typography>
                </Grid>
                <Grid item xs={6} style={{padding: "2%"}} align="center">
                    <img height={350} src={meme.url} alt={meme.name}/>
                </Grid>
                <Grid item xs={4} style={{padding: "2%"}} align="center">
                    <div>
                        {arr.map(field => (
                            <TextField
                            color="secondary"
                            style={{padding: "2%"}}
                            key={field}
                            id={"text-" + field}
                            label={"Enter text #" + field}
                            variant="outlined"
                            fullWidth
                            onInput={setForm(`boxes[${field-1}][text]`)}
                            />
                            ))}
                    </div>
                    <Button variant="outlined" color="secondary" onClick={generateMeme}>Generate</Button>
                    {generatedMeme !== "" ?
                        <>
                        <Download handleClose={handleClose} url={generatedMeme} open={open} saved={false}/>
                        <>{console.log("meme genarated")}</>
                        </>
                        : <></>}
                </Grid>
            </Grid>
        </div>
        </>
    )

}
const createMeme = async (data) => {
    try {
        return await axios.post("https://api.imgflip.com/caption_image", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(r => r.data)
    } catch (err) {
        console.log(err)
    }
};
export default CreatePage;