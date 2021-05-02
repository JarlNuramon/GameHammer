import React from "react";
import Counters from "./Counter";
export default class PlayerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wp: 0, cp: 0 };
    this.name = props.name;
    this.side = props.side;
  }
  upWP = () => {
    this.setState({ wp: this.state.wp + 1 });
  };

  upCP = () => {
    this.setState({ cp: this.state.cp + 1 });
  };

  downWP = () => {
    this.setState({ wp: this.state.wp - 1 });
  };

  downCP = () => {
    this.setState({ cp: this.state.cp - 1 });
  };
  render() {
    return (
      <div className={"player " + this.side}>
        <div className={"player-name"}>
          <h2>{this.name}</h2>
        </div>
        <Counters
          name="CP"
          value={this.state.cp}
          up={this.upCP}
          down={this.downCP}
        />
        <Counters
          name="WP"
          value={this.state.wp}
          up={this.upWP}
          down={this.downWP}
        />
      </div>
    );
  }
}
