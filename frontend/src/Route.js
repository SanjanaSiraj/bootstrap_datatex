import React, {useEffect, useState} from "react";
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import SignUp from "./Components/Pages/SignUp";
import SignIn from "./Components/Pages/SignIn";
import Catalog from "./Components/catalog/Catalog";
import AfterLogin from "./Components/Pages/AfterLogin";
import AddCatalog from "./Components/catalog/AddCatalog";
import Catagories from "./Components/catalog/Catagories";

var setPage,passData
function Route(){

    const [pageState,setState]=useState(1)
    setPage=setState
    const[dataFromSibling,setDataFromSibling]=useState(null)
    passData=setDataFromSibling
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
                                    <AfterLogin nav={setState} type={dataFromSibling}/>
                                ):(
                                    pageState===5?(
                                        <SignIn nav={setState} />
                                    ):(
                                        pageState===7?(
                                            <Catalog nav={setState} setFabricType={setDataFromSibling}/>
                                        ):(
                                            pageState===8?(
                                                <Catagories nav={setState} type={dataFromSibling}/>
                                                ):(
                                                <AfterLogin />
                                                )

                                        )
                                    )
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
export {setPage,passData}


