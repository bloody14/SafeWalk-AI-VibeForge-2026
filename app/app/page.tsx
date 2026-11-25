"use client";

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '../components/Navbar';
import { DataTrustBanner } from '../components/DataTrustBanner';
import { RouteSearch } from '../components/RouteSearch';
import { RouteComparison } from '../components/RouteComparison';
import { AIExplanationCard } from '../components/AIExplanationCard';
import { CommunityObservationsPanel } from '../components/CommunityObservationsPanel';
import { FeedbackModal } from '../components/FeedbackModal';
import { DisclosuresModal } from '../components/DisclosuresModal';
import {
  DEMO_ORIGIN,
  DEMO_DESTINATION,
  DEMO_ROUTE_AWARE,
  DEMO_ROUTE_FASTEST,
  DEMO_ROUTE_TRANSIT,
  INITIAL_MAP_POIS,
  INITIAL_COMMUNITY_FEEDBACK,
} from '../data/demoData';
import { RouteOption, MapMarkerPOI, JourneyFeedback, AIExplanationResponse } from '../types';

// Dynamic import of Leaflet MapComponent with SSR disabled
const MapComponent = dynamic(
  () => import('../components/MapComponent').then((mod) => mod.MapComponent),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] sm:h-[480px] lg:h-[540px] rounded-2xl bg-slate-950 flex flex-col items-center justify-center border border-slate-800 text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mb-2"></div>
        <span className="text-xs">Loading Interactive OpenStreetMap...</span>
      </div>
    ),
  }
);

