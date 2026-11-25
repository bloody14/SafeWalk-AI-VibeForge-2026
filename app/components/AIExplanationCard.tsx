"use client";

import React from 'react';
import { Sparkles, Cpu, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';
import { AIExplanationResponse } from '../types';

interface AIExplanationCardProps {
  explanationData: AIExplanationResponse | null;
  isLoading: boolean;
  onRefresh: () => void;
  selectedRouteLabel: string;
}

export const AIExplanationCard: React.FC<AIExplanationCardProps> = ({
  explanationData,
  isLoading,
  onRefresh,
  selectedRouteLabel,
}) => {
  const isGemini = explanationData?.provider === 'gemini';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500/20 to-purple-500/20 border border-amber-500/30 flex items-center justify-center">
            {isGemini ? (
              <Sparkles className="w-4 h-4 text-amber-400" />
            ) : (
              <Cpu className="w-4 h-4 text-sky-400" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-sm text-white">Route Condition Intelligence</h3>
              {/* Badge */}
              <span
                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                  isGemini
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    : 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                }`}
              >
                {isGemini ? 'Gemini 1.5 Flash' : 'Rule-Based Fallback Engine'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Analyzing: <span className="text-slate-200 font-medium">{selectedRouteLabel}</span>
            </p>
          </div>
        </div>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="self-start sm:self-center flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700/60 disabled:opacity-50"
          title="Re-analyze Route Conditions"
        >
          <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
          <span>{isLoading ? 'Synthesizing...' : 'Re-analyze'}</span>
        </button>
      </div>

      {/* Body Content */}
      <div className="mt-3 space-y-3">
        {isLoading ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-2 text-slate-400 text-xs">
            <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Evaluating route attributes and synthesizing conditions...</span>
          </div>
        ) : explanationData ? (
          <>
            {/* Primary Explanation */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs sm:text-sm text-slate-200 leading-relaxed">
              <p>{explanationData.explanation}</p>
            </div>

            {/* Trade-off Highlight */}
            {explanationData.tradeOffSummary && (
              <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300 font-semibold block text-[11px] uppercase tracking-wide">
                    Trade-Off Assessment
                  </strong>
                  <span>{explanationData.tradeOffSummary}</span>
                </div>
              </div>
            )}

            {/* Explicit Limitations Box */}
            <div className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 text-[11px] text-slate-400">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-300 font-medium">Data Truth & Scope: </strong>
                <span>{explanationData.limitations}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="p-4 text-center text-xs text-slate-400">
            Select a route to generate structured factor explanation.
          </div>
        )}
      </div>
    </div>
  );
};
