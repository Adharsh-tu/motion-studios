import { BrandConfig } from '../types/motion';

export const pulseAnalytics: BrandConfig = {
  id: 'pulse-analytics',
  name: 'Pulse AI',
  clientName: 'Pulse Analytics Inc.',
  tagline: 'Real-time telemetry for next-gen engineering teams',
  primaryColor: '#6366f1', // Indigo
  secondaryColor: '#06b6d4', // Cyan
  accentColor: '#a855f7', // Purple
  bgGradient: ['#090a16', '#030712'],
  metric: {
    value: 94.8,
    prefix: '',
    suffix: '%',
    label: 'Incident Resolution Speed',
    growth: '+4.2x Faster'
  },
  features: [
    'Autonomous Anomaly Detection',
    'Distributed Trace Graphing',
    'Instant Root Cause Analysis'
  ],
  ctaText: 'Start Monitoring Free',
  url: 'pulse.dev/start',
  accentGlow: 'rgba(99, 102, 241, 0.35)'
};

export const auroraCloud: BrandConfig = {
  id: 'aurora-cloud',
  name: 'Aurora Cloud',
  clientName: 'Aurora Engine Systems',
  tagline: 'Edge compute scaled across 300+ global regions in milliseconds',
  primaryColor: '#10b981', // Emerald
  secondaryColor: '#06b6d4', // Cyan
  accentColor: '#f59e0b', // Amber
  bgGradient: ['#022c22', '#020617'],
  metric: {
    value: 12.4,
    prefix: '',
    suffix: 'ms',
    label: 'Global Edge Latency',
    growth: '-78% Lower'
  },
  features: [
    'Zero-Cold-Start Serverless',
    'Automatic Distributed DB Replication',
    'AI Inference at the Edge'
  ],
  ctaText: 'Deploy in 30 Seconds',
  url: 'aurora.sh/deploy',
  accentGlow: 'rgba(16, 185, 129, 0.35)'
};

export const defaultClients: Record<string, BrandConfig> = {
  'pulse-analytics': pulseAnalytics,
  'aurora-cloud': auroraCloud
};