export default function SafeWalkHomePage() {
  const [origin, setOrigin] = useState(DEMO_ORIGIN.name);
  const [destination, setDestination] = useState(DEMO_DESTINATION.name);
  const [routes, setRoutes] = useState<RouteOption[]>([
    DEMO_ROUTE_AWARE,
    DEMO_ROUTE_FASTEST,
    DEMO_ROUTE_TRANSIT,
  ]);
  const [selectedRouteId, setSelectedRouteId] = useState<string>(DEMO_ROUTE_AWARE.id);
  const [pois, setPois] = useState<MapMarkerPOI[]>(INITIAL_MAP_POIS);
  const [feedbackList, setFeedbackList] = useState<JourneyFeedback[]>([]);
  const [isDemoActive, setIsDemoActive] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // AI Explanation State
  const [explanationData, setExplanationData] = useState<AIExplanationResponse | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  // Modals
  const [feedbackModalRoute, setFeedbackModalRoute] = useState<RouteOption | null>(null);
  const [showDisclosuresModal, setShowDisclosuresModal] = useState(false);

  // Load community feedback from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('safewalk_community_feedback');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setFeedbackList(parsed);
          return;
        }
      }
    } catch {
      // Ignore read errors
    }
    setFeedbackList(INITIAL_COMMUNITY_FEEDBACK);
  }, []);

  const selectedRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];
  const comparisonRoute = routes.find((r) => r.id !== selectedRouteId) || routes[1];

  // Fetch AI explanation for selected route
  const fetchExplanation = useCallback(async (route: RouteOption, comp?: RouteOption) => {
    setIsExplaining(true);
    try {
      const res = await fetch('/api/ai/route-explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedRoute: route,
          comparisonRoute: comp,
        }),
      });

      if (res.ok) {
        const data: AIExplanationResponse = await res.json();
        setExplanationData(data);
      } else {
        throw new Error('API response failed');
      }
    } catch {
      setExplanationData({
        explanation: `${route.label} evaluated using deterministic baseline rules. Lighting level: ${route.factors.lighting.level}. Reported incidents: ${route.factors.reportedIncidents.count}.`,
        tradeOffSummary: `Compare travel duration against verified infrastructure and footfall attributes.`,
        limitations: `Observational proxy data. SafeWalk is a route awareness platform and does not guarantee safety or predict crime.`,
        provider: 'fallback',
        modelUsed: 'Rule-Based Fallback Engine',
      });
    } finally {
      setIsExplaining(false);
    }
  }, []);

  // Run initial explanation on load or route change
  useEffect(() => {
    if (selectedRoute) {
      fetchExplanation(selectedRoute, comparisonRoute);
    }
  }, [selectedRouteId, fetchExplanation]);

  // Handle One-Click Demo Load
  const handleLoadDemo = () => {
    setOrigin(DEMO_ORIGIN.name);
    setDestination(DEMO_DESTINATION.name);
    setRoutes([DEMO_ROUTE_AWARE, DEMO_ROUTE_FASTEST, DEMO_ROUTE_TRANSIT]);
    setSelectedRouteId(DEMO_ROUTE_AWARE.id);
    setIsDemoActive(true);
  };

  // Handle Route Search
  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate real route resolution with slight delay
    setTimeout(() => {
      setIsSearching(false);
      // Keep working calibrated routes with user labels
      const updatedRoutes = routes.map((r, idx) => ({
        ...r,
        tagline: idx === 0
          ? `Condition-aware walk between ${origin.split(' ')[0]} and ${destination.split(' ')[0]}`
          : `Fastest direct route between ${origin.split(' ')[0]} and ${destination.split(' ')[0]}`,
      }));
      setRoutes(updatedRoutes);
      setSelectedRouteId(updatedRoutes[0].id);
    }, 600);
  };

  // Handle Feedback Submission
  const handleFeedbackSubmitted = (newFeedback: JourneyFeedback) => {
    setFeedbackList((prev) => [newFeedback, ...prev]);

    // Also add as a map marker on the current route
    const currentRoute = routes.find((r) => r.id === newFeedback.routeId);
    if (currentRoute && currentRoute.geometry.length > 2) {
      const midPoint = currentRoute.geometry[Math.floor(currentRoute.geometry.length / 2)];
      const newPoi: MapMarkerPOI = {
        id: `poi-${Date.now()}`,
        position: midPoint,
        type: 'feedback',
        title: `Community Feedback: ${newFeedback.routeName}`,
        description: `Lighting: ${newFeedback.lighting} • Activity: ${newFeedback.pedestrianActivity} • Note: ${newFeedback.comment || 'Clear path'}`,
        status: 'community-unverified',
      };
      setPois((prev) => [newPoi, ...prev]);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-night-950 overflow-x-hidden">
      {/* Navbar */}
      <Navbar
        onOpenDisclosures={() => setShowDisclosuresModal(true)}
        geminiActive={explanationData?.provider === 'gemini'}
      />

      {/* Data Trust & Truth Banner */}
      <DataTrustBanner />

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        {/* Route Search & Scenario Selector */}
        <RouteSearch
          origin={origin}
          destination={destination}
          onOriginChange={setOrigin}
          onDestinationChange={setDestination}
          onLoadDemo={handleLoadDemo}
          onSearch={handleSearch}
          isSearching={isSearching}
          isDemoActive={isDemoActive}
        />

        {/* Top Grid: Interactive Map + Route Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Map Column (7 cols on lg) */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Interactive Route Map & Infrastructure
              </span>
              <span className="text-[11px] text-emerald-400">
                Active: {selectedRoute?.label}
              </span>
            </div>
            <MapComponent
              routes={routes}
              selectedRouteId={selectedRouteId}
              onSelectRoute={setSelectedRouteId}
              pois={pois}
            />
          </div>

          {/* AI Intelligence & Feedback Summary (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            {/* AI Explanation Card */}
            <AIExplanationCard
              explanationData={explanationData}
              isLoading={isExplaining}
              onRefresh={() => fetchExplanation(selectedRoute, comparisonRoute)}
              selectedRouteLabel={selectedRoute?.label || 'Selected Route'}
            />

            {/* Community Observations Panel */}
            <CommunityObservationsPanel
              feedbackList={feedbackList}
              onOpenFeedbackModal={() => setFeedbackModalRoute(selectedRoute)}
            />
          </div>
        </div>

        {/* Bottom Section: Side-by-Side Detailed Route Comparison */}
        <div className="pt-2">
          <RouteComparison
            routes={routes}
            selectedRouteId={selectedRouteId}
            onSelectRoute={setSelectedRouteId}
            onStartJourney={(route) => setFeedbackModalRoute(route)}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-night-950 text-slate-400 text-xs py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="text-white font-semibold">SafeWalk AI</span> — Route Awareness Platform
            <p className="text-[11px] text-slate-500 mt-0.5">
              Built for VibeForge 2026. Map data &copy; OpenStreetMap contributors.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <button
              onClick={() => setShowDisclosuresModal(true)}
              className="text-slate-400 hover:text-emerald-400 underline"
            >
              Data Disclosures & Rules
            </button>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500">Heuristic Awareness, Not Crime Prediction</span>
          </div>
        </div>
      </footer>

      {/* Post-Journey Feedback Modal */}
      <FeedbackModal
        isOpen={!!feedbackModalRoute}
        onClose={() => setFeedbackModalRoute(null)}
        route={feedbackModalRoute}
        onFeedbackSubmitted={handleFeedbackSubmitted}
      />

      {/* Disclosures & Architecture Modal */}
      <DisclosuresModal
        isOpen={showDisclosuresModal}
        onClose={() => setShowDisclosuresModal(false)}
      />
    </main>
  );
}
