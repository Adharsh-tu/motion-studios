import React, { useRef, useState } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { AspectRatio, BrandConfig, TemplateId } from './types/motion';
import { instaGrowth, pulseAnalytics } from './clients';
import { SaasFeatureDrop } from './templates/SaasFeatureDrop';
import { MobileAppShowcase } from './templates/MobileAppShowcase';
import { KineticPromo } from './templates/KineticPromo';
import { MobileControlPanel } from './ui/MobileControlPanel';
import { exportCompositionToVideo, downloadBlob } from './utils/clientExporter';
import { Layers, Film, Clapperboard, ExternalLink } from 'lucide-react';

export const App: React.FC = () => {
  const [template, setTemplate] = useState<TemplateId>('mobile-app-showcase');
  const [brand, setBrand] = useState<BrandConfig>(instaGrowth);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportPercentage, setExportPercentage] = useState<number>(0);

  const playerRef = useRef<PlayerRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Resolution dimensions
  const getDimensions = () => {
    switch (aspectRatio) {
      case '9:16':
        return { width: 720, height: 1280, containerAspect: '9 / 16' };
      case '1:1':
        return { width: 1080, height: 1080, containerAspect: '1 / 1' };
      case '16:9':
      default:
        return { width: 1280, height: 720, containerAspect: '16 / 9' };
    }
  };

  const { width, height, containerAspect } = getDimensions();

  // Pick current composition component
  const getActiveComponent = () => {
    switch (template) {
      case 'mobile-app-showcase':
        return MobileAppShowcase;
      case 'kinetic-promo':
        return KineticPromo;
      case 'saas-feature-drop':
      default:
        return SaasFeatureDrop;
    }
  };

  const ActiveComponent = getActiveComponent();
  const DURATION_FRAMES = 150; // 5 seconds at 30 fps
  const FPS = 30;

  const handleExport = async () => {
    if (!containerRef.current || isExporting) return;
    setIsExporting(true);
    setExportPercentage(0);

    try {
      if (playerRef.current) {
        playerRef.current.seekTo(0);
        playerRef.current.play();
      }

      const blob = await exportCompositionToVideo(
        containerRef.current,
        DURATION_FRAMES,
        FPS,
        (progress) => {
          setExportPercentage(progress.percentage);
        }
      );

      const filename = `${brand.id}-${template}-${aspectRatio.replace(':', 'x')}.mp4`;
      downloadBlob(blob, filename);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#07090e] text-slate-100 overflow-hidden">
      {/* Top Studio Bar */}
      <header className="h-14 px-4 border-b border-white/10 flex items-center justify-between bg-slate-950/80 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Clapperboard className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>MotionStudio</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                ARM64 MOBILE
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-mono hidden sm:inline">
            {width}×{height} @ {FPS}fps
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </header>

      {/* Main Preview Viewport */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden relative">
        <div
          ref={containerRef}
          style={{
            aspectRatio: containerAspect,
            maxHeight: '100%',
            maxWidth: '100%'
          }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black flex items-center justify-center"
        >
          <Player
            ref={playerRef}
            component={ActiveComponent}
            inputProps={{
              brand,
              aspectRatio,
              durationInFrames: DURATION_FRAMES,
              fps: FPS
            }}
            durationInFrames={DURATION_FRAMES}
            fps={FPS}
            compositionWidth={width}
            compositionHeight={height}
            style={{
              width: '100%',
              height: '100%'
            }}
            controls
            autoPlay
            loop
          />
        </div>
      </main>

      {/* Mobile-Friendly Control Dock */}
      <footer className="shrink-0 w-full max-w-2xl mx-auto">
        <MobileControlPanel
          currentTemplate={template}
          onSelectTemplate={setTemplate}
          currentBrand={brand}
          onUpdateBrand={setBrand}
          aspectRatio={aspectRatio}
          onSelectAspectRatio={setAspectRatio}
          onExport={handleExport}
          isExporting={isExporting}
          exportPercentage={exportPercentage}
        />
      </footer>
    </div>
  );
};

export default App;
