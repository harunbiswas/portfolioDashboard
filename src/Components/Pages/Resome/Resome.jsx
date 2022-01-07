import React, { Component } from "react";
import Add from "../../Elements/Add/Add";
import Name from "../../Elements/Name/Name";
import Title from "../../Elements/TItle/Title";
import "./Resome.scss";

export default class Resome extends Component {
  render() {
    return (
      <div className="resome">
        <div className="container">
          <Title name="Skill" />
          <Add name="Add Review" single="skill" />
          <Name useDelete="yse" name="Mehedi Hasan shubo" single="skill" />

          {/* /Work Exprience */}
          <Title name="Work Exprience" />
          <Add work="work" name="Add Review" single="workexprience" />
          <Name
            useDelete="yse"
            name="Full stack Developer"
            single="workexprience"
            work="work"
          />
          {/* // Educational Qualifications  */}
          <Title name="Educational Qualifications" />
          <Add name="Add Review" single="workexprience" />
          <Name
            useDelete="yse"
            name="MSc in Computer science & Tecnology"
            single="workexprience"
          />
        </div>
      </div>
    );
  }
}
