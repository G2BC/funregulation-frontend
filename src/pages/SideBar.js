export default function SideBar({ nodeName, circleLayout, saveGraphState, loadGraphState, savedElements, exportGraph }) {
  return (
    <aside className="col-start-3 bg-azul-500">
      <h1 className="m-4 text-center text-xl font-semibold">Detalhes</h1>
      <h5 className = "font-semibold">Nome proteina: {nodeName}</h5>
      <button type="button" onClick={circleLayout}>Circle</button>
      <br />
      <button type="button" onClick={saveGraphState}>Save State</button>
      <br />
      <button type="button" onClick={() => loadGraphState(savedElements)}>Load State</button>
      <br />
      <button type="button" onClick={exportGraph}>Export Graph</button>
      <div id="png-eg" className="w-10 h-10"></div>
    </aside>
  );
}
