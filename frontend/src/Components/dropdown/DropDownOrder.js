import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import './dropDown.css'
import {setPage} from "../../Route";
import {getOwnOrders} from "../../action/buyer";
import {getUserId} from "../../action/auth";
import DropItem from "./DropItem";
function DropDownOrder(props){
    const [array,setArray]=useState(null)
    useEffect(async ()=>{
        var result=await getOwnOrders(getUserId())
        setArray(result.result)
        console.log(result,'in useeffect')
    },[])
    return(
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {
                    array===null?(
                        <div>
                            Loading....
                        </div>
                    ):(
                        array.map(a=>{
                            return(
                                <DropItem item={a}/>
                            )
                        })
                    )
                }
            </div>
            <Button variant={"outlined"}
                onClick={() => {
                    setPage(9)
                    console.log('clicked')
                }}
            >
                SEE DETAILS
            </Button>
        </div>
    )
}
export default DropDownOrder