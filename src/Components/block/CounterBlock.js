import { Chats, Lightbulb, TrendUp, UsersFour } from "phosphor-react";
import React, { Component } from "react";
import "./Block.scss";

export default class CounterBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [
        {
          id: 1,
          icon: <UsersFour size={52} />,
          title: "New Clint",
          count: 1203,
        },
        {
          id: 2,
          icon: <Lightbulb size={52} />,
          title: "Site view",
          count: 1203,
        },
        {
          id: 3,
          icon: <TrendUp size={52} />,
          title: "Sels",
          count: 1203,
        },
        {
          id: 4,
          icon: <Chats size={52} />,
          title: "Comments",
          count: 1203,
        },
      ],
    };
  }
  render() {
    return (
      <>
        {this.state.blocks.map((block) => (
          <div key={block.id} className="counter-block">
            <div className="counter-block-icon">{block.icon}</div>
            <div className="counter-block-content">
              <h2>{block.count}</h2>
              <span>{block.title}</span>
            </div>
          </div>
        ))}
      </>
    );
  }
}
