import { Inter } from 'next/font/google'

import Header from './Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <div className="w-screen grid grid-cols-3">
      <Header/>
    </div>
    
  );
}
