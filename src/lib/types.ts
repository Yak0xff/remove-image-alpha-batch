// 图片处理相关类型
export interface ProcessedImage {
  name: string;
  url: string;
  size: number;
  hasAlpha: boolean;
  colorSpace: string;
  currentFormat: string;
  dataUrl?: string;
}

// 支持的图片格式
export const SUPPORTED_FORMATS = ['png', 'jpeg', 'jpg', 'webp', 'avif', 'tiff'] as const;
export type SupportedFormat = typeof SUPPORTED_FORMATS[number]; 