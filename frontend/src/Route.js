import React, {useEffect, useState} from "react";
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import SignUp from "./Components/Pages/SignUp";
import SignIn from "./Components/Pages/SignIn";
import AfterLogin from "./Components/Pages/AfterLogin";
function Route(){
    const [pageState,setState]=useState(1)

    // useEffect(()=>{
    //     console.log(pageState)
    // },[pageState])

    return(
        <div>
            {
                pageState===1?(
                    <Home nav={setState}/>
                ):(
                    pageState===2?(

                        <About nav={setState}/>
                    ):(
                        pageState===3?(
                            <Contact nav={setState}/>
                        ):(
                            pageState===4?(
                                <SignUp nav={setState}/>
                            ):(
                                pageState===6?(
                                     <AfterLogin nav={setState}/>
                                    ):(
                                    <SignIn nav={setState}/>
                                    )

                            )
                        )
                    )
                )
            }
        </div>
    )
}
export default Route