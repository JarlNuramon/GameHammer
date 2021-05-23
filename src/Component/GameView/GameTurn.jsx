import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
export default function GameTurn(props) {
  const [isLoading, setLoading] = useState(false);
  const [getPhase, setPhase] = useState(props.phase);
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

  const handleClick = () => setLoading(true);
  return (
    <div className="gameTurn">
      <div className="Phase">{map[props.phase % 7]}</div>
      <Button disabled={isLoading} onClick={!isLoading ? handleClick : null}>
        {isLoading ? "Loading…" : "Next phase"}
      </Button>
    </div>
  );
}

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}
