import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CompositionProps } from '../types/motion';
import { KineticTypography } from '../components/KineticTypography';

export const MobileAppShowcase: React.FC<CompositionProps> = ({
  brand,
  aspectRatio
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const phoneEntrance = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, stiffness: 80, mass: 1 }
  });

  const phoneY = interpolate(phoneEntrance, [0, 1], [120, 0]);
  const phoneScale = interpolate(phoneEntrance, [0, 1], [0.85, 1]);

  // Cinematic vertical screenshot scroll
  const scrollOffset = interpolate(
    frame,
    [30, durationInFrames - 20],
    [0, -240],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Floating notification card entrance
  const notifEntrance = spring({
    frame: frame - 55,
    fps,
    config: { damping: 12, stiffness: 100 }
  });

  const notifScale = interpolate(notifEntrance, [0, 1], [0.8, 1]);
  const notifOpacity = interpolate(frame - 55, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at bottom, ${brand.bgGradient[0]} 0%, #000000 100%)`,
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
      }}
      className="p-6 md:p-10 flex flex-col items-center justify-between overflow-hidden select-none"
    >
      {/* Top Banner */}
      <div className="w-full flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <div
            style={{ backgroundColor: brand.primaryColor }}
            className="w-3 h-3 rounded-full animate-ping"
          />
          <span className="text-white font-bold tracking-tight text-base">{brand.name}</span>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
          iOS & Android
        </span>
      </div>

      {/* Kinetic Headline */}
      <div className="text-center z-20 max-w-md my-2">
        <KineticTypography
          text={brand.tagline}
          startFrame={5}
          highlightWords={['viral', 'reach,', 'reels', 'conversion', 'intelligence', 'scale']}
          highlightColor={brand.secondaryColor}
          className="text-2xl sm:text-3xl text-center justify-center font-extrabold"
        />
      </div>

      {/* Center Phone Container */}
      <div
        style={{
          transform: `translateY(${phoneY}px) scale(${phoneScale})`,
          boxShadow: `0 35px 80px -15px ${brand.primaryColor}55`,
          border: '4px solid #1e293b'
        }}
        className="w-72 sm:w-80 h-96 sm:h-[420px] rounded-[38px] bg-slate-950 p-3 relative flex flex-col overflow-hidden z-10"
      >
        {/* Dynamic Island / Notch */}
        <div className="w-24 h-5 rounded-full bg-slate-900 mx-auto mb-3 flex items-center justify-end px-3 shrink-0 z-30">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
        </div>

        {/* App Screen Content */}
        <div className="flex-1 rounded-[26px] bg-slate-950 overflow-hidden border border-white/10 relative flex flex-col">
          {brand.screenshotUrl ? (
            <div className="relative w-full h-full overflow-hidden bg-slate-900">
              <img
                src={brand.screenshotUrl}
                alt="App Screenshot"
                style={{
                  width: '100%',
                  height: 'auto',
                  transform: `translateY(${scrollOffset}px)`,
                  display: 'block'
                }}
              />
              {/* Subtle top/bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />
            </div>
          ) : (
            <div className="flex-1 p-4 flex flex-col justify-between bg-gradient-to-b from-slate-900 to-slate-950">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-slate-400 font-mono">WORKSPACE OVERVIEW</span>
                  <span className="text-xs text-emerald-400 font-bold">LIVE</span>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-white/10" />
                  <div className="h-3 w-1/2 rounded bg-white/5" />
                </div>
              </div>
            </div>
          )}

          {/* Floating Action Metric Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: 14,
              left: 10,
              right: 10,
              opacity: notifOpacity,
              transform: `scale(${notifScale})`,
              boxShadow: `0 15px 35px -5px ${brand.primaryColor}88, 0 0 25px ${brand.secondaryColor}44`,
              border: `1.5px solid ${brand.secondaryColor}`
            }}
            className="p-3 rounded-2xl bg-slate-950/95 backdrop-blur-xl z-20"
          >
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-bold text-slate-200">{brand.metric.label}</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {brand.metric.growth}
              </span>
            </div>
            <div className="text-2xl font-black text-white flex items-baseline gap-0.5">
              <span>{brand.metric.prefix}</span>
              <span>{brand.metric.value}</span>
              <span>{brand.metric.suffix}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="z-20 w-full flex items-center justify-between pt-2">
        <span className="text-xs text-slate-400">Available on TestFlight & Play Store</span>
        <button
          style={{ background: brand.primaryColor }}
          className="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg shadow-indigo-500/25"
        >
          {brand.ctaText}
        </button>
      </div>
    </AbsoluteFill>
  );
};
