import { useState } from "react";

export default function BrowserEvent() {
  const [visible, setVisible] = useState(true);
  const [value, setValue] = useState(false);

  const changeHandler = (ev: any) => {
    console.log(ev.target.value);
    setValue(!value);
  };

  const blurHandler = (ev: any) => {
    console.log("blurHandler");
    console.log(ev.target.value);
  };

  const clickHandler = (ev: any) => {
    console.log("clickHandler");
    setVisible(false);
  };

  const mouseDownHandler = (ev: any) => {
    console.log("mouseDownHandler");
    setVisible(false);
  };

  const [select, setSelect] = useState("1");
  const change = (ev: any) => {
    const v = ev.target.value;
    console.log("select change");
    setSelect(v);
  };

  const blur = (ev: any) => {
    console.log("blur");
  };

  return (
    <div>
      {visible && (
        <div>
          <input
            type="checkbox"
            checked={value}
            onChange={changeHandler}
            onBlur={blurHandler}
          />{" "}
          是否选中
        </div>
      )}
      <button onClick={clickHandler} onMouseDown={mouseDownHandler}>
        按钮
      </button>
      <select value={select} onChange={change} onBlur={blur}>
        <option key="1" value={"1"}>
          西瓜
        </option>
        <option key="2" value={"2"}>
          香蕉
        </option>
        <option key="3" value={"3"}>
          桔子
        </option>
      </select>
    </div>
  );
}
