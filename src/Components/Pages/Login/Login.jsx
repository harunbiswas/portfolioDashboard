import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import values from "../../../values";
import Button from "../../Button/Button";
import "./Login.scss";

const cookies = new Cookies();

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSingUp: false,
      name: "",
      email: "",
      password: "",
      files: null,
    };
    this.fileInput = React.createRef();
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: [e.target.value] });
  };
  submitFormHandler = (e) => {
    e.preventDefault();
    const URL = `${values.BASE_URL}/dashboard/singup`;

    if (this.state.isSingUp) {
      // sing up code
      let { name, email, password, files } = this.state;
      console.log(files);

      axios
        .post(URL, { name, email, password, files })
        .then((d) => {
          alert(d.data.message);
          this.setState({ isSingUp: false, email, password });
        })
        .catch((e) => {
          let result = Object.keys(e.response.data.errors);
          alert(e.response.data.errors[result[0]].msg);
        });
    } else {
      // login oprtation
      const URL = `${values.BASE_URL}/dashboard/login`;
      let { email, password } = this.state;
      axios
        .post(URL, { email, password })
        .then((d) => {
          alert("logged in successfully!");
          cookies.set(values.COOKIE_NAME, d.data.loggedInUser.token, {
            path: "*",
            expires: new Date(Date.now() + values.JWT_EXPIRY),
          });
          window.location.reload();
        })
        .catch((e) => {
          let result = Object.keys(e.response.data.errors);
          alert(e.response.data.errors[result[0]].msg);
          this.setState({ password: "" });
        });
    }
  };

  filesHandler = (e) => {
    this.setState({ files: this.fileInput.current.files[0].name });
  };

  singupHandler = () => {
    this.setState({ isSingUp: true });
  };

  render() {
    let { name, email, password } = this.state;
    const style = {
      display: this.state.isSingUp ? "block" : "none",
    };
    const loginWrapper = {
      height: this.state.isSingUp ? "auto" : "300px",
    };
    return (
      <div className="login">
        <div className="container">
          <div className="login-wrapper" style={loginWrapper}>
            <form
              id="form-data"
              action="/"
              onSubmit={(e) => this.submitFormHandler(e)}
              className="login-form"
              encType="multipart/form-data"
            >
              <input
                onChange={(e) => this.changeHandler(e)}
                style={style}
                type="text"
                placeholder="Full Name"
                name="name"
                value={name}
              />
              <input
                onChange={(e) => this.changeHandler(e)}
                type="text"
                placeholder="User name"
                name="email"
                value={email}
              />
              <input
                onChange={(e) => this.changeHandler(e)}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
              />
              <input
                onChange={(e) => this.filesHandler(e)}
                ref={this.fileInput}
                style={style}
                type="file"
                name="avatar"
              />
              <div style={{ height: "4rem" }} className="">
                <Button
                  name={this.state.isSingUp ? "Sing up" : "login"}
                  type="submit"
                />
              </div>
              <span onClick={this.singupHandler} className="sungup-btn">
                go to singUp
              </span>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
