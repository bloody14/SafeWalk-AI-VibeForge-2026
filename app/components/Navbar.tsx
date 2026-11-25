"use client";

import React from 'react';
import { Shield, Sparkles, AlertCircle, Info, ExternalLink } from 'lucide-react';

interface NavbarProps {
  onOpenDisclosures: () => void;
  geminiActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDisclosures, geminiActive }) => {
  return (
    <header className="sticky top-0 z-40 bg-night-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-night-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="text-base sm:text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent">
                SafeWalk AI
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:inline-block">
                Route Awareness
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Condition-aware walking comparisons with transparent data indicators
            </p>
          </div>
        </div>

        {/* Right Status & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          {/* AI Mode Pill */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs border font-medium bg-slate-800/80 border-slate-700 text-slate-300">
            <Sparkles className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${geminiActive ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
            <span className="hidden md:inline">Engine:</span>
            <span className={geminiActive ? 'text-amber-300 font-semibold' : 'text-slate-300'}>
              <span className="hidden sm:inline">{geminiActive ? 'Gemini 1.5 Flash' : 'Deterministic Fallback'}</span>
              <span className="sm:hidden">{geminiActive ? 'Gemini' : 'Fallback'}</span>
            </span>
          </div>

          {/* Data Honesty / Disclosures Modal Trigger */}
          <button
            onClick={onOpenDisclosures}
            className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all border border-slate-700/60 flex-shrink-0"
            title="View Data Provenance, Limitations and Contest Disclosures"
          >
            <Info className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="hidden sm:inline">Data Trust & Rules</span>
          </button>
        </div>
      </div>
    </header>
  );
};
