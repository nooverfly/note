import { useState } from "react";
import "./style.scss";

const menusData = [
  {
    name: "home",
    edit: false,
  },
  {
    name: "about",
    edit: false,
  },
  {
    name: "page",
    edit: false,
  },
];

function MenuItem({ edit, name, updateEdit, index, targetIndex }: any) {
  const [menuName, setMenuName] = useState(name);
  const blur = () => {
    console.log("blur");
  };
  return (
    <li onDoubleClick={() => updateEdit(index)}>
      <input
        value={menuName}
        onChange={(e) => setMenuName(e.target.value)}
        onBlur={blur}
      />
      name
    </li>
  );
}

export default function ReactEvent() {
  const [menus, setMenus] = useState(menusData);
  const [targetIndex, setTargetIndex] = useState(-1);

  const updateEdit = (index: number) => {
    const m = [...menus];
    m[index].edit = true;
    setMenus(m);
    setTargetIndex(index);
  };

  const mouseDown = () => {
    console.log("mouseDown");
    setTargetIndex(-1);
  };

  return (
    <div className="event-root">
      <div className="event-left">
        <ul>
          {menus.map((menu, index) => {
            return (
              <MenuItem
                key={index}
                {...menu}
                index={index}
                updateEdit={updateEdit}
                targetIndex={targetIndex}
              />
            );
          })}
        </ul>
      </div>
      <div className="event-content" onMouseDown={mouseDown}>
        center
      </div>
    </div>
  );
}
