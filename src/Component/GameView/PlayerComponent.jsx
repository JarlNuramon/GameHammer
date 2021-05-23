import React from "react";
import Counters from "./Counter";
export default class PlayerComponent extends React.Component {
  render() {
    return (
      <div className={"player " + this.props.side}>
        <div className={"player-name"}>
          <h2>{this.props.name}</h2>
        </div>
        <Counters
          name="CP"
          value={this.props.valueCP}
          up={() => this.props.cp(1, this.props.nr)}
          down={() => this.props.cp(-1, this.props.nr)}
        />
        <Counters
          name="WP"
          value={this.props.valueWP}
          up={() => this.props.wp(1, this.props.nr)}
          down={() => this.props.wp(-1, this.props.nr)}
        />
      </div>
    );
  }
}
