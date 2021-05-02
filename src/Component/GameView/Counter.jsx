import { Button } from "react-bootstrap";
import React from "react";
export default class Counters extends React.Component {
  render() {
    return (
      <div className="counter">
        <ul>
          <li className="name">{this.props.name}</li>
          <li className="value">{this.props.value}</li>
          <li className="plus">
            <Button onClick={this.props.up}>+</Button>
          </li>
          <li className="minus">
            <Button onClick={this.props.down}>-</Button>
          </li>
        </ul>
      </div>
    );
  }
}
//

//
