import { Link } from "react-router-dom";

export default function ButtonRow() {
  return (
    <div className="buttonrow">
      <ul>
        <li>
          <Link to={`/game/a/start`}> Start new Game</Link>
        </li>
        <li>
          <Link to={`/game/a/start`}>Configure Army Lists</Link>
        </li>
        <li>
          <Link to={`/logout`}> Logout</Link>
        </li>
      </ul>
    </div>
  );
}
