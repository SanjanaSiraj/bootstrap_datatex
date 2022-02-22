import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import './Brand.css'
import './AfterLogin.css'
import AddCatalog from "../catalog/AddCatalog";
import Emplyee from "../employee/Emplyee";
import Order from "../order/Order";
import '../Assets/bootstrap.min.css'

import Production from "../production/Production";
import {logout} from "../../action/auth";
import {updateAuth} from "../../Route";
import AdminCatalog from "../catalog/AdminCatalog";
import Sales from "../CostModule/Sales";
function AfterLogin(propes){

    const[menu,setmenu]=useState(4)

    const [username, setUsername] = useState('testing')

    const clickedPage1 = () => {
        logout()
        updateAuth()
        //propes.nav(1)
    }

    function clickedProfile() {

    }

    useEffect(() => {
        console.log(propes.type)
        if (propes.type !== undefined && propes.type !== null)
            setUsername(propes.type.username)
        else setUsername('testing')
    }, [propes.type])

    useEffect(() => {
        console.log(menu)
    }, [menu])

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

    function catalogList() {
        setmenu(5)
    }

    function clickedSales() {
        setmenu(6)
    }

    return (
        <div style={{}}>
            <Navbar bg="dark" variant="dark" style={{height: '80px'}} id={'test3'} className={"d-flex justify-content-between"}>
                {/*<div id={'test4'} className={"d-flex justify-content-between"}>*/}
                    <Button variant="dark" className={'Brand'} style={{
                        marginLeft:'60px'
                    }}>D datatex</Button>
                    <div>
                        <Navbar.Toggle/>
                        <Navbar.Collapse className="justify-content-end" style={{
                            marginRight: '50px'
                        }}>
                            <Navbar.Text>
                                Signed in as: <a onClick={clickedProfile}>{username}</a>
                            </Navbar.Text>
                            <Navbar.Text style={{
                                marginLeft: '10px'
                            }}>|</Navbar.Text>
                            <Button variant="dark" onClick={clickedPage1}>Log Out2</Button>
                        </Navbar.Collapse>
                    </div>
                {/*</div>*/}
            </Navbar>
            <div style={{
                display: "flex",

            }}>
                <Navbar bg="dark" variant="dark" className={'left-nav'} id={'test1'}>
                    <div className={'left-drawer'}>
                        <Button variant="dark" onClick={clickedProfile}>Profile</Button>
                        <Button variant="dark" onClick={createCatalog}>Add Catalog Item</Button>
                        <Button variant="dark" onClick={clickEmplyee} >Employee Records</Button>
                        <Button variant="dark" onClick={orderList} >Orders </Button>
                        <Button variant="dark" onClick={productionList}>Production Units</Button>
                        <Button variant="dark" onClick={catalogList}>Products</Button>
                        <Button variant="dark" onClick={clickedSales}>Sales</Button>

                    </div>
                </Navbar>
                <div style={{width: '100%'}} className={'content'} id={'test2'}>
                    {
                        menu === 1 ? (
                            <div style={{marginTop: '20px'}} className={'menu-fitting'}>
                                <AddCatalog className={'add-catalog'}/>
                            </div>
                        ) : (
                            menu === 2 ? (
                                <div style={{height: '100%'}}>
                                    <Emplyee/>
                                </div>
                            ) : (
                                menu === 3 ? (
                                    <div>
                                        <Order/>
                                    </div>
                                ):(
                                    menu===4?(
                                        <div>
                                        <Production/>
                                        </div>
                                    ):(
                                        menu===5?(
                                            <div>
                                               <AdminCatalog/>
                                            </div>
                                        ):(
                                            menu===6?(
                                                <div>
                                                    <Sales/>
                                                </div>
                                            ):(
                                                <div>
                                                    other menu
                                                </div>
                                            )
                                        )
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