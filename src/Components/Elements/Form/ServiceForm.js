import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import values from "../../../values";
import Button from "../../Button/Button";
import { aboutcontext } from "../../context/context";

const cookies = new Cookies();

const URL = `${values.BASE_URL}/dashboard/service`;

export default class ServiceForm extends Component {
  state = {
    cookie: cookies.get(values.COOKIE_NAME),
    title: "",
    description: "",
    id: "",
  };

  componentDidMount() {
    if (this.context) {
      const { _id, title, description } = this.context.service;
      this.setState({
        title,
        id: _id,
        description,
      });
    }
  }

  inputChangeHandler = (e) => {
    switch (e.target.name) {
      case "title":
        this.setState({ title: e.target.value });
        break;
      case "description":
        this.setState({ description: e.target.value });
        break;
      default:
        break;
    }
  };

  submitHandler = (e) => {
    e.preventDefault();
    const { title, description, cookie } = this.state;
    const data = {
      title,
      description,
    };

    if (this.context) {
      axios
        .post(URL, data, {
          headers: {
            cookies: cookie,
          },
        })
        .then((d) => {
          alert("Service added successfully!");
          window.location.reload();
        })
        .catch((e) => {
          let result = Object.keys(e.response.data.errors);
          alert(e.response.data.errors[result[0]].msg);
        });
    } else {
      data.id = this.state.id;
      axios
        .put(URL, data, {
          headers: {
            cookies: cookie,
          },
        })
        .then((d) => {
          alert("Service added successfully!");
          window.location.reload();
        })
        .catch((e) => {
          let result = Object.keys(e.response.data.errors);
          alert(e.response.data.errors[result[0]].msg);
        });
    }
  };

  render() {
    const { title, description } = this.state;
    return (
      <form
        onSubmit={(e) => this.submitHandler(e)}
        action="/about"
        className="service-form multi-form single-form"
      >
        <input
          onChange={(e) => this.inputChangeHandler(e)}
          ref={this.focust}
          type="text"
          name="title"
          className="servise-form-input"
          placeholder="Service Name"
          value={title}
        />
        <textarea
          onChange={(e) => this.inputChangeHandler(e)}
          name="description"
          id=""
          className="service-form-textarea"
          placeholder="service details here..."
          value={description}
        ></textarea>
        <Button name="submit" type="submit" />
        <div onClick={this.props.func} className="hide-button">
          &#9747;
        </div>
      </form>
    );
  }
}

ServiceForm.contextType = aboutcontext;
