import { Switch, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "./style.scss";
import CssFont from "./font";
import LayoutGrid from "./layout/grid";
import CssBorder from "./border";
import ClipPath from "./clipPath";
import Trapezoid from "./shape/trapezoid";
import CssFilter from "./filter";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

export default function CssFoundation({ history }: any) {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get("./data/css.json")
      .then((resp) => resp.data)
      .then((data) => {
        setMenu(data);
      });
  }, []);

  return (
    <Layout className="css-wrapper">
      <Sider className="css-sider">
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {menu.map((item: any, index) => {
            if (item.children) {
              return (
                <SubMenu key={index.toString()} title={item.name}>
                  {item.children.map((subMenu: any, subIndex: number) => (
                    <Menu.Item
                      key={`${index}-${subIndex}`}
                      onClick={() =>
                        history.push(`/css/foundation/${subMenu.url}`)
                      }
                    >
                      {subMenu.name}
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item
                  key={index.toString()}
                  onClick={() => history.push(`/css/foundation/${item.url}`)}
                >
                  {item.name}
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </Sider>
      <Content className="css-content">
        <Switch>
          <Route path="/css/foundation/font" component={CssFont}></Route>
          <Route
            path="/css/foundation/layout/grid"
            component={LayoutGrid}
          ></Route>
          <Route path="/css/foundation/border" component={CssBorder}></Route>
          <Route
            path="/css/foundation/shape/trapezoid"
            component={Trapezoid}
          ></Route>
          <Route path="/css/foundation/clip-path" component={ClipPath}></Route>
          <Route path="/css/foundation/filter" component={CssFilter}></Route>
        </Switch>
      </Content>
    </Layout>
  );
}
