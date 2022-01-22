import React, {Component, useState} from 'react';
import {Button, Carousel, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import '../Assets/bootstrap.min.css'
import logo1 from '../Images/img8.jpg';
import logo2 from '../Images/img4.jpg';
import logo3 from '../Images/img7.jpg';
import logo4 from '../Images/img1.jpg';
import './Brand.css'

function Home(propes) {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
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
    return(
        <div style={{
            display:'flex',
            flexDirection: 'column',
            height: '200px'
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
            {/*<img src={logo} alt="Logo" />*/}
            <div style={{
                display:"flex",
                flexDirection:"row-reverse"
            }}>
                <Carousel variant="dark" style={{
                    width:'600px'
                }}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src= {logo1}
                            alt="Logo"
                            height="600px"
                        />
                        <Carousel.Caption>
                            <h5>First slide label</h5>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src= {logo2}
                            alt="Logo"
                            height="600px"
                        />
                        <Carousel.Caption>
                            <h5>Second slide label</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src= {logo3}
                            alt="Logo"
                            height="600px"
                        />
                        <Carousel.Caption>
                            <h5>Third slide label</h5>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src= {logo4}
                            alt="Logo"
                            height="600px"
                        />
                        <Carousel.Caption>
                            <h5>Fourth slide label</h5>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div style={{
                    background:'black',
                    width: '800px',
                }}>
                    <p style={{
                        color: 'white',
                        marginInlineStart: '40px',
                        marginInlineEnd: '40px',
                        marginTop: '170px'
                    }}>
                        <h3>Datatex brings all your industry's information all in one platform. Create your own portable workspace. </h3>
                        <br/>
                        <h4>Join us today!</h4>
                        <br/>
                        <Button variant="dark" onClick={clickedPage4}>Get Started</Button>
                    </p>
                </div>
            </div>
    </div>
    )
}

export default Home;