import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Audio } from  'react-loader-spinner'
import {Dialog, DialogContent} from "@mui/material";
import Route from "./Route";
import loader from './Components/Images/loader.gif'
var showToast
var setLoading

function App() {

    const [loading,setL]=useState(false)
    setLoading=setL
    showToast=message=>{
        toast.dark(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return(
        <div>
            <Dialog open={loading}>
                <DialogContent>
                    <Audio color="#00BFFF" height={100} width={100} />
                </DialogContent>
            </Dialog>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Route/>
        </div>

    )
}
export default App
export {showToast,setLoading}
/*create new branch dev*/