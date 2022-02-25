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
import {checkAuth, getUserType} from "./action/auth";
import AllOrder from "./Components/dropdown/AllOrder";

import Sales from "./Components/CostModule/Sales";

import LoginPage from "./Components/staff/LoginPage";
import ManagingOrders from "./Components/processing/ManagingOrders";
import ChartTest from "./ChartTest";
import Profile from "./Components/profile/Profile";




var setPage,passData,updateAuth
function Route(){

    const [pageState,setState]=useState(1)
    setPage=setState
    const[dataFromSibling,setDataFromSibling]=useState(null)
    passData=setDataFromSibling

    updateAuth=()=>{
        if(checkAuth()){
            if(getUserType()==='3'){
                setState(7)
            }else if(getUserType()==='1'){
                setState(6)
            }else{
                setState(11)
            }
        }else{
            setState(1)
        }
    }
    useEffect(()=>{
        updateAuth()
    },[])



    const callProfile=()=>{
        setPage(13)
    }
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
                                            <Catalog nav={setState} setFabricType={setDataFromSibling} type={dataFromSibling} routeProfile={callProfile}/>
                                        ):(
                                            pageState===8?(
                                                <Catagories nav={setState} type={dataFromSibling}/>
                                            ):(
                                                pageState===9?(
                                                    <AllOrder nav={{setState}}/>
                                                ):(
                                                    pageState===10?(

                                                        <Sales nav={{setState}}/>
                                                    ):(
                                                        pageState===11?(

                                                            <LoginPage nav={setState}/>
                                                        ):(
                                                            pageState===12?(
                                                                <ManagingOrders nav={setState}/>
                                                            ):(
                                                                <profil nav={setState}/>
                                                            )
                                                        )
                                                    )
                                                )

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
export {setPage,passData,updateAuth}


