import Header from "./Header";

export default function Search() {
    return(
        <div className="w-screen grid grid-cols-3">
            <Header/>
            <main className="w-screen h-96 flex justify-center items-center col-start-1 col-end-3">
                <select className="w-96 h-8">
                    <option value="">Selecione uma opção</option>
                    <option value="GRN1">Gene Regulatory Network 1</option>
                    <option value="GRN2">Gene Regulatory Network 2</option>
                    <option value="GRN3">Gene Regulatory Network 3</option>
                </select>
                <button className="w-24 h-8 bg-azul-700 text-branco">Pesquisar</button>
            </main>
        </div>
    );
}