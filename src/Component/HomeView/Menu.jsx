import { BrowserRouter as Router, Link, useRouteMatch } from "react-router-dom";

export default function Menu() {
  let match = useRouteMatch();
  return (
    <div className="menu">
      <ul>
        <li>
          <Link to={`/login`}> Login</Link>
        </li>
        <li>
          <Link to={`/dashboard`}> Dashboard</Link>
        </li>
        <li>
          <Link to={`/myaccount`}> My Account</Link>
        </li>
        <li>
          <Link to={`/About`}> About</Link>
        </li>
      </ul>
    </div>
  );
}
