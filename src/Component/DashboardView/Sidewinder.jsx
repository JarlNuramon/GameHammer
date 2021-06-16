import { BrowserRouter as Router, Link, useRouteMatch } from "react-router-dom";
import cookie from "react-cookies";

export default function Sidewinder() {
  let user = cookie.load("userIdentifier");
  return (
    <div className="menu">
      <ul>
        <li>
          <Link to={`/game/${user}/start`}> Start new Game</Link>
        </li>
        <li>
          <Link to={`/game/${user}/start`}> Configure Army Lists</Link>
        </li>
        <li>
          <Link to={`/logout`}> Logout</Link>
        </li>
      </ul>
    </div>
  );
}
