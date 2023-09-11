import cytoscape from "cytoscape";

import { useEffect } from "react";

export default function Canva({ elements, setNodeName, cy }) {
    function renderCytoscape(cy) {
        //console.log("elementos:",elements);
        cy = cytoscape({
            container: document.getElementById("cy"), // container to render in
            elements: elements,
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
              name: "random",
              fit: true,
              padding: 30,
              rows: 50,
              
            },
            zoom: 1,
            minZoom: 1,
            maxZoom: 10,
            nodeSpacing: 5,
            animate: true,
            randomize: true,
          });
          
          cy.on("click", "node", (evt) => {
            let node = evt.target;
            console.log("tapped " + node.id());
            handleClick(node);
          });

    }

    const handleClick = (node) => {
        setNodeName(node.id());
      };

    useEffect(() => {
        //console.log("cytoscapeCanvas", elements);
        renderCytoscape(cy)
      }, [elements]);

  
  
  return <div className="h-screen col-start-1 col-span-2 relative"><main id="cy" className="h-screen col-start-1 col-span-2 z-1"></main><div className="w-12 h-9 z-2 absolute bg-preto"></div></div>;
}
