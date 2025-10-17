import { useState } from 'react'
import Header from "./components/header"
import Intro from "./components/intro"
import Input from "./components/input"



function App() {
  
  const [output, setOutput] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-3/4 flex flex-col mx-auto rounded-2xl py-4">
      <Header />
      <main className='rounded-b-lg py-4 px-6 flex flex-col items-center gap-8 bg-stone-50 border-b border-slate-300'>
        <Intro />
        <Input />
      </main>
    </div>
  )
}

export default App
