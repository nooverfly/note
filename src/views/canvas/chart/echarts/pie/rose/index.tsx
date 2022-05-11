import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function EchartsPieRose() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const myChart = echarts.init(ref.current!);
      // 绘制图表
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          top: "bottom",
          data: [
            "rose1",
            "rose2",
            "rose3",
            "rose4",
            "rose5",
            "rose6",
            "rose7",
            "rose8",
          ],
        },
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: [20, 140],
            center: ["25%", "50%"],
            roseType: "radius",
            itemStyle: {
              borderRadius: 5,
            },
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 33, name: "rose 2" },
              { value: 28, name: "rose 3" },
              { value: 22, name: "rose 4" },
              { value: 20, name: "rose 5" },
              { value: 15, name: "rose 6" },
              { value: 12, name: "rose 7" },
              { value: 10, name: "rose 8" },
            ],
          }
        ],
      };
      myChart.setOption(option);
    }
  }, []);

  return <div ref={ref} style={{ width: 800, height: 800 }}></div>;
}
