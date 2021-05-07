import { useParams } from "react-router-dom";
import PlayerComponent from "./PlayerComponent";
import GameTurn from "./GameTurn";
export default function GameView() {
  let { id, gameid } = useParams();
  console.log("id: ", id, " gameid:", gameid);

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
          <GameTurn phase={"phasedummy"} />
        </div>
      </div>
    </div>
  );
}
