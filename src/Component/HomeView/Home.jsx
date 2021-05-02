import React from "react";
import Main from "./Main";
import Changelog from "./Changelog";
import Carusel from "./Carusel";
export default function Home() {
  return (
    <div className="dark">
      <div className="row">
        <div className="colu-12 colu-s-12">
          <Carusel />
        </div>
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
