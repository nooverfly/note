import { useState } from "react";
import "./style.scss";

const category = [
  {
    name: "Attention Seekers",
    children: [
      {
        name: "bounce",
        className: "animate__bounce",
      },
    ],
  },{
    name: "Bouncing Entrances",
    children: [
      {
        name: "bounceIn",
        className: "animate__bounceIn"
      }
    ]
  }, {
    name: "Bouncing Exits",
    children: []
  }, {
    name: "Fading Entrances",
    children: []
  }, {
    name: "Fading Exits",
    children: []
  }, {
    name: "Flippers",
    children: []
  }, {
    name: "Lightspeed",
    children: []
  }, {
    name: "Rotating Entrances",
    children: []
  }, {
    name: "Rotating Exits",
    children: []
  }, {
    name: "Sliders",
    children: []
  }, {
    name: "Specials",
    children: []
  }
];

export default function AnimateCss() {
  const [list, setList] = useState(category[0].children);
  const [animateClass, setAnimateClass] = useState("animate__animated");

  return (
    <div className="animate-css-root">
      <div className="animate-css-category">
        <ul className="animate-css-first-category">
          {category.map((item, index) => {
            return (
              <li key={index} onClick={() => setList(category[index].children)}>
                {item.name}
              </li>
            );
          })}
        </ul>
        <ul className="animate-css-second-category">
          {list.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() =>
                  setAnimateClass(`animate__animated ${item.className}`)
                }
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h1
          className={animateClass}
          style={{
            fontSize: 96,
            fontWeight: 500,
            color: "#f35626",
          }}
        >
          AnimateCss
        </h1>
      </div>
    </div>
  );
}
