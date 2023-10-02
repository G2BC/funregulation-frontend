import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Link from 'next/link';
import Select from 'react-select';

export default function Search() {
    const [genes, setGenes] = useState([])
    const [isElementsLoaded, setIsElementsLoaded] = useState(false);
    const [organism, setOrganism] = useState('');
    const [proteinOrtho, setproteinOrtho] = useState(false);
    const [rsat, setRsat] = useState(false);
    const [selectData, setSelectData] = useState()

    function getGenes() {
        axios
          .get("http://localhost:3000/api/genes")
          .then((response) => {
            setGenes(response.data);
            setIsElementsLoaded(true);
            response.data.forEach((elemento) => {
              setSelectData(...selectData, {value: elemento.data.id, label: elemento.data.id});
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }

      useEffect(() => {
        getGenes();
      }, []);

      function handleSelectChange(e) {
        setOrganism(e.target.value);
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
        <div className="w-screen grid grid-cols-3">
            <Header/>
            <main className="w-screen h-96 flex flex-col justify-center items-center col-start-1 col-end-3">
              <h2 className="text-4xl mb-10">Selecione abaixo um organismo para calcular a GRN:</h2>
              <Select
              Single
              name="organisms"
              options={selectData}
              className="w-96 m-2 p-1"
              classNamePrefix="select"
              onChange={''}
              />
                {/*<select className="w-96 h-8" onChange={handleSelectChange}>
                    <option default value="">Selecione uma opção</option>
                    {isElementsLoaded ? genes.map(gene => 
                      <option key={gene.organism} value={gene.organism}>{gene.organism}</option>
                    ) : <option key={1}value="">Selecione uma opção</option>}
                </select></div>*/}
                <div id="checkboxes" className="justify-center align-middle text-center mb-4">
                  <input type="checkbox" id="protein-ortho" name="protein-ortho" defaultChecked={true} onChange={handleproteinOrthoChange}/>
                  <label className="ml-1" for="protein-ortho">Protein Ortho</label>
                  <input className="ml-4 p-1" type="checkbox" id="rsat" name="rsat" onChange={handleRSATChange} />
                  <label className="ml-1" for="rsat">RSAT</label>
                </div>
                <Link href={{pathname: '/Visualization', query:{ organism: organism, rsat: rsat, proteinOrtho: proteinOrtho }}}><button className="w-24 h-8 bg-azul-700 text-branco">Pesquisar</button></Link>
                
            </main>
        </div>
    );
}