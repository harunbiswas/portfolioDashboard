import React, { Component } from "react";
import Button from "../../Button/Button";
import Form from "../Form/Form";
import ReviewFrom from "../Form/ReviewForm";
import ServiceForm from "../Form/ServiceForm";
import SkillForm from "../Form/SkillForm";
import WorkExForm from "../Form/WorkExForm";
import "./Add.scss";

export default class Add extends Component {
  addServiceHandler = (e) => {
    let hide = e.target.parentElement.nextSibling;
    if (hide.classList.contains("hide")) {
      hide.classList.remove("hide");
    }
  };
  SelectFrom = () => {
    switch (this.props.single) {
      case "service":
        return <ServiceForm />;
      case "review":
        return <ReviewFrom />;
      case "skill":
        return <SkillForm />;
      case "workexprience":
        return <WorkExForm />;
      default:
        return <Form work={this.props.work} />;
    }
  };

  render() {
    return (
      <div className="add">
        {/* service add  */}
        <div className="add-service">
          <div className="add-service-text">
            <Button func={this.addServiceHandler} name={this.props.name} />
          </div>
          <div className="add-form hide">{<this.SelectFrom />}</div>
        </div>
        {/* service add  */}
      </div>
    );
  }
}
