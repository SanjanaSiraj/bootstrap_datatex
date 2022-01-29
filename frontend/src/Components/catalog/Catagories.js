import React, {useEffect, useState} from 'react';
import './Catagory.css'
import {Box, Container, Grid, Typography} from "@mui/material";
import img1 from '../Images/img1.jpg'
import FabricCard from "./FabricCard";
import {getCatalogs} from "../../action/buyer";
import {Button, Navbar} from "react-bootstrap";
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

    const[username,setUsername]=useState(null)

    const clickedPage1=()=>{
        props.nav(1)
    }

    useEffect(()=>{
        console.log(props.type)
        setUsername(props.type.username)
    },[props.type])
    return(
        <div >
            <Navbar bg="dark" variant="dark" style={{ height:'80px'}}>
                <Container>
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
                    </Navbar.Collapse>
                </Container>
            </Navbar>
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