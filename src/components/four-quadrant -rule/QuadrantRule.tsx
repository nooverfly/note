import React from "react";

interface EventProps {
  content: string;
  finish: boolean;
}

interface QuadrantRuleProps {
  title: string;
  type: string;
  events: Array<EventProps>;
  changeState: (type: string, index: number) => void;
}

export default class QuadrantRule extends React.Component<QuadrantRuleProps> {
  cbHandler = (e: any, type: string, index: number) => {
    this.props.changeState(type, index);
  };

  render() {
    const { title, events, type } = this.props;
    return (
      <div className="quadrant-rule">
        <h1>{title}</h1>
        {events.map((item, index) => {
          return (
            <div key={index}>
              <input type="checkbox" checked={item.finish} onChange={(e) => this.cbHandler(e, type, index)} />
              <span style={{ textDecoration: item.finish ? "line-through" : "none" }}>{item.content}</span>
            </div>
          );
        })}
      </div>
    );
  }
}
