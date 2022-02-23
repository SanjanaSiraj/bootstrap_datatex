import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import '../Pages/Brand.css'
import '../Pages/AfterLogin.css'
import AddCatalog from "../catalog/AddCatalog";
import Emplyee from "../employee/Emplyee";
import Order from "../order/Order";
import '../Assets/bootstrap.min.css'

import Production from "../production/Production";
import {getUserName, logout} from "../../action/auth";
import {updateAuth} from "../../Route";
import AdminCatalog from "../catalog/AdminCatalog";
import EmployeeForStaff from "./EmployeeForStaff";
import ProductionForStaff from "./ProductionForStaff";
import StaffCatalog from "./StaffCatalog";
import Profile from "../profile/Profile";
function LoginPage(propes){

    const[menu,setmenu]=useState(6)

    const [username, setUsername] = useState(getUserName)

    const clickedPage1 = () => {
        logout()
        updateAuth()
        //propes.nav(1)
    }

    function clickedProfile() {
          setmenu(6)
    }

    useEffect(() => {
        console.log(menu)
    }, [menu])

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
                        <Button variant="dark" onClick={clickEmplyee} >Employee Records</Button>
                        <Button variant="dark" onClick={orderList} >Orders </Button>
                        <Button variant="dark" onClick={productionList}>Production Units</Button>
                        <Button variant="dark" >Contact</Button>
                        <Button variant="dark" onClick={catalogList}>Products</Button>

                    </div>
                </Navbar>
                <div style={{width: '100%'}} className={'content'} id={'test2'}>
                    {
                        menu === 1 ? (
                            <div>
                                none
                            </div>
                        ) : (
                            menu === 2 ? (
                                <div style={{height: '100%'}}>
                                    <EmployeeForStaff/>
                                </div>
                            ) : (
                                menu === 3 ? (
                                    <div>
                                        <Order isAdmin={false}/>
                                    </div>
                                ):(
                                    menu===4?(
                                        <div>
                                            <ProductionForStaff/>
                                        </div>
                                    ):(
                                        menu===5?(
                                            <div>
                                                <StaffCatalog/>
                                            </div>
                                        ):(
                                            menu===6?(
                                                <div>
                                                    <Profile/>
                                                </div>
                                            ):(
                                                <div>

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

export default LoginPage