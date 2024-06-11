import axios from "axios";
import Header from "./Header";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function GRNRequest() {
  const router = useRouter();
  const { organism, proteinOrtho, rsat } = router.query;
  const [buildStatus, setBuildStatus] = useState([
    {
      "id": "order_analyse",
      "name": "Order analyse",
      "status": "nCOMPLETED"
    },
    {
      "id": "download_organism",
      "name": "Download organism",
      "status": "nCOMPLETED"
    },
    {
      "id": "ProteinOrtho",
      "name": "ProteinOrtho",
      "status": "nCOMPLETED"
    },
    {
      "id": "creating_graph",
      "name": "Creating graph",
      "status": "nCOMPLETED"
    },
    {
      "id": "degree_calculation",
      "name": "Degree calculation",
      "status": "nCOMPLETED"
    },
    {
      "id": "closeness_calculation",
      "name": "Closeness calculation",
      "status": "nCOMPLETED"
    },
    {
      "id": "betweenness_calculation",
      "name": "Betweenness calculation",
      "status": "nCOMPLETED"
    },
    {
      "id": "eigenvector_calculation",
      "name": "Eigenvector calculation",
      "status": "nCOMPLETED"
    },
    {
      "id": "harmonic_calculation",
      "name": "Harmonic calculation",
      "status": "nCOMPLETED"
    },
    {
      "id": "rsat",
      "name": "RSAT",
      "status": "nCOMPLETED"
    },
    {
      "id": "pipeline_completed",
      "name": "Pipeline Completed",
      "status": false
    }
  ]
  );

  async function requestStatus() {
    console.log("entrou requeststatus");
    console.log(buildStatus.length);
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    do {
      console.log("entrou while");
      let pipeline_completed = false;
      axios
      .get("http://localhost:3000/api/status", { params: { request_number: organism } })
      .then((response) => {
        console.log(response.data);
        console.log("pipeline status: ", response.data[10].status);
        pipeline_completed = response.data[10].status;
        setBuildStatus(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

      
      await sleep(1000);
      console.log('intervalo 5s')
    } while(!pipeline_completed);
  }
  useEffect(() => {
    requestStatus();
  }, []);

  useEffect(() => {
    let constructionPhase;
    buildStatus.forEach((element) => {
      if(element.status == "COMPLETED" || element.status == true) {
        console.log(element.name);
        constructionPhase = document.getElementById(element.id);
        constructionPhase.classList.remove('text-vermelho-600');
        constructionPhase.classList.add('text-verde-600');
      }
    });
    if(buildStatus[10].status) {
      console.log('finalizou construção');
      let button = document.getElementById('view-grn');
      button.removeAttribute('disabled');
      button.classList.remove('disabled:opacity-75');
    }
  }, buildStatus);

  return (
    <div className="w-screen h-screen bg-[#f5f5f5]">
      <Header />
      <main className="w-screen mt-20 ml-auto flex-1 justify-center">
        <div
          id="wrapper"
          className="flex  flex-col w-[50vw] m-auto p-8 rounded-md shadow-md bg-branco"
        >
          <h2 className="text-4xl mb-10 self-center font-bold">
            GRN build status
          </h2>
          
          {buildStatus.map((element) => {
            return <h4 id={element.id} key={element.id} className="ml-1 text-lg self-center text-vermelho-600">{element.name}</h4>
          })}
          <Link href={{pathname: '/Visualization', query:{ organism: organism}}} className="w-full">
            <button type="button" id="view-grn" className="w-full h-12 bg-azul-700 text-branco rounded-md hover:bg-azul-600 transition duration-300 font-bold disabled:opacity-75" disabled>VIEW GRN</button>
          </Link>
        </div>
      </main>
    </div>
  );
}