import { ChatCenteredText } from "phosphor-react";
import React, { Component } from "react";
import "./Button.scss";

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          id: 1,
          sub: "new message subject here",
          date: "5:34 AM",
        },
        {
          id: 2,
          sub: "new message subject here",
          date: "5:34 AM",
        },
        {
          id: 3,
          sub: "new message subject here",
          date: "5:34 AM",
        },
        {
          id: 4,
          sub: "new message subject here",
          date: "5:34 AM",
        },
      ],
    };
  }

  notiToggle = (e) => {
    const notiBox = document.querySelector(".notification-content");
    notiBox.classList.toggle("show");
  };

  render() {
    let messages = this.state.messages;
    let count = messages.length;
    function Checkmessage() {
      if (count > 1) {
        return (
          <ul className="notification-content-body">
            {messages.map((message) => (
              <li key={message.id} className="notification-content-body-item">
                <strong className="notification-content-body-item-header">
                  {message.sub}
                </strong>
                <small className="notification-content-body-item-date">
                  {message.date}
                </small>
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <div className="notification-content-no-message">No New Message</div>
        );
      }
    }
    return (
      <div className="notification">
        <button onClick={this.notiToggle} className="notification-btn">
          <ChatCenteredText size={20} />
          <div className="notification-btn-text">
            {this.state.messages.length}
          </div>
        </button>
        <div className="notification-content">
          <div className="notification-content-header">
            <h3 className="notification-content-header-text">New Messages</h3>
          </div>
          <Checkmessage />
        </div>
      </div>
    );
  }
}
