import { FileCode, Sparkles } from "lucide-react";


export default function Header() {
    return (
      <header className="pt-10 w-4/6">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex items-center gap-3">
            <Sparkles className="w-10 h-10 text-sky-100"/>
            <h1
                className="text-shadow-sm text-xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-cyan-500 to-lime-400 bg-clip-text text-transparent"
              >
                VisionAI
              </h1>
          </div>
          <div className="text-center">              
              <h2 className="font-bold sm:text-xl">
                Opdag AI-muligheder til din virksomhed. Indtast din virksomheds webadresse for at modtage skræddersyede AI-optimeringsløsninger.
              </h2>
          </div> 
        </div>
      </header>
    
    )
}