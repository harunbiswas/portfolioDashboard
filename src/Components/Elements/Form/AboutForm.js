import axios from "axios";
import React, { Component, createRef } from "react";
import Cookies from "universal-cookie/es6";
import values from "../../../values";
import Button from "../../Button/Button";
import { aboutcontext } from "../../context/context";

const cookies = new Cookies();

const URL = `${values.BASE_URL}/dashboard/home`;

export default class AboutForm extends Component {
  constructor(props) {
    super(props);
    this.inputfile = createRef();
    this.state = {
      cookie: cookies.get(values.COOKIE_NAME),
      name: "",
      description: "",
      age: "",
      nationality: "",
      language: "",
      address: "",
      freelance: "",
      file: null,
    };
  }
  componentDidMount() {
    const {
      name,
      description,
      age,
      nationality,
      language,
      address,
      freelance,
    } = this.context.data;

    this.setState({
      name,
      description,
      age,
      nationality,
      language,
      address,
      freelance,
    });
  }

  submitHandler = (e) => {
    e.preventDefault();

    let {
      name,
      description,
      age,
      nationality,
      language,
      address,
      freelance,
      file,
      cookie,
    } = this.state;
    const data = {
      name,
      description,
      age,
      nationality,
      language,
      address,
      freelance,
      files: file,
    };
    axios
      .put(URL, data, {
        headers: {
          cookies: cookie,
        },
      })
      .then((d) => {
        alert("Data updated!");
        window.location.reload();
      })
      .catch((e) => {
        alert(e.response.data.error);
      });
  };

  inputChangeHandler = (e) => {
    if (e.target.name === "name") {
      this.setState({ name: e.target.value });
    } else if (e.target.name === "description") {
      this.setState({ description: e.target.value });
    } else if (e.target.name === "age") {
      this.setState({ age: e.target.value });
    } else if (e.target.name === "nationality") {
      this.setState({ nationality: e.target.value });
    } else if (e.target.name === "language") {
      this.setState({ language: e.target.value });
    } else if (e.target.name === "address") {
      this.setState({ address: e.target.value });
    } else if (e.target.name === "freelance") {
      this.setState({ freelance: e.target.value });
    }
  };

  fileHandler = () => {
    this.setState({ file: this.inputfile.current.files[0] });
  };

  render() {
    const {
      name,
      description,
      age,
      nationality,
      language,
      address,
      freelance,
    } = this.state;
    return (
      <>
        <form
          onSubmit={(e) => this.submitHandler(e)}
          action="/about"
          className="single-form multi-form"
        >
          <input
            type="text"
            placeholder={this.props.plac}
            name="name"
            className="input-name"
            value={name}
            onChange={(e) => this.inputChangeHandler(e)}
          />
          <textarea
            name="description"
            id=""
            className="service-form-textarea"
            placeholder="description here..."
            value={description}
            onChange={(e) => this.inputChangeHandler(e)}
          ></textarea>
          <input
            type="text"
            placeholder="Age"
            name="age"
            className="input-name"
            value={age}
            onChange={(e) => this.inputChangeHandler(e)}
          />
          <input
            type="text"
            placeholder="Nationality"
            name="nationality"
            className="input-name"
            value={nationality}
            onChange={(e) => this.inputChangeHandler(e)}
          />
          <input
            type="text"
            placeholder="Language"
            name="language"
            className="input-name"
            value={language}
            onChange={(e) => this.inputChangeHandler(e)}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            className="input-name"
            value={address}
            onChange={(e) => this.inputChangeHandler(e)}
          />
          <input
            type="text"
            placeholder="freelance"
            name="freelance"
            className="input-name"
            value={freelance}
            onChange={(e) => this.inputChangeHandler(e)}
          />
          <input
            onChange={this.fileHandler}
            type="file"
            name="file"
            className="input-file"
            ref={this.inputfile}
          />

          <Button name="Save" type="submit" />
          <div onClick={this.props.func} className="hide-button">
            &#9747;
          </div>
        </form>
      </>
    );
  }
}

AboutForm.contextType = aboutcontext;
