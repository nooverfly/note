import React from "react";
import "./steps.scss";

export default class Steps extends React.Component {
  render() {
    return <div className="steps-wrapper">{this.props.children}</div>;
  }
}
