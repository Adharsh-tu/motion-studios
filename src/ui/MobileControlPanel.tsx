import React, { useState } from 'react';
import { AspectRatio, BrandConfig, TemplateId } from '../types/motion';
import { defaultClients } from '../clients';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Smartphone, 
  Monitor, 
  Square, 
  Sparkles, 
  Palette, 
  Sliders, 
  Share2,
  FileCode2
} from 'lucide-react';

interface MobileControlPanelProps {
  currentTemplate: TemplateId;
  onSelectTemplate: (t: TemplateId) => void;
  currentBrand: BrandConfig;
  onUpdateBrand: (b: BrandConfig) => void;
  aspectRatio: AspectRatio;
  onSelectAspectRatio: (ar: AspectRatio) => void;
  onExport: () => void;
  isExporting: boolean;
  exportPercentage: number;
}

export const MobileControlPanel: React.FC<MobileControlPanelProps> = ({
  currentTemplate,
  onSelectTemplate,
  currentBrand,
  onUpdateBrand,
  aspectRatio,
  onSelectAspectRatio,
  onExport,
  isExporting,
  exportPercentage
}) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'brand' | 'export'>('templates');

  return (
    <div className="w-full bg-slate-900/95 backdrop-blur-2xl border-t border-white/10 p-4 flex flex-col gap-3 rounded-t-3xl shadow-2xl z-30">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'templates'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Templates</span>
          </button>

          <button
            onClick={() => setActiveTab('brand')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'brand'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Brand & Client</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'export'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>

        {/* Aspect Ratio Switcher */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => onSelectAspectRatio('16:9')}
            title="16:9 Landscape (YouTube/Web)"
            className={`p-1.5 rounded-lg transition-all ${
              aspectRatio === '16:9' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onSelectAspectRatio('9:16')}
            title="9:16 Vertical (Reels/Shorts/TikTok)"
            className={`p-1.5 rounded-lg transition-all ${
              aspectRatio === '9:16' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onSelectAspectRatio('1:1')}
            title="1:1 Square (Instagram/Feed)"
            className={`p-1.5 rounded-lg transition-all ${
              aspectRatio === '1:1' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Square className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tab Content: Templates */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onSelectTemplate('saas-feature-drop')}
            className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
              currentTemplate === 'saas-feature-drop'
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-white/5 bg-slate-950/50 hover:border-white/20'
            }`}
          >
            <span className="text-[11px] font-bold text-white leading-tight">SaaS Feature Drop</span>
            <span className="text-[9px] text-slate-400">UI Mockup + Metrics</span>
          </button>

          <button
            onClick={() => onSelectTemplate('mobile-app-showcase')}
            className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
              currentTemplate === 'mobile-app-showcase'
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-white/5 bg-slate-950/50 hover:border-white/20'
            }`}
          >
            <span className="text-[11px] font-bold text-white leading-tight">App Showcase</span>
            <span className="text-[9px] text-slate-400">3D Device + Notch</span>
          </button>

          <button
            onClick={() => onSelectTemplate('kinetic-promo')}
            className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
              currentTemplate === 'kinetic-promo'
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-white/5 bg-slate-950/50 hover:border-white/20'
            }`}
          >
            <span className="text-[11px] font-bold text-white leading-tight">Kinetic Promo</span>
            <span className="text-[9px] text-slate-400">Fast-cut Typography</span>
          </button>
        </div>
      )}

      {/* Tab Content: Brand & Clients */}
      {activeTab === 'brand' && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Client Brand Preset:</span>
            <div className="flex gap-2">
              {Object.entries(defaultClients).map(([key, client]) => (
                <button
                  key={key}
                  onClick={() => onUpdateBrand(client)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                    currentBrand.id === client.id
                      ? 'border-indigo-500 bg-indigo-500/20 text-white'
                      : 'border-white/10 text-slate-400'
                  }`}
                >
                  {client.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] text-slate-400 font-mono">Brand Name</label>
              <input
                type="text"
                value={currentBrand.name}
                onChange={(e) => onUpdateBrand({ ...currentBrand, name: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-2 py-1 text-white text-xs mt-0.5"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-mono">Screenshot Image</label>
              <input
                type="text"
                value={currentBrand.screenshotUrl || ''}
                placeholder="/insta.png"
                onChange={(e) => onUpdateBrand({ ...currentBrand, screenshotUrl: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-2 py-1 text-white text-xs mt-0.5 font-mono"
              />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] text-slate-400 font-mono">Primary Color</label>
              <div className="flex items-center gap-1.5 mt-0.5">
                <input
                  type="color"
                  value={currentBrand.primaryColor}
                  onChange={(e) => onUpdateBrand({ ...currentBrand, primaryColor: e.target.value })}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={currentBrand.primaryColor}
                  onChange={(e) => onUpdateBrand({ ...currentBrand, primaryColor: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-2 py-1 text-white text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Export Options */}
      {activeTab === 'export' && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
            <div>
              <h5 className="text-xs font-bold text-white">Direct On-Device MP4 Export</h5>
              <p className="text-[10px] text-slate-400">GPU-accelerated in Android browser</p>
            </div>
            <button
              onClick={onExport}
              disabled={isExporting}
              style={{ background: isExporting ? '#475569' : currentBrand.primaryColor }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-lg shadow-indigo-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? `Exporting (${exportPercentage}%)` : 'Export MP4'}</span>
            </button>
          </div>

          <div className="text-[10px] text-slate-500 flex items-center gap-2">
            <span>• Master 4K Remotion cloud render available via:</span>
            <code className="bg-slate-950 px-1 py-0.5 rounded text-slate-400 font-mono">npm run render:cloud</code>
          </div>
        </div>
      )}
    </div>
  );
};
