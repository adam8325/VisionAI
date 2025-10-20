import Header from "./components/header"
import Input from "./components/input"



function App() {
  

  return (
    <div className="min-h-screen w-full py-4 bg-[hsl(222_47%_5%)] text-white">
      <main className='w-2/4 mx-auto rounded-b-lg py-4 px-6 flex flex-col items-center justify-center gap-10'>
        <Header />
        <Input />
      </main>
    </div>
  )
}

export default App
