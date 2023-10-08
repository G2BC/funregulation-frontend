import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-screen h-16 flex justify-center gap-10 items-center col-start-1 col-span-2 text-branco bg-azul-700">
      <img className="w-32" src="/img/funregulation-logo-colored.png" alt="FunRegulation logo"/>
      <menu className="w-96 flex justify-around">
        <Link className="hover:text-ciano-500" href="/">INÍCIO</Link>
        <Link className="hover:text-ciano-500" href="/Search">CONSTRUIR GRN</Link>
        <Link className="hover:text-ciano-500" href="#">SOBRE</Link>
      </menu>
    </header>
  );
}
