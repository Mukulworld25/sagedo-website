
import React, { useState, useEffect, useRef } from 'react';
import { Loader2, ArrowDown } from 'lucide-react';

// --- Buttons ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'danger';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  isLoading, 
  icon,
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center rounded-[1.25rem] font-black uppercase tracking-widest text-[10px] sm:text-xs transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border-none";
  
  const variants = {
    primary: "bg-brand-primary text-white shadow-xl shadow-brand-primary/20 hover:shadow-brand-primary/40",
    gradient: "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-xl shadow-brand-primary/20",
    secondary: "bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/20",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
    danger: "bg-brand-sage text-white shadow-xl shadow-brand-sage/20 hover:scale-105", 
  };

  const sizes = "py-4 px-8";

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes} ${className}`} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  subLabel?: string;
}

export const Input: React.FC<InputProps> = ({ label, subLabel, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-baseline px-1">
        {label && <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</label>}
        {subLabel && <span className="text-[10px] text-brand-primary font-bold">{subLabel}</span>}
      </div>
      <input 
        className={`w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-primary/50 focus:bg-white/10 outline-none transition-all text-white placeholder-gray-600 font-semibold ${className}`}
        {...props} 
      />
    </div>
  );
};

// --- TextArea ---
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  subLabel?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, subLabel, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-baseline px-1">
        {label && <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</label>}
        {subLabel && <span className="text-[10px] text-brand-primary font-bold">{subLabel}</span>}
      </div>
      <textarea 
        className={`w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-primary/50 focus:bg-white/10 outline-none transition-all text-white placeholder-gray-600 font-semibold resize-none ${className}`}
        {...props} 
      />
    </div>
  );
};

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`glass-card rounded-[2.5rem] p-6 shadow-2xl ${onClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode; color?: 'blue' | 'green' | 'amber' | 'red' }> = ({ children, color = 'blue' }) => {
  const colors = {
    blue: 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20',
    green: 'bg-brand-success/10 text-brand-success border border-brand-success/20',
    amber: 'bg-brand-warning/10 text-brand-warning border border-brand-warning/20',
    red: 'bg-brand-error/10 text-brand-error border border-brand-error/20',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${colors[color]}`}>
      {children}
    </span>
  );
};

// --- PullToRefresh ---
export const PullToRefresh: React.FC<{
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}> = ({ onRefresh, children }) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const refreshThreshold = 80;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].pageY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === 0 || isRefreshing || containerRef.current?.scrollTop !== 0) return;
    
    const currentY = e.touches[0].pageY;
    const diff = currentY - startY.current;
    
    if (diff > 0) {
      // Apply resistance
      const distance = Math.min(diff * 0.4, refreshThreshold + 20);
      setPullDistance(distance);
      if (e.cancelable) e.preventDefault();
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= refreshThreshold && !isRefreshing) {
      setIsRefreshing(true);
      setPullDistance(refreshThreshold);
      await onRefresh();
      setIsRefreshing(false);
    }
    setPullDistance(0);
    startY.current = 0;
  };

  return (
    <div 
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-y-auto h-full"
    >
      <div 
        className="absolute w-full flex justify-center transition-all duration-200 pointer-events-none z-50"
        style={{ top: `${pullDistance - 40}px`, opacity: pullDistance / refreshThreshold }}
      >
        <div className="bg-brand-surface border border-white/10 p-2 rounded-full shadow-2xl">
          {isRefreshing ? (
            <Loader2 className="w-5 h-5 text-brand-primary animate-spin" />
          ) : (
            <ArrowDown 
              className="w-5 h-5 text-brand-primary transition-transform duration-200" 
              style={{ transform: `rotate(${pullDistance >= refreshThreshold ? 180 : 0}deg)` }}
            />
          )}
        </div>
      </div>
      <div 
        className="transition-transform duration-200"
        style={{ transform: `translateY(${pullDistance}px)` }}
      >
        {children}
      </div>
    </div>
  );
};
