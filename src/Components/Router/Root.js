// External Imports
import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import values from "../../values";
import About from "../Pages/About/About";
// Internal Imports
import Dashboard from "../Pages/Dashboard/Dashboard";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Portfolio from "../Pages/Portfolio/Portfolio";
import Resome from "../Pages/Resome/Resome";

// Cookies intialize
const cookies = new Cookies();

export default class Root extends Component {
  state = {
    isLogin: cookies.get(values.COOKIE_NAME),
  };

  render() {
    return (
      <Routes>
        <Route
          exact
          path="/"
          element={
            this.state.isLogin ? <Dashboard /> : <Navigate to="/login" />
          }
        />

        <Route
          exact
          path="/home"
          element={this.state.isLogin ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/resome"
          element={this.state.isLogin ? <Resome /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/portfolio"
          element={
            this.state.isLogin ? <Portfolio /> : <Navigate to="/login" />
          }
        />
        <Route
          exact
          path="/about"
          element={this.state.isLogin ? <About /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/blog"
          element={
            this.state.isLogin ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          exact
          path="/contact"
          element={
            this.state.isLogin ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          exact
          path="/login"
          element={this.state.isLogin ? <Navigate to="/" /> : <Login />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    );
  }
}
