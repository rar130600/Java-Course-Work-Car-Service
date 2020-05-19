import React, {Component} from "react";
import "bootswatch/dist/litera/bootstrap.css"
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false
        }
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else if (form.checkValidity() === true) {

        }
        this.setState({
            validated: true
        })
    }

    render() {
        return(
            <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.handleSubmit}
                className="card border-0 pb-3 mx-auto"
                style={{maxWidth: "500px", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)"}}
            >
                <Card.Header className="bg-primary text-white mb-3 text-center h2">Car Service</Card.Header>
                <Form.Text className="lead mb-2 text-dark text-center">Sign In</Form.Text>
                <Form.Group className="mx-5">
                    <Form.Control
                        required
                        type="email"
                        placeholder="Email"
                    />
                    <Form.Control.Feedback type="valid" className="ml-1">
                        All right!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" className="ml-1">
                        Uh no! Looks like there is an issue with your email.
                        Please input a correct email.
                        Example email: mail@mail.com
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mx-5">
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
                {/*<Form.Group className="mx-5">*/}
                {/*    <div className="custom-control custom-checkbox ml-1">*/}
                {/*        <input*/}
                {/*            type="checkbox"*/}
                {/*            className="custom-control-input"*/}
                {/*            id="customCheck1"*/}
                {/*        />*/}
                {/*        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>*/}
                {/*    </div>*/}
                {/*</Form.Group>*/}
                <Form.Group className="mx-auto mt-3">
                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        style={{minWidth: "125px"}}
                    >
                        Sign In
                    </button>
                </Form.Group>
            </Form>
        );
    }
}

export default FormLogin;