import React, {Component} from 'react';
import {Button, Image, Nav, Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import './Brand.css'
import about1 from "../Images/abt1.jpg";
import about2 from "../Images/abt2.jpg";
import about3 from "../Images/abt3.jpg";

function About(propes){

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
                        <Button variant="dark" onClick={clickedPage5}>Sign In</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            <div style={{padding:'50px'}}>
                <h2 style={{display:'flex',flexDirection:'row',justifyContent:'center',marginBottom:'20px'}}>Our Services</h2>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <img className={'leftImage'} src={about3} style={{height:'150px',width:'150px'}}/>
                    <div style={{display:'flex',flexDirection:'column',marginLeft:'40px'}}>
                        <h2>01</h2>
                        <h4>Smart and Efficient</h4>
                        <h5>Manage your company from the comfort of your home or office with just a few clicks.</h5>
                    </div>
                </div>
                <div style={{display:'flex',flexDirection:'row-reverse',marginBottom:'20px'}}>
                    <img className={'leftImage'} src={about2} style={{height:'150px',width:'150px'}}/>
                    <div style={{display:'flex',flexDirection:'column',marginRight:'40px'}}>
                        <h2>02</h2>
                        <h4>Track Your Growth</h4>
                        <h5>Receive reports on your company's performances at any time.</h5>
                    </div>
                </div>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <img className={'leftImage'} src={about1} style={{height:'150px',width:'150px'}}/>
                    <div style={{display:'flex',flexDirection:'column',marginLeft:'40px'}}>
                        <h2>03</h2>
                        <h4>Simple and Easy Order Placement</h4>
                        <h5>Allow your buyers to connect with you from anywhere and at anytime.</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;