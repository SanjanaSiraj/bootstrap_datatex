import React, {Component, useRef, useState} from 'react';
import {Button, Form, Nav, Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import './Brand.css'
import {showToast} from "../../App";
import {login} from "../../action/auth";

function SignIn(propes){

    const clickedPage1=()=>{
        propes.nav(1)
    }
    const clickedPage2=()=>{
        propes.nav(2)
    }
    const clickedPage3=()=>{
        propes.nav(3)
    }
    const clickedPage4=()=>{
        propes.nav(4)
    }
    const clickedPage5=()=>{
        propes.nav(5)
    }
    const clickedPage6=()=>{
        propes.nav(6)
    }
    const clickedPage7=()=>{
        propes.nav(7)
    }

    const emailRef=useRef();
    const passRef=useRef();

    const validateEmail=email=> {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const [val,setVal]=useState('')

    const onSubmit = () => {
        console.log(val);
    };

    function clickedSignIn() {
        const email=emailRef.current.value
        const password=passRef.current.value
        console.log(email,password)
        if(!validateEmail(email))
            showToast('Please enter a valid email address')
        /* else if (password.length<6)
             showToast('Password length must be greater or equals to 6')*/
        else{
            login(email,password,propes)
        }
    }

    return(
        <div >
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{height:'80px', backgroundColor:'green'}}>
                <Container>
                    <Button variant="dark" onClick={clickedPage1} className={'Brand'}>D datatex</Button>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Button variant="dark" onClick={clickedPage2}>About</Button>
                            <Button variant="dark" onClick={clickedPage3}>Contact</Button>
                            <Button variant="dark" onClick={clickedPage7}>Products</Button>
                        </Nav>
                        <Nav>
                            <Button variant="dark" onClick={clickedPage4}>Sign Up</Button>
                            <Button variant="dark" onClick={clickedPage5}>Sign In</Button>{' '}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Form  style={{position: 'absolute',

                width: '50%',
                height: '300px',

                /* Center form on page horizontally & vertically */
                top: '120px',
                left: '25%',}
            }>
                <Form.Group className="mb-3" controlId="formBasicEmail"
                >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter Email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passRef} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSubmit">
                    <Button onClick={clickedSignIn} variant="dark">Submit</Button>
                </Form.Group>
                <br/>
                <br/>
            </Form>
        </div>
    )
}

export default SignIn;