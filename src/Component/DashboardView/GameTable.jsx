import DataTable from "react-data-table-component";
import React from "react";
import cookie from "react-cookies";
import { Link } from "react-router-dom";

const columns = [
  {
    name: "Date",
    sortable: true,
    cell: (row) => (
      <div>
        <div style={{ fontWeight: 700 }}>Match from {row.date}</div>
      </div>
    )
  },
  {
    name: "Score",
    selector: "score",
    sortable: true,
    cell: (row) => (
      <div>
        {row.player1Score} vs {row.player2Score}
      </div>
    ),
    right: true
  },
  {
    name: "Host",
    selector: "host",
    sortable: true,
    cell: (row) => (
      <div>
        <div>
          {row.player1}: {row.player1Race} (
          {row.player1armyList ? row.player1armyList : "default"})
        </div>
        {row.summary}
      </div>
    )
  },
  {
    name: "Challenger",
    selector: "enemy",
    sortable: true,
    cell: (row) => (
      <div>
        <div>
          {row.player2}: {row.player2Race} (
          {row.player2armyList ? row.player2armyList : "default"})
        </div>
        {row.summary}
      </div>
    )
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
    cell: (row) => (
      <div>
        {row.state === 0 ? (
          <b style={{ color: "red" }}>Running </b>
        ) : (
          <b style={{ color: "green" }}>Finished</b>
        )}
      </div>
    ),
    right: true
  }
];

export default class GameTable extends React.Component {
  state = {
    data: [
      {
        id: 1,
        player1: "a",
        player2: "Opponent1",
        player1Score: 0,
        player2Score: 0,
        player1CP: 0,
        player2CP: 0,
        player1Race: "Necron",
        player2Race: "Death Guard",
        turn: 0,
        phase: 0,
        date: "25.02.2020",
        state: 0
      }
    ]
  };

  componentDidMount() {
    fetch(
      "http://localhost:8080/api/v1/match/matchesAsHost/" +
        this.id +
        "?apiToken=" +
        cookie.load("token"),
      {
        headers: {
          "content-type": "application/json"
        },
        method: "GET",
        mode: "cors"
      }
    )
      .then(function (response) {
        if (response.ok) return response.json();
        // parses json
        else throw "Could not Load Matches";
      })
      .then((myJson) => {
        this.setState({ data: myJson });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    this.id = cookie.load("userIdentifier");

    return (
      <div className="Table">
        <DataTable
          title="Games:"
          columns={columns}
          data={this.state.data}
          expandableRows
          expandOnRowClicked
          expandableRowsComponent={<ExpandableComponent />}
          onRowClicked={this.rowClicked}
          striped={true}
        />
      </div>
    );
  }
}

// The row data is composed into your custom expandable component via the data prop
const ExpandableComponent = ({ data }) => (
  <div>
    <div className="Expand">
      <h3>Game Info:</h3>
      Game was started at <b>{data.date}</b>. It was the{" "}
      <b> {data.turn}. Turn</b>
      <br />
      <br />
      <div className="row">
        <div className="colu-6 colu-s-6">
          <h5>{data.player1}</h5>
          <ul>
            <li>
              <b>Score: </b> {data.player1Score}
            </li>
            <li>
              <b>CP: </b>
              {data.player1CP}
            </li>
            <li>
              <b>Army: </b>
              {data.player1Race} (
              {data.player1armyList ? data.player1armyList : "default"})
            </li>
          </ul>
        </div>
        <div className="colu-6 colu-s-6">
          <h5>{data.player2}</h5>
          <ul>
            <li>
              <b>Score: </b>
              {data.player2Score}
            </li>
            <li>
              <b>CP: </b>
              {data.player2CP}
            </li>
            <li>
              <b>Army: </b>
              {data.player2Race} (
              {data.player2armyList ? data.player2armyList : "default"})
            </li>
          </ul>
        </div>
      </div>
      {!data.state || data.state === 0 ? (
        <Link
          className="backToGame"
          to={"/game/" + cookie.load("userIdentifier") + "/" + data.id}
        >
          Back to the Game
        </Link>
      ) : (
        ""
      )}
    </div>
  </div>
);
