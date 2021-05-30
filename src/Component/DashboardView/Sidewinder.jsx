import { BrowserRouter as Router, Link, useRouteMatch } from "react-router-dom";

export default function Sidewinder() {
  return (
    <div className="menu">
      <ul>
        <li>
          <Link to={`/game/a/1`}> Start new Game</Link>
        </li>

        <li>
          <Link to={`/myaccount`}> My Account</Link>
        </li>
      </ul>
    </div>
  );
}
