import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import values from "../../values";
import { aboutcontext } from "../context/context";

const cookies = new Cookies();
const serveceURL = `${values.BASE_URL}/dashboard/service`;
const reviewURL = `${values.BASE_URL}/dashboard/review`;
const skillURL = `${values.BASE_URL}/dashboard/resome/skill`;

export default class Button extends Component {
  state = {
    cookie: cookies.get(values.COOKIE_NAME),
    name:
      typeof this.props.name === "string" && this.props.name.length > 0
        ? this.props.name
        : "button",
    type:
      typeof this.props.type === "string" && this.props.type.length > 0
        ? this.props.type
        : "",
    func: this.props.func === undefined ? false : true,
  };
  openUpdatehandler = (e) => {
    if (this.state.func) {
      this.props.func(e);
    }

    if (this.props.name === "delete") {
      const { cookie } = this.state;
      let URL;
      let _id;
      if (this.context.service) {
        URL = serveceURL;
        _id = this.context.service._id;
      } else if (this.context.review) {
        URL = reviewURL;
        _id = this.context.review._id;
      } else if (this.context.skillData) {
        URL = skillURL;
        _id = this.context.skillData._id;
      }

      axios
        .delete(URL, {
          headers: {
            cookies: cookie,
            id: _id,
          },
        })
        .then((d) => {
          alert(d.data.msg);
          window.location.reload();
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    }
  };

  render() {
    let style = {
      backgroundColor: "red",
      borderColor: "red",
    };
    let noStyle = {};
    let usetyle = this.props.name === "delete" ? style : noStyle;
    return (
      <button
        style={usetyle}
        onClick={(e) => {
          this.openUpdatehandler(e);
        }}
        className="button"
        type={this.state.type}
      >
        {this.state.name}
      </button>
    );
  }
}

Button.contextType = aboutcontext;
