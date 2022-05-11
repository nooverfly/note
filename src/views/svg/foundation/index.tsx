import { Switch, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "./style.scss";
import SvgPath from "./path";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

export default function SvgFoundation({ history }: any) {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get("./data/svg.json")
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
                      onClick={() => history.push(`/svg/foundation/${subMenu.url}`)}
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
                  onClick={() => history.push(`/svg/foundation/${item.url}`)}
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
          <Route path="/svg/foundation/path" component={SvgPath}></Route>
        </Switch>
      </Content>
    </Layout>
  );
}
