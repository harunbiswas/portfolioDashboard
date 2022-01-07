import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import values from "../../../values";
import Button from "../../Button/Button";
import { aboutcontext } from "../../context/context";

const cookies = new Cookies();

const URL = `${values.BASE_URL}/dashboard/review`;

export default class ReviewFrom extends Component {
  state = {
    cookie: cookies.get(values.COOKIE_NAME),
    name: "",
    title: "",
    description: "",
  };
  componentDidMount() {
    if (this.context) {
      const { name, title, description, _id } = this.context.review;
      this.setState({
        name,
        title,
        description,
        id: _id,
      });
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    const { cookie, name, title, description, id } = this.state;
    const data = {
      name,
      title,
      description,
      id,
    };
    if (this.context) {
      console.log(name);
      axios
        .put(URL, data, {
          headers: {
            cookies: cookie,
          },
        })
        .then((d) => {
          alert("Review updated Successfully!");
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
          alert("Review added Successfully!");
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

  render() {
    const { name, title, description } = this.state;
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
          name="title"
          className="servise-form-input"
          placeholder="Clien title"
          value={title}
          onChange={(e) => this.inputChangeHandler(e)}
        />
        <textarea
          name="description"
          id=""
          className="service-form-textarea"
          placeholder="Clint say here..."
          value={description}
          onChange={(e) => this.inputChangeHandler(e)}
        ></textarea>
        <Button name="submit" type="submit" />
        <div onClick={this.props.func} className="hide-button">
          &#9747;
        </div>
      </form>
    );
  }
}

ReviewFrom.contextType = aboutcontext;
