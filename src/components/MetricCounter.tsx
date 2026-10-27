import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface MetricCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  growth: string;
  startFrame?: number;
  color?: string;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  label,
  growth,
  startFrame = 30,
  color = '#6366f1'
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 14,
      stiffness: 90,
      mass: 0.8
    }
  });

  const animatedValue = interpolate(
    frame - startFrame,
    [0, 45],
    [0, value],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );

  const opacity = interpolate(
    frame - startFrame,
    [0, 15],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const scale = interpolate(entrance, [0, 1], [0.85, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${(1 - entrance) * 20}px)`,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: `0 20px 40px -15px ${color}33, 0 0 20px -5px ${color}22`,
      }}
      className="p-5 rounded-2xl flex flex-col items-start gap-1 relative overflow-hidden"
    >
      <div 
        className="absolute top-0 left-0 right-0 h-[2px]" 
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} 
      />
      <div className="flex items-center justify-between w-full mb-1">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
          {label}
        </span>
        <span 
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ 
            backgroundColor: `${color}22`, 
            color: color, 
            border: `1px solid ${color}44` 
          }}
        >
          {growth}
        </span>
      </div>
      <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-baseline gap-0.5">
        <span>{prefix}</span>
        <span>
          {Number.isInteger(value)
            ? Math.round(animatedValue).toLocaleString()
            : animatedValue.toFixed(1)}
        </span>
        <span className="text-xl sm:text-2xl text-slate-300 font-semibold">{suffix}</span>
      </div>
    </div>
  );
};
