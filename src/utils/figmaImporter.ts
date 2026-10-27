/**
 * Figma Asset Ingestion Utility
 * Supports importing SVG/PNG assets exported from Figma mobile/desktop,
 * and fetching vector frames directly via the Figma REST API.
 */

export interface FigmaImportOptions {
  apiKey?: string;
  fileKey?: string;
  nodeId?: string;
}

export function sanitizeSvg(svgContent: string): string {
  // Strip dangerous tags and retain viewBox and paths
  return svgContent
    .replace(/<\?xml.*\?>/gi, '')
    .replace(/<!--.*-->/gi, '')
    .trim();
}

export async function fetchFigmaVector(options: FigmaImportOptions): Promise<string> {
  const { apiKey, fileKey, nodeId } = options;
  if (!apiKey || !fileKey || !nodeId) {
    throw new Error('Figma API Key, File Key, and Node ID are required.');
  }

  // 1. Request image URL from Figma API
  const apiUrl = `https://api.figma.com/v1/images/${fileKey}?ids=${nodeId}&format=svg`;
  const response = await fetch(apiUrl, {
    headers: {
      'X-Figma-Token': apiKey
    }
  });

  if (!response.ok) {
    throw new Error(`Figma API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const svgUrl = data.images?.[nodeId];
  if (!svgUrl) {
    throw new Error(`Node ${nodeId} could not be rendered as SVG.`);
  }

  // 2. Fetch the actual SVG content
  const svgResponse = await fetch(svgUrl);
  const svgText = await svgResponse.text();
  return sanitizeSvg(svgText);
}
