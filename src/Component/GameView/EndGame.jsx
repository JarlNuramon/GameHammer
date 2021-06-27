export default function EndGame(props) {
  return (
    <div className="EndGame">
      <div className="row">
        <div className="colu-5 colu-s-5">
          <center>
            <h2>
              {props.player1Name}({props.player1Race})
            </h2>
            <h2>{props.wp1} </h2>
          </center>
        </div>
        <div className="colu-2 colu-s-2">
          <center>
            <h1> VS </h1>
          </center>
        </div>
        <div className="colu-5 colu-s-5">
          <center>
            <h2>
              {props.player2Name}({props.player2Race})
            </h2>
            <h2>{props.wp2} </h2>
          </center>
        </div>
      </div>
      <row>
        <div className="colu-12 colu-s-12">
          <center className="green">
            <h2>
              The Match was{" "}
              {props.wp1 > props.wp2
                ? props.player1Name + " won"
                : props.wp1 !== props.wp2
                ? props.player2Name + " won"
                : "a tie"}
              !!!
            </h2>
          </center>
        </div>
      </row>
    </div>
  );
}
