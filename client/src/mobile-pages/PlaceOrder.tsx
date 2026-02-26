import React, { useState } from 'react';
import { Upload, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button, Input, TextArea, Card } from '../mobile-components/UIComponents';

export const PlaceOrder: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
        <div className="w-20 h-20 bg-brand-success/20 text-brand-success rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Placed!</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          We've received your request. Check your email or the Track page for updates.
        </p>
        <div className="bg-brand-surface p-4 rounded-xl w-full border border-brand-border-dark mb-6">
             <p className="text-xs text-gray-400 mb-1">Order ID</p>
             <p className="text-xl font-mono text-white font-bold">#SD-{Math.floor(Math.random()*10000)}</p>
        </div>
        <Button variant="secondary" onClick={() => setSubmitted(false)}>Place Another</Button>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Place Your Order</h1>
        <p className="text-gray-500 dark:text-gray-400">Tell us what you need, and we'll get it done for you.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input 
          label="Email Address *" 
          placeholder="your@email.com" 
          type="email" 
          required 
          subLabel="We'll send updates here"
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Service Needed *</label>
          <select className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-brand-surface border border-gray-200 dark:border-brand-border-dark focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-all dark:text-white">
            <option>Select a service...</option>
            <option>Assignment Writing</option>
            <option>Resume Building</option>
            <option>PPT Design</option>
            <option>Content Writing</option>
            <option>Website Development</option>
            <option>Graphic Design</option>
            <option>Other</option>
          </select>
        </div>

        <TextArea 
          label="Requirements & Details *" 
          placeholder="Please describe your requirements in detail..."
          rows={5}
          required
        />

        <div className="space-y-1.5">
           <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Upload Files (Optional)</label>
           <div className="border-2 border-dashed border-gray-300 dark:border-brand-border-dark rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-brand-surface transition-colors cursor-pointer relative">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              {file ? (
                <p className="text-brand-primary font-medium">{file.name}</p>
              ) : (
                <>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-200">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, ZIP, Images (Max 10MB)</p>
                </>
              )}
           </div>
        </div>

        <Input 
          label="Order Amount (₹) *" 
          placeholder="500" 
          type="number" 
          subLabel="Enter agreed amount"
        />

        <Button variant="danger" type="submit" className="w-full mt-4 text-lg py-4">
          Create Order
        </Button>
      </form>
    </div>
  );
};
