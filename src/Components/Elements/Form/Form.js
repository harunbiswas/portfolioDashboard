import React, { Component } from "react";
import Button from "../../Button/Button";
import { homecontext } from "../../context/context";
import "./Form.scss";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      func: this.props.func === undefined ? false : true,
    };
    //this.focust = createRef();
  }
  componentDidMount() {
    //this.focust.current.focus();
  }

  hideFormhandler = () => {
    if (this.state.func) {
      this.props.func();
    }
  };

  singleform = () => {
    if (true) {
      // const { changeHandler, plac, name, submitHandler } = this.context;
      // return (
      //   <form onSubmit={submitHandler} action="/home" className="single-form">
      //     <input
      //       ref={this.focust}
      //       type="text"
      //       placeholder={plac}
      //       name="homeName"
      //       className="input-name"
      //       value={name}
      //       onChange={(e) => changeHandler(e)}
      //     />
      //     <Button name="Save" type="submit" />
      //     <div onClick={this.hideFormhandler} className="hide-button">
      //       &#9747;
      //     </div>
      //   </form>
      //);
    } else if (this.props.single === "portfolio") {
      return (
        <>
          <form action="/about" className="single-form multi-form">
            <input
              type="text"
              placeholder={this.props.plac}
              name="name"
              className="input-name"
            />
            <input
              type="text"
              placeholder="title here"
              name="title"
              className="input-name"
            />
            <input
              type="text"
              placeholder="Link"
              name="link"
              className="input-name"
            />
            <input type="file" name="file" className="input-file" />

            <Button name="submit" type="submit" />
            <div onClick={this.hideFormhandler} className="hide-button">
              &#9747;
            </div>
          </form>
        </>
      );
    }
  };

  render() {
    return <>{this.singleform()}</>;
  }
}

Form.contextType = homecontext;
