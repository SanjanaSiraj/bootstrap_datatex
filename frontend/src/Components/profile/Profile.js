import React, {useEffect, useRef, useState} from "react";
import {
    Avatar,
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import profile from '../Images/profile.jpg'
import {getCatalogs} from "../../action/buyer";
import {setLoading, showToast} from "../../App";
import {getProfile, getUserId, getUserType, updateDP, updateProfile} from "../../action/auth";
import './profile.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
function Profile(props){
    const [array,setArray]=useState(null)
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [open,setOpen]=useState(false)
    const [im,setIm]=useState(null)

    const nameRef=useRef()
    const usernameRef=useRef()
    const phoneRef=useRef()
    const addressRef=useRef()


    useEffect(async ()=>{
        setLoading(true)
        var result=await getProfile(getUserId())
        setArray(result.result)
        setLoading(false)
        setIm(result.result[0].IMAGE)
        console.log(result.result[0],'in useeffect')
    },[])

    const onImageChange = event => {
        setImage(event.target.files[0])
        var url = URL.createObjectURL(event.target.files[0])
        console.log(url,'url')
        setImagePreview(url)
        setIm(url)
    };

    const upload = async () => {
        setLoading(true)

        if (image !== null) {
            console.log('before get storeage ref')
            const storage = getStorage();
            const storageRef = ref(storage, `images/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed',
                (snapshot) => {
                },
                (error) => {
                    setLoading(false)
                    showToast('Error occurred')
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                         var res=await updateDP({
                             id:getUserId(),
                             image:downloadURL
                         })
                        if(res){
                            setLoading(false)
                            showToast('Profile picture updated successfully')
                        }else{
                            setLoading(false)
                            showToast('Something is wrong')
                        }
                    });
                })
        }else{
            console.log('image i s null')
        }

    }

    function updatep() {
        setOpen(true)
    }

    function onClickedBack() {
        setOpen(false)
    }

    async function updatingStart() {
        const data = {
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            address: addressRef.current.value,
            username:usernameRef.current.value,
            id:getUserId()
        }
        setLoading(true)
        var ans=await updateProfile(data)
        if(ans){
            var temp=[...array]
            temp[0]= {
                NAME:data.name,
                ADDRESS:data.address,
                PHONE:data.phone,
                USERNAME:data.username,
                EMAIL:array[0].EMAIL
            }
            setArray([...temp])
            setOpen(false)
            setLoading(false)
            showToast('profile updated successfully')
        }else{
            setLoading(false)
            showToast('something is wrong')
        }

    }

    return(
        <Grid container spacing={1}>

            <Dialog open={open}>
                <DialogTitle>
                    <Typography variant={"h6"} >
                        Update Profile
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {
                        array===null?(
                            <div>

                            </div>
                        ):(
                            <Grid container spacing={1} style={{marginTop:'7px'}}>

                                <Grid item xs={6}>
                                    <TextField variant={"standard"} label={"Name"} fullWidth inputRef={nameRef} defaultValue={array[0].NAME}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant={"standard"} label={"Address"} fullWidth inputRef={addressRef} defaultValue={array[0].ADDRESS}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant={"standard"} label={"Phone"} fullWidth inputRef={phoneRef} defaultValue={array[0].PHONE}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField variant={"standard"} label={"Username"} fullWidth  inputRef={usernameRef} defaultValue={array[0].USERNAME}/>
                                </Grid>
                            </Grid>
                        )
                    }


                </DialogContent>

                <DialogActions>
                    <Button color={"secondary"} onClick={onClickedBack}>
                        Cancel
                    </Button>
                    <Button color={"primary"} onClick={updatingStart} >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid item xs={0} md={6} >
                <center className={'leftContainer'}>
                    <Typography variant="h2" gutterBottom component="div">
                        My Profile
                    </Typography>
                    {
                        im===null?(
                            <img className={'leftImage'} src={profile}/>
                        ):(
                            <img className={'leftImage'} src={im}/>
                        )
                    }

                    <input
                        style={{display: "none"}}
                        id="contained-button-file"
                        type="file"
                        onChange={onImageChange}
                    />
                    <div style={{display:"flex",justifyContent:"space-around"}}>
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" style={{marginTop: "10px",marginRight:'20px'}}>
                                Upload Image
                            </Button>
                        </label>
                        <Button  onClick={upload} variant="contained" color="primary" component="span"  style={{marginTop: "10px"}} >
                            Save Image
                        </Button>
                    </div>


                </center>
            </Grid>
            <Grid item xs={12} md={6}className={'rightContainer'}>
                <Paper  style={{width:'100%',height:"100%"}} >
                    <div style={{padding:'20px',width:'100%',height:"100%"}}className={'paper'}>
                        {
                            array===null?(
                                <div>
                                    Nothing
                                </div>
                            ):(

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Paper style={{padding:'8px'}}>
                                            <Typography variant={"h6"} >
                                                Name:{array[0].NAME}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper style={{padding:'8px'}}>
                                            <Typography variant={"h6"}>
                                                Username:{array[0].USERNAME}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    {
                                        array[0].EMPLOYEE_ID===null?(
                                            <div>
                                                  not found
                                            </div>
                                        ):(
                                            <Grid item xs={12}>
                                                <Paper style={{padding:'8px'}} >
                                                    <Typography variant={"h6"}>
                                                        Employee Id:{array[0].EMPLOYEE_ID}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        )
                                    }

                                    <Grid item xs={12}>
                                        <Paper style={{padding:'8px'}}>
                                            <Typography variant={"h6"}>
                                                Phone:{array[0].PHONE}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper style={{padding:'8px'}}>
                                            <Typography variant={"h6"}>
                                                Email:{array[0].EMAIL}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper style={{padding:'8px'}}>
                                            <Typography variant={"h6"}>
                                                Address:{array[0].ADDRESS}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button  onClick={updatep} variant="contained" color="primary" component="span"  style={{marginTop: "10px",marginLeft:"auto"}} >
                                            Update
                                        </Button>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Profile