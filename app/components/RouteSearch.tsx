"use client";

import React, { useState } from 'react';
import { Search, MapPin, Navigation, Sparkles, Footprints, RotateCcw } from 'lucide-react';
import { DEMO_ORIGIN, DEMO_DESTINATION } from '../data/demoData';

interface RouteSearchProps {
  origin: string;
  destination: string;
  onOriginChange: (val: string) => void;
  onDestinationChange: (val: string) => void;
  onLoadDemo: () => void;
  onSearch: () => void;
  isSearching: boolean;
  isDemoActive: boolean;
}

export const RouteSearch: React.FC<RouteSearchProps> = ({
  origin,
  destination,
  onOriginChange,
  onDestinationChange,
  onLoadDemo,
  onSearch,
  isSearching,
  isDemoActive,
}) => {
  const [geoLocating, setGeoLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleUseLocation = () => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }
    setGeoLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLocating(false);
        const coordsStr = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)} (Current Location)`;
        onOriginChange(coordsStr);
      },
      (err) => {
        setGeoLocating(false);
        setLocationError(`Location access ${err.code === 1 ? 'denied by user' : 'unavailable'}`);
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center space-x-2">
          <Footprints className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-300">
            Route Finder & Urban Scenarios
          </h2>
        </div>

        {/* 1-Click Demo Button */}
        <button
          onClick={onLoadDemo}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
            isDemoActive
              ? 'bg-emerald-500 text-night-950 ring-2 ring-emerald-400/40 shadow-emerald-500/20'
              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          }`}
          title="Instantly loads pre-calibrated urban scenario with lighting & incident proxy data"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Load Evening Demo Scenario</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Origin */}
        <div className="md:col-span-5 relative">
          <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center justify-between">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>Origin / Starting Point</span>
            </span>
            <button
              onClick={handleUseLocation}
              disabled={geoLocating}
              className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
            >
              <Navigation className="w-2.5 h-2.5" />
              <span>{geoLocating ? 'Locating...' : 'Use My GPS'}</span>
            </button>
          </label>
          <div className="relative">
            <input
              type="text"
              value={origin}
              onChange={(e) => onOriginChange(e.target.value)}
              placeholder="e.g., Downtown Metro Station"
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Arrow / Swap indicator */}
        <div className="hidden md:flex md:col-span-1 justify-center pt-5">
          <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
            →
          </div>
        </div>

        {/* Destination */}
        <div className="md:col-span-5 relative">
          <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-red-400" />
            <span>Destination</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={destination}
              onChange={(e) => onDestinationChange(e.target.value)}
              placeholder="e.g., University Innovation Hub & Library"
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Search Action */}
        <div className="md:col-span-1 pt-1 md:pt-5">
          <button
            onClick={onSearch}
            disabled={isSearching}
            className="w-full h-9 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 disabled:opacity-50 text-night-950 font-bold text-xs rounded-xl flex items-center justify-center transition-all shadow-lg shadow-emerald-500/20"
            title="Search Routes"
          >
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-night-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Search className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {locationError && (
        <p className="mt-2 text-[11px] text-amber-400/90 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
          Notice: {locationError}. You can type any location name or use the demo scenario.
        </p>
      )}

      {isDemoActive && (
        <div className="mt-2.5 flex items-center justify-between text-[11px] bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="text-slate-400">
            Demo Scenario: <strong className="text-slate-200">Downtown Transit Corridor to Innovation Center</strong> (Evening 21:00)
          </span>
          <span className="text-emerald-400 font-medium">3 Routes Calibrated</span>
        </div>
      )}
    </div>
  );
};
