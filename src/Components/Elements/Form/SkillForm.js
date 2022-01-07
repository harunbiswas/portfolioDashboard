import React, { Component } from "react";
import Button from "../../Button/Button";

export default class SkillForm extends Component {
  rangevaluechangeHandler = (e) => {
    let value = e.target.value;
    let elmValue = e.target.nextSibling;
    elmValue.innerText = value;
    elmValue.style.left = `${value}%`;
  };

  render() {
    return (
      <form action="/resome" className="service-form multi-form single-form">
        <input
          type="text"
          name="name"
          className="servise-form-input"
          placeholder="Name"
        />
        <div className="input-range-wrapper">
          <label className="skill-label-label" htmlFor="skill-label">
            skill Label
          </label>
          <input
            id="skill-label"
            type="range"
            name="lable"
            className=""
            defaultValue={0}
            min={0}
            max={100}
            onChange={(e) => this.rangevaluechangeHandler(e)}
          />
          <span className="input-range-value">0</span>
        </div>

        <Button name="submit" type="submit" />
        <div onClick={this.hideFormhandler} className="hide-button">
          &#9747;
        </div>
      </form>
    );
  }
}
