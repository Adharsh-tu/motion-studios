import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CompositionProps } from '../types/motion';
import { KineticTypography } from '../components/KineticTypography';
import { DeviceMockup } from '../components/DeviceMockup';
import { MetricCounter } from '../components/MetricCounter';
import { CursorPointer } from '../components/CursorPointer';
import { ThreeProductStage } from '../components/ThreeProductStage';

export const SaasFeatureDrop: React.FC<CompositionProps> = ({
  brand,
  aspectRatio
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Background radial breathing pulse
  const bgPulse = Math.sin(frame * 0.05) * 0.15 + 0.85;

  // Scene transition out at the end
  const sceneFade = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const isVertical = aspectRatio === '9:16';

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 30%, ${brand.bgGradient[0]} 0%, ${brand.bgGradient[1]} 100%)`,
        opacity: sceneFade,
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
      }}
      className="p-6 md:p-12 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Dynamic Ambient Background Glows */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '25%',
          width: '50%',
          height: '50%',
          borderRadius: '9999px',
          background: brand.primaryColor,
          filter: 'blur(120px)',
          opacity: 0.25 * bgPulse,
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '15%',
          width: '40%',
          height: '40%',
          borderRadius: '9999px',
          background: brand.secondaryColor,
          filter: 'blur(110px)',
          opacity: 0.2 * bgPulse,
          pointerEvents: 'none'
        }}
      />

      {/* Top Header / Client Brand Badge */}
      <div className="relative z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            style={{
              background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.accentColor})`,
              boxShadow: `0 0 25px ${brand.primaryColor}88`
            }}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm tracking-tighter"
          >
            {brand.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <span className="text-white font-bold text-base tracking-tight">{brand.name}</span>
            <span className="text-xs text-slate-400 block font-mono">v3.4 Release</span>
          </div>
        </div>

        <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-white/90">
          PROMO 2026
        </div>
      </div>

      {/* Main Content Arena */}
      <div className={`relative z-10 flex ${isVertical ? 'flex-col gap-6' : 'flex-row items-center justify-between gap-8'} my-auto`}>
        {/* Left Column: Headlines & Metrics */}
        <div className={`flex flex-col gap-5 ${isVertical ? 'w-full' : 'w-1/2'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/30 w-fit">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Next-Gen SaaS</span>
          </div>

          <KineticTypography
            text={brand.tagline}
            startFrame={10}
            highlightWords={['telemetry', 'engineering', 'global', 'milliseconds', 'real-time']}
            highlightColor={brand.secondaryColor}
            className={`${isVertical ? 'text-2xl' : 'text-3xl lg:text-4xl'} leading-tight`}
          />

          <div className="mt-2 w-full max-w-sm">
            <MetricCounter
              value={brand.metric.value}
              suffix={brand.metric.suffix}
              label={brand.metric.label}
              growth={brand.metric.growth}
              startFrame={35}
              color={brand.primaryColor}
            />
          </div>
        </div>

        {/* Right Column: 3D Product Stage & Device Mockup */}
        <div className={`relative flex flex-col items-center justify-center ${isVertical ? 'w-full' : 'w-1/2'}`}>
          {/* Subtle 3D card accent */}
          <div className="absolute -top-12 -right-6 z-0 hidden sm:block">
            <ThreeProductStage
              color={brand.primaryColor}
              accentColor={brand.secondaryColor}
              width={160}
              height={160}
            />
          </div>

          <div className="w-full relative z-10">
            <DeviceMockup
              url={brand.url}
              brandColor={brand.primaryColor}
              accentColor={brand.accentColor}
              startFrame={25}
            />

            {/* Animated mouse clicker targeting the hotfix button */}
            <CursorPointer
              startFrame={45}
              clickFrame={80}
              startX={85}
              startY={90}
              targetX={86}
              targetY={18}
              color={brand.secondaryColor}
            />
          </div>
        </div>
      </div>

      {/* Bottom Call-to-Action Bar */}
      <div className="relative z-20 pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span>{brand.features[0]}</span>
          <span>•</span>
          <span>{brand.features[1]}</span>
        </div>

        <div
          style={{
            background: `linear-gradient(90deg, ${brand.primaryColor}, ${brand.accentColor})`,
            boxShadow: `0 8px 24px -6px ${brand.primaryColor}bb`
          }}
          className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white tracking-wide"
        >
          {brand.ctaText} →
        </div>
      </div>
    </AbsoluteFill>
  );
};
