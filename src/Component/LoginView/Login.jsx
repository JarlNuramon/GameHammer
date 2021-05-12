import React, { Component } from "react";
import { Jumbotron, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import cookie from "react-cookies";
class Login extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  state = {
    login: true,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    matchingPassword: ""
  };
  handleLogin = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/api/v1/authenticate/authenticate", {
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        "content-type": "application/json"
      },
      method: "POST",
      mode: "cors"
    })
      .then(function (response) {
        if (response.ok) return response.json();
        // parses json
        else alert("Login failed");
      })
      .then((myJson) => {
        this.props.history.push("/dashboard/" + this.state.username);
        cookie.save("token", myJson.token, { path: "/" });
        console.log(myJson);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.matchingPassword) {
      alert("Passwords are not Matching.");
    } else {
      fetch("http://localhost:8080/api/v1/user/register", {
        body: JSON.stringify({
          userDto: {
            userId: this.state.username,
            password: this.state.password,
            matchingPassword: this.state.matchingPassword,
            email: this.state.email
          }
        }),
        headers: {
          "content-type": "application/json"
        },
        method: "POST",
        mode: "cors"
      })
        .then(function (response) {
          // manipulate response object
          // check status @ response.status etc.
          return response.json(); // parses json
        })
        .then(function (myJson) {
          // use parseed result
          alert(myJson.message);
          console.log(myJson);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeForm = () => {
    this.setState({ login: !this.state.login })
  }

  render() {
    if (this.state.login)
      return (
        <div className="login row">
          <div className="colu-5 colu-s-12 login">
            <Jumbotron>
              <Form
                onSubmit={this.handleLogin.bind()}
                onChange={this.handleChange}
              >
                <Form.Group controlId="formBasicUserName">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="username"
                    placeholder="Enter user name"
                    value={this.state.username}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
                <p className="text-right">
                  Create Account{" "}
                  <a href="#" onClick={this.changeForm}>
                    sign up?
                  </a>
                </p>
              </Form>
            </Jumbotron>
          </div>
        </div>
      );
    else
      return (
        <div className="login row">
          <div className="colu-5 colu-s-12 login">
            <Jumbotron>
              <Form
                onSubmit={this.handleSubmit.bind()}
                onChange={this.handleChange}
              >
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={this.state.firstName}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={this.state.lastName}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicUserName">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="username"
                    placeholder="Enter user name"
                    value={this.state.username}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={this.state.email}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicMatchingPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="matchingPassword"
                    placeholder="Confirm Password"
                    value={this.state.matchingPassword}
                  />
                </Form.Group>
                <Form.Group>
                  <Button variant="primary" type="submit">
                    Create
                  </Button>
                  <p className="text-right">
                    Already registered{" "}
                    <a href="#" onClick={this.changeForm}>
                      sign in?
                    </a>
                  </p>
                </Form.Group>
              </Form>
            </Jumbotron>
          </div>
        </div>
      );
  }
}

export default withRouter(Login);
