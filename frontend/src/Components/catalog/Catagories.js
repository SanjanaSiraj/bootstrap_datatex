import React, {useEffect, useState} from 'react';
import './Catagory.css'
import {Box, Container, Grid, Typography} from "@mui/material";
import img1 from '../Images/img1.jpg'
import FabricCard from "./FabricCard";
import {getCatalogs} from "../../action/buyer";
import {Button} from "react-bootstrap";
import '../Pages/Brand.css'
import {setLoading, showToast} from "../../App";
function Catagories(props){
    const [array,setArray]=useState(null)
    const [isFound,setFound]=useState(false)
    useEffect(async ()=>{
        var result=await getCatalogs(props.type)
        if(result.result.length===0){
            setLoading(false)
            showToast('Nothing to show')
            setFound(false)
        }
        setFound(true)
        setArray(result.result)
        console.log(result,'in useeffect')
    },[])

    const clickedbACK=()=>{
        console.log('clicked')
        props.nav(7)
    }
    return(
        <div >
            <div className='header' >
                <span className='logo-container' >
                    <Button style={{backgroundColor:'white',color:'black'}} variant={'text'} className={'Brand'}>D datatex</Button>
                </span>

                <div className='options'onClick={clickedbACK}>
                    <div className='option' >
                        BACK2
                    </div>
                </div>
            </div>
            <center className={'header_Text'}>
                <Typography variant="h3" color="black"  className={'heading_center'}>
                    {props.type.toUpperCase()}
                </Typography>
            </center>
            <Box>
                <Grid style={{padding:'10px'}} container spacing={2}>
                    {
                        array===null?(

                            <div>

                                {
                                    isFound===false?(
                                        <div>
                                            Nothing to show
                                        </div>
                                    ):(
                                        <div>
                                            Loading.....
                                        </div>
                                    )
                                }
                            </div>
                        ):(
                            array.map(catalog=>{
                                console.log(catalog,'in array m,ap')
                                return(
                                    <Grid item xs={12} md={2}>
                                        <FabricCard data={catalog} />
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

export default Catagories;