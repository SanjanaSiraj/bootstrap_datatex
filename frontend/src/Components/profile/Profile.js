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
import {getProfile, getUserId, getUserName, getUserType, logout, updateDP, updateProfile} from "../../action/auth";
import './profile.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Container from "react-bootstrap/Container";
import {Navbar,Button as Btn} from "react-bootstrap";
import {updateAuth} from "../../Route";
function Profile(props){
    const [array,setArray]=useState(null)
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [open,setOpen]=useState(false)
    const [im,setIm]=useState(null)
    const [username,setUsername]=useState(getUserName())
    const nameRef=useRef()
    const usernameRef=useRef()
    const phoneRef=useRef()
    const addressRef=useRef()
    const clickedbACK=()=>{
        console.log('clicked')
        props.nav(7)
    };

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
            const storageRef = ref(storage, 'images/${image.name}');
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

    function clickedPage1() {
        logout()
        updateAuth()
    }

    return(
        <div style={{overflowY:'hidden'}}>
            {
                props.guest===true?(
                    <Navbar bg="dark" variant="dark" style={{height:'80px'}}>
                        <Container style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Btn variant="dark" onClick={clickedbACK} style={{color:'white'}}>Back</Btn>
                            <Btn variant="dark" className={'Brand'}>D datatex</Btn>
                            <Navbar.Toggle />
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                    Signed in as: <a href="#login">{username}</a>
                                </Navbar.Text>
                                <Navbar.Text style={{
                                    marginLeft: '10px'
                                }}>|</Navbar.Text>
                                <Btn variant="dark" onClick={clickedPage1}>Log Out</Btn>
                                <Btn variant="dark" onClick={()=>{
                                    {
                                        open===false?(
                                            setOpen(true)
                                        ):(
                                            setOpen(false)
                                        )
                                    }
                                }}>

                                </Btn>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                ):(
                    <div>

                    </div>
                )
            }

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

            <div style={{height:'calc(100vh - 90px)',overflowY:'scroll'}}>
                {
                    array===null?(
                        <div>

                        </div>
                    ):(
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <br/>
                            <h2>Profile</h2>
                            <br/>
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
                            <br/>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <h3>{array[0].USERNAME}</h3>
                                <button className="btn" onClick={updatep}><i className="fas fa-edit"></i></button>
                            </div>
                            <h5>{array[0].NAME}</h5>
                            <h5>{array[0].EMAIL}</h5>
                            <h5>{array[0].PHONE}</h5>
                            <h5>{array[0].ADDRESS}</h5>
                            <div style={{display:"flex",justifyContent:"space-around"}}>
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span" style={{marginTop: "10px",marginRight:'20px',borderRadius:15}}>
                                        Upload Image
                                    </Button>
                                </label>
                                <Button  onClick={upload} variant="contained" color="primary" component="span"  style={{marginTop: "10px",borderRadius:15}} >
                                    Save Image
                                </Button>
                            </div>
                            <br/>
                            <br/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Profile