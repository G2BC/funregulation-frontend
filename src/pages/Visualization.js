import { useEffect, useState } from "react";
import cytoscape from "cytoscape";

import Header from "./Header";
import SideBar from "./SideBar";


export default function Visualization() {
  const [nodeName, setNodeName] = useState('');

  let cy;

function cytoscapeCanva() {
  useEffect(() => {
    cy = cytoscape({
      container: document.getElementById('cy'), // container to render in
    
      elements: [
        // list of graph elements to start with
        {
          // node a
          data: { id: "a" },
        },
        {
          // node b
          data: { id: "b" },
        },
        {
          data: { id: "c" },
        },
        {
          // edge ab
          data: { id: "ab", source: "a", target: "b" },
        },
        {
          data: { id: "aa", source: "a", target: "a" },
        },
        {
          data: { id: "ac", source: "a", target: "c" },
        },
      ],
    
      style: [
        // the stylesheet for the graph
        {
          selector: "node",
          style: {
            "background-color": "#666",
            label: "data(id)",
          },
        },
    
        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
          },
        },
      ],
    
      layout: {
        name: "grid",
        rows: 1,
      },
      zoom: 2,
      minZoom: 1,
      maxZoom: 5,
    });

    cy.on('click', 'node', (evt) => {
      let node = evt.target;
      console.log('tapped ' + node.id());
      handleClick(node);
    });

  }, []);
}

const handleClick = (node) => {
  setNodeName(node.id());
  console.log(nodeName);
  sidebar(nodeName);
}

function sidebar(nodeName) {
  return <SideBar nodeName={nodeName}/>
}

  return (
    <div className="w-screen grid grid-cols-3">
      <Header />
      <main id="cy" className="h-screen col-start-1 col-span-2"></main>
      {cytoscapeCanva()}
      {sidebar(nodeName)}
    </div>
  );
}
