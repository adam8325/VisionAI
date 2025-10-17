import React from "react";
import { FileCode } from "lucide-react";


export default function Header() {
    return (
      <header className="w-full h-full border-t border-slate-300 bg-linear-to-r from-cyan-100 via-blue-200 to-indigo-300 rounded-t-md p-4">
        <div className="container mx-auto px-4 py-4">
          <div className="flex sm:items-center gap-3">
            <div>
              <FileCode className="border-sky-200 rounded-xl h-9 w-9 p-1.5 text-white bg-linear-to-r from-cyan-500 via-blue-400 to-indigo-500" />
            </div>
            <div>
                <h1
                  className="text-shadow-sm text-xl sm:text-2xl font-bold bg-clip-text bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 text-transparent"
                >
                  VisionAI
                </h1>
                <p className="text-sm text-black font-bold sm:text-md text-muted-foreground">
                  AI-optimering af din virksomhed
                </p>
            </div> 
          </div>
        </div>
      </header>
    )
}