import React from 'react';

interface DosageLabelProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function DosageLabel({ title, subtitle, className = '' }: DosageLabelProps) {
  return (
    <div className={`relative inline-block bg-paper border-2 border-pine text-ink px-4 py-2 shadow-sm font-mono transform -rotate-1 ${className}`}>
      {/* Serrated top edge effect using a repeating linear gradient or svg */}
      <div 
        className="absolute -top-2 left-0 right-0 h-2 bg-repeat-x"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 0, transparent 4px, #F7F3EA 5px)',
          backgroundSize: '10px 10px',
          backgroundPosition: 'bottom',
        }}
      />
      {/* Border for the serrated edge */}
      <div 
        className="absolute -top-[10px] left-0 right-0 h-[2px] bg-repeat-x opacity-30"
      />
      
      <div className="flex items-center gap-3 relative z-10">
        <div className="text-paprika text-xl opacity-80">🐾</div>
        <div className="flex flex-col">
          <span className="font-bold text-sm leading-tight uppercase tracking-wide">{title}</span>
          {subtitle && <span className="text-xs text-stone">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
}
