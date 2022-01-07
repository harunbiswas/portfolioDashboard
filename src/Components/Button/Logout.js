import axios from "axios";
import { SignOut } from "phosphor-react";
import React from "react";
import Cookies from "universal-cookie/es6";
import values from "../../values";
import "./Button.scss";

const URL = `${values.BASE_URL}/dashboard`;

const cookies = new Cookies();

const Logout = () => {
  const logouthandler = async () => {
    axios.delete(URL).then(() => {
      cookies.remove(values.COOKIE_NAME);
      window.location.reload();
    });
  };

  return (
    <span onClick={logouthandler} className="logout-btn">
      <SignOut size={32} />
    </span>
  );
};

export default Logout;
