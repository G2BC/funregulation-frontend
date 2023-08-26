import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import cytoscape from "cytoscape";

import Header from "./Header";
import SideBar from "./SideBar";
import Canva from "./Canva";

export default function Visualization() {
  const [nodeName, setNodeName] = useState("");
  const [isElementsLoaded, setIsElementsLoaded] = useState(false);

  const router = useRouter();
  const { organism } = router.query;

  let cy = cytoscape({
    zoom: 1,
    minZoom: 1,
    maxZoom: 10,
    nodeSpacing: 5,
    animate: true,
    randomize: true,
    textureOnViewport: true,
    style: [
      {
        selector: "node",
        style: {
          "background-color": "#666",
          label: "data(id)",
          shape: "data(shape)",
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
  });

  function getElements() {
    axios
      .get("http://localhost:3000/api/grn", { params: { organism: organism } })
      .then((response) => {
        const { tfs, tgs, edges } = response.data;
        // console.log(`TFs: ${tfs}`);
        // console.log(`TGs: ${tgs}`);
        // edges.forEach(edge => {
        //   console.log(`Edge: ${edge.tf_locus_tag} e ${edge.tg_locus_tag}`);
        // });

        //PARA CORRIGIR OS ELEMENTOS DO JSON EM SINTAXE ERRADA
        // tfs.forEach(element => {
        //   console.log(`{"id": "${element}"},`)
        // });
        let nodes = [];
        tfs.forEach((elemento) => {
          nodes.push(elemento);
        });
        tgs.forEach((elemento) => {
          nodes.push(elemento);
        });
        edges.forEach((elemento) => {
          nodes.push(elemento);
        });
        setElements(nodes);
        setIsElementsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function renderCytoscape(cy) {
    //cy.unmount();
    cy.mount(document.getElementById("cy"));
    cy.container(document.getElementById("cy"));
    cy.add(elements);
    const layout = cy.layout({
      name: "random",
      fit: true,
      padding: 50,
      rows: 50,
      avoidOverlap: true,
    });
    layout.run();
    cy.on("click", "node", (evt) => {
      let node = evt.target;
      console.log("tapped " + node.id());
      handleClick(node);
    });
  }

  function circleLayout() {
    let options = {
      name: "circle",
      fit: true, // whether to fit the viewport to the graph
      padding: 30, // the padding on fit
      boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
      nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
      spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
      radius: undefined, // the radius of the circle
      startAngle: (3 / 2) * Math.PI, // where nodes start in radians
      sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
      clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
      sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
      animate: false, // whether to transition the node positions
      animationDuration: 500, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
      animateFilter: function (node, i) {
        return true;
      }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
      ready: undefined, // callback on layoutready
      stop: undefined, // callback on layoutstop
      transform: function (node, position) {
        return position;
      }, // transform a given node position. Useful for changing flow direction in discrete layouts
    };
    const layout = cy.layout(options);
    layout.run();
    cy.mount(document.getElementById("cy"));
  }

  const [elements, setElements] = useState([]);

  useEffect(() => {
    getElements();
  }, []);

  const handleClick = (node) => {
    setNodeName(node.id());
  };

  useEffect(() => {
    //console.log("cytoscapeCanvas", elements);
    renderCytoscape(cy);
  }, [elements]);

  return (
    <div className="w-screen grid grid-cols-3">
      <Header />
      {isElementsLoaded ? (
        <main id="cy" className="h-screen col-start-1 col-span-2"></main>
      ) : (
        <h1 className="h-screen col-start-1 col-span-2">"Carregando..."</h1>
      )}
      {/* {isElementsLoaded ? <Canva elements={ elements } setNodeName={setNodeName} cy={cy}/> : <h1 className="h-screen col-start-1 col-span-2">"Carregando..."</h1>} */}
      <SideBar nodeName={nodeName} circleLayout={circleLayout} />
    </div>
  );
}
