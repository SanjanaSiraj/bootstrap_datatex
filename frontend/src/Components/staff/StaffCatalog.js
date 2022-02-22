import React, {useEffect, useState} from "react";

import {setLoading, showToast} from "../../App";
import {deletedCard, getCatalogsA} from "../../action/admin";
import {Box, Grid, Paper} from "@mui/material";
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import FabricCardStaff from "./FabricCardStaff";


function StaffCatalog(props){
    const [array,setArray]=useState(null)
    const [searchArray,setSearchArray]=useState(null)
    useEffect(async ()=>{
        setLoading(true)
        var result=await getCatalogsA()
        setArray(result.result)
        setSearchArray(result.result)
        setLoading(false)
        console.log(result,'in useeffect')
    },[])

    const deleteCat=async (id)=>{
        var isDeleted=await deletedCard(id)
        if(isDeleted){
            var arr=[]
            array.map(a=>{
                if(a.COLOR_ID!==id)
                    arr.push(a)
            })
            setArray(arr)
            showToast('Catalog is deleted successfully')
        }else{
            showToast('Something is wrong')
        }
    }

    const livesearch=(e)=>{

        var searchString=e.target.value

        if(searchString.trim().length===0){
            setSearchArray([...array])
        }else{
            var searchTokens=searchString.split(" ")
            var temp=[]
            array.map(out=>{
                var counter=0
                searchTokens.map(a=>{
                    if(JSON.stringify(out).toLowerCase().indexOf(a.toLowerCase().trim())>-1)
                    {

                        counter++
                    }
                })
                if(counter===searchTokens.length){
                    temp.push(out)
                }
            })
            console.log(temp,'in final search array')
            setSearchArray(temp)
        }
    }

    return(
        <div style={{padding:'10px'}}>
            <Box>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}} style={{width:'80%',}}
                >

                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Catalog"
                        inputProps={{ 'aria-label': 'search catalog' }} onChange={livesearch}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                </Paper>
                <Grid style={{marginTop:'10px'}} container spacing={2}>
                    {
                        searchArray===null?(

                            <div>

                                {
                                    <div>
                                        Loading.......
                                    </div>
                                }
                            </div>
                        ):(
                            searchArray.map(catalog=>{
                                console.log(catalog,'in array m,ap')
                                return(
                                    <Grid item xs={12} md={2}>
                                        <FabricCardStaff data={catalog} dell={deleteCat} key={catalog.COLOR_ID}/>
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
export default StaffCatalog