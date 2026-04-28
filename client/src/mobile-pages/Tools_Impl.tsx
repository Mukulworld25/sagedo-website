import React, { useState, useRef } from 'react';
import { FileText, ChevronRight, Share2, Download, Image as ImageIcon, Wand2, ArrowLeft } from 'lucide-react';
import { Button, Input, Card } from '../mobile-components/UIComponents';
import { generateAssignment, editImage } from '../mobile-services/geminiService';
import { AssignmentParams } from '../mobile-types';

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

// --- Assignment Writer Tool Implementation ---
export const AssignmentTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState<AssignmentParams>({
    topic: '',
    subject: 'General',
    level: 'Undergraduate',
    words: 1000,
    tone: 'Academic',
    instructions: ''
  });

  const handleGenerate = async () => {
    if (!formData.topic) return;
    setIsLoading(true);
    setStep(2); // Show processing screen
    try {
      const text = await generateAssignment(formData);
      setResult(text);
      setStep(3); // Show result
    } catch (e) {
      alert("Failed to generate. Please try again.");
      setStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 2) {
    return (
      <div className="h-[calc(100vh-140px)] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-brand-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-brand-primary rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-3xl animate-bounce-small">🤖</div>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sage is Thinking...</h2>
        <p className="text-gray-500 text-sm">Researching {formData.topic}, structuring arguments, and formatting citations.</p>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="flex flex-col h-full animate-fade-in pb-24">
        <div className="bg-brand-surface dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700 flex gap-2 overflow-x-auto">
            {['Bold', 'Italic', 'H1', 'H2', 'List'].map(t => (
                <button key={t} className="px-3 py-1 bg-white dark:bg-brand-surface rounded border border-gray-200 dark:border-gray-600 text-xs font-medium">{t}</button>
            ))}
        </div>
        <div className="flex-1 p-4 overflow-y-auto font-serif text-lg leading-relaxed text-gray-800 dark:text-gray-200">
           <div className="whitespace-pre-wrap">{result}</div>
        </div>
        <div className="p-4 glass border-t border-gray-200 dark:border-gray-700 flex gap-3">
             <Button variant="secondary" className="flex-1" icon={<Share2 className="w-4 h-4"/>}>Share</Button>
             <Button className="flex-1" icon={<Download className="w-4 h-4"/>}>Export PDF</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-24 animate-fade-in">
      <Card>
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg"><FileText className="w-5 h-5" /></span>
            Assignment Details
        </h2>
        
        <div className="space-y-4">
            <Input 
                label="Topic or Question" 
                placeholder="e.g. Impact of AI on Global Economics" 
                value={formData.topic}
                onChange={e => setFormData({...formData, topic: e.target.value})}
            />
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                    <select 
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-brand-surface border border-gray-200 dark:border-brand-border-dark outline-none dark:text-white"
                        value={formData.subject}
                        onChange={e => setFormData({...formData, subject: e.target.value})}
                    >
                        <option>General</option>
                        <option>History</option>
                        <option>Science</option>
                        <option>Literature</option>
                        <option>Business</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Level</label>
                    <select 
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-brand-surface border border-gray-200 dark:border-brand-border-dark outline-none dark:text-white"
                        value={formData.level}
                        onChange={e => setFormData({...formData, level: e.target.value})}
                    >
                        <option>High School</option>
                        <option>Undergraduate</option>
                        <option>Master's</option>
                        <option>PhD</option>
                    </select>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Word Count: {formData.words}</label>
                <input 
                    type="range" 
                    min="300" 
                    max="5000" 
                    step="100" 
                    className="w-full accent-brand-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    value={formData.words}
                    onChange={e => setFormData({...formData, words: parseInt(e.target.value)})}
                />
            </div>

            <div className="space-y-1.5">
                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Additional Instructions</label>
                 <textarea 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-brand-surface border border-gray-200 dark:border-brand-border-dark focus:ring-2 focus:ring-brand-primary/50 outline-none h-24 resize-none dark:text-white"
                    placeholder="Specific sources, formatting requirements, etc."
                    value={formData.instructions}
                    onChange={e => setFormData({...formData, instructions: e.target.value})}
                 />
            </div>
        </div>

        <Button 
            className="w-full mt-6" 
            variant="gradient" 
            onClick={handleGenerate}
            disabled={!formData.topic}
        >
            Generate Assignment <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </Card>
    </div>
  );
};
