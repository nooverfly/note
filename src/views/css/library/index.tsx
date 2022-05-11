import { Switch, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import "../foundation/style.scss";
import AnimateCss from "./animate-css";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const menu = [
  {
    "name": "animate.css",
    "url": "animate-css"
  }
]

export default function CssLibrary({ history }: any) {
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
                      onClick={() => history.push(`/css/library/${subMenu.url}`)}
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
                  onClick={() => history.push(`/css/library/${item.url}`)}
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
        <Route path="/css/library/animate-css" component={AnimateCss}></Route>
        </Switch>
      </Content>
    </Layout>
  );
}
