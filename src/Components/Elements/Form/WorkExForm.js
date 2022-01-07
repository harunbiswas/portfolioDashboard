import React, { Component } from "react";
import Button from "../../Button/Button";

export default class WorkExForm extends Component {
  render() {
    return (
      <form action="/about" className="service-form multi-form single-form">
        <input
          type="text"
          name="name"
          className="servise-form-input"
          placeholder="Name"
        />
        <input
          type="text"
          name="company"
          className="servise-form-input"
          placeholder={
            this.props.work === "work" ? "Company Name" : "institute Name"
          }
        />
        <input
          type="text"
          name="workDuration"
          className="servise-form-input"
          placeholder={
            this.props.work === "work" ? "Work duration" : "Education duration"
          }
        />
        <textarea
          name="workDetails"
          id=""
          className="service-form-textarea"
          placeholder={
            this.props.work === "work"
              ? "Work details here"
              : "Education Details here..."
          }
        ></textarea>
        <Button name="submit" type="submit" />
        <div onClick={this.props.func} className="hide-button">
          &#9747;
        </div>
      </form>
    );
  }
}
