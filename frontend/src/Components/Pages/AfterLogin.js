import React from "react";
import Container from "react-bootstrap/Container";
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import './Brand.css'

function AfterLogin(propes){

    const clickedPage1=()=>{
        propes.nav(1)
    }

    function clickedProfile() {

    }

    return(
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Button variant="dark" className={'Brand'}>D datatex</Button>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">Mark Otto</a>
                        </Navbar.Text>
                        <Navbar.Text style={{
                            marginLeft: '10px'
                        }}>|</Navbar.Text>
                        <Button variant="dark" onClick={clickedPage1}>Log Out</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{
                display: "flex",
                flexDirection: 'row'
            }}>
                <Navbar bg="dark" variant="dark" >
                    <Container style={{
                        display: "flex",
                        flexDirection: "column",
                        width: '20%',
                        height: '600px'
                    }}>
                        <Button variant="dark" onClick={clickedProfile}>Profile</Button>
                        <Button variant="dark" >Contact</Button>
                        <Button variant="dark" >Products</Button>
                        <Button variant="dark" >About</Button>
                        <Button variant="dark" >Contact</Button>
                        <Button variant="dark" >Products</Button>
                        <br/>
                        <br/>

                    </Container>
                </Navbar>
            </div>
        </div>
    )
}
export default AfterLogin