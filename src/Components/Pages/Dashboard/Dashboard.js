import React, { Component } from "react";
// Internal Imports
import CounterBlock from "../../block/CounterBlock";
import "./Dashboard.scss";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="counter-block-wrapper">
            <CounterBlock />
          </div>
        </div>
      </div>
    );
  }
}
