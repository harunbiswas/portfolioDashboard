import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import values from "../../../values";
import Button from "../../Button/Button";
import { aboutcontext } from "../../context/context";

const cookies = new Cookies();
const URL = `${values.BASE_URL}/dashboard/resome/work`;

export default class WorkExForm extends Component {
  state = {
    cookie: cookies.get(values.COOKIE_NAME),
    name: "",
    institute: "",
    deuration: "",
    description: "",
    id: "",
  };
  componentDidMount() {
    if (this.context) {
      const { name, institute, deuration, description, _id } =
        this.context.workData;
      this.setState({
        name,
        institute,
        deuration,
        description,
        id: _id,
      });
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    const { name, institute, deuration, description, id, cookie } = this.state;
    const data = {
      name,
      institute,
      deuration,
      description,
      id,
    };
    if (this.context) {
      axios
        .put(URL, data, {
          headers: {
            cookies: cookie,
          },
        })
        .then((d) => {
          alert("Work exprience Updated successfully!");
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
          alert("Work exprience added successfully!");
          window.location.reload();
        })
        .catch((e) => {
          let result = Object.keys(e.response.data.errors);
          alert(e.response.data.errors[result[0]].msg);
        });
    }
  };

  inputChangeHandler = (e) => {
    switch (e.target.name) {
      case "name":
        this.setState({ name: e.target.value });
        break;
      case "institute":
        this.setState({ institute: e.target.value });
        break;
      case "deuration":
        this.setState({ deuration: e.target.value });
        break;
      case "description":
        this.setState({ description: e.target.value });
        break;
      default:
        break;
    }
  };
  render() {
    const { name, institute, deuration, description } = this.state;
    return (
      <form
        onSubmit={(e) => this.submitHandler(e)}
        action="/about"
        className="service-form multi-form single-form"
      >
        <input
          type="text"
          name="name"
          className="servise-form-input"
          placeholder="Name"
          value={name}
          onChange={(e) => this.inputChangeHandler(e)}
        />
        <input
          type="text"
          name="institute"
          className="servise-form-input"
          value={institute}
          onChange={(e) => this.inputChangeHandler(e)}
          placeholder={
            this.props.work === "work" ? "Company Name" : "institute Name"
          }
        />
        <input
          type="text"
          name="deuration"
          className="servise-form-input"
          value={deuration}
          onChange={(e) => this.inputChangeHandler(e)}
          placeholder={
            this.props.work === "work" ? "Work duration" : "Education duration"
          }
        />
        <textarea
          value={description}
          onChange={(e) => this.inputChangeHandler(e)}
          name="description"
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

WorkExForm.contextType = aboutcontext;
