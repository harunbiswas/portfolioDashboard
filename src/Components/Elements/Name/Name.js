import React, { Component } from "react";
import Button from "../../Button/Button";
import AboutForm from "../Form/AboutForm";
import Form from "../Form/Form";
import PortfolioForm from "../Form/PortfolioForm";
import ReviewFrom from "../Form/ReviewForm";
import ServiceForm from "../Form/ServiceForm";
import SkillForm from "../Form/SkillForm";
import WorkExForm from "../Form/WorkExForm";
import "./Name.scss";

export default class Name extends Component {
  state = {
    input: true,
    useDelete: this.props.useDelete === undefined ? false : true,
  };
  openUpdate = () => {
    this.setState({ input: false });
  };
  hideFrom = () => {
    this.setState({ input: true });
  };

  render() {
    let input = this.state.input;
    let openUpdate = this.openUpdate;
    let hideFrom = this.hideFrom;
    let useDelete = this.state.useDelete;
    let work = this.props.work;
    let name = this.props.name;
    let edit = this.props.edit;
    let single = this.props.single;

    function UseDelete() {
      if (useDelete) {
        return <Button name="delete" />;
      }
    }

    function Element() {
      if (input) {
        return (
          <>
            <div className="name-title">{name}</div>
            <div className="name-btns">
              {!edit && <Button func={openUpdate} name="edit" />}
              {UseDelete()}
            </div>
          </>
        );
      } else {
        switch (single) {
          case "single":
            return <Form work={work} func={hideFrom} />;
          case "about":
            return <AboutForm work={work} func={hideFrom} />;
          case "service":
            return <ServiceForm work={work} func={hideFrom} />;
          case "review":
            return <ReviewFrom func={hideFrom} />;
          case "skill":
            return <SkillForm func={hideFrom} />;
          case "workexprience":
            return <WorkExForm func={hideFrom} />;
          case "portfolio":
            return <PortfolioForm func={hideFrom} />;
          default:
            return null;
        }
      }
    }
    return (
      <div className="name">
        <Element />
      </div>
    );
  }
}
