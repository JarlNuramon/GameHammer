import React, { Component } from "react";
import { Form } from "react-bootstrap";
export default class StartGame extends Component {
  state = {
    data: this.props.data,
    name: this.props.name,
    value: this.props.value,
    onChange: this.props.onChange,
    required: this.props.required ? this.props.required : false
  };

  build = (arr) => {
    return Object.keys(arr).map((prop) =>
      arr[prop] instanceof Array ? (
        <optgroup label={prop}>{this.build(arr[prop])}</optgroup>
      ) : (
        <option value={arr[prop]}>{arr[prop]}</option>
      )
    );
  };

  render() {
    return (
      <Form.Control
        as="select"
        required={this.props.required}
        name={this.props.name}
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <option value="" selected disabled>
          --Please choose an option--
        </option>
        {this.build(this.props.data)}
      </Form.Control>
    );
  }
}
