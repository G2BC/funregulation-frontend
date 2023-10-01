import Select from 'react-select';

export default function SideBar({ nodeName, circleLayout, saveGraphState, loadGraphState, savedElements, exportGraph, filterElements, restoreGraph, elements, filter, setFilter, tfs}) {
  return (
    <aside id="sidebar" className="col-start-3 bg-azul-500 text-branco">
      <h1 className="m-4 text-center text-xl font-semibold">Detalhes</h1>
      <h5 className = "font-semibold">Nome proteina: {nodeName}</h5>
      <br />
      <button type="button" onClick={saveGraphState}>Save State</button>
      <br />
      <button type="button" onClick={() => loadGraphState(savedElements)}>Load State</button>
      <br />
      <button type="button" onClick={exportGraph}>Export Graph</button>
      <br />
      <div id="png-eg" className="w-10 h-10"></div>
    </aside>
  );
}
