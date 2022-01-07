import { default as axios, default as axiox } from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import values from "../../../values";
import { homecontext } from "../../context/context";
import Name from "../../Elements/Name/Name";
import Title from "../../Elements/TItle/Title";
import "./Home.scss";

const URL = `${values.BASE_URL}/dashboard/home`;
const cookies = new Cookies();

export default class Home extends Component {
  state = {
    cookie: cookies.get(values.COOKIE_NAME),
    name: "",
    bio: "",
  };

  async componentDidMount() {
    const { cookie } = this.state;
    const result = await axiox.get(URL, {
      headers: {
        cookies: cookie,
      },
    });
    try {
      this.setState({
        name: result.data.result[0].name,
        bio: result.data.result[0].bio,
      });
    } catch {
      console.log(result.response);
    }
  }
  updateHandler = (e) => {
    e.preventDefault();
    const { name, bio, cookie } = this.state;
    const data = {
      name,
      bio,
    };

    axios
      .put(URL, data, {
        headers: {
          cookies: cookie,
        },
      })
      .then((d) => {
        window.location.reload();
      })
      .catch((e) => alert(e.response.data.error));
  };

  nameChangeHangler = (e) => {
    this.setState({
      name: e.target.value,
    });
    e.target.focus();
  };

  disChangeHangler = (e) => {
    this.setState({
      bio: e.target.value,
    });
  };

  render() {
    const { name, bio } = this.state;

    //focust.current.focus();
    return (
      <div className="home">
        <div className="container">
          <homecontext.Provider
            value={{
              changeHandler: this.nameChangeHangler,
              submitHandler: this.updateHandler,
              plac: "Update Name",
              name,
              single: "single",
            }}
          >
            <Title name="Name" />
            <Name name={name} />
          </homecontext.Provider>
          <homecontext.Provider
            value={{
              changeHandler: this.disChangeHangler,
              plac: "Update Bio",
              name: bio,
              single: "single",
              submitHandler: this.updateHandler,
            }}
          >
            <Title name="Bio" />
            <Name plac="Update Bio" name={bio} single="single" />
          </homecontext.Provider>
        </div>
      </div>
    );
  }
}
