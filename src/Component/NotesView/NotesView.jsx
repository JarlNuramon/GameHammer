import { useParams } from "react-router-dom";
import PlayerComponent from "./PlayerComponent";
import GameTurn from "./GameTurn";
import GameTurnWithEnd from "./GameTurnWithEnd";
import cookie from "react-cookies";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";
import { Component, useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import { Button } from "react-bootstrap";
import themes from "../../themes";
class NoteContainer extends Component {
  state = {
    loading: true,
    match: null,
    theme: "none"
  };
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  setColor = (color) => {
    if (color !== this.state.theme) this.setState({ theme: color });
  };
  setTheme = () => {
    if (this.state.theme === "none") return;
    console.log(this.state.theme);
    let name = this.state.theme.split(" ");
    let theme = themes[name[name.length - 1]];
    console.log(themes);
    console.log("theme was ", theme);
    Object.keys(theme).forEach((key) => {
      let cssKey = `--${key}`;
      let cssValue = theme[key];
      document.body.style.setProperty(cssKey, cssValue);
    });
  };
  getMatch() {
    fetch(
      "http://localhost:8080/api/v1/match/" +
        this.gid +
        "?apiToken=" +
        this.token,
      {
        method: "GET",
        mode: "cors"
      }
    )
      .then(function (response) {
        console.log(response);
        if (response.ok) return response.json();
        alert("Token validation failed");
        throw "Token was not valid";
      })
      .then((json) => {
        console.log(json);

        this.setState({ loading: false, match: json });
      })
      .catch((e) => {
        console.log(e);
      });
  }
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
          console.log(name);
          if (name === this.id) return this.getMatch();
          else {
            alert("You are not the user for this dashboard");
            this.props.history.push("/dashboard/" + name);
            this.setState({ loading: false });
          }
        })
        .catch((e) => {
          console.log(e);
          this.props.history.push("/login");
        });
  }

  render() {
    this.token = cookie.load("token");
    this.id = this.props.match.params.id;
    this.gid = this.props.match.params.gameid;
    if (this.id && this.token)
      if (this.state.loading)
        return (
          <center>
            <ReactLoading
              type={"balls"}
              color={"#black"}
              height={667}
              width={375}
            />
            shooting through Orks to reach dashboard.
          </center>
        );
      else this.setTheme();
    return (
      <div className="view">
        <GameView match={this.state.match} setColor={this.setColor} />
      </div>
    );
  }
}
export default withRouter(NoteContainer);

//GAMEVIEW

function GameView(props) {
  //variables
  let { id, gameid } = useParams();
  console.log("id: ", id, " gameid:", gameid);
  const [getPhase, setPhase] = useState(props.match.phase);
  const [getTurn, setTurn] = useState(props.match.turn);
  const [isFlipped, setFlipped] = useState(false);
  const [p, setP] = useState(null);
  const [cp1, setCp1] = useState(props.match.player1CP);
  const [cp2, setCp2] = useState(props.match.player2CP);
  const [wp1, setWp1] = useState(props.match.player1Score);
  const [wp2, setWp2] = useState(props.match.player2Score);
  const [end, setEnd] = useState(false);
}
