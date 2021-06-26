import React, { Component } from "react";
import { Jumbotron, Form, Button } from "react-bootstrap";
import NestedSelect from "./NestedSelect";
import cookie from "react-cookies";
import { withRouter } from "react-router-dom";

const data = {
  Aeldari: ["Craftworlds", "Durukhari", "Harlequinn"],
  Chaos: [
    "Chaos Knight",
    "Chaos Space Marines",
    "Chaos Titan Legions",
    "Daemons",
    "Death Guard",
    "Gellerpox Infected",
    "Renegades & Heretics",
    "Servants of the Abyss",
    "Thousand Sons"
  ],
  Fallen: ["Fallen"],
  Imperium: [
    "Adepta Sororitas",
    "Adeptus Astares: Black Templars",
    "Adeptus Astares: Blood Angel",
    "Adeptus Astares: Dark Angles",
    "Adeptus Astares: Deathwatch",
    "Adeptus Astares: Imperial Fists",
    "Adeptus Astares: Iron Hands",
    "Adeptus Astares: Raven Guards",
    "Adeptus Astares: Salamanders",
    "Adeptus Astares: Space Wolves",
    "Adeptus Astares: Ultramarines",
    "Adeptus Astares: White Scars",
    "Adeptus Astra Telepathica",
    "Adeptus Custodes",
    "Adeptus Mechanicus",
    "Astra Militarum",
    "Blackstone Fortress",
    "Death Korps of Krieg",
    "Elucidian Starstriders",
    "Elysian Drop Troops",
    "Grey Knights",
    "Imperial Knights",
    "Inquisition",
    "Legion of the Damned",
    "Officio Assassinorum",
    "Sisters of Silence",
    "Titan Legions"
  ],
  Necrons: ["Necrons"],
  Orks: ["Orks"],
  "T'au": ["T'au Empire"],
  Tyranids: ["Tyranids", "Genestealer Cult"],
  Unaligned: ["Monsters & Gribbles"],
  Options: "Back to own list ->"
};

class StartGame extends Component {
  state = {
    player2: undefined,
    player2isValid: false,
    user1Race: undefined,
    user2Race: undefined,
    data1: data,
    data2: data,
    player1CustomList: undefined,
    player2CustomList: undefined
  };

  componentDidMount() {
    console.log(this.token, "and", this.id);
    if (this.id && this.token)
      fetch("http://localhost:8080/api/v1/authenticate/dev/" + this.token, {
        method: "GET",
        mode: "cors"
      })
        .then(function (response) {
          console.log(response);
          if (response.ok) return response.text();
          alert("Token validation failed");
          throw "Token was not valid";
        })
        .then((name) => {
          if (name !== this.id) {
            alert("You are not the user for this dashboard");
            console.log("pushed out");
            this.props.history.push("/dashboard/" + name);
            this.setState({ loading: false });
            return;
          }
          this.setState({ loading: false });
          this.fetchPlayerList(this.id, 1);
        })
        .catch((e) => {
          console.log(e);
          console.log("pushed out");
          this.props.history.push("/login");
        });
  }

  handleChange = (e) => {
    console.log("name: ", e.target.name, "value: ", e.target.value);
    if (e.target.name.includes("1") && e.target.value.includes("own list ->")) {
      this.setState({ data1: this.state.player1CustomList });
      document.getElementById("formBasicUser1")[0].selected = true
    } else if (
      e.target.name.includes("1") &&
      e.target.value.includes("default list ->")
    ) {
      this.setState({ data1: data });
      document.getElementById("formBasicUser1")[0].selected = true
    }
    if (e.target.name.includes("2") && e.target.value.includes("own list ->")) {
      this.setState({ data2: this.state.player2CustomList });
      document.getElementById("formBasicUser2Select")[0].selected = true
    } else if (
      e.target.name.includes("2") &&
      e.target.value.includes("default list ->")
    ) {
      this.setState({ data2: data });
      document.getElementById("formBasicUser2Select")[0].selected = true
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let user1Race = this.state.user1Race;
    let user2Race = this.state.user2Race;
    let user1Army = null;
    let user2Army = null;
    if (user1Race.includes(":: (")) {
      let s = user1Race.split(":: (");
      user1Army = s[0];
      user1Race = s[1].substr(0, s[1].length - 1);
    }
    if (user2Race.includes(":: (")) {
      let s = user2Race.split(":: (");
      user2Army = s[0];
      user2Race = s[1].substr(0, s[1].length - 1);
    }
    let body = JSON.stringify({
      userIdPlayer1: this.id,
      userIdPlayer2: this.state.player2,
      user1Race: user1Race,
      user2Race: user2Race,
      user1Army: user1Army,
      user2Army: user2Army
    });
    console.log(body);
    if (this.state.player2isValid)
      fetch(
        "http://localhost:8080/api/v1/match/start" +
          "?apiToken=" +
          cookie.load("token"),
        {
          body: body,
          headers: {
            "content-type": "application/json"
          },
          method: "POST",
          mode: "cors"
        }
      )
        .then(function (response) {
          // manipulate response object
          // check status @ response.status etc.
          if (response.ok) return response.json();
          // parses json
          else throw "Match could not be started";
        })
        .then((myJson) => {
          // use parseed result
          this.props.history.push("/game/" + this.id + "/" + myJson);
        })
        .catch(function (error) {
          alert(error);
          console.error(error);
        });
  };

  handleFindPlayer = (e) => {
    fetch(
      "http://localhost:8080/api/v1/match/findPlayer" +
        "?apiToken=" +
        cookie.load("token"),
      {
        body: JSON.stringify({
          userId: e.target.value
        }),
        headers: {
          "content-type": "application/json"
        },
        method: "POST",
        mode: "cors"
      }
    )
      .then(function (response) {
        // manipulate response object
        // check status @ response.status etc.
        return response.json(); // parses json
      })
      .then((myJson) => {
        // use parseed result
        if (myJson && this.state.player2 !== this.id) {
          this.setState({
            player2isValid: true
          });
          return this.state.player2;
        }
      })
      .then((id) => {
        if (id) this.fetchPlayerList(id, 2);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  fetchPlayerList(userid, player) {
    fetch(
      "http://localhost:8080/api/v1/note/all/" +
        userid +
        "?apiToken=" +
        cookie.load("token"),
      {
        method: "GET",
        mode: "cors"
      }
    )
      .then(function (response) {
        // manipulate response object
        // check status @ response.status etc.
        return response.json(); // parses json
      })
      .then((json) => {
        let userRace = json.map((e) => e.name + " :: (" + e.race + ")");
        let userOption = {
          Custom: userRace,
          Option: "Back to default list ->"
        };
        if (player === 1)
          this.setState({ data1: userOption, player1CustomList: userOption });
        else if (player === 2)
          this.setState({ data2: userOption, player2CustomList: userOption });
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
                data={this.state.data1}
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
              <Form.Control.Feedback type="invalid">
                Enemy not valid
              </Form.Control.Feedback>
            </Form.Group>
            {this.state.player2isValid ? (
              <Form.Group controlId="formBasicUser2Select">
                <Form.Label>Select your Enemys Army </Form.Label>
                <NestedSelect
                  required={true}
                  data={this.state.data2}
                  value={this.state.user2Race}
                  name="user2Race"
                  onChange={this.handleChange}
                />
              </Form.Group>
            ) : (
              <div>
                <br />
                <br />
              </div>
            )}
            <Button variant="primary" type="submit">
              Start
            </Button>
          </Form>
        </Jumbotron>
      </div>
    );
  }
}

export default withRouter(StartGame);
