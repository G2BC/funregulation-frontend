import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Select from 'react-select';
import cytoscape from "cytoscape";

import Header from "./Header";
import SideBar from "./SideBar";

import data from '../lib/data.json';

export default function Visualization() {
  const [nodeName, setNodeName] = useState("");
  const [isElementsLoaded, setIsElementsLoaded] = useState(false);
  const [elements, setElements] = useState([]);
  const [savedElements, setSavedElements] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [filter, setFilter] = useState();
  const [tfs, setTfs] = useState();

  const [cy, setCy] = useState(cytoscape({
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
  }));

  let notConnected;

  const router = useRouter();
  const { organism } = router.query;

  // let cy = cytoscape({
  //   zoom: 1,
  //   minZoom: 1,
  //   maxZoom: 10,
  //   nodeSpacing: 5,
  //   animate: true,
  //   randomize: true,
  //   textureOnViewport: true,
  //   style: [
  //     {
  //       selector: "node",
  //       style: {
  //         "background-color": "#666",
  //         label: "data(id)",
  //         shape: "data(shape)",
  //       },
  //     },

  //     {
  //       selector: "edge",
  //       style: {
  //         width: 3,
  //         "line-color": "#ccc",
  //         "target-arrow-color": "#ccc",
  //         "target-arrow-shape": "triangle",
  //         "curve-style": "bezier",
  //       },
  //     },
  //   ],
  // });

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
    //cy.container(document.getElementById("cy"));
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
    console.log('circle layout selected');
    console.log(cy.elements())
    console.log(cy.nodes())
    console.log(cy.edges())
  }

  function saveGraphState() {
    cy.unbind('click');
    const elements = cy.elements().jsons();
    console.log(elements)
    console.log(typeof(elements))
    setSavedElements(elements);
    console.log(savedElements);
  }

  function loadGraphState(graphState) {
    cy.unbind('click');
    console.log('entered load graph state')
    let options = {
      name: "preset",
      positions: undefined, // map of (node id) => (position obj); or function(node){ return somPos; }
      zoom: undefined, // the zoom level to set (prob want fit = false if set)
      pan: undefined, // the pan level to set (prob want fit = false if set)
      fit: true, // whether to fit to viewport
      padding: 30, // padding on fit
      animate: false, // whether to transition the node positions
      animationDuration: 500, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
      animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
      ready: undefined, // callback on layoutready
      stop: undefined, // callback on layoutstop
      transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
    };
    const layout = cy.layout(options);
    cy.unmount();
    const nodes = cy.nodes();
    cy.remove(nodes);
    console.log(cy.nodes())
    //cy.add(graphState);
    layout.run();
    cy.mount(document.getElementById("cy"));
  }

  async function exportGraph() {
    const options = {
      output: 'base64uri',
    };
    const png64 = cy.png(options);
    //document.querySelector('#png-eg').setAttribute('src', png64);
    // const blob = new Blob([png64], {type: 'data:image/png;base64'});
    // const url = URL.createObjectURL(blob);
    // const downloadLink = document.createElement('a');
    // downloadLink.href = url;
    // downloadLink.download = 'graph-export.png';
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // document.body.removeChild(downloadLink);
    // URL.revokeObjectURL(url);

    document.querySelector('#png-eg').setAttribute('src', png64);

    let a = document.createElement('a');
    const blob = new Blob([png64], {type: 'data:image/png;base64'});
    a.href = URL.createObjectURL(blob);
    a.download = 'graph-export.png';
    a.click();
  }

  function filterElements(filter) {
    console.log(cy.nodes());
    cy.unbind('click');
    let collection1;
    let collection2;
    filter.forEach((f) => {
      if(collection1 == undefined) {
        console.log(f.value);
        collection1 = cy.nodes().getElementById(f.value);
        collection1 = collection1.union(collection1.predecessors());
        collection1 = collection1.union(collection1.successors());
        console.log('collection 1');
        console.log(collection1);
      }
      else {
        collection2 = cy.nodes().getElementById(f.value);
        collection2 = collection2.union(collection2.predecessors());
        collection2 = collection2.union(collection2.successors());
        console.log('collection 2');
        console.log(collection2);
        collection1.merge(collection2);
      }
    });
    console.log('collection full')
    console.log(collection1);
    notConnected = cy.elements().not(collection1);
    let viewFilter = cy.remove(notConnected);
  }

  function restoreGraph() {
    if (notConnected) {
      notConnected.restore();
    }
  }

  // useEffect(() => {
  //   getElements();
  // }, []);
  useEffect(() => {
    // axios
    //   .get("http://localhost:3000/api/grn", { params: { organism: organism } })
    //   .then((response) => {
        const { tfs, tgs, edges } = data;

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
        let elementos = []
        nodes.forEach((elemento) => {
          if (elemento.data.shape == 'triangle') {
            elementos.push({value: elemento.data.id, label: elemento.data.id})
          }
        });
        setTfs(elementos);
        setIsElementsLoaded(true);
      //})
      // .catch((error) => {
      //   console.error(error);
      // });
  }, []);

  const handleClick = (node) => {
    setNodeName(node.id());
  };

  // useEffect(() => {
  //     console.log('renderizou')
  //     renderCytoscape(cy);
  // }, [elements]);
  useEffect(()=> {
    cy.mount(document.getElementById("cy"));
    //cy.container(document.getElementById("cy"));
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
  }, [isElementsLoaded]);

  return (
      <div className="w-screen grid grid-cols-3">
        <Header />
        {isElementsLoaded ? (
          <main id="cy" className="h-screen col-start-1 col-span-2"></main>
        ) : (
          <h1 className="h-screen col-start-1 col-span-2">"Carregando..."</h1>
        )}
        {/* {isElementsLoaded ? <Canva elements={ elements } setNodeName={setNodeName} cy={cy}/> : <h1 className="h-screen col-start-1 col-span-2">"Carregando..."</h1>} */}
        <SideBar nodeName={nodeName} circleLayout={circleLayout} saveGraphState={saveGraphState} loadGraphState={loadGraphState} elements={elements} savedElements={savedElements} exportGraph={exportGraph} filterElements={filterElements} restoreGraph={restoreGraph} filter={filter} setFilter={setFilter} tfs={tfs}/>
        <div className="w-screen h-12 col-start-1 bg-branco inline-flex">
        <button className="w-24 m-2 p-1 bg-azul-500 text-branco" type="button" onClick={() => {setZoom(zoom + 1); cy.zoom(zoom);}}>Zoom In</button>
        <button className="w-24 m-2 p-1 bg-azul-500 text-branco" type="button" onClick={() => { setZoom(zoom - 1); cy.zoom(zoom);}}>Zoom Out</button>
        <button className="w-24 m-2 p-1 bg-azul-500 text-branco" type="button" onClick={circleLayout}>Circle</button>
        <button className="w-24 m-2 p-1 bg-azul-500 text-branco" type="button" onClick={restoreGraph}>Restore</button>
        <Select
        isMulti
        name="tfs"
        options={tfs}
        className="w-44 m-2 p-1"
        classNamePrefix="select"
        onChange={(choices) => setFilter(choices)}
        />
        <button className="w-24 m-2 p-1 bg-azul-500 text-branco" type="button" onClick={() => filterElements(filter)}>Filter</button>
        </div>  
      </div>
  );
}
