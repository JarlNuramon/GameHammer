import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
export default function GameTurn(props) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);
  return (
    <div className="gameTurn">
      <center>
        <h1>{props.phase}</h1>
        <Button disabled={isLoading} onClick={!isLoading ? handleClick : null}>
          {isLoading ? "Loading…" : "Next phase"}
        </Button>
      </center>
    </div>
  );
}

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}
