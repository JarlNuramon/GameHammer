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
          {row.player1}: {row.player1Race}
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
          {row.player2}: {row.player2Race}
        </div>
        {row.summary}
      </div>
    )
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
          expandableRowsHideExpander
          expandableRowsComponent={<ExpandableComponent />}
          onRowClicked={this.rowClicked}
        />
      </div>
    );
  }
}

// The row data is composed into your custom expandable component via the data prop
const ExpandableComponent = ({ data }) => (
  <div>
    <div className="Table">
      Game Info
      <ul>
        <li>Id: {data.id}</li>
        <li>Turn: {data.turn}</li>
        <li>Phase: {data.phase}</li>
        <li>Date: {data.date}</li>
      </ul>
      Player Host: {data.player1}
      <ul>
        <li>Score: {data.player1Score}</li>
        <li>CP: {data.player1CP}</li>
        <li>Race: {data.player1Race}</li>
      </ul>
      Player Enemy: {data.player2}
      <ul>
        <li>Score: {data.player2Score}</li>
        <li>CP: {data.player2CP}</li>
        <li>Race: {data.player2Race}</li>
      </ul>
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
