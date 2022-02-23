import React, {useEffect, useRef, useState} from "react";
import {getOrders, getProductions, insertNewProduction, updateApproveStatus} from "../../action/admin";
import {
    Box, Button,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    Divider,
    Fab,
    Grid, TextField,
    Typography
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';
import ProductionCard from "./ProductionCard";
import AddIcon from '@mui/icons-material/Add';
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {showToast} from "../../App";


function Production(props){

    const [array,setArray]=useState(null)
    const runRef=useRef()
    const speedRef=useRef()
    const costRef =useRef()
    const [date,setDate]=useState(Date.now())

    const[open1,setOpen]=useState(false)
    useEffect(async ()=>{
        var result=await getProductions()
        setArray(result.result)
        console.log(result.result,'in useeffect')
    },[])
    const handleDate=newVal=>{
        setDate(newVal)
        console.log(new Date(newVal).getTime()/1000)
    }

    async function createProduction() {
       setOpen(true)
    }

    const onClickedBack=()=>{
        setOpen(false)
    }


    async function createMachine() {
        if(runRef.current.value===null&&runRef.current.value===undefined){
            showToast('please set run status of your production')
        }else if(costRef.current.value===null&&costRef.current.value===undefined){
            showToast('please set cost of your production')
        }else if(speedRef.current.value===null&&speedRef.current.value===undefined){
            showToast('please set hourly gsm speed of your production')
        }else{
            const data={
                run_status:parseInt(runRef.current.value),
                setup_cost:parseInt(costRef.current.value),
                setup_date:new Date(date).getTime()/1000,
                hourly_gsm_speed:parseInt(speedRef.current.value)
            }
            console.log(data,'data in line 59')
            let result=await insertNewProduction(data)
            if(result){
                showToast('Production is created successfully')
                setOpen(false)
            }else{
                showToast('Operation is unsuccessful')
            }
        }

    }

    return(
        <div style={{height:'calc(100vh - 90px)',overflowY:'scroll'}}>
            <Dialog open={open1}>
                <DialogTitle>
                    Create New Production
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={1} >
                        <Grid item xs={6}>
                            <TextField variant={"outlined"} label={"Run Status"} fullWidth inputRef={runRef} type={"number"}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant={"outlined"} label={"Setup Cost"} fullWidth inputRef={costRef} type={"number"}/>
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
                            <TextField variant={"outlined"} label={"Hourly gsm Speed"} fullWidth inputRef={speedRef} type={"number"}/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>

                    <Button color={"secondary"} onClick={onClickedBack}>
                        Cancel
                    </Button>
                    <Button color={"primary"} onClick={createMachine} >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <Box>
                <Grid container spacing={2} style={{marginTop:'30px',marginBottom:'30px'}}>
                    {
                        array===null?(
                            <div>
                                nothing
                            </div>
                        ):(
                            array.map(production=>{
                                return(
                                    <Grid item xs={7}>
                                        <ProductionCard data={production}/>
                                    </Grid>
                                )
                            })
                        )
                    }
                    <Fab onClick={createProduction} style={{position:'fixed',right:'20px',bottom:'20px'}} color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Grid>

            </Box>

        </div>
    )
}

export default Production