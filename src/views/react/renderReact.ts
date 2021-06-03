import { linkHorizontal } from "d3-shape";
import { hierarchy, tree } from "d3-hierarchy";
import axios from "axios";
import { create } from "d3-selection";
import "d3-transition";

const width = 954,
  dx = 10,
  dy = width / 6;
const margin = { top: 10, right: 120, bottom: 10, left: 40 };
const diagonal = linkHorizontal()
  .x((d: any) => d.y)
  .y((d: any) => d.x);
const myTree = tree().nodeSize([dx, dy]);

export default function renderReact(rootNode: HTMLDivElement, showMenu: Function) {
  axios
    .get("./data/react.json")
    .then((resp) => resp.data)
    .then((data) => {
      const root = hierarchy(data);
      // @ts-ignore
      root.x0 = dy / 2;
      // @ts-ignore
      root.y0 = 0;
      root.descendants().forEach((d: any, i: any) => {
        d.id = i;
        d._children = d.children;
        if (d.depth && d.data.name.length !== 7) d.children = null;
      });

      const svg = create("svg")
        // @ts-ignore
        .attr("viewBox", [-margin.left, -margin.top, width, dx])
        .style("font", "10px sans-serif")
        .style("user-select", "none");

      const gLink = svg
        .append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5);

      const gNode = svg
        .append("g")
        .attr("cursor", "pointer")
        .attr("pointer-events", "all");

        function update(source: any) {
          if (source.children) {
            const duration = 250;
            const nodes = root.descendants().reverse();
            const links = root.links();

            myTree(root);
            let left: any = root;
            let right: any = root;
            root.eachBefore((node: any) => {
              if (node.x < left.x) left = node;
              if (node.x > right.x) right = node;
            });

            const height = right.x - left.x + margin.top + margin.bottom;

            const transition = svg
              .transition()
              .duration(duration)
              // @ts-ignore
              .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
              // @ts-ignore
              .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

            // Update the nodes…
            const node = gNode.selectAll("g").data(nodes, (d: any) => d.id);

            // Enter any new nodes at the parent's previous position.
            const nodeEnter = node
              .enter()
              .append("g")
              .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
              .attr("fill-opacity", 0)
              .attr("stroke-opacity", 0)
              .on("click", (event, d: any) => {
                d.children = d.children ? null : d._children;
                update(d);
              })
              .on("contextmenu", (event, d) => {
                event.preventDefault();
                let data = d.data;
                showMenu({
                  data,
                  x: event.clientX,
                  y: event.clientY
                })
              });

            nodeEnter
              .append("circle")
              .attr("r", 2.5)
              .attr("fill", (d: any) => (d._children ? "#555" : "#999"))
              .attr("stroke-width", 10);

            nodeEnter
              .append("text")
              .attr("dy", "0.31em")
              .attr("x", (d: any) => (d._children ? -6 : 6))
              .attr("text-anchor", (d: any) => (d._children ? "end" : "start"))
              .text((d) => d.data.name)
              .clone(true)
              .lower()
              .attr("stroke-linejoin", "round")
              .attr("stroke-width", 3)
              .attr("stroke", "white");

            // Transition nodes to their new position.
            node
              // @ts-ignore
              .merge(nodeEnter)
              // @ts-ignore
              .transition(transition)
              .attr("transform", (d: any) => `translate(${d.y},${d.x})`)
              .attr("fill-opacity", 1)
              .attr("stroke-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            node
              .exit()
              // @ts-ignore
              .transition(transition)
              .remove()
              .attr("transform", (d) => `translate(${source.y},${source.x})`)
              .attr("fill-opacity", 0)
              .attr("stroke-opacity", 0);

            // Update the links…
            const link = gLink.selectAll("path").data(links, (d: any) => d.target.id);

            // Enter any new links at the parent's previous position.
            const linkEnter = link
              .enter()
              .append("path")
              .attr("d", (d) => {
                const o = { x: source.x0, y: source.y0 };
                // @ts-ignore
                return diagonal({ source: o, target: o });
              });

            // @ts-ignore
            link.merge(linkEnter).transition(transition).attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link
              .exit()
              // @ts-ignore
              .transition(transition)
              .remove()
              .attr("d", (d) => {
                const o = { x: source.x, y: source.y };
                // @ts-ignore
                return diagonal({ source: o, target: o });
              });

            root.eachBefore((d: any) => {
              d.x0 = d.x;
              d.y0 = d.y;
            });
          } /* else {
            window.open("https://www.baidu.com");
          } */
        }
        update(root);
        rootNode.appendChild(svg.node()!);
    })
    .catch((err) => console.log(err));
}
