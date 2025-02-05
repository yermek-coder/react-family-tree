import * as d3 from "d3";
import { useRef, useEffect } from "react";

export default function PersonTree({ persons }) {
    const container = useRef(null);
    const data = {
        nodes: persons,
        links: persons.map(person => {
            if (person.parent) {
                return {
                    source: person.parent,
                    target: person.id,
                    value: 10
                }
            }
        }).filter(Boolean)
    };

    useEffect(() => {
        // Specify the dimensions of the chart.
        const width = container.current.clientWidth;
        const nodeRadius = 15;

        // Specify the color scale.
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // The force simulation mutates links and nodes, so create a copy
        // so that re-evaluating this cell produces the same result.
        const links = data.links.map(d => ({ ...d }));
        const nodes = data.nodes.map(d => ({ ...d }));

        const minGroup = Math.min(...data.nodes.map(item => item.group));
        const maxGroup = Math.max(...data.nodes.map(item => item.group));

        const height = 500 * (maxGroup / 5);

        // Create a simulation with several forces.
        const simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3.forceLink(links).id(d => d.id).distance(100)
            )
            .force("charge", d3.forceManyBody().strength(-200))
            .force("x", d3.forceX())
            .force("y", d3.forceY(d => {
                return ((d.group - minGroup) / (maxGroup - minGroup) - 0.5) * height * 0.5
            }).strength(0.5)); // Position ancestors at the top and children at the bottom

        // Create the SVG container.
        const svg = d3
            .select(container.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        // Add a line for each link, and a circle for each node.
        const link = svg
            .append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        const node = svg
            .append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", nodeRadius)
            .attr("fill", d => color(d.group));

        node.append("title").text(d => d.name);
        // Add text labels for each node.
        const text = svg
            .append("g")
            .selectAll("text")
            .data(nodes)
            .join("text")
            .text(d => d.name)
            .attr("fill", "white")
            .attr("font-size", "12px")
            .attr("text-anchor", "middle")
            .attr("dy", -nodeRadius - 3); // Offset text vertically to center it

        // Add a drag behavior.
        node.call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

        // Set the position attributes of links and nodes each time the simulation ticks.
        simulation.on("tick", () => {
            link.attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node.attr("cx", d => d.x).attr("cy", d => d.y);

            text.attr("x", d => d.x).attr("y", d => d.y);
        });

        // Reheat the simulation when drag starts, and fix the subject position.
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        // Update the subject (dragged node) position during drag.
        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        // Restore the target alpha so the simulation cools after dragging ends.
        // Unfix the subject position now that it’s no longer being dragged.
        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        // Clean up the simulation when the component unmounts.
        return () => {
            simulation.stop();
        };
    }, []);

    return <div className="w-100" ref={container} />;
}