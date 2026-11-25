"use client";

import React from 'react';
import { JourneyFeedback } from '../types';
import { MessageSquare, Sun, Users, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

interface CommunityObservationsPanelProps {
  feedbackList: JourneyFeedback[];
  onOpenFeedbackModal: () => void;
}

export const CommunityObservationsPanel: React.FC<CommunityObservationsPanelProps> = ({
  feedbackList,
  onOpenFeedbackModal,
}) => {
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Recent';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <h3 className="font-bold text-sm text-white">Community Walk Observations</h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              {feedbackList.length} Local Reports
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Real user-submitted walk feedback persisted in browser localStorage
          </p>
        </div>

        <button
          onClick={onOpenFeedbackModal}
          className="self-start sm:self-center px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-md shadow-purple-600/20"
        >
          + Add Route Observation
        </button>
      </div>

      {/* Observation Feed */}
      <div className="mt-3 space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
        {feedbackList.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-400">
            No community observations recorded yet. Complete a route walk to submit the first observation.
          </div>
        ) : (
          feedbackList.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-2 hover:border-slate-700/80 transition-all"
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-slate-200">{item.routeName}</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                    UNVERIFIED
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-[11px] text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(item.submittedAt)}</span>
                </div>
              </div>

              {/* Tag row */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                <span className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                  <Sun className="w-2.5 h-2.5 text-amber-400" />
                  <span>Lighting: {item.lighting}</span>
                </span>
                <span className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                  <Users className="w-2.5 h-2.5 text-sky-400" />
                  <span>Activity: {item.pedestrianActivity}</span>
                </span>
                {item.obstructions && item.obstructions.length > 0 && !item.obstructions.includes('none') && (
                  <span className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20">
                    <AlertTriangle className="w-2.5 h-2.5 text-rose-400" />
                    <span>Obstructions: {item.obstructions.join(', ')}</span>
                  </span>
                )}
              </div>

              {/* Comment */}
              {item.comment && (
                <p className="text-slate-300 text-xs italic bg-slate-900/40 p-2 rounded-lg border border-slate-800/60">
                  "{item.comment}"
                </p>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 flex items-center justify-between">
        <span>Device-local persistence (Browser localStorage)</span>
        <span>Not broadcast to global users in prototype</span>
      </div>
    </div>
  );
};
