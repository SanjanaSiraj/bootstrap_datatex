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
import ProductionCard from "../production/ProductionCard";
import AddIcon from '@mui/icons-material/Add';
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {showToast} from "../../App";


function ProductionForStaff(props){

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

    return(
        <div style={{height:'calc(100vh - 97px)',overflowY:'scroll',paddingTop:'40px',paddingBottom:'40px'}}>
            <Box>
                <Grid container spacing={2} style={{}}>
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
                </Grid>

            </Box>

        </div>
    )
}

export default ProductionForStaff