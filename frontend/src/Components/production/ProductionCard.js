import React, {useEffect, useState} from "react";
import {Card, CardActions, CardContent, Collapse, Divider, Grid, Paper, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";
import {getAllApprovals, getProductions} from "../../action/admin";

function ProductionCard(props){
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [array,setArray]=useState(null)

    useEffect(async ()=>{
        console.log(props.data.PRODUCTION_UNIT_ID,'id in line 17')
        var result=await getAllApprovals(props.data.PRODUCTION_UNIT_ID)
        setArray(result.result)
        console.log(result.result,'in useeffect line 20')
    },[])
    return(
        <div>
            <Card elevation={3} style={{border:'2px solid darkorange',boxShadow:'5px 10px 18px #888888',borderRadius:'50ppx'}}>
                <CardContent>
                    <b>
                        Production_unit_id:
                    </b>
                    {props.data.PRODUCTION_UNIT_ID}
                    <Divider light style={{width:'60%'}}/>
                    <b>
                        Run Status :
                    </b>
                    {props.data.RUN_STATUS}
                    <Divider light style={{width:'60%'}}/>
                    <b>
                        SetUp Cost:
                    </b>
                    {props.data.SETUP_COST}
                    <Divider light style={{width:'60%'}}/>
                    <b>
                        SetUp Date:
                    </b>
                    {new Date(props.data.SETUP_DATE*1000).toLocaleString()}
                    <Divider light style={{width:'60%'}}/>
                    <b>
                        Hourly Gsm Speed :
                    </b>
                    {props.data.HOURLY_GSM_SPEED}
                    <Divider light style={{width:'60%'}}/>
                </CardContent>

                <CardActions disableSpacing>
                    <ExpandMore style={{}}
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                    >
                        <ExpandCircleDownRoundedIcon style={{backgroundColor:"grey"}} />
                    </ExpandMore>
                    See running productions
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Grid container spacing={2}>
                            {
                                array===null?(
                                    <div>
                                        nothing is running
                                    </div>
                                ):(
                                    array.map(p=>{
                                        return(
                                            <Grid item xs={7}>
                                                <Paper elevation={5}>
                                                    <b>
                                                        Approval Id:
                                                    </b>
                                                    {p.APPROVAL_ID}
                                                    <Divider light style={{width:'60%'}}/>
                                                    <b>
                                                        Fabric Id :
                                                    </b>
                                                    {p.FABRIC_ID}
                                                    <Divider light style={{width:'60%'}}/>
                                                    <b>
                                                        Production_unit_id:
                                                    </b>
                                                    {p.PRODUCTION_UNIT_ID}
                                                    <Divider light style={{width:'60%'}}/>
                                                    <b>
                                                        Approve date:
                                                    </b>
                                                    {new Date(p.APPROVE_DATE*1000).toLocaleString()}
                                                    <Divider light style={{width:'60%'}}/>
                                                    <b>
                                                        Production Start Date :
                                                    </b>
                                                    {new Date(p.PROD_START_DATE*1000).toLocaleString()}
                                                    <Divider light style={{width:'60%'}}/>
                                                    <b>
                                                        Production End Date :
                                                    </b>
                                                    {new Date(p.PROD_END_DATE*1000).toLocaleString()}
                                                    <Divider light style={{width:'60%'}}/>
                                                    <b>
                                                        Production Status :
                                                    </b>
                                                    {
                                                        p.PRODUCTION_STATUS===0?(
                                                            <div>
                                                                ON
                                                            </div>
                                                        ):(
                                                            <div>
                                                                OFF
                                                            </div>
                                                        )
                                                    }
                                                    <Divider light style={{width:'60%'}}/>
                                                    <b>
                                                        Delivary Status :
                                                    </b>
                                                    {p.DELIVERY_STATUS}
                                                </Paper>
                                            </Grid>
                                        )
                                    })
                                )
                            }
                        </Grid>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}

export default ProductionCard