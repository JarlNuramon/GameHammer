import React, { Component } from "react";

export default class StartGame extends Component {
  state = {
    data: this.props.data,
    name: this.props.name,
    value: this.props.value,
    onChange: this.props.onChange,
    required: this.props.required ? this.props.required : false
  };

  build = arr => {
        return Object.keys(arr).map(prop => 
          (arr[prop] instanceof Array) ?
                (<optgroup label={prop}>
                    {this.build(arr[prop])}
                </optgroup>) : 
                (<option value={arr[prop]}>{arr[prop]}</option>)
        )
  }

  render() {
    return (
      <select required={this.state.required} name={this.state.name} value={this.state.value} onChange={this.state.onChange}>
        <option value="" selected disabled>--Please choose an option--</option>
        {this.build(this.state.data)}
      </select>
    );
  }
}
