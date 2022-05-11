import * as echarts from "echarts";
import { useEffect, useRef } from "react";

export default function EchartsLine() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const myChart = echarts.init(ref.current!);
      // 绘制图表
      const option = {
        // color: ["#0080ff", "#4cd5ce"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "search engine",
            type: "line",
            stack: "Total",
            itemStyle: {
              normal: {
                //Color gradient function The first four parameters indicate that the four positions are left, bottom, right, and top
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0.4,
                    color: "#81befd", // the color at 0%
                  },
                  {
                    offset: 0.6,
                    color: "#e4f2ff", // the color at 100%
                  },
                  {
                    offset: 1,
                    color: "#fff", // the color at 100%
                  },
                ]), //Background gradient
                lineStyle: {
                  // Series-level personalized polyline style
                  width: 3,
                  type: "solid",
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                    {
                      offset: 0,
                      color: "#0088FF", // the color at 0%
                    },
                    {
                      offset: 1,
                      color: "#41F3FF", // the color at 100%
                    },
                  ]),
                },
              },
            }, //Line style
            symbolSize: 1, //The size of the polyline point
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            smooth: true
          },
        ],
      };
      myChart.setOption(option);
    }
  }, []);

  return <div ref={ref} style={{ width: 800, height: 800, background: "black" }}></div>;
}
