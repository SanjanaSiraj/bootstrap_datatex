import React, {useEffect, useState} from "react";
import './OrderItem.css'
import {getACats, getCatalogs, updateRemoveStatus} from "../../action/buyer";
import {setLoading, showToast} from "../../App";
import {getUserId} from "../../action/auth";
var type,color

function OrderItem(props){
    const [typ,setTyp]=useState(null)
    const [col,setCol]=useState(null)
    useEffect(async ()=>{
        var result=await getACats(props.item.COLOR_ID)
        setTyp(result[0].WEAVE_DESIGN)
        setCol(result[0].COLOR)
        console.log(result,'in useeffect in line 12',type,color)
    },[])



    return(
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={props.item.IMAGE} alt='item' />
            </div>
            <div className='name'>

                id: {props.item.COLOR_ID},cotton pct: {props.item.COTTON_PCT},polyester pct: {props.item.POLYESTER_PCT}
                <br/>
                rayon pct: {props.item.RAYON_ID},tensil pct: {props.item.TENSIL_PCT},viscose pct: {props.item.VISCOSE_PCT}
                <br/>
                lycra pct: {props.item.LYCRA_PCT},cotton pct: {props.item.COTTON_PCT},polyester pct: {props.item.COTTON_PCT}
                <br/>

            </div>
            <span className='quantity'>{props.item.GSM_WEIGHT}</span>
            <span className='price'>{props.item.TOTAL_PRICE}</span>
            <span className='approve'>
                {
                    props.item.APPROVE_STATUS === 0 ? (
                        <div>
                            Pending
                        </div>
                        ):(
                        props.item.APPROVE_STATUS === 1 ? (
                            <div>
                                Accepted
                            </div>
                        ):(
                            <div>
                                Rejected
                            </div>
                        )
                    )
                }
            </span>
            <div className='remove-button' onClick={()=>{
                props.delfun(getUserId(),props.item.FABRIC_ID)
            }}>&#10005;</div>
        </div>
    )
}

export {OrderItem}