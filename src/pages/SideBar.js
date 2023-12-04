import { useEffect, useState } from 'react';
import axios from "axios";

export default function SideBar({ nodeName, grn }) {
  const [isInfoLoaded, setIsInfoLoaded] = useState(true);
  const [infoProtein, setInfoProtein] = useState({});
  const [grnInfo, setGrnInfo] = useState({});

  function getNodeInfo() {
    axios
      .get("http://localhost:3000/api/node_info", { params: { node_id: nodeName } })
      .then((response) => {
        setInfoProtein(response.data);
      }
      ).catch((error) => {
        console.error(error);
      });
  }

  function getGRNInfo() {
    axios
      .get("http://localhost:3000/api/grn_info", { params: { grn: grn } })
      .then((response) => {
        console.log(response.data);
        setGrnInfo(response.data);
      }
      ).catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getNodeInfo();
    
  }, [nodeName]);

  useEffect(() => {
    getGRNInfo();
    
  }, []);
  

  return (
    <aside id="sidebar" className="col-start-3 bg-azul-500 text-branco">
      <div className="w-full m-2 p-1">
        <h1 className="m-4 text-center text-xl font-semibold">GRN Statistics</h1>
        <h3 className = "font-semibold">Interactions: {grnInfo.interactions}</h3>
        <h3 className = "font-semibold">Nodes: {grnInfo.nodes}</h3>
        <h3 className = "font-semibold">Self-regulations: {grnInfo.selfregulations}</h3>
        <h3 className = "font-semibold">Positive Regulations: {grnInfo.positiveregulations}</h3>
        <h3 className = "font-semibold">Negative Regulations: {grnInfo.negativeregulations}</h3>
        <h3 className = "font-semibold">Unknown Regulations: {grnInfo.unknownregulations}</h3>
        <br />
        {/* <button type="button" onClick={saveGraphState}>Save State</button> */}
        <br />
        {/* <button type="button" onClick={() => loadGraphState(savedElements)}>Load State</button> */}
        <br />
        {/* <button type="button" onClick={exportGraph}>Export Graph</button> */}
        <br />
        <div id="png-eg" className="w-10 h-10"></div>
      </div>
      <h1 className="m-4 text-center text-xl font-semibold">Node information</h1>
      {isInfoLoaded ? (
        <div className="w-full m-2 p-1">
          <h3 className = "font-semibold">Node name: {nodeName}</h3>
          {/* <h3>Degree Centrality</h3>
          <h3>Closeness Centrality</h3>
          <h3>Betweenness Centrality</h3>
          <h3>Eigenvector Centrality</h3>
          <h3>Harmonic Centrality</h3> */}
          <h3 className = "font-semibold inline">Interpro: </h3>
          <a target="_blank" href={`https://www.ebi.ac.uk/interpro/entry/InterPro/${infoProtein.interpro}/`} className='inline'>{infoProtein.interpro}</a>
          <br/>
          <h3 className = "font-semibold inline">EC: </h3>
          <a target="_blank" href={`https://www.ebi.ac.uk/intenz/query?cmd=SearchEC&ec=${infoProtein.ec_number}`} className='inline'>{infoProtein.ec_number}</a>
          <br/>
          <h3 className = "font-semibold inline">Cazy: </h3>
          <a target="_blank" href={`http://www.cazy.org/${infoProtein.cazy}.html`} className='inline'>{infoProtein.cazy}</a>
          <br/>
          <h3 className = "font-semibold inline">PFAN: </h3>
          <a target="_blank" href={`https://www.ebi.ac.uk/interpro/entry/pfam/${infoProtein.pfam}/`} className='inline'>{infoProtein.pfam}</a>
          <br/>
          <h3 className = "font-semibold inline">Panther: </h3>
          <a target="_blank" href={`https://www.ebi.ac.uk/interpro/entry/panther/${infoProtein.panther}/`} className='inline'>{infoProtein.panther}</a>
          <br/>
          <h3 className = "font-semibold inline">Genome3d: </h3>
          <a target="_blank" href={`http://www.genome3d.net/uniprot/id/${infoProtein.gene3d}/annotations`} className='inline'>{infoProtein.gene3d}</a>
          <br/>
          <h3 className = "font-semibold inline">Uniprot: </h3>
          <a target="_blank" href={`https://www.uniprot.org/uniprotkb/${infoProtein.uniprot}`} className='inline'>{infoProtein.uniprot}</a>
          <br/>
          <h3 className = "font-semibold inline">GO: </h3>
          <a target="_blank" href={`https://www.ebi.ac.uk/QuickGO/term/GO:${infoProtein.go}`} className='inline'>{infoProtein.go}</a>
          <br/>
          <h3 className = "font-semibold inline">Reactome: </h3>
          <a target="_blank" href={`https://reactome.org/content/detail/${infoProtein.reactome}`} className='inline'>{infoProtein.reactome}</a>
        </div>
      ) : (<h3 className="text-center">Select a node to see details</h3>)}
    </aside>
  );
}
