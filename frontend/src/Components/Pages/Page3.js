import React from "react";
import {Button} from "@mui/material";

function Page3(propes){
    const clickedPage1=()=>{
        propes.nav(1)
    }
    const clickedPage2=()=>{
        propes.nav(2)
    }
    const clickedPage3=()=>{
        propes.nav(3)
    }
    return(
        <div style={{display:'flex',alignItems:'center'}}>
            <center>
                <Button variant="contained" color="primary" onClick={clickedPage2}>
                    Go toPage 2
                </Button>
                <Button variant="contained" color="primary" onClick={clickedPage1}>
                    Go to Page 1
                </Button>
            </center>
            <h1>
                this is page3
            </h1>

        </div>
    )
}
export default Page3