import React from "react";
import Counters from "./Counter";
import { Button } from "react-bootstrap";
export default class PlayerComponent extends React.Component {
  render() {
    return (
      <div className={"player " + this.props.side}>
        <div className={"player-name"}>
          <div className="names"> {this.props.name}</div>
          <Button
            style={{ float: this.props.side === "right" ? "left" : "right" }}
            variant="outline-info"
            id="round"
            onClick={() => this.props.info(this.props.nr)}
          >
            ?
          </Button>
        </div>

        <Counters
          name="CP"
          value={this.props.valueCP}
          disabled={this.props.disable ? true : false}
          up={() => this.props.cp(1, this.props.nr)}
          down={() => this.props.cp(-1, this.props.nr)}
        />
        <Counters
          name="WP"
          value={this.props.valueWP}
          disabled={this.props.disable ? true : false}
          up={() => this.props.wp(1, this.props.nr)}
          down={() => this.props.wp(-1, this.props.nr)}
        />
      </div>
    );
  }
}
