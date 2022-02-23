import React, {Component, useRef, useState} from 'react';
import {Button, Col, Form, Nav, Navbar, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import './Brand.css'
import {showToast} from "../../App";
import {signup} from "../../action/auth";
let user_type=0
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
    const clickedPage7=()=>{
        propes.nav(7)
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
    const user_typeRef=useRef();
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

        if(user_typeRef.current.value==='Staff') {
            user_type = 2
        }
        else user_type=3


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
            signup(name,employee_id,username,email,password,phone,address,user_type,propes)
        }

    }

    function setAddress() {

    }


    return(
        <div style={{
            display:'flex',
            flexDirection: 'column'
        }}><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{height:'80px'}}>
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
            <div></div>
            <Form style={{
                position: 'absolute',

                width: '50%',
                height: '300px',

                /* Center form on page horizontally & vertically */
                top: '120px',
                left: '25%',
            }}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={nameRef} type="text" placeholder="Enter Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmployeeId">
                    <Form.Label>User Type</Form.Label>
                    <Form.Select ref={user_typeRef}>
                        <option style={{
                            marginTop: '10px'
                        }}>Buyer/Guest</option>
                        <option style={{
                            marginTop: '5px'
                        }}>Staff</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmployeeId">
                    <Form.Label>Employee Id</Form.Label>
                    <Form.Control ref={employee_idRef} type="number" placeholder="Enter Employee Id" />
                    <Form.Text>Not required for a guest type account.</Form.Text>
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
                <h6> Already have an account? Click <a onClick={clickedPage5} className={"buyerLink"}>here</a> to sign in.</h6>
                <br/>
                <br/>
            </Form>
        </div>
    )
}

export default SignUp;