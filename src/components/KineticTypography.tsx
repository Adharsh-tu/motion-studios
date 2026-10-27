import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface KineticTypographyProps {
  text: string;
  startFrame?: number;
  highlightWords?: string[];
  highlightColor?: string;
  className?: string;
}

export const KineticTypography: React.FC<KineticTypographyProps> = ({
  text,
  startFrame = 10,
  highlightWords = [],
  highlightColor = '#6366f1',
  className = ''
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(' ');

  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-bold ${className}`}>
      {words.map((word, index) => {
        const wordDelay = startFrame + index * 4;
        const progress = spring({
          frame: frame - wordDelay,
          fps,
          config: {
            damping: 15,
            stiffness: 120,
            mass: 0.6
          }
        });

        const opacity = interpolate(
          frame - wordDelay,
          [0, 8],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        const translateY = interpolate(progress, [0, 1], [24, 0]);
        const scale = interpolate(progress, [0, 1], [0.8, 1]);

        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
        );

        return (
          <span
            key={`${word}-${index}`}
            style={{
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
              display: 'inline-block',
              color: isHighlight ? highlightColor : '#FFFFFF',
              textShadow: isHighlight
                ? `0 0 25px ${highlightColor}88, 0 0 45px ${highlightColor}44`
                : 'none'
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
