import { Select } from "antd";
import "./style.scss";
import { DownOutlined } from "@ant-design/icons";

const { Option } = Select;
function handleChange(value: string) {
  console.log(`selected ${value}`);
}

export default function AntdIndex() {
  const style: React.CSSProperties = {
    background: "gray",
    textDecoration: "underline",
    color: "red",
    width: 200,
    textAlign: "right",
  };
  const iconStyle = {
    color: "red",
  };
  return (
    <div>
      <Select
        className="cus-select"
        bordered={false}
        defaultValue="lucy"
        onChange={handleChange}
        style={style}
        allowClear={false}
        suffixIcon={<DownOutlined style={iconStyle} />}
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
    </div>
  );
}
