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
        //console.log(response.data);
        setElements(response.data);
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
