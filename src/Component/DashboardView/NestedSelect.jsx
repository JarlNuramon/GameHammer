import React, { Component } from "react";

export default class StartGame extends Component {
  state = {
    data: this.props.data,
    name: this.props.name,
    value: this.props.value,
    onChange: this.props.onChange
  };

  build = arr => {
        return Object.keys(arr).map(prop => 
          (arr[prop] instanceof Array) ?
                (<optgroup label={prop}>
                    {this.build(arr[prop])}
                </optgroup>)
            : (arr[prop] instanceof Object) ?
                    (<>{this.build(arr[prop])}</>)
            : (<option value={arr[prop]}>{arr[prop]}</option>)
        )
  }

  render() {
    return (
      <select name={this.state.name} value={this.state.value} onChange={this.state.onChange}>
        {this.build(this.state.data)}
      </select>
    );
  }
}
