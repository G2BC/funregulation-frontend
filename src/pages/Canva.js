import cytoscape from "cytoscape";

import { useEffect } from "react";

export default function Canva({ elements, setNodeName }) {
    function renderCytoscape() {
        //console.log("elementos:",elements);
        const cy = cytoscape({
            container: document.getElementById("cy"), // container to render in
        
            //elements: [
            // list of graph elements to start with
            elements: elements,
            //{
            // edge ab
            //  data: { id: "ab", source: "a", target: "b" },
            // },
            // {
            //   data: { id: "aa", source: "a", target: "a" },
            // },
            // {
            //   data: { id: "ac", source: "a", target: "c" },
            // },
            //],
        
            style: [
              // the stylesheet for the graph
              {
                selector: "node",
                style: {
                  "background-color": "#666",
                  label: "data(id)",
                  shape: "data(shape)"
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
              rows: 50,
              
            },
            zoom: 1,
            minZoom: 1,
            maxZoom: 10,
            nodeSpacing: 5,
            animate: true,
            randomize: true,
          });
          
          let layout = cy.layout({
            name: 'random',
            fit: true,
            padding: 30,
          });
          layout.run();
          cy.on("click", "node", (evt) => {
            let node = evt.target;
            console.log("tapped " + node.id());
            handleClick(node);
          });

          //cy.nodes().sort().layout({name: "circle",})
    }

    const handleClick = (node) => {
        setNodeName(node.id());
      };

    useEffect(() => {
        //console.log("cytoscapeCanvas", elements);
        renderCytoscape()
      }, [elements]);

  
  
  return <main id="cy" className="h-screen col-start-1 col-span-2"></main>;
}
