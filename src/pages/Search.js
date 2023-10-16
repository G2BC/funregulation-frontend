import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Link from 'next/link';
import Select from 'react-select';

export default function Search() {
    const [genes, setGenes] = useState([])
    const [isElementsLoaded, setIsElementsLoaded] = useState(false);
    const [organism, setOrganism] = useState('');
    const [proteinOrtho, setproteinOrtho] = useState(true);
    const [rsat, setRsat] = useState(false);
    const [selectData, setSelectData] = useState()

    function getGenes() {
        axios
          .get("http://localhost:3000/api/genes")
          .then((response) => {
            setGenes(response.data);
            let data = [];
            response.data.forEach((elemento) => {
              data.push({value: elemento.accession, label: elemento.accession});
            });
            setSelectData(data);
            setIsElementsLoaded(true);
          })
          .catch((error) => {
            console.error(error);
          });
      }

      useEffect(() => {
        getGenes();
      }, []);

      function handleSelectChange(e) {
        setOrganism(e.value);
        genes.forEach((gene) => {
          if (e.value == gene.accession) {
            if (!gene.cis_bp) {
              document.getElementById('rsat').checked = false;
              document.getElementById('rsat').disabled = true;
            } else if (gene.cis_bp) {
              document.getElementById('rsat').disabled = false;
            };
          }
        });
      }

      function handleproteinOrthoChange(e) {
        setproteinOrtho(!e.target.checked);
        console.log(proteinOrtho);
      }

      function handleRSATChange(e) {
        setRsat(!e.target.checked);
        console.log(rsat);
      }

    return(
        <div className="w-screen h-screen bg-[#f5f5f5]">
            <Header/>
            <main className="w-screen mt-20 ml-auto flex-1 justify-center">
              <div id="wrapper" className="flex  flex-col w-[50vw] m-auto p-8 rounded-md shadow-md bg-branco">
                <h2 className="text-4xl mb-10 self-center font-bold">Select an organism below to calculate the GRN</h2>
                <Select
                Single
                name="organisms"
                options={selectData}
                className="w-96 m-2 p-1 self-center mb-10"
                classNamePrefix="select"
                onChange={(e) => handleSelectChange(e)}
                />
                  {/*<select className="w-96 h-8" onChange={handleSelectChange}>
                      <option default value="">Selecione uma opção</option>
                      {isElementsLoaded ? genes.map(gene => 
                        <option key={gene.organism} value={gene.organism}>{gene.organism}</option>
                      ) : <option key={1}value="">Selecione uma opção</option>}
                  </select></div>*/}
                  <div className="flex flex-1 items-start">
                      <h2 className="text-2xl font-bold mb-4">Analysis Config</h2>
                  </div>
                  <div className="flex flex-col border-solid border-[1px] border-[#ccc] rounded-md p-4 mb-8">
                    <h2 className="text-xl mb-4">Orthologous Analysis</h2>
                    <div id="checkbox-orthologous" className="justify-center text-center mb-8">
                      <input type="checkbox" id="protein-ortho" className="rounded" name="protein-ortho" disabled defaultChecked={true} onChange={handleproteinOrthoChange}/>
                      <label className="ml-1 text-lg" for="protein-ortho">Protein Ortho</label>
                    </div>
                    <h2 className="text-xl mb-4">Transcription Sector Binding Sites</h2>
                    <div id="checkbox-rsat" className="justify-center text-center">
                      <input className="p-1 rounded" type="checkbox" id="rsat" name="rsat" onChange={handleRSATChange} />
                      <label className="ml-1 text-lg" for="rsat">RSAT</label>
                    </div>
                  </div>
                  <Link href={{pathname: '/Visualization', query:{ organism: organism, rsat: rsat, proteinOrtho: proteinOrtho }}} className="w-full">
                    <button type="button" className="w-full h-12 bg-azul-700 text-branco rounded-md hover:bg-azul-600 transition duration-300 font-bold">BUILD</button>
                  </Link>
                </div>
            </main>
        </div>
    );
}