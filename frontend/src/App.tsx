import { useState } from 'react'
import Header from "./components/header"
import Intro from "./components/intro"
import Input from "./components/input"



function App() {
  
  const [output, setOutput] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-3/4 flex flex-col mx-auto border border-stone-100 rounded-sm ">
      <main className='py-4 px-6 flex flex-col items-center gap-4 bg-[linear-gradient(135deg,hsl(250_50%_96%),hsl(280_50%_98%))]'>
        <Header />
        <Intro />
        <Input output={output} setOutput={setOutput} />
      </main>
    </div>
  )
}

export default App
