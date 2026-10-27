/**
 * In-Browser Hardware-Accelerated Video Exporter for Mobile & Desktop
 * Leverages MediaRecorder and Canvas streams directly inside Android Chrome.
 */

export interface ExportProgress {
  currentFrame: number;
  totalFrames: number;
  percentage: number;
  status: 'idle' | 'recording' | 'processing' | 'completed' | 'error';
  error?: string;
}

export async function exportCompositionToVideo(
  containerElement: HTMLElement,
  totalFrames: number,
  fps: number,
  onProgress: (progress: ExportProgress) => void
): Promise<Blob> {
  return new Promise(async (resolve, reject) => {
    try {
      // Find the primary canvas or video within the Remotion player container
      const canvas = containerElement.querySelector('canvas') || (containerElement as any);

      let stream: MediaStream;
      if (canvas instanceof HTMLCanvasElement) {
        stream = canvas.captureStream(fps);
      } else {
        // Fallback: capture stream from window or display if canvas isn't exposed directly
        throw new Error('Canvas element not found in player. Ensure hardware canvas is enabled.');
      }

      // Check supported mime types on Android Chrome
      const mimeTypes = [
        'video/mp4;codecs=avc1',
        'video/mp4',
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm'
      ];

      const selectedMime = mimeTypes.find(type => MediaRecorder.isTypeSupported(type)) || 'video/webm';

      const recorder = new MediaRecorder(stream, {
        mimeType: selectedMime,
        videoBitsPerSecond: 8_000_000 // 8 Mbps high quality
      });

      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const finalBlob = new Blob(chunks, { type: selectedMime });
        onProgress({
          currentFrame: totalFrames,
          totalFrames,
          percentage: 100,
          status: 'completed'
        });
        resolve(finalBlob);
      };

      recorder.onerror = (e) => {
        onProgress({
          currentFrame: 0,
          totalFrames,
          percentage: 0,
          status: 'error',
          error: 'Recorder failed: ' + String(e)
        });
        reject(e);
      };

      recorder.start(100);

      onProgress({
        currentFrame: 0,
        totalFrames,
        percentage: 0,
        status: 'recording'
      });

      // Allow duration to play out or simulate frame stepping
      const durationSeconds = totalFrames / fps;
      const startTime = Date.now();

      const progressInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsed / durationSeconds, 1);
        const currentFrame = Math.round(progress * totalFrames);

        onProgress({
          currentFrame,
          totalFrames,
          percentage: Math.round(progress * 100),
          status: progress >= 1 ? 'processing' : 'recording'
        });

        if (progress >= 1) {
          clearInterval(progressInterval);
          if (recorder.state === 'recording') {
            recorder.stop();
          }
        }
      }, 100);

    } catch (err: any) {
      onProgress({
        currentFrame: 0,
        totalFrames,
        percentage: 0,
        status: 'error',
        error: err.message
      });
      reject(err);
    }
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
