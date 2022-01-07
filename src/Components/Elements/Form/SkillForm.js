import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import values from "../../../values";
import Button from "../../Button/Button";
import { aboutcontext } from "../../context/context";

const cookies = new Cookies();

const URL = `${values.BASE_URL}/dashboard/resome/skill`;

export default class SkillForm extends Component {
  state = {
    cookie: cookies.get(values.COOKIE_NAME),
    name: "",
    value: 0,
    id: "",
  };

  componentDidMount() {
    if (this.context) {
      const { name, value, _id } = this.context.skillData;

      this.setState({
        name,
        value,
        id: _id,
      });
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    const { name, value, id, cookie } = this.state;
    const data = {
      name,
      value,
    };

    if (this.context) {
      data.id = id;
      axios
        .put(URL, data, {
          headers: {
            cookies: cookie,
          },
        })
        .then((d) => {
          alert("Skilk Updated Successfully!");
          window.location.reload();
        })
        .catch((e) => {
          let result = Object.keys(e.response.data.errors);
          alert(e.response.data.errors[result[0]].msg);
        });
    } else {
      axios
        .post(URL, data, {
          headers: {
            cookies: cookie,
          },
        })
        .then((d) => {
          alert("Skill Added Successfully!");
          window.location.reload();
        })
        .catch((e) => {
          let result = Object.keys(e.response.data.errors);
          alert(e.response.data.errors[result[0]].msg);
        });
    }
  };

  inputHandler = (e) => {
    this.setState({ name: e.target.value });
  };
  rangevaluechangeHandler = (e) => {
    let value = this.state.value;
    let elmValue = e.target.nextSibling;
    elmValue.innerText = value;
    elmValue.style.left = `${value}%`;

    this.setState({ value: e.target.value });
  };

  render() {
    const { name, value } = this.state;
    return (
      <form
        onSubmit={(e) => this.submitHandler(e)}
        action="/resome"
        className="service-form multi-form single-form"
      >
        <input
          type="text"
          name="name"
          className="servise-form-input"
          placeholder="Name"
          value={name}
          onChange={(e) => this.inputHandler(e)}
        />
        <div className="input-range-wrapper">
          <label className="skill-label-label" htmlFor="skill-label">
            skill Label
          </label>
          <input
            id="skill-label"
            type="range"
            name="lable"
            value={value}
            className=""
            defaultValue={0}
            min={0}
            max={100}
            onChange={(e) => this.rangevaluechangeHandler(e)}
          />
          <span style={{ left: `${value}%` }} className="input-range-value">
            {value}
          </span>
        </div>

        <Button name="submit" type="submit" />
        <div onClick={this.props.func} className="hide-button">
          &#9747;
        </div>
      </form>
    );
  }
}

SkillForm.contextType = aboutcontext;
