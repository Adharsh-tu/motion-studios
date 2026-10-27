import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface DeviceMockupProps {
  type?: 'browser' | 'mobile';
  url?: string;
  brandColor?: string;
  accentColor?: string;
  startFrame?: number;
  children?: React.ReactNode;
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({
  type = 'browser',
  url = 'app.saas.io/metrics',
  brandColor = '#6366f1',
  accentColor = '#06b6d4',
  startFrame = 15,
  children
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 16, stiffness: 75, mass: 1.1 }
  });

  const scale = interpolate(entrance, [0, 1], [0.92, 1]);
  const translateY = interpolate(entrance, [0, 1], [40, 0]);
  const opacity = interpolate(frame - startFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  // Animated telemetry wave for chart
  const waveOffset = (frame * 1.5) % 100;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        boxShadow: `0 30px 70px -20px rgba(0,0,0,0.8), 0 0 50px -10px ${brandColor}33`,
        border: '1px solid rgba(255, 255, 255, 0.14)'
      }}
      className="w-full rounded-2xl bg-slate-900/90 backdrop-blur-xl overflow-hidden flex flex-col"
    >
      {/* Window Title Bar */}
      <div className="h-10 px-4 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-white/5 text-[11px] text-slate-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>https://{url}</span>
        </div>

        <div className="w-8" />
      </div>

      {/* Internal SaaS UI Mockup */}
      <div className="p-5 flex flex-col gap-4 relative">
        {children || (
          <>
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-white">Live Production Cluster</h4>
                <p className="text-xs text-slate-400">99.998% healthy across 48 pods</p>
              </div>
              <button
                style={{
                  background: `linear-gradient(135deg, ${brandColor}, ${accentColor})`,
                  boxShadow: `0 4px 15px ${brandColor}44`
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-lg flex items-center gap-1.5"
              >
                <span>Deploy Hotfix</span>
              </button>
            </div>

            {/* Sparkline & Bar Chart */}
            <div className="h-28 w-full rounded-xl bg-slate-950/60 border border-white/5 p-3 flex flex-col justify-between relative overflow-hidden">
              <svg className="w-full h-16 overflow-visible" viewBox="0 0 300 60" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={brandColor} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={brandColor} stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,45 Q50,15 100,35 T200,20 T300,10 L300,60 L0,60 Z"
                  fill="url(#chartGradient)"
                />
                <path
                  d="M0,45 Q50,15 100,35 T200,20 T300,10"
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="2.5"
                />
                <circle cx="200" cy="20" r="3.5" fill="#FFFFFF" stroke={accentColor} strokeWidth="2" />
              </svg>

              <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span>00:00:00</span>
                <span>00:15:00</span>
                <span className="text-emerald-400 font-semibold">● ACTIVE STREAM</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
