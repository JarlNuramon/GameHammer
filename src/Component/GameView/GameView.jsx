import { useParams } from "react-router-dom";
import PlayerComponent from "./PlayerComponent";
import GameTurn from "./GameTurn";
import cookie from "react-cookies";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";
import { Component, useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import { Button } from "react-bootstrap";
class GameContainer extends Component {
  state = {
    loading: true,
    match: null
  };
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
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
      else return <GameView match={this.state.match} />;
  }
}

export default withRouter(GameContainer);

//GAMEVIEW

function GameView(props) {
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
  const postAdjust = () => {
    fetch(
      "http://localhost:8080/api/v1/match/" +
        gameid +
        "/update?apiToken=" +
        cookie.load("token"),
      {
        body: JSON.stringify({
          player1Score: wp1,
          player2Score: wp2,
          player1CP: cp1,
          player2CP: cp2
        }),
        headers: {
          "content-type": "application/json"
        },
        method: "POST",
        mode: "cors"
      }
    ).then(function (response) {
      if (!response.ok) alert("That didnt work");
    });
  };
  const adjustWP = (a, nr) => {
    console.log("x", wp1, wp2);
    if (nr === 1) setWp1(wp1 + a);
    else setWp2(wp2 + a);
    postAdjust();
  };

  const adjustCP = (a, nr) => {
    if (nr === 1) setCp1(cp1 + a);
    else setCp2(cp2 + a);
    postAdjust();
  };
  const handleClick = (nr) => {
    if (!isFlipped) {
      setFlipped(true);
      setP(nr);
    } else {
      setFlipped(false);
      setP(null);
    }
  };
  const nextTurn = () => {
    fetch(
      "http://localhost:8080/api/v1/match/" +
        gameid +
        "/nextTurn?apiToken=" +
        cookie.load("token"),
      {
        method: "POST",
        mode: "cors"
      }
    ).then(function (response) {
      if (response.ok) {
        setTurn(getTurn + 1);
        setPhase(1);
      }
    });
  };
  const nextPhase = () => {
    return fetch(
      "http://localhost:8080/api/v1/match/" +
        gameid +
        "/nextStep?apiToken=" +
        cookie.load("token"),
      {
        method: "POST",
        mode: "cors"
      }
    )
      .then(function (response) {
        if (response.ok) return response;
        // parses json
        else alert("Login failed");
      })
      .then((myJson) => {
        if (getPhase === 14) nextTurn();
        else setPhase(getPhase + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const map = {
    1: "Command",
    2: "Psychic",
    3: "Move",
    4: "Shooting",
    5: "Charge",
    6: "Assault",
    0: "Moral"
  };
  function main() {
    if (getPhase / 7 <= 1) {
      return (
        <div>
          <div className="row">
            <div className="colu-6 colu-s-6">
              <PlayerComponent
                nr={1}
                cp={adjustCP}
                wp={adjustWP}
                valueCP={cp1}
                valueWP={wp1}
                info={handleClick}
                name={props.match.player1}
                side="left"
              />
            </div>
            <div className="colu-6 colu-s-6">
              <PlayerComponent
                nr={2}
                cp={adjustCP}
                wp={adjustWP}
                valueCP={cp2}
                valueWP={wp2}
                info={handleClick}
                name={props.match.player2}
                side="right"
              />
            </div>
          </div>
          <div className="row">
            <div className="colu-12 colu-s-12">
              <center>
                <h4> Turn(P1): {getTurn}</h4>
              </center>
            </div>
          </div>
          <div className="row">
            <div className="colu-12 colu-s-12">
              <GameTurn next={nextPhase} phase={getPhase} />
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div>
          <div className="row">
            <div className="colu-6 colu-s-6">
              <PlayerComponent
                nr={2}
                cp={adjustCP}
                wp={adjustWP}
                valueCP={cp2}
                valueWP={wp2}
                info={handleClick}
                name={props.match.player2}
                side="left"
              />
            </div>
            <div className="colu-6 colu-s-6">
              <PlayerComponent
                nr={1}
                cp={adjustCP}
                wp={adjustWP}
                valueCP={cp1}
                valueWP={wp1}
                info={handleClick}
                name={props.match.player1}
                side="right"
              />
            </div>
          </div>
          <div className="row">
            <div className="colu-12 colu-s-12">
              <center>
                <h4> Turn (P2): {getTurn}</h4>
              </center>
            </div>
          </div>

          <div className="row">
            <div className="colu-12 colu-s-12">
              <GameTurn next={nextPhase} phase={getPhase} />
            </div>
          </div>
        </div>
      );
  }
  let user = cookie.load("userIdentifier");
  if (props.match.player1 === user || props.match.player2 === user)
    return (
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        {main()}
        <Notes click={handleClick} phase={map[getPhase % 7]} p={p} />
      </ReactCardFlip>
    );
  else return <Redirect to={{ pathname: "/dashboard/" + user }} />;
}

function Notes(props) {
  return (
    <div className="Dummy">
      <div className="NoteDummy">
        Spieler {props.p}, hier könnte Ihre Notiz stehen für die {props.phase}
        -Phase stehen!!!
      </div>
      <Button
        className="ExitDummy"
        onClick={() => props.click(null)}
        variant="outline-danger"
      >
        X
      </Button>
    </div>
  );
}
