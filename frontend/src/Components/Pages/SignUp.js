import React, {Component, useState} from 'react';
import {Button, Col, Form, Nav, Navbar, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import './Brand.css'

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

    function clickedSignUp() {

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
                    <Form.Control type="text" placeholder="Enter Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmployeeId">
                    <Form.Label>Employee Id</Form.Label>
                    <Form.Control type="number" placeholder="Enter Employee Id" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Re-enter Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="phone" placeholder="01*********" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress" >
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Address"/>
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