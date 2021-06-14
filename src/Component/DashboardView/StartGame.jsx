import React, { Component } from "react";
import { Jumbotron, Form, Button } from "react-bootstrap";
import NestedSelect from "./NestedSelect";
import cookie from "react-cookies";
import { useHistory } from "react-router-dom";

const data = {
    Aeldari: ['Craftworlds', 'Durukhari', 'Harlequinn'],
    Chaos: ['Chaos Knight', 'Chaos Space Marines', 'Chaos Titan Legions', 'Daemons', 'Death Guard', 'Gellerpox Infected', 'Renegades & Heretics', 'Servants of the Abyss', 'Thousand Sons'],
    Fallen: ['Fallen'],
    Imperium: ['Adepta Sororitas', 'Adeptus Astares: Black Templars', 'Adeptus Astares: Blood Angel', 'Adeptus Astares: Dark Angles', 'Adeptus Astares: Deathwatch', 'Adeptus Astares: Imperial Fists', 'Adeptus Astares: Iron Hands', 'Adeptus Astares: Raven Guards', 'Adeptus Astares: Salamanders', 'Adeptus Astares: Space Wolves', 'Adeptus Astares: Ultramarines', 'Adeptus Astares: White Scars', 'Adeptus Astra Telepathica', 'Adeptus Custodes', 'Adeptus Mechanicus', 'Astra Militarum', 'Blackstone Fortress', 'Death Korps of Krieg', 'Elucidian Starstriders', 'Elysian Drop Troops', 'Grey Knights', 'Imperial Knights', 'Inquisition', 'Legion of the Damned', 'Officio Assassinorum', 'Sisters of Silence', 'Titan Legions'],
    Necrons: ['Necrons'],
    Orks: ['Orks'],
    "T'au": ["T'au Empire"],
    Tyranids: ['Tyranids', 'Genestealer Cult'],
    Unaligned: ['Monsters & Gribbles']
};

export default class StartGame extends Component {
  state = {
    player2: undefined,
    player2isValid: false,
    user1Race: undefined,
    user2Race: undefined
  };

  componentDidMount() {
    console.log(this.token, "and", this.id);
    if (this.id && this.token) fetch("http://localhost:8080/api/v1/authenticate/dev/" + this.token, {
      method: "GET",
      mode: "cors"
    }).then(function (response) {
      console.log(response);
      if (response.ok) return response.text();
      alert("Token validation failed");
      throw "Token was not valid";  
    }).then((name) => {
      console.log(name);
      if (name === this.id) this.setState({ loading: false });
      else {
        alert("You are not the user for this dashboard");
        console.log("pushed out");
        this.props.history.push("/dashboard/" + name);
        this.setState({ loading: false });
      }
    }).catch((e) => {
      console.log(e);
      console.log("pushed out");
      this.props.history.push("/login");
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.player2isValid) fetch("http://localhost:8080/api/v1/match/start", {
      body: JSON.stringify({
        userIdPlayer1: this.id,
        userIdPlayer2: this.state.player2,
        user1Race: this.state.user1Race,
        user2Race: this.state.user2Race
      }),
      headers: {
        "content-type": "application/json"
      },
      method: "POST",
      mode: "cors"
    }).then(function (response) {
      // manipulate response object
      // check status @ response.status etc.
      if (response.ok) return response.json(); // parses json
      else throw "Match could not be started";
    }).then((myJson) => {
      // use parseed result
      this.props.history.push('/dashboard/' + this.id + '/' + myJson);
    }).catch(function (error) {
      alert(error)
      console.error(error);
    });
  } 

  handleFindPlayer = e => {
    fetch("http://localhost:8080/api/v1/match/findPlayer", {
      body: JSON.stringify({
          userId: e.target.value
      }),
      headers: {
        "content-type": "application/json"
      },
      method: "POST",
      mode: "cors"
    }).then(function (response) {
      // manipulate response object
      // check status @ response.status etc.
      return response.json(); // parses json
    }).then((myJson) => {
      // use parseed result
      this.setState({ player2isValid: myJson && (this.state.player2 != this.id) })
    }).catch(function (error) {
      console.error(error);
    });
  }

  render() {
    this.token = cookie.load("token");
    this.id = cookie.load("userIdentifier");

    return (
      <div>
        <Jumbotron>
          <Form
            onSubmit={this.handleSubmit.bind()}
            onChange={this.handleChange}
          >
            <Form.Group controlId="formBasicUser1">
              <Form.Label>Select your Army </Form.Label>
              <NestedSelect 
                required={true}
                data={data} 
                value={this.state.user1Race}
                name="user1Race" 
                onChange={this.handleChange} 
              />
            </Form.Group>
            <Form.Group controlId="formBasicUser2">
              <Form.Label>Enemy Name</Form.Label>
              <Form.Control
                    required
                    type="text"
                    name="player2"
                    placeholder="Enter Enemys Name"
                    value={this.state.player2}
                    isValid={this.state.player2isValid}
                    isInvalid={!this.state.player2isValid}
                    onChange={this.handleFindPlayer}
              />
              <Form.Control.Feedback type='invalid'>
                Enemy not valid
              </Form.Control.Feedback>
              <Form.Label>Select your Enemys Army </Form.Label>
              <NestedSelect 
                required={true}
                data={data} 
                value={this.state.user2Race}
                name="user2Race" 
                onChange={this.handleChange} 
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Start
            </Button>
          </Form>
        </Jumbotron>
      </div>
    );
  }
}
