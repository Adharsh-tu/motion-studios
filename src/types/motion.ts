export type TemplateId = 'saas-feature-drop' | 'mobile-app-showcase' | 'kinetic-promo';

export type AspectRatio = '16:9' | '9:16' | '1:1';

export interface BrandConfig {
  id: string;
  name: string;
  clientName: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgGradient: [string, string];
  metric: {
    value: number;
    prefix?: string;
    suffix?: string;
    label: string;
    growth: string;
  };
  features: string[];
  ctaText: string;
  url: string;
  logoSvg?: string;
  accentGlow?: string;
}

export interface CompositionProps {
  brand: BrandConfig;
  aspectRatio: AspectRatio;
  durationInFrames: number;
  fps: number;
}
