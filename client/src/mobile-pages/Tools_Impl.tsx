import React, { useState, useRef } from 'react';
import { Download, Image as ImageIcon, Wand2, ArrowLeft } from 'lucide-react';
import { Button, Input, Card } from '../mobile-components/UIComponents';
import { editImage } from '../mobile-services/geminiService';

// --- Image Editor Tool (Nano Banana) ---
export const ImageEditorTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;
    setIsLoading(true);
    try {
      const result = await editImage(image, prompt);
      setResultImage(result);
    } catch (e) {
      alert("Failed to edit image. Try a different prompt.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <div className="p-4 space-y-6 pb-24 animate-fade-in">
       <Card>
         <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span className="bg-purple-100 text-purple-600 p-1.5 rounded-lg"><Wand2 className="w-5 h-5" /></span>
            Magic Image Editor
         </h2>
         <p className="text-sm text-gray-500 mb-4">Upload a photo and describe how to change it. Powered by Gemini Flash Image.</p>

         {!image ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-brand-surface transition-colors"
            >
              <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-brand-primary font-bold">Tap to upload photo</p>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
            </div>
         ) : (
            <div className="space-y-4">
               <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                 <img src={resultImage || image} alt="Preview" className="w-full h-64 object-cover" />
                 {resultImage && <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md font-bold">Edited</div>}
                 <button onClick={() => { setImage(null); setResultImage(null); setPrompt(''); }} className="absolute top-2 left-2 bg-black/50 text-white p-1 rounded-full"><ArrowLeft className="w-4 h-4"/></button>
               </div>

               <div className="flex gap-2">
                  <Input 
                    placeholder="Describe edit (e.g. 'Add fireworks')" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button onClick={handleEdit} disabled={!prompt || isLoading} isLoading={isLoading} className="px-4">
                    <Wand2 className="w-5 h-5" />
                  </Button>
               </div>

               {resultImage && (
                 <Button variant="secondary" className="w-full" onClick={() => {
                    const link = document.createElement('a');
                    link.href = resultImage;
                    link.download = 'sage_edit.png';
                    link.click();
                 }}>
                   <Download className="w-4 h-4 mr-2" /> Save Image
                 </Button>
               )}
            </div>
         )}
       </Card>
     </div>
  );
};
