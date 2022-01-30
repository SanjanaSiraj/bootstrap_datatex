import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import './Brand.css'
import './AfterLogin.css'
function AfterLogin(propes){

    const[username,setUsername]=useState(null)

    const clickedPage1=()=>{
        propes.nav(1)
    }

    function clickedProfile() {

    }

    useEffect(()=>{
        console.log(propes.type)
        setUsername(propes.type.username)
    },[propes.type])

    return(
        <div>
            <Navbar bg="dark" variant="dark" style={{ height:'80px'}}>
                <Container>
                    <Button variant="dark" className={'Brand'}>D datatex</Button>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">{username}</a>
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
                <Navbar bg="dark" variant="dark" className={'left-nav'} >
                    <div className={'left-drawer'}>
                        <Button variant="dark" onClick={clickedProfile}>Profile</Button>
                        <Button variant="dark" >Employee Records</Button>
                        <Button variant="dark" >Orders</Button>
                        <Button variant="dark" >Production Units</Button>
                        <Button variant="dark" >Contact</Button>
                        <Button variant="dark" >Products</Button>

                    </div>
                </Navbar>
            </div>
        </div>
    )
}
export default AfterLogin