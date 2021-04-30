import React from "react";
import classNames from "classnames";
import "./step.scss";

interface StepProps {
  contentWidth?: number;
  contentColor?: string;
  contentHeight?: number;
  arrowColor?: string;
  style?: any;
  className?: any;
}

class Step extends React.Component<StepProps> {
  render() {
    const { contentWidth = 100, contentHeight, contentColor = "#03A9F4", arrowColor = "#448AFF", children, className, ...rest } = this.props;
    return (
      <div className={classNames("step-wrapper", className)} {...rest}>
        <div className="step-content" style={{ width: contentWidth, height: contentHeight, backgroundColor: contentColor }}>
          {children}
        </div>
        <div
          className="step-arrow"
          style={{
            borderLeft: `${contentHeight || 10 * 2}px solid ${arrowColor || "#F00"}`,
            borderRight: "0 none",
            borderTop: `${contentHeight || 10 * 2}px solid transparent`,
            borderBottom: `${contentHeight || 10 * 2}px solid transparent`,
          }}
        ></div>
      </div>
    );
  }
}

export default Step;
