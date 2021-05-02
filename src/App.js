import "./styles.css";
import "./footer.css";
import "./table.css";
import "./game.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Component/HomeView/Home";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Dashboard from "./Component/DashboardView/Dashboard";
import Login from "./Component/LoginView/Login";
import GameView from "./Component/GameView/GameView";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/dashboard/:id" children={<Dashboard />}></Route>
        <Route path="/dashboard" children={<Dashboard />}></Route>
        <Route path="/game/:id/:gameid" children={<GameView />} />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
