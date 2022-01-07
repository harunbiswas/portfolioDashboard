import React, { Component } from "react";
import Add from "../../Elements/Add/Add";
import Name from "../../Elements/Name/Name";
import Title from "../../Elements/TItle/Title";

export default class Portfolio extends Component {
  render() {
    return (
      <div className="protfolio">
        <div className="container">
          <Title name="Porfolio" />
          <Add name="Add Review" single="portfolio" plac="name" />
          <Name
            useDelete="yse"
            name="A portfolio website"
            single="portfolio"
            plac="Update name"
          />
        </div>
      </div>
    );
  }
}
