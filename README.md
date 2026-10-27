# MotionStudio Pro • Mobile Production Workspace

A motion graphics production workspace built on **React 18**, **TypeScript**, **Remotion**, **GSAP**, and **Three.js**, running locally in **Termux on Android** with hardware-accelerated local preview, in-browser MP4 export, and local FFmpeg post-production.

---

## 🚀 Live Preview on Your Phone

The dev server is running on loopback and local network:
* **Localhost:** [http://localhost:5173](http://localhost:5173)
* **Local Wi-Fi:** `http://192.168.1.7:5173`

To re-launch your Android browser to the preview at any time:
```bash
npm run open
```

---

## 🎨 What's Included

### 1. Reusable Motion Graphics Templates (`src/templates/`)
* **`SaasFeatureDrop.tsx`**: High-energy SaaS announcement with 3D product prism, glassmorphic browser window mockup, live telemetry wave, metric counter, and animated mouse click ripple.
* **`MobileAppShowcase.tsx`**: Mobile app promo featuring smartphone bezel, dynamic island, and floating performance metric cards.
* **`KineticPromo.tsx`**: High-tempo kinetic typography and SVG badge reveals for social ads (Twitter/X, LinkedIn, TikTok, Shorts).

### 2. Multi-Client & Brand Architecture (`src/clients/`)
* Easily switch brand presets or add new clients in [`src/clients/index.ts`](file:///data/data/com.termux/files/home/.gemini/antigravity-cli/scratch/motion-studio/src/clients/index.ts).
* Preconfigured with **Pulse AI** (Indigo/Cyan dark telemetry) and **Aurora Cloud** (Emerald/Cyber Edge compute).

### 3. Aspect Ratio Control
* **16:9 Landscape:** 1280×720 / 1920×1080 (YouTube, Website hero banners)
* **9:16 Vertical:** 720×1280 / 1080×1920 (Instagram Reels, TikTok, YouTube Shorts)
* **1:1 Square:** 1080×1080 (Feed ads, Carousel covers)

### 4. Figma Asset Importer (`scripts/import-figma.js`)
* Place SVGs or PNGs exported from Figma into your phone's `Downloads` folder, then run:
  ```bash
  node scripts/import-figma.js --file ~/storage/downloads/my-icon.svg --name BrandIcon
  ```
  It automatically creates a sanitized React component in `src/assets/imported/`.

### 5. Dual-Path Export Engine
* **On-Device MP4 Export:** Tap **"Export MP4"** in the mobile control dock. The in-browser WebCodecs/Canvas recorder captures frames using the phone's Adreno GPU and downloads the MP4 to your phone.
* **Local FFmpeg Post-Production:**
  ```bash
  ./scripts/local-render.sh ~/storage/downloads/exported.mp4 final-promo.mp4
  ```
  Saves the master video directly into `~/storage/movies/MotionStudio/` (instantly visible in your Android Gallery/Photos app).
* **Zero-Cost Cloud 4K Master (`.github/workflows/render.yml`):**
  Push your repository to GitHub and run the GitHub Action to render 4K/60fps Remotion master exports for free on 4-core cloud runners.
