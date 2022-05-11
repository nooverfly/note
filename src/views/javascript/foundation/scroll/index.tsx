import { Layout, Menu } from "antd";
import { SyntheticEvent, useEffect, useRef } from "react";

const { Sider } = Layout;
const datas = new Array(20).fill(1).map((obj, index) => ({
  id: index,
  label: `菜单${index}`,
}));
const ScrollDemo = () => {
  const menuRoot = useRef<HTMLDivElement>(null);

  const setScroll = (info: any) => {
    console.log(info);
    if (menuRoot.current) {
      menuRoot.current.scrollTop = (
        info.domEvent.target as HTMLLIElement
      ).offsetTop;
      console.log(info.domEvent.pageY);
    }
  };

  return (
    <Layout>
      <Sider
        width={200}
        style={{
          height: "100vh",
          overflow: "auto",
        }}
        ref={menuRoot}
      >
        <Menu className="scroll-menu" defaultSelectedKeys={["18"]}>
          {datas.map((obj) => (
            <Menu.Item key={obj.id} onClick={setScroll}>
              {obj.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </Layout>
  );
};

export default ScrollDemo;
