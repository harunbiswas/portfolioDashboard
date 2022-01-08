import React, { Component, createRef } from "react";
import Cookies from "universal-cookie/es6";
import values from "../../../values";
import Button from "../../Button/Button";

const formdata = React.FormData();
const cookies = new Cookies();
// const URL = `${values.BASE_URL}/dashboard/portfolio`;
const URL = `https://localhost:3000/dashboard/portfolio`;

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookie: cookies.get(values.COOKIE_NAME),
      name: "",
      title: "",
      link: "",
      file: {},
    };

    this.photoRef = createRef(0);
  }

  submitHandler = async (e) => {
    e.preventDefault();
    const { name, title, link, file, cookie } = this.state;
    let data = formdata;
    data.append("file", file[0]);
    console.log(data);

    // axios
    //   .post(URL, data, {
    //     headers: {
    //       cookies: cookie,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((d) => {
    //     console.log(d);
    //   })
    //   .catch((e) => {
    //     console.log(e.response);
    //   });
  };

  photoChangeHandler = () => {
    this.setState({ file: this.photoRef.current.files });
  };
  inputChangeHandler = (e) => {
    switch (e.target.name) {
      case "name":
        this.setState({ name: e.target.value });
        break;
      case "title":
        this.setState({ title: e.target.value });
        break;
      case "link":
        this.setState({ link: e.target.value });
        break;
      default:
        break;
    }
  };

  render() {
    const { name, title, link, file } = this.state;
    console.log(file);
    return (
      <>
        <form
          onSubmit={(e) => this.submitHandler(e)}
          action="/about"
          className="single-form multi-form"
          encType="multipart/form-data"
        >
          <input
            type="text"
            placeholder={this.props.plac}
            name="name"
            className="input-name"
            onChange={(e) => this.inputChangeHandler(e)}
            value={name}
          />
          <input
            type="text"
            placeholder="title here"
            name="title"
            className="input-name"
            onChange={(e) => this.inputChangeHandler(e)}
            value={title}
          />
          <input
            type="text"
            placeholder="Link"
            name="link"
            className="input-name"
            onChange={(e) => this.inputChangeHandler(e)}
            value={link}
          />
          <input
            ref={this.photoRef}
            type="file"
            name="file"
            className="input-file"
            onChange={this.photoChangeHandler}
          />

          <Button name="submit" type="submit" />
          <div onClick={this.props.func} className="hide-button">
            &#9747;
          </div>
        </form>
      </>
    );
  }
}
