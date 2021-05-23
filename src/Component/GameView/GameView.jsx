import { useParams } from "react-router-dom";
import PlayerComponent from "./PlayerComponent";
import GameTurn from "./GameTurn";
import { useState, useEffect } from "react";
export default function GameView() {
  let { id, gameid } = useParams();
  console.log("id: ", id, " gameid:", gameid);
  const [getPhase, setPhase] = useState(1);
  const [getTurn, setTurn] = useState(1);
  const map = {
    1: "Command",
    2: "Psychic",
    3: "Move",
    4: "Shooting",
    5: "Charge",
    6: "Assault",
    0: "Moral"
  };

  return (
    <div>
      <div className="row">
        <div className="colu-6 colu-s-6">
          <PlayerComponent name="player1" side="left" />
        </div>
        <div className="colu-6 colu-s-6">
          <PlayerComponent name="player2" side="right" />
        </div>
      </div>
      <div className="row">
        <div className="colu-12 colu-s-12">
          <GameTurn phase={map(getPhase() % 7)} />
        </div>
      </div>
    </div>
  );
}
