import Header from "./components/header"
import Input from "./components/input"


function App() {
  
  return (
    <div className="min-h-screen w-full py-4 bg-gradient-to-r from-black via-slate-900 to-black text-white">
      <main className='sm:w-3/4 mx-auto rounded-b-lg sm:py-4 sm:px-6 flex flex-col items-center justify-center gap-10'>
        <Header />
        <Input />
      </main>
    </div>
  )
}

export default App
