import React, {useEffect, useState} from "react";
import './Catalog.css'
import {setPage} from "../../Route";
import Container from "react-bootstrap/Container";
import {Button, Navbar} from "react-bootstrap";
import {getUserName} from "../../action/auth";



function Catalog(propes){
    const clickedPage=(type)=>{
        propes.setFabricType(type)
        //propes.nav(8)
        setPage(8)
    }
    const[username,setUsername]=useState(getUserName)

    const clickedPage1=()=>{
        propes.nav(12)
    }
    const clickedPageO=()=>{
        propes.nav(13)
    }

    /*useEffect(()=>{

        if(propes.type!==null&&propes.type!==undefined) {
            console.log(propes.type)
            setUsername(propes.type.username)
        }
    },[propes.type])*/
    return(
        <div style={{
            display: "flex",
            flexDirection: 'column'
        }}>
            <Navbar bg="dark" variant="dark" style={{
                height: '80px'
            }}>
                <Container>
                    <Button variant="dark" className={'Brand'}>D datatex</Button>
                    <Navbar.Toggle />
                    <Button variant={'outline-secondary'} style={{color:'#0dcaf0',marginRight:'20px',width:'100px'}} onClick={clickedPageO}>
                        Profile
                    </Button>
                    <Button variant={'outline-secondary'} style={{color:'#0dcaf0'}} onClick={clickedPage1}>
                        My Orders
                    </Button>
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

            <div className={'body-container'}>
                <Container style={{marginTop:'20px'}}>
                    <div className='directory-menu'>
                        <div className='menu-item'>
                            <div
                                className='background-image'
                                style={{backgroundImage: `url(${'https://image.made-in-china.com/43f34j00BJUtAWEFfRqy/Solid-Plain-Fabric-Lining-Cotton-Poplin-Summer-Fabric.jpg'})`}}
                            />
                            <div className='content' onClick={()=>{
                                clickedPage('Plain')
                            }}>
                                <div className='title'>PLAIN</div>
                                <span className='subtitle'>ORDER NOW</span>
                            </div>
                        </div>
                        <div className='menu-item'>
                            <div
                                className='background-image'
                                style={{backgroundImage: `url(${'https://s3.eu-west-2.amazonaws.com/files.sewport.com/fabrics-directory/everything-you-need-to-know-about-twill-fabric/Brushed-Cotton-Twill-Fabric.jpg'})`}}
                            />
                            <div className='content' onClick={()=>{
                                clickedPage('Twill')
                            }}>
                                <div className='title'>TWILL</div>
                                <span className='subtitle'>ORDER NOW</span>
                            </div>
                        </div>
                        <div className='menu-item'>
                            <div
                                className='background-image'
                                style={{backgroundImage: `url(${'https://oneyard.shop/uploads/product/3/9/39007/bridal-thick-satin-fabric-by-the-yard-1.jpg'})`}}
                            />
                            <div className='content' onClick={()=>{
                                clickedPage('Satin')
                            }}>
                                <div className='title'>SATIN</div>
                                <span className='subtitle'>ORDER NOW</span>
                            </div>
                        </div>
                        <div className='menu-item'>
                            <div
                                className='background-image'
                                style={{backgroundImage: `url(${'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_reAwR7NbFT_dSZByERkC_9RMTbVy9eCqeA&usqp=CAU'})`}}
                            />
                            <div className='content' onClick={()=>{
                                clickedPage('Dobby')
                            }}>
                                <div className='title'>DOBBY</div>
                                <span className='subtitle'>ORDER NOW</span>
                            </div>
                        </div>
                        <div className='menu-item'>
                            <div
                                className='background-image'
                                style={{backgroundImage: `url(${'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmxUdkyv1JM9thtGNRQjbHzB_gh51yDqXWqA&usqp=CAU'})`}}
                            />
                            <div className='content' onClick={()=>{
                                clickedPage('Chiffon')
                            }}>
                                <div className='title'>CHIFFON</div>
                                <span className='subtitle'>ORDER NOW</span>
                            </div>
                        </div>
                    </div>
                </Container>

            </div>
        </div>

    )
}

export default Catalog