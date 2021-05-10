import { BrowserRouter as Router, Link, useRouteMatch } from "react-router-dom";

export default function ButtonRow() {
  return (
    <div className="buttonrow">
      <ul>
        <li>
          <Link to={`/game/myId/myGameId`}> Start new Game</Link>
        </li>

        <li>
          <Link to={`/myaccount`}> My Account</Link>
        </li>
      </ul>
    </div>
  );
}