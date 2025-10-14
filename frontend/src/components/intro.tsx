import React from "react";
import { Upload, Sparkles, Image } from "lucide-react";


export default function Intro() {

     const steps = [
        {
            icon: Upload,
            label: 'Upload Plantegning',
            description: 'Del din plantegning med vores AI',
            key: 'upload'
        },
        {
            icon: Sparkles,
            label: 'Beskriv Din Stil',
            description: 'Fortæl om dine design præferencer', 
            key: 'stil'    
        },
        {
            icon: Image,
            label: 'Få AI Forslag',
            description: 'Modtag smukke designforslag',
            key: 'template'
        }
    ];

    return (
        <div className="flex items-center justify-between gap-5 p-4 border border-stone-100">
            {steps.map((step) => (
                <div key={step.key} className="flex flex-col items-center p-4 gap-2">
                    <step.icon className="h-12 w-12 text-white rounded-2xl p-3 bg-gradient-to-r from-teal-300 via-sky-400 to-purple-200" />
                    <p className="text-sm font-medium text-muted-foreground">
                        {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {step.description}
                    </p>
                </div>
            ))}
        </div>
    )
}