import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from "react-bootstrap/Container";
import {Nav, NavDropdown} from "react-bootstrap";
import '../Assets/bootstrap.min.css'
import Test from '../Pages/test'
import './navigationBar.css'
import {Link, Route,BrowserRouter as Router, Switch} from "react-router-dom";
class NavigationBar extends Component {
    render() {
        return (
            <Router>
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand as={Link} to={"/home"} className='Brand'>D datatex</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">About</Nav.Link>
                                <Nav.Link href="#contactUs">Contact Us</Nav.Link>
                                <Nav.Link href="#catalogue">Catalogue</Nav.Link>
                                {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>*/}
                            </Nav>
                            <Nav>
                                <Nav.Link href="#deets">Sign Up</Nav.Link>
                                <Nav.Link eventKey={2} href="#memes">
                                    Sign In
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                    <div>
                        <Switch>
                            <Route path={"/home"}><Test/></Route>
                        </Switch>
                    </div>
            </div>
            </Router>
        );
    }
}

export default NavigationBar;