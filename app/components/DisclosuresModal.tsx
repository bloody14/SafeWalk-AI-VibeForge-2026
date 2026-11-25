"use client";

import React from 'react';
import { X, ShieldCheck, Database, FileText, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

interface DisclosuresModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclosuresModal: React.FC<DisclosuresModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5 sm:p-7 shadow-2xl text-white relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-5">
          {/* Header */}
          <div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">SafeWalk AI — Transparency & Data Disclosures</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Official disclosures, dataset provenance, and algorithmic honesty guidelines.
            </p>
          </div>

          {/* Core Product Rule */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1.5">
            <div className="font-bold flex items-center space-x-1.5 text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Route Awareness vs. Safety Guarantee</span>
            </div>
            <p className="leading-relaxed">
              SafeWalk AI provides comparative urban route-awareness indicators to help individuals choose between walking paths based on lighting, footfall proxies, and community observations. It is <strong>NOT a crime prediction model</strong> and offers <strong>NO GUARANTEE of personal safety</strong>. Missing information is never interpreted as either safe or dangerous.
            </p>
          </div>

          {/* Data Provenance Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1.5">
              <Database className="w-3.5 h-3.5 text-sky-400" />
              <span>Dataset Provenance & Classification</span>
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70 text-xs">
              <table className="w-full text-left">
                <thead className="border-b border-slate-800 bg-slate-900 text-slate-400 text-[10px] uppercase">
                  <tr>
                    <th className="p-2.5">Indicator</th>
                    <th className="p-2.5">Classification</th>
                    <th className="p-2.5">Source / Provider</th>
                    <th className="p-2.5">Freshness / Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
                  <tr>
                    <td className="p-2.5 font-medium text-white">Map Geometry & Tiles</td>
                    <td className="p-2.5"><span className="px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">PUBLIC</span></td>
                    <td className="p-2.5">OpenStreetMap Contributors</td>
                    <td className="p-2.5">Live standard tile layer (tile.openstreetmap.org)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white">Street Lighting Layer</td>
                    <td className="p-2.5"><span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">DEMO / SIMULATED</span></td>
                    <td className="p-2.5">Simulated Luminaire Proxy</td>
                    <td className="p-2.5">Demonstration proxy (not real-time measured lux)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white">Reported Incidents</td>
                    <td className="p-2.5"><span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">DEMO / SIMULATED</span></td>
                    <td className="p-2.5">Simulated Incident Sample</td>
                    <td className="p-2.5">Demonstration sample (not verified police dispatch feed)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white">Pedestrian Footfall</td>
                    <td className="p-2.5"><span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">DEMO PROXY</span></td>
                    <td className="p-2.5">Commercial Footfall Proxy</td>
                    <td className="p-2.5">Calibrated evening proxy (no live pedestrian tracking)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white">Post-Walk Feedback</td>
                    <td className="p-2.5"><span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">UNVERIFIED</span></td>
                    <td className="p-2.5">Local User Submissions</td>
                    <td className="p-2.5">Device localStorage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pre-existing Resource Disclosure */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Contest Implementation Disclosure</span>
            </h3>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
              <p>
                <strong>Fresh Implementation:</strong> The entire application code in <code>app/</code> (Next.js, React components, Leaflet interactive map, awareness heuristics, API endpoints) was created fresh during the official competition window starting 2026-11-25 11:18 AM IST.
              </p>
              <p>
                <strong>Pre-contest Concept Disclosure:</strong> An earlier conceptual idea was previously explored with static vanilla HTML. Per organizer guidelines, zero code, assets, or screenshots from the prior exploration were reused.
              </p>
            </div>
          </div>

          {/* Gemini AI Integration Architecture */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
              <span>Server-Side Gemini AI & Privacy Hygiene</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When configured with a <code>GEMINI_API_KEY</code>, the server route <code>/api/ai/route-explanation</code> invokes Gemini 1.5 Flash to synthesize plain-English condition trade-offs. The API key is kept exclusively on the server and is never exposed in client bundles. If the key is absent or unreachable, the system automatically falls back to deterministic rule-based analysis.
            </p>
          </div>

          <div className="pt-2 text-right">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-night-950 transition-all shadow-md"
            >
              Close Disclosures
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
