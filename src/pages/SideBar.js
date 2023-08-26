export default function SideBar({ nodeName, circleLayout, cy }) {
  console.log('nome: ' + nodeName);
  return (
    <aside className="col-start-3 bg-azul-500">
      <h1 className="m-4 text-center text-xl font-semibold">Detalhes</h1>
      <h5 className = "font-semibold">Nome proteina: {nodeName}</h5>
      <button type="button" onClick={() => circleLayout(cy)}>Circle</button>
    </aside>
  );
}
