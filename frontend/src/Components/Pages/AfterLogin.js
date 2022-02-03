import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import './Brand.css'
import './AfterLogin.css'
import AddCatalog from "../catalog/AddCatalog";
import Emplyee from "../employee/Emplyee";
import Order from "../order/Order";
import Production from "../production/Production";
function AfterLogin(propes){

    const[menu,setmenu]=useState(4)

    const[username,setUsername]=useState('testing')

    const clickedPage1=()=>{
        propes.nav(1)
    }

    function clickedProfile() {

    }

    useEffect(()=>{
        console.log(propes.type)
        if(propes.type!==undefined&&propes.type!==null)
        setUsername(propes.type.username)
        else setUsername('testing')
    },[propes.type])

    useEffect(()=>{
        console.log(menu)
    },[menu])

    function createCatalog() {
        setmenu(1)
    }

    function orderList() {
        setmenu(3)
    }

    function productionList() {
        setmenu(4)
    }

    function clickEmplyee() {
        setmenu(2)
    }

    return(
        <div style={{

        }}>
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
                display:"flex",

            }}>
                <Navbar bg="dark" variant="dark" className={'left-nav'} >
                    <div className={'left-drawer'}>
                        <Button variant="dark" onClick={clickedProfile}>Profile</Button>
                        <Button variant="dark" onClick={createCatalog}>Add catalog</Button>
                        <Button variant="dark" onClick={clickEmplyee} >Employee Records</Button>
                        <Button variant="dark" onClick={orderList} >Orders </Button>
                        <Button variant="dark" onClick={productionList}>Production Units</Button>
                        <Button variant="dark" >Contact</Button>
                        <Button variant="dark" >Products</Button>

                    </div>
                </Navbar>
                <div style={{width:'100%'}} className={'content'}>
                    {
                        menu===1?(
                            <div style={{marginTop:'20px'}} className={'menu-fitting'}>
                                <AddCatalog className={'add-catalog'}/>
                            </div>
                        ):(
                            menu===2?(
                                <div style={{ height:'100%'}}>
                                <Emplyee/>
                                </div>
                            ):(
                                menu===3?(
                                    <div>
                                    <Order/>
                                    </div>
                                ):(
                                    menu===4?(
                                        <div>
                                        <Production/>
                                        </div>
                                    ):(
                                        <div>
                                            other menu
                                        </div>
                                    )
                                )
                            )
                        )
                    }
                </div>
            </div>


        </div>
    )
}
export default AfterLogin