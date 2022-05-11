import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import renderReact from "./renderReact";
import "./style.scss";

interface IData {
  knowledgeUrl?: string;
  demoUrl?: string;
}

function ReactIndex() {
  const ref = useRef(null);
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [data, setData] = useState<IData>({});
  const clickHandler = (e: any) => {
    setShow(false);
    document.removeEventListener("click", clickHandler);
  }
  const showMenu = (obj: any) => {
    setShow(true);
    setTop(obj.y);
    setLeft(obj.x);
    setData(obj.data);
    document.addEventListener("click", clickHandler);
  };
  useEffect(() => {
    ref.current && renderReact(ref.current!, showMenu);
  }, []);
  return (
    <div>
      <div ref={ref}></div>
      {show && (
        <div className="menu" style={{ top, left }}>
          <ul>
            <li
              onClick={() =>
                data.knowledgeUrl && window.open(data.knowledgeUrl)
              }
            >
              知识链接
            </li>
            <li onClick={() => data.demoUrl && history.push(data.demoUrl)}>
              示例链接
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ReactIndex;
