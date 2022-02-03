import React, {useRef, useState} from 'react'
import * as a from "../../firebase/firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {Form, Button, Table, Container} from "react-bootstrap";
import '../Assets/bootstrap.min.css'
import {Box, Typography} from "@mui/material";
import {showToast} from "../../App";
import './AddCatalog.css'
import {addCatalog} from "../../action/admin";
function AddCatalog(propes){
    const colorRef=useRef();
    const weaveRef=useRef();
    const priceRef=useRef();

    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)
    const [preview,setPreview]=useState(undefined)

    console.log(imageAsFile)
    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        var temp=URL.createObjectURL(image)
        setPreview(temp)
        console.log(image)
        setImageAsFile(imageFile => (image))
    }


    const handleFireBaseUpload = e => {
        e.preventDefault()
        console.log('start of upload')
        // async magic goes here...
        if (imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
        }
        const storage = getStorage();
        const storageRef = ref(storage, `images/${imageAsFile.name}`);

        const uploadTask = uploadBytesResumable(storageRef, imageAsFile);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImageAsUrl(downloadURL)
                    console.log(colorRef.current.value,priceRef.current.value,weaveRef.current.value,propes)
                    addCatalog(downloadURL,colorRef.current.value,priceRef.current.value,weaveRef.current.value,propes)
                });
            }
        );
    }

    return(
        <div className={'main-container'}>
            <Box style={{width:'80%',padding:'10px'}}>
                <Typography variant="h5" component="h2"style={{textAlign:'center'}}>
                    CREATE CATALOG
                </Typography>
                <Form style={{ alignSelf:'center',
                    marginTop: '20px'}} onSubmit={handleFireBaseUpload}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Color Name</Form.Label>
                        <Form.Control ref={colorRef} type='text' placeholder="Enter Color Name" />
                    </Form.Group>

                    <Form.Group controlId="pricePerGsm">
                        <Form.Label>Price per gsm:</Form.Label>
                        <Form.Control ref={priceRef} type="number" placeholder="Price " name="price"/>
                    </Form.Group>

                    <Form.Group controlId="weaveId">
                        <Form.Label>Weave Design</Form.Label>
                        <Form.Select placeholder={"Type of weave design"} ref={weaveRef}>
                            <option style={{
                                marginTop: '10px'
                            }}>Plain</option>
                            <option style={{
                                marginTop: '5px'
                            }}>Twill</option>
                            <option style={{
                                marginTop: '5px'
                            }}>Satin</option>
                            <option style={{
                                marginTop: '5px'
                            }}>Dobby</option>
                            <option style={{
                                marginTop: '5px'
                            }}>Chiffon</option>
                        </Form.Select>
                    </Form.Group>

                    <Typography variant="h6" component="h2"style={{marginTop:'20px'}}>
                        Select Image
                    </Typography>
                    <form style={{marginBottom:'20px'}}>
                        <input
                            type="file"
                            onChange={handleImageAsFile}
                        />

                    </form>
                </Form>

                <div className='image'>
                    {
                        preview===undefined?(
                            <Typography variant="h6" component="h2" style={{padding:'10px',textAlign:'center'}}>
                                No image is selected
                            </Typography>
                        ):(
                            <img src={preview} alt="image tag"  className='image'style={{height:'148px',width:'148px'}}/>
                        )
                    }
                </div>

                <br/>
                <Button variant="dark" type="submit" style={{marginTop:'20px'}} onClick={handleFireBaseUpload}>
                    Add to Catalog
                </Button>
            </Box>
        </div>
    )
}
export default AddCatalog