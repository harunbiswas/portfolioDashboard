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
const workURL = `${values.BASE_URL}/dashboard/resome/work`;
const educationURL = `${values.BASE_URL}/dashboard/resome/education`;
export default class Resome extends Component {
  state = {
    cookie: cookies.get(values.COOKIE_NAME),
    skillDatas: [],
    workDatas: [],
    educationDatas: [],
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

    // get wrok expricence data
    axios
      .get(workURL, { headers: { cookies: cookie } })
      .then((d) => {
        this.setState({ workDatas: d.data.result });
      })
      .catch((e) => {
        alert(e.response.data.error);
      });

    // get education expricence data
    axios
      .get(educationURL, { headers: { cookies: cookie } })
      .then((d) => {
        this.setState({ educationDatas: d.data.result });
      })
      .catch((e) => {
        alert(e.response.data.error);
      });
  }

  render() {
    const { skillDatas, workDatas, educationDatas } = this.state;
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

          {workDatas.reverse().map((workData) => (
            <aboutcontext.Provider key={workData._id} value={{ workData }}>
              <Name
                useDelete="yse"
                name={workData.name}
                single="workexprience"
                work="work"
              />
            </aboutcontext.Provider>
          ))}
          {/* // Educational Qualifications  */}
          <Title name="Educational Qualifications" />
          <Add name="Add Review" single="education" />

          {educationDatas.reverse().map((edecutionData) => (
            <aboutcontext.Provider
              key={edecutionData._id}
              value={{ edecutionData }}
            >
              <Name
                useDelete="yse"
                name={edecutionData.name}
                single="workexprience"
              />
            </aboutcontext.Provider>
          ))}
        </div>
      </div>
    );
  }
}
