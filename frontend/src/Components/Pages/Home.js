import React, {Component, useState} from 'react';
import {Button, Carousel, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import '../Assets/bootstrap.min.css'
import logo1 from '../Images/img8.jpg';
import logo2 from '../Images/img4.jpg';
import logo3 from '../Images/img7.jpg';
import logo4 from '../Images/img1.jpg';
import Fab from '../Images/fab.png'
import './Brand.css'
{/*aaaaaaaaaaaaaaaa*/}

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
    const clickedPage7=()=>{
        propes.nav(7)
    }
    return(
        <div style={{
            display:'flex',
            flexDirection: 'column',
            height: '100vh'
        }}><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{height:'80px'}}>
            <Container>
                {/*<img src={Fab} className={'Fab'}/>*/}
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
                flexDirection:"row-reverse",
                height:'calc(100vh)'
            }}>
                <Carousel variant="dark"  className={'carousel-image'}>
                    <Carousel.Item interval={2000}>
                        <img
                            className="d-block w-100"
                            src= {logo1}
                            alt="Logo"
                            height= 'calc(100vh)' />
                        <Carousel.Caption>

                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                            className="d-block w-100"
                            src= {logo2}
                            alt="Logo"
                            height='calc(100vh)'/>
                        <Carousel.Caption>

                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                            className="d-block w-100"
                            src= {logo3}
                            alt="Logo"
                            height='calc(100vh)'
                        />
                        <Carousel.Caption>

                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                            className="d-block w-100"
                            src= {logo4}
                            alt="Logo"
                            height='calc(100vh)'
                        />
                        <Carousel.Caption>

                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div style={{
                    background:'black',
                    width: '60%',
                }}>
                    <p style={{
                        color: 'white',
                        marginInlineStart: '40px',
                        marginInlineEnd: '40px',
                        marginTop: '25%'
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