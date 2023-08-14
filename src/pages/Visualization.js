import { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";

import Header from "./Header";
import SideBar from "./SideBar";
import Canva from "./Canva";

export default function Visualization() {
  const [nodeName, setNodeName] = useState("");
  const [isElementsLoaded, setIsElementsLoaded] = useState(false);

  const router = useRouter();
  const { organism } = router.query;

  let cy;

  //async function cytoscapeCanva() {
  function getElements() {
    axios
      .get("http://localhost:3000/api/grn", { params: {organism: organism} })
      .then((response) => {
        const {tfs, tgs, edges} = response.data;
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
        tfs.forEach(elemento => {
          nodes.push(elemento);
        });
        tgs.forEach(elemento => {
          nodes.push(elemento);
        });
        edges.forEach(elemento => {
          nodes.push(elemento);
        });
        setElements(nodes);
        setIsElementsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [elements, setElements] = useState([]);


  //}

  useEffect(() => {
    getElements();
  }, []);

  return (
    <div className="w-screen grid grid-cols-3">
      <Header />
      {console.log(organism)}
      {isElementsLoaded ? <Canva elements={ elements } setNodeName={setNodeName}/> : <h1 className="h-screen col-start-1 col-span-2">"Carregando..."</h1>}
      <SideBar nodeName={nodeName} />
    </div>
  );
}
