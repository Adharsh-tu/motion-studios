import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface CursorPointerProps {
  startFrame?: number;
  clickFrame?: number;
  startX?: number;
  startY?: number;
  targetX?: number;
  targetY?: number;
  color?: string;
}

export const CursorPointer: React.FC<CursorPointerProps> = ({
  startFrame = 45,
  clickFrame = 85,
  startX = 80,
  startY = 85,
  targetX = 50,
  targetY = 55,
  color = '#6366f1'
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Motion interpolation from start to target
  const moveProgress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 18, stiffness: 80, mass: 1 }
  });

  const posX = interpolate(moveProgress, [0, 1], [startX, targetX]);
  const posY = interpolate(moveProgress, [0, 1], [startY, targetY]);

  // Click bounce
  const clickSpring = spring({
    frame: frame - clickFrame,
    fps,
    config: { damping: 10, stiffness: 200 }
  });

  const clickScale = frame >= clickFrame
    ? interpolate(clickSpring, [0, 0.4, 1], [1, 0.78, 1])
    : 1;

  // Ripple ring
  const rippleProgress = frame >= clickFrame ? (frame - clickFrame) / 25 : 0;
  const rippleScale = interpolate(rippleProgress, [0, 1], [0.5, 2.8], {
    extrapolateRight: 'clamp'
  });
  const rippleOpacity = interpolate(rippleProgress, [0, 0.7, 1], [0.8, 0.4, 0], {
    extrapolateRight: 'clamp'
  });

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${posX}%`,
        top: `${posY}%`,
        transform: `translate(-2px, -2px) scale(${clickScale})`,
        zIndex: 50,
        pointerEvents: 'none'
      }}
    >
      {/* Click shockwave ripple */}
      {frame >= clickFrame && rippleProgress < 1 && (
        <div
          style={{
            position: 'absolute',
            left: 2,
            top: 2,
            width: 28,
            height: 28,
            borderRadius: '9999px',
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
            border: `2px solid ${color}`,
            backgroundColor: `${color}33`,
            opacity: rippleOpacity,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* SVG Modern Cursor */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
      >
        <path
          d="M5.5 3.2L18.8 11.2C19.7 11.8 19.4 13.2 18.3 13.4L13.1 14.1L16.2 20.3C16.6 21.1 15.8 21.9 15 21.5L12.3 20.1L9.4 14.7L5 17.5C4 18.1 2.8 17.3 3 16.2L5.5 3.2Z"
          fill="#FFFFFF"
          stroke="#0f172a"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
