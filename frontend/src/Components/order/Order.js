import React, {useEffect, useState} from "react";
import {getCatalogs} from "../../action/buyer";
import {setLoading, showToast} from "../../App";
import img3 from '../Images/img3.jpg'
import {getFinishingTime, getOrders, insertNewApprovedOrder, updateApproveStatus} from "../../action/admin";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Paper,
    Typography
} from "@mui/material";
import './Order.css'
function Order(props){
    const [option,setOption]=useState(null)
    const [array,setArray]=useState(null)
    const [array2,setArray2]=useState(null)
    const [orderDialog,setOrderDialog]=useState(false)
    const [orderDialog2,setOrderDialog2]=useState(false)
    const [gsm,setgsm]=useState(null)
    const [fabric,setFabric]=useState(null)
    useEffect(async ()=>{
        var result=await getOrders()
        setArray(result.result)
        console.log(result.result,'in useeffect')
    },[])

    const fetchList=async ()=>{
        if(gsm!==null){
            var result=await getFinishingTime(gsm)
            setArray2(result.result)
            console.log(result.result,'in useeffect2')
        }
    }

    useEffect(async ()=>{
        await fetchList()
    },[gsm])



    async function acceptOrder(e) {
        setgsm(e.GSM_WEIGHT)
        setFabric(e.FABRIC_ID)
        console.log(e.GSM_WEIGHT,'in accept order')
        let result=await updateApproveStatus(e,1)
        if(result){
            showToast('Order is approved')
            setOrderDialog(true)
        }else{
            showToast('Operation is unsuccessful')
        }

    }

    async function rejectOrder(e) {
        console.log('in reject order in first line',e)
        setLoading(true)
        let result=await updateApproveStatus(e,2)
        if(result){
            var arr=[]
            array.map(a=>{
                if(a.FABRIC_ID!==e.FABRIC_ID)
                    arr.push(a)
            })
            setArray(arr)
            setLoading(false)
            showToast('Order is canceled')

        }else{
            setLoading(false)
            showToast('Operation is unsuccessful')
        }
    }

    function assignMachine() {
        setOrderDialog(false)
        setOrderDialog2(true)
        console.log(gsm,'in assignMachine')
    }

    async function insertIntoApproval() {


        const data2={
            fabric_id:fabric,
            production_unit_id:option.id,
            start_date:option.start_time,
            end_date:option.finish_time,
            approve_date:Date.now()/1000
        }
        console.log(data2,'in insertINtoApproval ')
        setLoading(true)
        let result=await insertNewApprovedOrder(data2)
        if(result){
            var arr=[]
            array.map(a=>{
                if(a.FABRIC_ID!==fabric)
                    arr.push(a)
            })
            setArray(arr)
            setLoading(false)
            showToast('Machine is assigned')
            setOrderDialog2(false)
            await fetchList()
        }else{
            setLoading(false)
            showToast('Operation is unsuccessful')

        }
    }

    return(
        <div className={'orderClass'}>
            {/*<div>
                {array2===null?(
                    <div>nothing</div>
                ):(
                    <div>
                        {
                            array2.map(p=>{
                                return(
                                    <div>{p.id}</div>
                                )
                            })
                        }
                    </div>
                )}
            </div>*/}
           <Grid container spacing={2} className={'container-order'}>
               <Dialog open={orderDialog}>
                   <DialogTitle>
                       assign production
                   </DialogTitle>

                   <DialogContent>
                       <Button variant={"contained"} onClick={assignMachine}>
                           assign production unit id
                       </Button>
                   </DialogContent>
               </Dialog>
               <Dialog open={orderDialog2} onClose={()=>{setOrderDialog2(false)}}>
                   <DialogTitle>
                       choose one
                   </DialogTitle>

                   <DialogContent>
                       {
                           array2===null?(
                               <div>
                                   nothing
                               </div>
                           ):(
                               <Grid container spacing={2}>
                                   {
                                       array2.map(p=>{
                                           return(
                                               <Grid item xs={6}  onClick={()=>{
                                                 setOption(p)
                                               }
                                               }>
                                                   {
                                                       option!==null && p.id===option.id?(
                                                           <Paper elevation={4} className={'item-click'} style={{padding:'20px',backgroundColor:'#00aa0033'}}>
                                                               <Grid container spacing={2}>
                                                                   <Grid item xs={12} >
                                                                       <b>
                                                                           Production Unit id :
                                                                       </b>
                                                                       {p.id}
                                                                       <Divider light style={{padding:'0px',margin:'0px'}} />
                                                                   </Grid>
                                                                   <Grid item xs={12}>
                                                                       <b>
                                                                           Start time :
                                                                       </b>
                                                                       {new Date(p.start_time*1000).toLocaleString()}
                                                                       <Divider light style={{padding:'0px',margin:'0px'}} />
                                                                   </Grid>
                                                                   <Grid item xs={12}>
                                                                       <b>
                                                                           Finish Time :
                                                                       </b>
                                                                       {new Date(p.finish_time*1000).toLocaleString()}
                                                                       <Divider light style={{padding:'0px',margin:'0px'}} />

                                                                   </Grid>
                                                               </Grid>
                                                           </Paper>
                                                      ):(
                                                           <Paper elevation={4} className={'item-click'} style={{padding:'20px'}}>
                                                               <Grid container spacing={2}>
                                                                   <Grid item xs={12} >
                                                                       <b>
                                                                           Production Unit id :
                                                                       </b>
                                                                       {p.id}
                                                                       <Divider light style={{padding:'0px',margin:'0px'}} />
                                                                   </Grid>
                                                                   <Grid item xs={12}>
                                                                       <b>
                                                                           Start time :
                                                                       </b>
                                                                       {new Date(p.start_time*1000).toLocaleString()}
                                                                       <Divider light style={{padding:'0px',margin:'0px'}} />
                                                                   </Grid>
                                                                   <Grid item xs={12}>
                                                                       <b>
                                                                           Finish Time :
                                                                       </b>
                                                                       {new Date(p.finish_time*1000).toLocaleString()}
                                                                       <Divider light style={{padding:'0px',margin:'0px'}} />

                                                                   </Grid>
                                                               </Grid>
                                                           </Paper>
                                                       )
                                                   }


                                               </Grid>
                                           )
                                       })
                                   }
                               </Grid>
                           )
                       }
                   </DialogContent>

                   <DialogActions>
                       <Button color={"primary"} onClick={insertIntoApproval} >
                           Submit
                       </Button>
                   </DialogActions>
               </Dialog>
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
                                               {new Date(order.ORDER_DATE*1000).toLocaleString()}
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

                                               {
                                                   props.isAdmin===false?(
                                                       <div>

                                                       </div>
                                                   ):(
                                                       <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                                                           <Button variant={"contained"} color={'success'} style={{marginRight:'30px'}} onClick={()=>{
                                                               acceptOrder(order)
                                                           }}>
                                                               ACCEPT
                                                           </Button>
                                                           <Button variant={"contained"} color={'error'} onClick={()=>{
                                                               rejectOrder(order)
                                                           }}>
                                                               REJECT
                                                           </Button>
                                                       </div>
                                                   )
                                               }
                                           </Grid>
                                           <Grid item xs={3}>
                                               {
                                                   order.IMAGE===null?(
                                                       <img style={{width:'100%'}}
                                                            src={'https://i.pinimg.com/236x/03/4b/de/034bde783ea726b922100c86547831e8.jpg'}/>
                                                   ):(
                                                       <img style={{width:'100%'}}
                                                            src={order.IMAGE}/>
                                                   )
                                               }

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