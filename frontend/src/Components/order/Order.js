import React, {useEffect, useState} from "react";
import {getCatalogs} from "../../action/buyer";
import {setLoading, showToast} from "../../App";
import img3 from '../Images/img3.jpg'
import {getOrders} from "../../action/admin";
import {Button, Divider, Grid, Paper} from "@mui/material";
import './Order.css'
function Order(props){

    const [array,setArray]=useState(null)

    useEffect(async ()=>{
        var result=await getOrders()
        setArray(result.result)
        console.log(result.result,'in useeffect')
    },[])
    return(
        <div >
           <Grid container spacing={2} className={'container-order'}>

               {
                   array===null?(
                       <div>
                           nothing
                       </div>
                   ):(
                       array.map(order=>{
                           return(
                               <Grid item xs={4}>
                                   <Paper style={{padding:'10px'}}>
                                       <Grid container spacing={1}>
                                           <Grid item xs={9}>
                                               <b>
                                                   Fabric id:
                                               </b>
                                               {order.FABRIC_ID}
                                               <Divider light style={{padding:'0px',margin:'0px'}} />
                                               <br/>
                                               <b>
                                                   Color id:
                                               </b>
                                               {order.COLOR_ID}
                                               <Divider light style={{padding:'0px',margin:'0px'}} />
                                               <br/>
                                               <b>
                                                   Cotton Percentage:
                                               </b>
                                               {order.COTTON_PCT}
                                               <Divider light style={{padding:'0px',margin:'0px'}} />
                                               <br/>
                                               <b>
                                                   Polyester Percentage:
                                               </b>
                                               {order.POLYESTER_PCT}
                                               <Divider light style={{padding:'0px',margin:'0px'}} />
                                               <br/>
                                               <b>
                                                   Rayon Percentage:
                                               </b>
                                               {order.RAYON_PCT}
                                               <Divider light style={{padding:'0px',margin:'0px'}} />
                                               <br/>
                                               <b>
                                                   Tencil Percentage:
                                               </b>
                                               {order.TENCIL_PCT}
                                               <Divider light style={{padding:'0px',margin:'0px'}} />
                                               <br/>
                                               <b>
                                                   Viscose Percentage:
                                               </b>
                                               {order.VISCOSE_PCT}
                                               <Divider light style={{padding:'0px',margin:'0px'}} />
                                               <br/>
                                               <b>
                                                   Lycra Percentage:
                                               </b>
                                               {order.LYCRA_PCT}
                                               <Divider light style={{padding:'0px',margin:'0px'}} />
                                               <br/>
                                               <b>
                                                   Gsm Weight:
                                               </b>
                                               {order.GSM_WEIGHT}
                                               <Divider light style={{padding:'0px',margin:'0px'}} />
                                               <br/>
                                               <b>
                                                   Total Price:
                                               </b>
                                               {order.TOTAL_PRICE}
                                               <Divider light style={{padding:'0px',margin:'0px'}} />
                                               <br/>
                                               <b>
                                                   Order Date:
                                               </b>
                                               {order.ORDER_DATE}
                                               <Divider light style={{padding:'0px',margin:'0px'}} />
                                               <br/>
                                               <b>
                                                   Buyer Name:
                                               </b>
                                               {order.BUYER_NAME}
                                               <Divider light style={{padding:'0px',margin:'0px'}} />
                                               <br/>
                                               <b>
                                                   Buyer Address:
                                               </b>
                                               {order.BUYER_ADDRESS}
                                               <Divider light style={{padding:'0px',margin:'0px'}} />
                                               <br/>
                                               <b>
                                                   Affiliation
                                               </b>
                                               {order.AFFLIATION}
                                               <Divider light style={{padding:'0px',margin:'0px'}} />
                                               <br/>

                                               <Button variant={"contained"} color={'success'}>
                                                   ACCEPT
                                               </Button>
                                               <Button variant={"contained"} color={'error'}>
                                                   REJECT
                                               </Button>
                                           </Grid>
                                           <Grid item xs={3}>
                                                <img style={{width:'100%'}}
                                                     src={'https://i.pinimg.com/236x/03/4b/de/034bde783ea726b922100c86547831e8.jpg'}/>
                                           </Grid>
                                       </Grid>
                                   </Paper>
                               </Grid>
                           )
                       })
                   )
               }
           </Grid>
        </div>
    )
}

export default Order