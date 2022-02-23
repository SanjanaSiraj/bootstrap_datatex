import React, {Component, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Button,Navbar} from "react-bootstrap";
import {getUserName, logout} from "../../action/auth";
import {updateAuth} from "../../Route";
import Profile from "./Profile";


function ProfileNavbar(props){
    const [username,setUsername]=useState(getUserName());
    const clickedbACK=()=>{
        console.log('clicked')
        props.nav(7)
    };
    function clickedPage1() {
        logout()
        updateAuth()
    };
    return(
        <div>
            <Navbar bg="dark" variant="dark" style={{height:'80px'}}>
                <Container style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Button variant="dark" onClick={clickedbACK} style={{color:'white'}}>Back</Button>
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
                        {/*<Button variant="dark" onClick={()=>{
                            {
                                open===false?(
                                    setOpen(true)
                                ):(
                                    setOpen(false)
                                )
                            }
                        }}>
                            <AllInboxRoundedIcon/>
                        </Button>*/}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Profile/>
        </div>
    )
}

export default ProfileNavbar;