import { Button } from "react-bootstrap";
import React from "react";
export default class Counters extends React.Component {
  render() {
    if (!this.props.disabled)
      return (
        <div className="counter">
          <ul>
            <li className="name">{this.props.name}</li>
            <li className="value">{this.props.value}</li>
            <li className="plus">
              <Button disabled={this.props.disabled} onClick={this.props.up}>
                +
              </Button>
            </li>
            <li className="minus">
              <Button disabled={this.props.disabled} onClick={this.props.down}>
                -
              </Button>
            </li>
          </ul>
        </div>
      );
    else
      return (
        <div className="counter">
          <ul>
            <li className="name">{this.props.name}</li>
            <li className="value">{this.props.value}</li>
            <li className="plus"></li>
            <li className="minus"></li>
          </ul>
        </div>
      );
  }
}
//

//
