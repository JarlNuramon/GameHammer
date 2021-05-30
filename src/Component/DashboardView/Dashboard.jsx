import Sidewinder from "./Sidewinder";
import GameTable from "./GameTable";
import { Component } from "react";
import ButtonRow from "./ButtonRow";
import cookie from "react-cookies";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";

import ReactLoading from "react-loading";
class Dashboard extends Component {
  state = {
    loading: true
  };
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  componentDidMount() {
    console.log(this.token, "and", this.id);
    if (this.id && this.token)
      fetch("http://localhost:8080/api/v1/authenticate/dev/" + this.token, {
        method: "GET",
        mode: "cors"
      })
        .then(function (response) {
          console.log(response);
          if (response.ok) return response;
          // parses json
          alert("Token validation failed");
          throw "Token was not valid";
        })
        .then((name) => {
          this.setState({ loading: false });
        })
        .catch((e) => {
          console.log(e);
          this.props.history.push("/login");
        });
  }

  render() {
    this.token = cookie.load("token");
    this.id = this.props.match.params.id;
    if (this.id && this.token)
      if (this.state.loading)
        return (
          <center>
            <ReactLoading
              type={"balls"}
              color={"#black"}
              height={667}
              width={375}
            />
            shooting through Orks to reach dashboard.
          </center>
        );
      else
        return (
          <div>
            <div className="row">
              <div className="colu-2 colu-s-4">
                <Sidewinder />
              </div>
              <div className="colu-6 colu-s-6">
                <GameTable />
              </div>
            </div>
            <div className="row">
              <ButtonRow />
            </div>
          </div>
        );
    else return <Redirect to={{ pathname: "/login" }} />;
  }
}
export default withRouter(Dashboard);
