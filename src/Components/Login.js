import React from "react";
import {Form, Button} from "react-bootstrap";



export default function Login() {
    return (
        <div className="">
        <Form className="col-lg-4 mt-5 mx-auto">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="Username" placeholder="Enter Username" />
                <Form.Text className="text-muted">
                    We'll never share your Username with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    );
}
