import React from "react";
import Main from "./Main";
import Changelog from "./Changelog";
import Carusel from "./Carusel";
import cookie from "react-cookies";
export default function HomeLogout() {
  cookie.remove("token", { path: "/" });
  cookie.remove("userIdentifier", { path: "/" });
  return (
    <div className="dark">
      <div className="row">
        <div className="colu-12 colu-s-12 notice"> !You were logged out !</div>
        <div className="colu-12 colu-s-12">
          <Carusel />
        </div>
      </div>
      <div className="row">
        <div className="colu-12 colu-s-12">
          <Main />
        </div>
      </div>
      <div className="row">
        <div className="colu-12 colu-s-12">
          <Changelog />
        </div>
      </div>
    </div>
  );
}
