import React from "react";
import { Upload, Sparkles, Image } from "lucide-react";


export default function Intro() {

     const steps = [
        {
            icon: Upload,
            label: 'Indsæt webadresse',
            description: 'Paste din webadresse ind her',
            key: 'upload'
        },
        {
            icon: Sparkles,
            label: 'Hjemmesiden analyseres',
            description: 'Oplysninger om din hjemmeside indhentes', 
            key: 'stil'    
        },
        {
            icon: Image,
            label: 'Få AI-Forslag',
            description: 'Modtag relevante AI-forslag',
            key: 'template'
        }
    ];

    return (
        <div className="flex items-center justify-between p-4 w-full">
            {steps.map((step) => (
                <div key={step.key} className="flex flex-col items-center p-4 gap-2">
                    <step.icon className="h-16 w-16 text-white rounded-2xl p-3 bg-linear-to-r from-cyan-300 via-blue-400 to-indigo-500" />
                    <p className="text-lg font-semibold">
                        {step.label}
                    </p>
                    <p className="text-md">
                        {step.description}
                    </p>
                </div>
            ))}
        </div>
    )
}