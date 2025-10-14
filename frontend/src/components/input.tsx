import React, {useState, useRef} from "react";
import { Sparkles } from "lucide-react";


type InputProps = {
    output: string | null;
    setOutput: React.Dispatch<React.SetStateAction<string | null>>;
};


export default function Input({output, setOutput}: InputProps) {

    const [isLoading, setIsLoading] = useState(false);
    const [designStyle, setDesignStyle] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);


    const handleSubmit = async () => {
        if (!uploadedFile || !designStyle) {
            alert("Please upload a file and enter a design style.");
            return;
        }

        setIsLoading(true);
        setProgress(0);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('image', uploadedFile);
            formData.append('design_style', designStyle);

            const response = await fetch('http://localhost:8000/api/design', {
            method: 'POST',
            body: formData
            });

            const data = await response.json();

            if(data.error) {
                setError(data.error);
                setOutput(null);
                return;
            }

            // If you want to show images:
            // data.images is an array of base64 image strings (with data URI prefix)
            setOutput(data.final_output.description_of_interior_design);


        } catch (error) {
            setError("An error occurred while generating the design.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 w-2/4">
            
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex items-center justify-between text-left gap-6">
                <label>Design:</label>
                <input type="text" value={designStyle} onChange={(e) => setDesignStyle(e.target.value)} placeholder="Scandinavian" className="border border-gray-300 rounded-md p-2 w-full" />
            </div>
            <button onClick={handleSubmit} 
                disabled={!uploadedFile || !designStyle || isLoading}
                className={`flex items-center justify-center gap-2 font-semibold py-2 px-3 sm:py-2 sm:px-3 text-xs sm:text-sm rounded-sm sm:rounded-md 
                ${!uploadedFile || !designStyle || isLoading ? 
                    "bg-gray-300 text-gray-400 cursor-not-allowed disable" : 
                    "bg-gradient-to-r from-indigo-400 to-purple-600 text-white hover:cursor-pointer hover:from-indigo-500 hover:to-purple-700"

                }`}>
                <Sparkles className="w-5 h-5"/>
                Generer AI-forslag
            
            </button>
            {isLoading && (
            <div className="w-full mt-2">
                <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Uploading...</span>
                <span className="text-sm font-medium text-gray-700">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                ></div>
                </div>
            </div>
            )}
            <div className="flex flex-col gap-6 w-full">           
               {/*Add output section*/}
            
            </div>
            

        </div>
        
    )
}