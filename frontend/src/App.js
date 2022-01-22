import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";

function App() {
    const [pageState,setState]=useState(1)
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
                            ):<SignIn nav={setState}/>
                        )
                    )
                )
            }
        </div>
    )
}
export default App