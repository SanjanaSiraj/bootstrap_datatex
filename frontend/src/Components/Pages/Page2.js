import React from "react";
import {Button} from "@mui/material";

function Page2(propes){
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
        <div>
            <div style={{display:'flex',alignItems:'center',width:'100vw',height:'100vh'}}>
                <div style={{width:'100vw'}}>
                    <center>
                        <Button variant="contained" color="primary" onClick={clickedPage1}>
                            Go toPage 1
                        </Button>
                        <Button variant="contained" color="primary" onClick={clickedPage3}>
                            Go to Page 3
                        </Button>
                        <h1>
                            this is page2
                        </h1>
                    </center>

                </div>

            </div>
        </div>
    )
}
export default Page2