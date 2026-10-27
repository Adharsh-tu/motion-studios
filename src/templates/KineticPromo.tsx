import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CompositionProps } from '../types/motion';
import { KineticTypography } from '../components/KineticTypography';

export const KineticPromo: React.FC<CompositionProps> = ({
  brand,
  aspectRatio
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Fast-cut stages:
  // 0 - 45: Statement 1
  // 45 - 90: Statement 2
  // 90 - 150: Brand climax & CTA

  const stage = frame < 45 ? 1 : frame < 90 ? 2 : 3;

  const badgeBounce = spring({
    frame: frame - 92,
    fps,
    config: { damping: 10, stiffness: 140 }
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#05070e',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
      }}
      className="p-8 flex flex-col justify-center items-center relative overflow-hidden select-none"
    >
      {/* Background kinetic grid pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${brand.primaryColor}22 1px, transparent 1px), linear-gradient(90deg, ${brand.primaryColor}22 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: `translateY(${(frame * 0.8) % 40}px)`
        }}
      />

      {/* Stage 1: Problem */}
      {stage === 1 && (
        <div className="z-10 text-center max-w-xl flex flex-col items-center gap-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            The Old Way Is Broken
          </span>
          <KineticTypography
            text="Cloud infrastructure is too slow, brittle, and expensive."
            startFrame={5}
            highlightWords={['slow,', 'expensive.']}
            highlightColor="#f43f5e"
            className="text-3xl sm:text-5xl text-center justify-center font-black"
          />
        </div>
      )}

      {/* Stage 2: The Solution */}
      {stage === 2 && (
        <div className="z-10 text-center max-w-xl flex flex-col items-center gap-4">
          <span
            style={{ color: brand.secondaryColor, borderColor: `${brand.secondaryColor}44`, backgroundColor: `${brand.secondaryColor}11` }}
            className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
          >
            The New Standard
          </span>
          <KineticTypography
            text={brand.tagline}
            startFrame={47}
            highlightWords={['telemetry', 'engineering', 'global', 'milliseconds']}
            highlightColor={brand.secondaryColor}
            className="text-3xl sm:text-5xl text-center justify-center font-black"
          />
        </div>
      )}

      {/* Stage 3: Climax & Brand Reveal */}
      {stage === 3 && (
        <div
          style={{
            transform: `scale(${interpolate(badgeBounce, [0, 1], [0.75, 1])})`,
            opacity: interpolate(frame - 92, [0, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          }}
          className="z-10 flex flex-col items-center text-center gap-6"
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.accentColor})`,
              boxShadow: `0 0 60px ${brand.primaryColor}88`
            }}
            className="w-20 h-20 rounded-3xl flex items-center justify-center text-white font-extrabold text-3xl shadow-2xl"
          >
            {brand.name.slice(0, 2).toUpperCase()}
          </div>

          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">{brand.name}</h1>
            <p className="text-slate-400 font-mono text-sm">{brand.url}</p>
          </div>

          <button
            style={{
              background: `linear-gradient(90deg, ${brand.primaryColor}, ${brand.secondaryColor})`,
              boxShadow: `0 10px 30px -5px ${brand.primaryColor}88`
            }}
            className="px-8 py-3.5 rounded-2xl text-base font-bold text-white shadow-xl hover:scale-105 active:scale-95 transition-transform"
          >
            {brand.ctaText} →
          </button>
        </div>
      )}
    </AbsoluteFill>
  );
};
