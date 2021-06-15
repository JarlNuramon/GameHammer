import { BrowserRouter as Router, Link, useRouteMatch } from "react-router-dom";

export default function Sidewinder() {
  return (
    <div className="menu">
      <ul>
        <li>
          <Link to={`/game/a/start`}> Start new Game</Link>
        </li>
        <li>
          <Link to={`/game/a/start`}> Configure Army Lists</Link>
        </li>
        <li>
          <Link to={`/logout`}> Logout</Link>
        </li>
      </ul>
    </div>
  );
}
