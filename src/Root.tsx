import React from 'react';
import { Composition } from 'remotion';
import { SaasFeatureDrop } from './templates/SaasFeatureDrop';
import { MobileAppShowcase } from './templates/MobileAppShowcase';
import { KineticPromo } from './templates/KineticPromo';
import { pulseAnalytics } from './clients';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SaasFeatureDrop"
        component={SaasFeatureDrop}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          brand: pulseAnalytics,
          aspectRatio: '16:9' as const,
          durationInFrames: 150,
          fps: 30
        }}
      />
      <Composition
        id="MobileAppShowcase"
        component={MobileAppShowcase}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          brand: pulseAnalytics,
          aspectRatio: '9:16' as const,
          durationInFrames: 150,
          fps: 30
        }}
      />
      <Composition
        id="KineticPromo"
        component={KineticPromo}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          brand: pulseAnalytics,
          aspectRatio: '1:1' as const,
          durationInFrames: 150,
          fps: 30
        }}
      />
    </>
  );
};
