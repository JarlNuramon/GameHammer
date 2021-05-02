import { useParams } from "react-router-dom";
import PlayerComponent from "./PlayerComponent";
import GameTurn from "./GameTurn";
export default function GameView() {
  let { id, gameid } = useParams();
  console.log("id: ", id, " gameid:", gameid);

  return (
    <div>
      <div className="row">
        <div className="colu-5 colu-s-5">
          <PlayerComponent name="player1" side="left" />
        </div>
        <div className="colu-2 colu-s-5">
          <h2>
            <center>
              <h2>vs</h2>
            </center>
          </h2>
        </div>
        <div className="colu-5 colu-s-4">
          <PlayerComponent name="player2" side="right" />
        </div>
      </div>
      <div className="row">
        <GameTurn />
      </div>
    </div>
  );
}
