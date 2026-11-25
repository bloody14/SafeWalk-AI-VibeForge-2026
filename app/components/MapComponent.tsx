"use client";

import React, { useEffect, useRef } from 'react';
import { RouteOption, MapMarkerPOI } from '../types';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  routes: RouteOption[];
  selectedRouteId: string;
  onSelectRoute: (id: string) => void;
  pois: MapMarkerPOI[];
}

export const MapComponent: React.FC<MapComponentProps> = ({
  routes,
  selectedRouteId,
  onSelectRoute,
  pois,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    let isMounted = true;

    import('leaflet').then((L) => {
      if (!isMounted) return;

      delete (L.Icon.Default.prototype as any)._getIconUrl;

      if (!leafletMapRef.current && mapContainerRef.current) {
        const defaultCenter: [number, number] = [37.779, -122.413];
        const map = L.map(mapContainerRef.current, {
          center: defaultCenter,
          zoom: 15,
          zoomControl: true,
        });

        // Use standard OpenStreetMap tiles (no API key required, reliable & crisp)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        const layerGroup = L.layerGroup().addTo(map);
        leafletMapRef.current = map;
        layerGroupRef.current = layerGroup;
      }

      const map = leafletMapRef.current;
      const layerGroup = layerGroupRef.current;
      if (!map || !layerGroup) return;

      layerGroup.clearLayers();

      const allLatLngs: [number, number][] = [];

      // Render routes
      routes.forEach((route) => {
        const isSelected = route.id === selectedRouteId;
        const isConditionAware = route.id === 'route-condition-aware';

        let color = '#64748b';
        let weight = isSelected ? 6 : 4;
        let opacity = isSelected ? 0.95 : 0.45;
        let dashArray = undefined;

        if (isConditionAware) {
          color = '#10b981'; // vibrant emerald
        } else if (route.id === 'route-fastest') {
          color = '#f59e0b'; // amber
          dashArray = '6, 8';
        } else {
          color = '#6366f1'; // indigo
          dashArray = '4, 6';
        }

        const polyline = L.polyline(route.geometry, {
          color,
          weight,
          opacity,
          dashArray,
          lineJoin: 'round',
        });

        polyline.on('click', () => {
          onSelectRoute(route.id);
        });

        polyline.bindTooltip(
          `<strong>${route.label}</strong><br/>${route.durationMinutes} min • Awareness: ${route.awarenessIndex}/100`,
          { sticky: true }
        );

        layerGroup.addLayer(polyline);

        route.geometry.forEach((pt) => allLatLngs.push(pt));
      });

      // Render start / end pins
      const startPt = routes[0]?.geometry[0];
      const endPt = routes[0]?.geometry[routes[0]?.geometry.length - 1];

      if (startPt) {
        const startIcon = L.divIcon({
          className: 'custom-pin-start',
          html: `<div style="background-color: #10b981; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px; border: 2px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.4);">A</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        const marker = L.marker(startPt, { icon: startIcon });
        marker.bindPopup(`<strong>Origin</strong><br/>Downtown Metro Station`);
        layerGroup.addLayer(marker);
      }

      if (endPt) {
        const endIcon = L.divIcon({
          className: 'custom-pin-end',
          html: `<div style="background-color: #ef4444; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px; border: 2px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.4);">B</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        const marker = L.marker(endPt, { icon: endIcon });
        marker.bindPopup(`<strong>Destination</strong><br/>University Innovation Hub & Library`);
        layerGroup.addLayer(marker);
      }

      // Render POIs
      pois.forEach((poi) => {
        let bgColor = '#3b82f6';
        let symbol = '💡';

        if (poi.type === 'light') {
          bgColor = '#eab308';
          symbol = '💡';
        } else if (poi.type === 'incident') {
          bgColor = '#f43f5e';
          symbol = '⚠️';
        } else if (poi.type === 'feedback') {
          bgColor = '#8b5cf6';
          symbol = '💬';
        } else if (poi.type === 'safe-hub') {
          bgColor = '#10b981';
          symbol = '🏪';
        }

        const poiIcon = L.divIcon({
          className: `custom-poi-${poi.id}`,
          html: `<div style="background-color: ${bgColor}; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); cursor: pointer;" title="${poi.title}">${symbol}</div>`,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });

        const marker = L.marker(poi.position, { icon: poiIcon });
        marker.bindPopup(`
          <div style="min-width: 190px; font-family: sans-serif; font-size: 12px;">
            <div style="font-weight: 700; color: #0f172a; margin-bottom: 3px;">${poi.title}</div>
            <div style="font-size: 10px; color: #64748b; margin-bottom: 6px;">
              <span style="background: #e2e8f0; padding: 1px 5px; border-radius: 4px; font-weight: 600;">${poi.status.toUpperCase()}</span>
            </div>
            <div style="color: #334155; line-height: 1.35;">${poi.description}</div>
          </div>
        `);
        layerGroup.addLayer(marker);
      });

      if (allLatLngs.length > 0) {
        map.fitBounds(allLatLngs, { padding: [40, 40] });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [routes, selectedRouteId, pois]);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-10 bg-slate-900/95 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl shadow-lg text-[11px] text-slate-300 max-w-[270px] sm:max-w-xs">
        <div className="font-semibold text-white mb-1.5 flex items-center justify-between">
          <span>Map Overlays</span>
          <span className="text-[9px] uppercase px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded">OpenStreetMap</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-3.5 h-1 bg-emerald-500 rounded"></span>
            <span>Condition-Aware Route (Active Blvd)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3.5 h-1 border-t-2 border-dashed border-amber-500"></span>
            <span>Fastest Route (Direct Alley)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3.5 h-1 border-t-2 border-dashed border-indigo-500"></span>
            <span>Transit Corridor Alternative</span>
          </div>
          <div className="flex items-center space-x-2 pt-1 border-t border-slate-800 text-[10px] text-slate-400">
            <span>💡 Lights</span>
            <span>⚠️ Incidents</span>
            <span>🏪 Safe Hubs</span>
            <span>💬 Community</span>
          </div>
        </div>
      </div>
    </div>
  );
};
