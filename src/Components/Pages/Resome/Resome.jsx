import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import values from "../../../values";
import { aboutcontext } from "../../context/context";
import Add from "../../Elements/Add/Add";
import Name from "../../Elements/Name/Name";
import Title from "../../Elements/TItle/Title";
import "./Resome.scss";

const cookies = new Cookies();
const skillURL = `${values.BASE_URL}/dashboard/resome/skill`;
export default class Resome extends Component {
  state = {
    cookie: cookies.get(values.COOKIE_NAME),
    skillDatas: [],
  };

  componentDidMount() {
    const { cookie } = this.state;

    // get skill data
    axios
      .get(skillURL, {
        headers: {
          cookies: cookie,
        },
      })
      .then((d) => {
        this.setState({ skillDatas: d.data.result });
      })
      .catch((e) => {
        alert(e.response.data.error);
      });
  }

  render() {
    const { skillDatas } = this.state;
    return (
      <div className="resome">
        <div className="container">
          <Title name="Skill" />
          <Add name="Add Review" single="skill" />
          {skillDatas.reverse().map((skillData) => (
            <aboutcontext.Provider key={skillData._id} value={{ skillData }}>
              <Name useDelete="yse" name={skillData.name} single="skill" />
            </aboutcontext.Provider>
          ))}
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
