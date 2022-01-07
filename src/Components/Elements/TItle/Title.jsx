import React, { Component } from "react";
import "./Title.scss";

export default class Title extends Component {
  render() {
    return (
      <div className="title">
        <span>{this.props.name}</span>{" "}
      </div>
    );
  }
}
