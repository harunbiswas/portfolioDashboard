import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import values from "../../../values";
import Button from "../../Button/Button";
import { aboutcontext } from "../../context/context";

const cookies = new Cookies();
const workURL = `${values.BASE_URL}/dashboard/resome/work`;
const educationURL = `${values.BASE_URL}/dashboard/resome/education`;
let URL;

export default class WorkExForm extends Component {
  state = {
    cookie: cookies.get(values.COOKIE_NAME),
    name: "",
    institute: "",
    deuration: "",
    description: "",
    id: "",
    isWork: false,
    isUpdate: false,
  };
  componentDidMount() {
    if (this.context) {
      const { name, institute, company, deuration, description, _id } =
        this.context.workData || this.context.edecutionData;
      if (this.context.workData) {
        this.setState({ isWork: true });
      } else {
        this.setState({ isWork: false });
      }
      this.setState({
        name,
        institute,
        deuration,
        company,
        description,
        id: _id,
        isUpdate: true,
      });
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    const {
      name,
      institute,
      company,
      deuration,
      description,
      id,
      cookie,
      isUpdate,
    } = this.state;
    const data = {
      name,
      institute,
      deuration,
      company,
      description,
      id,
    };
    if (isUpdate) {
      URL = company ? workURL : educationURL;
    } else {
      URL = this.props.work ? workURL : educationURL;
    }
    if (this.context) {
      axios
        .put(URL, data, {
          headers: {
            cookies: cookie,
          },
        })
        .then((d) => {
          alert("Updated successfully!");
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
      case "company":
        this.setState({ company: e.target.value });
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
    const { name, institute, company, deuration, description, isWork } =
      this.state;
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
          name={
            isWork || this.props.work === "work" || company
              ? "company"
              : "institute"
          }
          className="servise-form-input"
          value={company || institute}
          onChange={(e) => this.inputChangeHandler(e)}
          placeholder={
            isWork || this.props.work === "work" || company
              ? "Company Name"
              : "Institute Name"
          }
        />
        <input
          type="text"
          name="deuration"
          className="servise-form-input"
          value={deuration}
          onChange={(e) => this.inputChangeHandler(e)}
          placeholder={
            this.props.work === "work" || company
              ? "Work duration"
              : "Education duration"
          }
        />
        <textarea
          value={description}
          onChange={(e) => this.inputChangeHandler(e)}
          name="description"
          id=""
          className="service-form-textarea"
          placeholder={
            this.props.work === "work" || company
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
