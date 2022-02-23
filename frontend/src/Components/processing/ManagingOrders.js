import React, {useEffect, useState} from "react";
import {Box, Divider, Grid, Paper, Step, StepButton, Stepper, Typography} from "@mui/material";
import {Navbar,Button} from "react-bootstrap";
import {getUserId, getUserName, logout} from "../../action/auth";
import {updateAuth} from "../../Route";
import Container from "react-bootstrap/Container";
import './ManagingOrder.css'
import '../Assets/bootstrap.min.css'

import {
    get2OrdersAxios,
    get3OrdersAxios,
    get4OrdersAxios,
    get5OrdersAxios,
    getAllOrdersAxios,
    getOwnOrders
} from "../../action/buyer";
import axios from "axios";

const steps = ['All Orders', 'Approved Orders', 'Running Orders','Delivered Orders','Rejected Orders'];

function ManagingOrders(props){
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [username, setUsername] = useState(getUserName)
    const [array,setArray]=useState(null)
    const [array2,setArray2]=useState(null)
    const [array3,setArray3]=useState(null)
    const [array4,setArray4]=useState(null)
    const [array5,setArray5]=useState(null)
    const [arrayf,setArrayf]=useState(array)

    const totalSteps = () => {
        return steps.length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const clickedbACK=()=>{
        console.log('clicked')
        props.nav(7)
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                0
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        console.log(step)
        setActiveStep(step);
        if(step===1)
        setArrayf(array2)
        else if(step===0){
            setArrayf(array)
        }else if(step===2){
            setArrayf(array3)
        }else if(step===3){
            setArrayf(array4)
        }else{
            setArrayf(array5)
        }
    };

    useEffect(()=>{
        console.log(activeStep)
    },[activeStep])
    function clickedProfile() {

    }

    const clickedPage1 = () => {
        logout()
        updateAuth()
        //propes.nav(1)
    }



    useEffect(async ()=>{
        const req1=axios.post('http://localhost:8088/datatex/buyer/getAllOrders', {
            user_id:getUserId()
        })
        const req2=axios.post('http://localhost:8088/datatex/buyer/get2Orders', {
            user_id:getUserId()
        })
        const req3=axios.post('http://localhost:8088/datatex/buyer/get3Orders', {
            user_id:getUserId()
        })
        const req4=axios.post('http://localhost:8088/datatex/buyer/get4Orders', {
            user_id:getUserId()
        })
        const req5=axios.post('http://localhost:8088/datatex/buyer/get5Orders', {
            user_id:getUserId()
        })
        var apiCalls=[
            req1,req2,req3,req4,req5
        ]
        var allResults=await Promise.all(apiCalls)
        console.log(allResults,'all results')
        setArray(allResults[0].data.result)
        setArray2(allResults[1].data.result)
        setArray3(allResults[2].data.result)
        setArray4(allResults[3].data.result)
        setArray5(allResults[4].data.result)
        setArrayf(allResults[0].data.result)
    },[])

    useEffect(()=>{
        console.log(arrayf,'array f')
    },[arrayf])
   /* useEffect(async ()=>{
        var result=await getAllOrdersAxios(getUserId())
        setArray(result.result)
        console.log(result,'in useeffect')
    },[])

    useEffect(async ()=>{
        var result=await get2OrdersAxios(getUserId())
        setArray2(result.result)
        console.log(result,'in useeffect')
    },[])

    useEffect(async ()=>{
        var result=await get3OrdersAxios(getUserId())
        setArray3(result.result)
        console.log(result,'in useeffect')
    },[])
    useEffect(async ()=>{
        var result=await get4OrdersAxios(getUserId())
        setArray4(result.result)
        console.log(result,'in useeffect')
    },[])
    useEffect(async ()=>{
        var result=await get5OrdersAxios(getUserId())
        setArray5(result.result)
        console.log(result,'in useeffect array 5')
    },[])*/
    return(
        <div style={{
          overflowY:'hidden'
        }
        }>
            <Navbar bg="dark" variant="dark" style={{height:'80px'}}>
                <Container style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Button variant="dark" onClick={clickedbACK} style={{color:'white'}}>Back</Button>
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
            <div style={{padding:'20px'}}>
                <Paper style={{
                    padding:"15px"
                }}>
                    <Typography variant="h6" gutterBottom>
                        Your Order Placing Information
                    </Typography>
                    <Divider light style={{padding:'0px',margin:'0px',height:'3px',color:'blue',marginTop:'10px'}} />
                    <Stepper nonLinear activeStep={activeStep} style={{padding:'15px'}}>
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton color="inherit" onClick={handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </Paper>

                <div>
                    <Grid container spacing={2} style={{marginTop:'10px'}}>
                        {
                            arrayf===null?(
                                <div>
                                    Nothing to show
                                </div>
                            ):(
                                arrayf.map(a=>{
                                   return(
                                       <Grid item xs={4}>
                                           <Paper elevation={4}>
                                               <Grid container style={{}}>
                                                   <Grid item xs={4}>
                                                        <img src={a.IMAGE} style={{width:'100%',height:'130px',padding:'10px'}}/>
                                                         <div style={{paddingLeft:'10px'}}>
                                                             <b>
                                                                 Total price:
                                                             </b>
                                                             {a.TOTAL_PRICE}

                                                             <br/>
                                                             <b>
                                                                 Fabric Id :
                                                             </b>
                                                              {a.FABRIC_ID}
                                                         </div>
                                                   </Grid>
                                                   <Grid item xs={2}>
                                                       <center style={{}}>
                                                           <Divider orientation="vertical" flexItem  style={{height:'170px',width:'3px',color:'black',marginTop:'10px'}}/>
                                                       </center>
                                                   </Grid>
                                                   <Grid item xs={6}>
                                                       <div style={{paddingTop:'8px'}}>


                                                           <b>
                                                               Color Id :
                                                           </b>
                                                           {a.COLOR_ID}
                                                           <br/>
                                                           <b>
                                                               Cotton pct :
                                                           </b>
                                                           {a.COTTON_PCT}
                                                           <br/>
                                                           <b>
                                                               polyester pct :
                                                           </b>
                                                           {a.POLYESTER_PCT}
                                                           <br/>
                                                           <b>
                                                               rayon pct :
                                                           </b>
                                                           {a.RAYON_PCT}
                                                           <br/>
                                                           <b>
                                                               Tencil pct :
                                                           </b>
                                                           {a.TENCIL_PCT}
                                                           <br/>
                                                           <b>
                                                               viscose pct :
                                                           </b>
                                                           {a.VISCOSE_PCT}
                                                           <br/>
                                                           <b>
                                                               lycra pct :
                                                           </b>
                                                           {a.LYCRA_PCT}
                                                           <br/>
                                                           <b>
                                                               gsm weight:
                                                           </b>
                                                           {a.GSM_WEIGHT}

                                                       </div>
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
            </div>
        </div>
    )
}

export default ManagingOrders