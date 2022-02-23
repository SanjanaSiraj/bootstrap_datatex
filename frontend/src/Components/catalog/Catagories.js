import React, {useEffect, useState} from 'react';
import './Catagory.css'
import {Box, Container, Grid, Typography} from "@mui/material";
import FabricCard from "./FabricCard";
import {getCatalogs} from "../../action/buyer";
import {Button, Navbar} from "react-bootstrap";
import '../Pages/Brand.css'
import {setLoading, showToast} from "../../App";
import {getUserName} from "../../action/auth";
import DropDownOrder from "../dropdown/DropDownOrder";
import AllInboxRoundedIcon from '@mui/icons-material/AllInboxRounded';

function Catagories(props){
    const [array,setArray]=useState(null)
    const [isFound,setFound]=useState(false)
    const [open,setOpen]=useState(false)
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

    const[username,setUsername]=useState(getUserName)

    const clickedPage1=()=>{
        props.nav(1)
    }



    return(
        <div >
            <Navbar bg="dark" variant="dark">
                <Container style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Button variant={"outline-primary"} onClick={clickedbACK}>Back</Button>
                    <Button variant="dark" className={'Brand'}>D datatex</Button>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">{username}</a>
                        </Navbar.Text>
                        <Navbar.Text style={{
                            marginLeft: '10px'
                        }}>|</Navbar.Text>
                        <Button variant="dark" onClick={clickedPage1}>Log Out</Button>
                        {/*<Button variant="dark" onClick={()=>{
                            {
                                open===false?(
                                    setOpen(true)
                                ):(
                                    setOpen(false)
                                )
                            }
                        }}>
                            <AllInboxRoundedIcon/>
                        </Button>*/}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {
                open===true?(
                   <DropDownOrder/>
                ):(
                    <div>
                    </div>
                )
            }
            <Box>
                <Grid style={{padding:'10px'}} container spacing={2}>
                    {
                        array===null?(

                            <div>

                                {
                                    <div>
                                        Loading.......
                                    </div>
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