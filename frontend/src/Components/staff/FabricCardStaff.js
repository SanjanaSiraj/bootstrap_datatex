import React, {useEffect, useRef, useState} from "react";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, Chip,
    Typography
} from "@mui/material";

import img1 from '../Images/img1.jpg'
import {colorToHex, invertColor} from "../../util";



function FabricCardStaff(props){


    return (
        <Card elevation={5} >
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
                <Chip label="RATING" variant="outlined" disabled={true} style={{marginLeft:'auto'}} />
            </CardActions>
        </Card>
    )
}
export default FabricCardStaff