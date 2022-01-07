import axios from "axios";
import jwt from "jwt-decode";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie/es6";
// Internal Imports
import noPhoto from "../../assats/Images/no-profile-picture.png";
import values from "../../values";
import Logout from "../Button/Logout";
import Notification from "../Button/Notification";
import "./Header.scss";

const URL = `${values.BASE_URL}/dashboard/user`;

const cookies = new Cookies();

export default class Header extends Component {
  state = {
    cookie: cookies.get(values.COOKIE_NAME),
    result: {},
  };

  async componentDidMount() {
    const { cookie } = this.state;

    if (cookie) {
      const userinfo = jwt(cookie);
      const result = await axios.get(`${URL}?email=${userinfo.email}`, {
        headers: {
          cookies: cookie,
        },
      });
      try {
        this.setState({ result: result.data.result[0] });
      } catch {
        console.log(result);
      }
    }
  }

  render() {
    const { cookie, result } = this.state;
    return (
      <div className="header">
        <div className="header-top">
          <div className="container">
            <div className="header-top-wrapper">
              <div className="brand">
                <h2 className="logo">HARUN BISWAS</h2>
              </div>
              <div className="profile">
                <label className="profile-photo-title" htmlFor="profile-photo">
                  {result.name}
                </label>
                <img
                  src={result.avatar ? result.avatar : noPhoto}
                  alt={result.name}
                  className="profile-photo"
                  id="profile-photo"
                />
                {cookie ? <Logout /> : ""}
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="container">
            <nav className="header-bottom-wrapper">
              <ul className="header-bottom-navbar-wrapper">
                <li className="nav-item">
                  <NavLink to="/" activeclassname="active" className="nav-link">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeclassname="active"
                    to="/home"
                    className="nav-link"
                  >
                    home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeclassname="active"
                    to="/about"
                    className="nav-link"
                  >
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/resome"
                    activeclassname="active"
                    className="nav-link"
                  >
                    resome
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/portfolio"
                    activeclassname="active"
                    className="nav-link"
                  >
                    portfolio
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/blog"
                    activeclassname="active"
                    className="nav-link"
                  >
                    blog
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/contact"
                    activeclassname="active"
                    className="nav-link"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
              <Notification />
            </nav>
          </div>
        </div>
      </div>
    );
  }
}
