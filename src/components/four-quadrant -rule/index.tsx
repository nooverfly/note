import React, { SyntheticEvent } from "react";
import QuadrantRule from "./QuadrantRule";
import "./style.scss";

export default class FourQuadrantRule extends React.Component {
  state = {
    iu: [
      {
        content: "交接工作",
        finish: true,
      },
    ],
    inu: [],
    niu: [],
    ninu: [],
    type: "iu",
    event: "",
  };

  selectHandler = (e: SyntheticEvent) => {
    this.setState({
      // @ts-ignore
      type: e.target.value,
    });
  };

  keyPressHandler = (e: any) => {
    const charCode = e.charCode;
    if (charCode === 13) {
      const { type, event } = this.state;
      // @ts-ignore
      const events = this.state[type];
      this.setState({
        event: "",
        [type]: [
          ...events,
          {
            content: event,
            finish: false,
          },
        ],
      });
    }
  };

  inputHandler = (e: any) => {
    this.setState({
      event: e.target.value,
    });
  };

  changeState(type: string, index: number) {
    // @ts-ignore
    const events = [...this.state[type]];
    events[index].finish = !events[index].finish;
    this.setState({
      [type]: [...events],
    });
  }

  render() {
    const { iu, inu, niu, ninu, type, event } = this.state;
    return (
      <div className="four-quadrant">
        <div className="quadrant-input">
          <input type="text" onKeyPress={this.keyPressHandler} value={event} onChange={this.inputHandler} />
          <select value={type} onChange={this.selectHandler}>
            <option value="iu">重要且紧急</option>
            <option value="niu">紧急不重要</option>
            <option value="ninu">不重要不紧急</option>
            <option value="inu">重要不紧急</option>
          </select>
        </div>
        <div className="quadrant-item border-bottom">
          <div>
            <QuadrantRule title="紧急不重要" type="niu" changeState={this.changeState} events={niu} />
          </div>
          <div className="border-left">
            <QuadrantRule title="重要且紧急" type="iu" changeState={this.changeState} events={iu} />
          </div>
        </div>
        <div className="quadrant-item">
          <div>
            <QuadrantRule title="不重要不紧急" type="ninu" changeState={this.changeState} events={ninu} />
          </div>
          <div className="border-left">
            <QuadrantRule title="重要不紧急" type="inu" changeState={this.changeState} events={inu} />
          </div>
        </div>
      </div>
    );
  }
}
