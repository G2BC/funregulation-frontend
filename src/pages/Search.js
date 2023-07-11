import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

export default function Search() {
    const [genes, setGenes] = useState([])
    const [isElementsLoaded, setIsElementsLoaded] = useState(false);

    function getGenes() {
        axios
          .get("http://localhost:3000/api/genes")
          .then((response) => {
            setGenes(response.data);
            setIsElementsLoaded(true);
          })
          .catch((error) => {
            console.error(error);
          });
      }

      useEffect(() => {
        getGenes();
      }, []);
    return(
        <div className="w-screen grid grid-cols-3">
            <Header/>
            <main className="w-screen h-96 flex justify-center items-center col-start-1 col-end-3">
                <select className="w-96 h-8">
                    {/*<option default value="">Selecione umasopção</option>*/}
                    {isElementsLoaded ? genes.map(gene => 
                      <option key={gene.organism} value={gene.organism}>{gene.organism}</option>
                    ) : <option key={1}value="">Selecione uma opção</option>}
                    {/* <option value="">Selecione uma opção</option>
                    <option value="GRN1">Gene Regulatory Network 1</option>
                    <option value="GRN2">Gene Regulatory Network 2</option>
                    <option value="GRN3">Gene Regulatory Network 3</option> */}
                </select>
                <button className="w-24 h-8 bg-azul-700 text-branco">Pesquisar</button>
            </main>
        </div>
    );
}