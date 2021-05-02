import { BrowserRouter as Router, Link, useRouteMatch } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function Header() {
  return (
    <div className="header">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to={`/home`}>Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={`/dashboard`}>Dashboard</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={`/login`}>My Account</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
