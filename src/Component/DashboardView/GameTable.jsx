import DataTable from "react-data-table-component";
import React from "react";
const data = [
  {
    id: 1,
    date: "25.02.2020",
    score: "3vs4",
    enemy: "Opponent1"
  }
];
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
    right: true
  },
  {
    name: "Enemy",
    selector: "enemy",
    sortable: true,
    cell: (row) => (
      <div>
        <div>{row.enemy}</div>
        {row.summary}
      </div>
    )
  }
];
export default class GameTable extends React.Component {
  render() {
    return (
      <div className="Table">
        <DataTable
          title="Games:"
          columns={columns}
          data={data}
          expandableRows
          expandOnRowClicked
          expandableRowsHideExpander
          expandableRowsComponent={<ExpandableComponent />}
        />
      </div>
    );
  }
}

// The row data is composed into your custom expandable component via the data prop
const ExpandableComponent = ({ data }) => (
  <div className="Table">all the infos</div>
);
