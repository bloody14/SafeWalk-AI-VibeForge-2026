"use client";

import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, Sun, Users, AlertTriangle, Send } from 'lucide-react';
import { JourneyFeedback, RouteOption } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  route: RouteOption | null;
  onFeedbackSubmitted: (feedback: JourneyFeedback) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  route,
  onFeedbackSubmitted,
}) => {
  const [lighting, setLighting] = useState<'good' | 'mixed' | 'poor' | 'not-sure'>('good');
  const [activity, setActivity] = useState<'busy' | 'moderate' | 'quiet' | 'not-sure'>('busy');
  const [obstructions, setObstructions] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen || !route) return null;

  const toggleObstruction = (item: string) => {
    if (item === 'none') {
      setObstructions(['none']);
      return;
    }
    const filtered = obstructions.filter((o) => o !== 'none');
    if (filtered.includes(item)) {
      setObstructions(filtered.filter((o) => o !== item));
    } else {
      setObstructions([...filtered, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Call optional classify endpoint
    let suggestedTag = "Community Report";
    try {
      const res = await fetch('/api/ai/classify-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment,
          lighting,
          pedestrianActivity: activity,
          obstructions,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        suggestedTag = data.suggestedTag || suggestedTag;
      }
    } catch {
      // Ignore API failure, proceed with local save
    }

    const newFeedback: JourneyFeedback = {
      id: `fb-${Date.now()}`,
      routeId: route.id,
      routeName: route.label,
      submittedAt: new Date().toISOString(),
      lighting,
      pedestrianActivity: activity,
      obstructions: obstructions.length > 0 ? obstructions : ['none'],
      comment: comment.trim() || undefined,
      verificationStatus: 'unverified',
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem('safewalk_community_feedback');
      const parsed: JourneyFeedback[] = existing ? JSON.parse(existing) : [];
      parsed.unshift(newFeedback);
      localStorage.setItem('safewalk_community_feedback', JSON.stringify(parsed));
    } catch (err) {
      console.warn("localStorage write error:", err);
    }

    setIsSubmitting(false);
    setSubmittedSuccess(true);
    onFeedbackSubmitted(newFeedback);

    setTimeout(() => {
      setSubmittedSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-5 sm:p-6 shadow-2xl text-white relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Journey Completed!</h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Thank you! Your feedback has been stored locally in browser storage and added to the community observation layer with an <span className="text-purple-400 font-semibold">[UNVERIFIED]</span> badge.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                  Post-Journey Review
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                Share Conditions on: {route.label}
              </h3>
              <p className="text-xs text-slate-400">
                Help other walkers understand lighting and street activity.
              </p>
            </div>

            {/* Lighting Rating */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center space-x-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Observed Street Lighting</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 'good', label: 'Bright / Good' },
                  { value: 'mixed', label: 'Variable' },
                  { value: 'poor', label: 'Dim / Dark' },
                  { value: 'not-sure', label: 'Not Sure' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setLighting(item.value as any)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-medium border transition-all ${
                      lighting === item.value
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-1 ring-amber-500/40'
                        : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pedestrian Footfall */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-sky-400" />
                <span>Pedestrian Activity</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 'busy', label: 'Busy / Active' },
                  { value: 'moderate', label: 'Moderate' },
                  { value: 'quiet', label: 'Quiet / Isolated' },
                  { value: 'not-sure', label: 'Not Sure' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setActivity(item.value as any)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-medium border transition-all ${
                      activity === item.value
                        ? 'bg-sky-500/20 border-sky-500 text-sky-300 ring-1 ring-sky-500/40'
                        : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Obstructions / Flags */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Pathway Observations & Obstructions</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'none', label: 'Clear & Open' },
                  { id: 'dim-light', label: 'Burnt Out Lamp' },
                  { id: 'construction', label: 'Construction / Fencing' },
                  { id: 'isolated', label: 'Isolated Stretch' },
                  { id: 'closed-shops', label: 'Early Closed Shops' },
                ].map((item) => {
                  const isChecked = obstructions.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleObstruction(item.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                        isChecked
                          ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                <span>Notes for Other Walkers (Optional)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                placeholder="e.g. Broad sidewalks, busy transit stop at the corner, good evening visibility."
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Disclosure Notice */}
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[10px] text-slate-400 leading-tight">
              <strong>Local Persistence:</strong> Submissions are stored in your browser's local storage for this demo prototype. They are tagged as <em>Unverified Community Observations</em> and do not alter official municipal records.
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-night-950 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Observation'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
