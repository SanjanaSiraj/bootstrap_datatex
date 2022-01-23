import React, {Component, useRef, useState} from 'react';
import {Button, Col, Form, Nav, Navbar, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import './Brand.css'
import {showToast} from "../../App";
import {signup} from "../../action/auth";

function SignUp(propes){

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

    const validateEmail=email=> {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const emailRef=useRef();
    const passRef=useRef();
    const usernameRef=useRef();
    const phoneRef=useRef();
    const addressRef=useRef();
    const nameRef=useRef();
    const employee_idRef=useRef();
    const confirmPassRef=useRef();

    function clickedSignUp() {
        const email=emailRef.current.value
        const password=passRef.current.value
        const name=nameRef.current.value
        const username=usernameRef.current.value
        const phone=phoneRef.current.value
        const confirmPass=confirmPassRef.current.value
        const address=addressRef.current.value
        const employee_id=employee_idRef.current.value


        if(name.length===0){
            showToast('Please enter name')
        }
        else if(employee_id.length===0){
            showToast('Please enter Employee Id')
        }else if(username.length===0){
            showToast('Please enter username')
        }else if(!validateEmail(email)){
            showToast('Please enter a valid email address')
        }else if(password.length===0){
            showToast('Please enter password')
        }else if(confirmPass.localeCompare(password)!==0){
            showToast('Password did not match')
        }else if(phone.length===0){
            showToast('Please enter phone number')
        }else if(address.length===0){
            showToast('Please enter address')
        }else{
             signup(name,employee_id,username,email,password,phone,address,propes)
        }

    }

    function setAddress() {

    }


    return(
        <div style={{
            display:'flex',
            flexDirection: 'column'
        }}><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Button variant="dark" onClick={clickedPage1} className={'Brand'}>D datatex</Button>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Button variant="dark" onClick={clickedPage2}>About</Button>
                        <Button variant="dark" onClick={clickedPage3}>Contact</Button>
                    </Nav>
                    <Nav>
                        <Button variant="dark" onClick={clickedPage4}>Sign Up</Button>
                        <Button variant="dark" onClick={clickedPage5}>Sign In</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            <Form style={{
                alignSelf:'center',
                marginTop: '50px',
                marginBottom:'50px',
                width:'700px',
                height:'300px',
            }}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={nameRef} type="text" placeholder="Enter Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmployeeId">
                    <Form.Label>Employee Id</Form.Label>
                    <Form.Control ref={employee_idRef} type="number" placeholder="Enter Employee Id" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control ref={usernameRef} type="text" placeholder="Enter Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter Email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passRef} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control ref={confirmPassRef} type="password" placeholder="Re-enter Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control ref={phoneRef} type="phone" placeholder="01*********" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress" >
                    <Form.Label>Address</Form.Label>
                    <Form.Control ref={addressRef} type="text" placeholder="Enter Address"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSubmit">
                    <Button variant="dark" onClick={clickedSignUp}>Submit</Button>
                </Form.Group>
                <br/>
                <br/>
            </Form>
        </div>
    )
}

export default SignUp;