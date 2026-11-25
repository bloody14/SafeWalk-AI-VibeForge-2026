"use client";

import React, { useState } from 'react';
import { RouteOption } from '../types';
import { Clock, Navigation2, Sun, ShieldAlert, Users, MessageSquare, ChevronDown, ChevronUp, Check, Info } from 'lucide-react';

interface RouteComparisonProps {
  routes: RouteOption[];
  selectedRouteId: string;
  onSelectRoute: (id: string) => void;
  onStartJourney: (route: RouteOption) => void;
}

export const RouteComparison: React.FC<RouteComparisonProps> = ({
  routes,
  selectedRouteId,
  onSelectRoute,
  onStartJourney,
}) => {
  const [showFormulaFor, setShowFormulaFor] = useState<string | null>(null);

  const toggleFormula = (id: string) => {
    setShowFormulaFor(showFormulaFor === id ? null : id);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'public-verified':
        return <span className="px-1.5 py-0.5 rounded text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20">PUBLIC SOURCE</span>;
      case 'community-unverified':
        return <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20">UNVERIFIED COMMUNITY</span>;
      case 'demo-simulated':
        return <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20">DEMO / SIMULATED</span>;
      default:
        return <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-700 text-slate-300">UNKNOWN</span>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <span>Route Comparison</span>
            <span className="text-xs font-normal text-slate-400">({routes.length} options evaluated)</span>
          </h3>
          <p className="text-xs text-slate-400">
            Compare travel time against lighting, activity, and observational indicators
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routes.slice(0, 2).map((route) => {
          const isSelected = route.id === selectedRouteId;
          const isConditionAware = route.id === 'route-condition-aware';

          return (
            <div
              key={route.id}
              onClick={() => onSelectRoute(route.id)}
              className={`relative rounded-2xl p-4 sm:p-5 transition-all cursor-pointer border ${
                isSelected
                  ? isConditionAware
                    ? 'bg-slate-900 border-emerald-500/80 ring-2 ring-emerald-500/30 shadow-xl shadow-emerald-950/40'
                    : 'bg-slate-900 border-amber-500/80 ring-2 ring-amber-500/30 shadow-xl shadow-amber-950/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
              }`}
            >
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-sm text-white">{route.label}</h4>
                    {isConditionAware && (
                      <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{route.tagline}</p>
                </div>

                {/* Awareness Index Badge */}
                <div className="text-right flex-shrink-0">
                  <div className={`px-2.5 py-1 rounded-xl border text-center ${getScoreColor(route.awarenessIndex)}`}>
                    <div className="text-xs font-bold leading-none">{route.awarenessIndex}</div>
                    <div className="text-[9px] uppercase tracking-wider font-semibold opacity-80">Index</div>
                  </div>
                </div>
              </div>

              {/* Time & Distance Row */}
              <div className="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-slate-400 text-[10px] block">Duration</span>
                    <strong className="text-white text-xs">{route.durationMinutes} mins</strong>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Navigation2 className="w-4 h-4 text-sky-400" />
                  <div>
                    <span className="text-slate-400 text-[10px] block">Distance</span>
                    <strong className="text-white text-xs">{route.distanceMeters} m</strong>
                  </div>
                </div>
              </div>

              {/* Contributing Factors */}
              <div className="space-y-2 mt-3 pt-3 border-t border-slate-800/80 text-xs">
                {/* Lighting */}
                <div className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center space-x-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Street Lighting</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">{route.factors.lighting.level}</span>
                    {getStatusBadge(route.factors.lighting.status)}
                  </div>
                </div>

                {/* Reported Incidents */}
                <div className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center space-x-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    <span>Reported Incidents</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">{route.factors.reportedIncidents.count} in dataset</span>
                    {getStatusBadge(route.factors.reportedIncidents.status)}
                  </div>
                </div>

                {/* Pedestrian Activity */}
                <div className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-sky-400" />
                    <span>Pedestrian Activity</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">{route.factors.pedestrianActivity.level}</span>
                    {getStatusBadge(route.factors.pedestrianActivity.status)}
                  </div>
                </div>

                {/* Community Notes */}
                <div className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center space-x-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                    <span>Community Notes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">{route.factors.communityFeedback.count} reviews</span>
                    {getStatusBadge(route.factors.communityFeedback.status)}
                  </div>
                </div>
              </div>

              {/* Deterministic Formula Dropdown */}
              <div className="mt-3 pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFormula(route.id);
                  }}
                  className="text-[11px] text-slate-400 hover:text-emerald-400 flex items-center space-x-1"
                >
                  <Info className="w-3 h-3" />
                  <span>Inspect Deterministic Formula Breakdown</span>
                  {showFormulaFor === route.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {showFormulaFor === route.id && (
                  <div className="mt-2 p-2.5 rounded-lg bg-slate-950 text-[11px] font-mono text-emerald-300/90 border border-slate-800 space-y-1">
                    <div>{route.breakdown.formula}</div>
                    <div className="text-[10px] text-slate-500 font-sans mt-1">
                      Rule: Deterministic application calculation only. LLMs are never permitted to generate or inflate safety scores.
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="text-[11px] text-slate-400">
                  {isSelected ? (
                    <span className="text-emerald-400 font-medium flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Selected for Navigation</span>
                    </span>
                  ) : (
                    <span>Click card to view on map</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartJourney(route);
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-night-950 transition-all shadow-md shadow-emerald-500/20"
                >
                  Start Journey
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
