import { useState } from 'react';

export default function SideBar({ nodeName}) {
  const [isInfoLoaded, setIsInfoLoaded] = useState(true);

  return (
    <aside id="sidebar" className="col-start-3 bg-azul-500 text-branco">
      <h1 className="m-4 text-center text-xl font-semibold">Estatísticas da Rede</h1>
      
      <br />
      {/* <button type="button" onClick={saveGraphState}>Save State</button> */}
      <br />
      {/* <button type="button" onClick={() => loadGraphState(savedElements)}>Load State</button> */}
      <br />
      {/* <button type="button" onClick={exportGraph}>Export Graph</button> */}
      <br />
      <div id="png-eg" className="w-10 h-10"></div>
      
      <h1 className="m-4 text-center text-xl font-semibold">Node information</h1>
      {isInfoLoaded ? (
        <div className="w-full m-2 p-1">
          <h3 className = "font-semibold">Node name: {nodeName}</h3>
          <h3>Degree Centrality</h3>
          <h3>Closeness Centrality</h3>
          <h3>Betweenness Centrality</h3>
          <h3>Eigenvector Centrality</h3>
          <h3>Harmonic Centrality</h3>
          <h3>Interpro</h3>
          <h3>EC</h3>
          <h3>Cazy</h3>
          <h3>PFAN</h3>
          <h3>Panther</h3>
          <h3>Genome3d</h3>
          <h3>Uniprot</h3>
          <h3>GO</h3>
          <h3>Reactome</h3>
        </div>
      ) : (<h3 className="text-center">Select a node to see details</h3>)}
    </aside>
  );
}
