import React, {useEffect, useRef, useState} from "react";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
    IconButton, TextField,
    Typography
} from "@mui/material";

import img1 from '../Images/img1.jpg'
import {colorToHex, invertColor} from "../../util";
import {setPage} from "../../Route";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {orderFabricInserted} from "../../action/buyer";
import {setLoading, showToast} from "../../App";
import {getUserId} from "../../action/auth";


function FabricCard(props){
    const [orderDialog,setOrderDialog]=useState(false)
    const [user_id,setUserId]=useState(getUserId)
    const orderFabric=()=>{
        setPrice(0)
        setOrderDialog(true)
    }
    useEffect(()=>{
        console.log(invertColor('black'))
    },[])

    const onClickedBack=()=>{
        setOrderDialog(false)
        setPrice(0)
    }

    const cottonRef=useRef();
    const polysterRef=useRef();
    const nameRef=useRef();
    const addressRef=useRef();
    const compannyRef=useRef();
    const dateRef=useRef();
    const rayonRef=useRef();
    const gsmWeightRef=useRef();
    const tencilRef=useRef();
    const viscoseRef=useRef();
    const lycraRef=useRef();

    const [price,setPrice]=useState(0)
    const [date,setDate]=useState(Date.now())
    const getGsmWeight=(e)=>{
        console.log(e.target.value)
        if(e.target.value.length===0){
            setPrice(0)
        }else{
            try{
                console.log(parseInt(e.target.value),props.data.PRICE_PER_GSM,'in 54')
                var total=parseInt(e.target.value)* props.data.PRICE_PER_GSM
                setPrice(total)
            }catch(e){
                console.log(e)
                setPrice(0)
            }
        }

    }

    const handleDate=newVal=>{
        setDate(newVal)
        console.log(new Date(newVal).getTime()/1000)
    }

    const insertOrderIntoFabric=async ()=>{
        console.log(new Date(date).getTime()/1000,'date in insertorderinto method')

        if(parseInt(cottonRef.current.value)<0){
            showToast('cotton percentage can not be negative')
        }else if(parseInt(polysterRef.current.value)<0){
            showToast('polyester percentage can not be negative')
        }else if(parseInt(rayonRef.current.value)<0){
            showToast('rayon percentage can not be negative')
        }else if(parseInt(tencilRef.current.value)<0){
            showToast('tensil percentage can not be negative')
        }else if(parseInt(viscoseRef.current.value)<0){
            showToast('viscose percentage can not be negative')
        }else if(parseInt(gsmWeightRef.current.value)<0){
            showToast('gsm weight can not be negative')
        }else if(parseInt(gsmWeightRef.current.value)===0||new Date(date).getTime()/1000===0||nameRef.current.value.length===0||compannyRef.current.value.length===0){
            showToast('You have to fill all required fields')
        }else {

            const data={
                color_id:props.data.COLOR_ID,
                cotton_pct:parseInt(cottonRef.current.value),
                polyester_pct:parseInt(polysterRef.current.value),
                rayon_pct:parseInt(rayonRef.current.value),
                tencil_pct:parseInt(tencilRef.current.value),
                viscose_pct:parseInt(viscoseRef.current.value),
                lycra_pct:parseInt(lycraRef.current.value),
                gsm_weight:parseInt(gsmWeightRef.current.value),
                order_date:new Date(date).getTime()/1000,
                buyer_name:nameRef.current.value,
                buyer_address:addressRef.current.value,
                affliation:compannyRef.current.value,
                total_price:price,
                image:props.data.IMAGE,
                user_id:user_id
            }
            console.log(data,'in insert order into fabric in 101')
            setLoading(true)
            var isInserted=await orderFabricInserted(data)
            if(isInserted) {

                setOrderDialog(false)
                setLoading(false)
                showToast('order given successfully')
            }
            else{
                showToast('order is not successful')
            }
            console.log('after create order')
        }

    }

    return (
        <Card elevation={5} >
            <Dialog open={orderDialog}>
                <DialogTitle>
                    Order {props.data.COLOR}
                    <br/>
                    <Typography variant={"caption"} >
                        You have to fill date,buyer name,affiliation,amount gsm weight you want to buy
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={1} style={{marginTop:'7px'}}>
                        <Grid item xs={6}>
                            <TextField variant={"outlined"} label={"Cotton percentage"} fullWidth inputRef={cottonRef} type={"number"}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant={"outlined"} label={"Polyester percentage"} fullWidth inputRef={polysterRef}type={"number"}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant={"outlined"} label={"Rayon percentage"} fullWidth inputRef={rayonRef}type={"number"}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant={"outlined"} label={"Tencil percentage"} fullWidth inputRef={tencilRef}type={"number"}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant={"outlined"} label={"Viscose percentage"} fullWidth inputRef={viscoseRef}type={"number"}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant={"outlined"} label={"Lycra percentage"} fullWidth inputRef={lycraRef}type={"number"}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant={"outlined"} label={"gsm weight"} fullWidth inputRef={gsmWeightRef} type={"number"} onChange={getGsmWeight}/>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    value={date}
                                    onChange={handleDate}
                                    label="Date"
                                    inputFormat="MM/dd/yyyy"
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant={"outlined"} label={"buyer name"} fullWidth inputRef={nameRef}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant={"outlined"} label={"buyer address"} fullWidth inputRef={addressRef}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant={"outlined"} label={"affiliation"} fullWidth inputRef={compannyRef}/>
                        </Grid>

                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Typography variant={"h6"} style={{marginRight:'auto',marginLeft:'30px',marginBottom:'8px'}}>
                        Total Price: {price}/=
                    </Typography>
                    <Button color={"secondary"} onClick={onClickedBack}>
                        Cancel
                    </Button>
                    <Button color={"primary"} onClick={insertOrderIntoFabric} >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <CardHeader
                avatar={
                    <Avatar style={{ backgroundColor: props.data.COLOR,border:'1px solid '+invertColor(props.data.COLOR),color:invertColor(props.data.COLOR)}}>
                        {props.data.COLOR_ID}
                    </Avatar>
                }
                title={props.data.COLOR}
                subheader={props.data.WEAVE_DESIGN}
            />
            {
                props.data.IMAGE===null?(
                    <CardMedia
                        component="img"
                        height="194"
                        image={img1}
                        alt="Paella dish"
                    />
                ):(
                    <CardMedia
                        component="img"
                        height="194"
                        image={props.data.IMAGE}
                        alt="Paella dish"
                    />
                )
            }

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Price Per Gsm:{props.data.PRICE_PER_GSM}
                    <br/>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Chip label="ORDER" variant="outlined" style={{marginRight:'auto'}} onClick={orderFabric}/>
            </CardActions>
        </Card>
    )
}
export default FabricCard