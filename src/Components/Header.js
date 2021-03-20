import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {Nav, Navbar, Form, FormControl, Button} from "react-bootstrap";


export default function Header() {
    useEffect(() => {
        console.log('hello from Header!')
    })

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link ><Link to="/Acceuil">Acceuil</Link></Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form>
            <Nav.Link ><Link to="/Login">Login</Link></Nav.Link>
        </Navbar>
    );
}

