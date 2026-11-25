"use client";

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, Eye, ChevronDown, ChevronUp } from 'lucide-react';

export const DataTrustBanner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-night-900/90 border-b border-slate-800 text-slate-300 text-xs px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <p className="text-slate-300">
            <strong className="text-white font-medium">Product Notice:</strong> SafeWalk compares route conditions (lighting, proxies, feedback). It is <span className="text-amber-400 font-semibold">NOT a crime prediction model</span> and provides <span className="text-amber-400 font-semibold">no guarantee of safety</span>.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 overflow-x-auto text-[11px]">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-medium">
              DEMO / SIMULATED
            </span>
            <span className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400 font-medium">
              PUBLIC DATA PROXY
            </span>
            <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 font-medium">
              UNVERIFIED COMMUNITY
            </span>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 text-xs flex items-center space-x-1"
          >
            <span className="text-[11px] underline">{expanded ? 'Hide Details' : 'Details'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-400 text-[11px] leading-relaxed">
          <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-800">
            <span className="text-white font-medium block mb-1 flex items-center space-x-1">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transparent Heuristic Index</span>
            </span>
            The 0-100 Awareness Index is a deterministic weighted calculation of lighting fixtures, pedestrian activity proxies, and historical incident logs. It is capped at 92 to never imply absolute security.
          </div>
          <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-800">
            <span className="text-white font-medium block mb-1 flex items-center space-x-1">
              <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>Missing Data Rule</span>
            </span>
            Missing or unmapped lighting / incident data is tagged explicitly as UNKNOWN. The system never assumes missing information indicates a safe or unsafe corridor.
          </div>
          <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-800">
            <span className="text-white font-medium block mb-1 flex items-center space-x-1">
              <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
              <span>Community Feedback Status</span>
            </span>
            Post-journey observations submitted in this session are stored locally in your browser (localStorage) and visibly tagged as unverified user feedback.
          </div>
        </div>
      )}
    </div>
  );
};
