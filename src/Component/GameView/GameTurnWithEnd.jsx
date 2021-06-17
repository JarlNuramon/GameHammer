import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
export default function GameTurnWithEnd(props) {
  const [isLoading, setLoading] = useState(false);
  const [endgame, setEnd] = useState(false);
  const map = {
    1: "Command",
    2: "Psychic",
    3: "Move",
    4: "Shooting",
    5: "Charge",
    6: "Assault",
    0: "Moral"
  };
  useEffect(() => {
    if (isLoading) {
      props.next().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);
  useEffect(() => {
    if (endgame) {
      props.end().then(() => {
        setEnd(false);
      });
    }
  }, [endgame]);

  const handleClick = () => setLoading(true);
  const handleEnd = () => setEnd(true);
  return (
    <div className="gameTurn">
      <div className="Phase">{map[props.phase % 7]}</div>
      <Button disabled={isLoading} onClick={!isLoading ? handleClick : null}>
        {isLoading
          ? "Loading…"
          : props.phase === 7
          ? "Next Player"
          : props.phase === 14
          ? "Next Turn"
          : "Next phase"}
      </Button>
      <Button disabled={isLoading} onClick={!isLoading ? handleEnd : null}>
        {isLoading ? "Loading…" : "End Game"}
      </Button>
    </div>
  );
}
