import React, {Component} from 'react';
import {Button, Nav, Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import './Brand.css'

function Contact(propes){

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
                        <Button variant="dark" onClick={clickedPage5}>Sign In</Button>{' '}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            <h2 style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:'20px',marginBottom:'20px'}}>Our Services</h2>
            <div style={{display:'flex',flexDirection:'row',padding:'20px',marginLeft:'75px',justifyContent:'space-evenly'}}>
                <div style={{display:'flex',flexDirection:'column',textAlign:'center',padding:'10px'}}>
                    <h1 style={{color:'red'}}><i className="fas fa-map-marker-alt"></i></h1>
                    <br/>
                    <h3>Address</h3>
                    <br/>
                    <h5>BUET CSE</h5>
                    <h6>BUET</h6>
                    <h6>ECE Building</h6>
                    <h6>Pilkhana Rd</h6>
                    <h6>Dhaka 1000</h6>
                </div>
                <div style={{display:'flex',flexDirection:'column',textAlign:'center',padding:'10px'}}>
                    <h1 style={{color:'green'}}><i className="fas fa-phone-alt"></i></h1>
                    <br/>
                    <h3>Phone</h3>
                    <br/>
                    <h5>Sanjana Binte Siraj</h5>
                    <h6>Student Id 1805041</h6>
                    <h6>+880 1974166204</h6>
                    <br/>
                    <h5>Saira Yeasmin</h5>
                    <h6>Student Id 1805037</h6>
                    <h6>+880 1551061395</h6>
                </div>
                <div style={{display:'flex',flexDirection:'column',textAlign:'center',padding:'10px'}}>
                    <h1 style={{color:'blue'}}><i className="fas fa-at"></i></h1>
                    <br/>
                    <h3>Mail</h3>
                    <br/>
                    <h5>Sanjana Binte Siraj</h5>
                    <h6>Student Id 1805041</h6>
                    <h6>1805041@ugrad.cse.buet.ac.bd</h6>
                    <br/>
                    <h5>Saira Yeasmin</h5>
                    <h6>Student Id 1805037</h6>
                    <h6>1805037@ugrad.cse.buet.ac.bd</h6>
                </div>
            </div>
        </div>
    )
}

export default Contact;