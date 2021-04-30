import React from "react";
import { hierarchy, partition } from "d3-hierarchy";
import { arc } from "d3-shape";
import data from "../../assets/data/menu.json";
import { scaleOrdinal } from "d3-scale";
import { interpolate, quantize } from "d3-interpolate";
import { interpolateRainbow } from "d3-scale-chromatic";
import { create } from "d3-selection";
import "d3-transition";

class Home extends React.Component {
  nodeRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const width = this.nodeRef.current!.clientWidth,
      height = this.nodeRef.current!.clientHeight,
      radius = height / 6;

    const clicked = (event: any, p: any) => {
      parent.datum(p.parent || root);

      root.each(
        (d: any) =>
          (d.target = {
            x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth),
          })
      );

      const t = g.transition().duration(750);

      path
        // @ts-ignore
        .transition(t)
        .tween("data", (d: any) => {
          const i = interpolate(d.current, d.target);
          return (t: any) => (d.current = i(t));
        })
        // @ts-ignore
        .filter(function (d: any) {
          // @ts-ignore
          return +this.getAttribute("fill-opacity") || arcVisible(d.target);
        })
        .attr("fill-opacity", (d: any) => (arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0))
        // @ts-ignore
        .attrTween("d", (d: any) => () => myArc(d.current));

      label
        // @ts-ignore
        .filter(function (d: any) {
          // @ts-ignore
          return +this.getAttribute("fill-opacity") || labelVisible(d.target);
        })
        // @ts-ignore
        .transition(t)
        .attr("fill-opacity", (d: any) => +labelVisible(d.target))
        .attrTween("transform", (d: any) => () => labelTransform(d.current));
    };

    const jump = (event: any, p: any) => {
      const data = p.data;
      /* if (data.url) {
        window.location.href = data.url;
      } else {
        window.open(`https://www.baidu.com/s?wd=${data.name}`);
      } */
      window.open(`https://www.baidu.com/s?wd=${data.name}`);
    };

    const arcVisible = (d: any) => {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    };

    const labelVisible = (d: any) => {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    };

    const labelTransform = (d: any) => {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = ((d.y0 + d.y1) / 2) * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    };

    const myPartition = (data: any) => {
      const root = hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value! - a.value!);
      return partition().size([2 * Math.PI, root.height + 1])(root);
    };

    const myArc = arc()
      .startAngle((d: any) => d.x0)
      .endAngle((d: any) => d.x1)
      .padAngle((d: any) => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.5)
      .innerRadius((d: any) => d.y0 * radius)
      .outerRadius((d: any) => Math.max(d.y0 * radius, d.y1 * radius - 1));

    const color = scaleOrdinal(quantize(interpolateRainbow, data.children.length + 1));
    const root = myPartition(data);
    root.each((d: any) => (d.current = d));
    const svg = create("svg").attr("width", width).attr("height", height).style("font", "14px 微软雅黑");
    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);
    const path = g
      .append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
      .attr("fill", (d: any) => {
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      })
      .attr("fill-opacity", (d: any) => (arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0))
      .attr("d", (d: any) => myArc(d.current));

    path
      .filter((d: any) => d.children)
      .style("cursor", "pointer")
      .on("click", clicked);

    path
      .filter((d: any) => !d.children)
      .style("cursor", "alias")
      .on("click", jump);

    path.append("title").text((d: any) => d.data.name);

    const label = g
      .append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", (d: any) => +labelVisible(d.current))
      .attr("transform", (d: any) => labelTransform(d.current))
      .text((d: any) => d.data.name);

    const parent = g.append("circle").datum(root).attr("r", radius).attr("fill", "none").attr("pointer-events", "all").on("click", clicked);

    this.nodeRef.current!.appendChild(svg.node()!);
  }

  render() {
    return <div className="full" ref={this.nodeRef}></div>;
  }
}

export default Home;
