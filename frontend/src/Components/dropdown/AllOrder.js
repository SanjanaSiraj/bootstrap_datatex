import React, {useEffect, useState} from "react";
import {Box, Button, Container} from "@mui/material";
import {setPage} from "../../Route";
import {getCatalogs, getOwnOrders, updateRemoveStatus} from "../../action/buyer";
import {setLoading, showToast} from "../../App";
import {getUserId} from "../../action/auth";
import {OrderItem} from "./OrderItem";
import './AllOrder.css'
function AllOrder(props){
    const [array,setArray]=useState(null)
    useEffect(async ()=>{
        var result=await getOwnOrders(getUserId())
        setArray(result.result)
        console.log(result,'in useeffect')
    },[])

    async function delItem(A,B) {
        setLoading(true)

        var result=await updateRemoveStatus(A,B,1)
        if(result){
            var arr=[]
            array.map(a=>{
                if(a.FABRIC_ID!==B)
                    arr.push(a)
            })
            setArray(arr)
            setLoading(false)
            showToast('item is removed successfully')
        }else{
            setLoading(false)
            showToast('something is wrong')
        }
    }
    return(
        <div>
            <Button onClick={()=>{
                setPage(8)}
            }>
                back
            </Button>
            <Box>
                <div className='checkout-page'>
                    <div className='checkout-header'>
                        <div className='header-block'>
                            <span>Product</span>
                        </div>
                        <div className='header-block'>
                            <span>Description</span>
                        </div>
                        <div className='header-block'>
                            <span>Quantity</span>
                        </div>
                        <div className='header-block'>
                            <span>Price</span>
                        </div>
                        <div className='header-block'>
                            <span>Approve Status</span>
                        </div>
                        <div className='header-block'>
                            <span>Remove</span>
                        </div>
                    </div>
                    {
                        array===null?(
                            <div>
                                Loadin....
                            </div>
                        ):(
                            array.map(a=>{
                                return(
                                    <OrderItem item={a} delfun={delItem}/>
                                )
                            })
                        )
                    }
                    <div className='total'>TOTAL: 13456 TK</div>
                </div>
            </Box>

        </div>
    )
}
export default AllOrder