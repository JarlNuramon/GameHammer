import { useParams } from "react-router-dom";
import PlayerComponent from "./PlayerComponent";
import GameTurn from "./GameTurn";
import cookie from "react-cookies";
import { useState, useEffect } from "react";
export default function GameView() {
  let { id, gameid } = useParams();
  console.log("id: ", id, " gameid:", gameid);
  const [getPhase, setPhase] = useState(1);
  const [getTurn, setTurn] = useState(1);
  const [cp1, setCp1] = useState(0);
  const [cp2, setCp2] = useState(0);
  const [wp1, setWp1] = useState(0);
  const [wp2, setWp2] = useState(0);
  const adjustWP = (a, nr) => {
    console.log("x", wp1, wp2);
    if (nr === 1) setWp1(wp1 + a);
    else setWp2(wp2 + a);
  };

  const adjustCP = (a, nr) => {
    if (nr === 1) setCp1(cp1 + a);
    else setCp2(cp2 + a);
  };

  function nextTurn() {
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
  }
  function nextPhase() {
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
  }
  console.log(getPhase);
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
              name="player1"
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
              name="player2"
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
              name="player2"
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
              name="player1"
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
