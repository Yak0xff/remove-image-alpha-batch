export const SUPPORTED_LOCALES = [
  { code: 'zh-CN', name: '简体中文', font: 'Noto Sans SC' },
  { code: 'zh-TW', name: '繁體中文', font: 'Noto Sans TC' },
  { code: 'en', name: 'English', font: 'Inter' },
  { code: 'ja', name: '日本語', font: 'Noto Sans JP' },
  { code: 'ko', name: '한국어', font: 'Noto Sans KR' }
] as const;

export type LocaleCode = typeof SUPPORTED_LOCALES[number]['code'];

export const DEFAULT_LOCALE = 'zh-CN';

export const FONTS_CONFIG = {
  'zh-CN': ['Noto Sans SC', 'system-ui', 'sans-serif'],
  'zh-TW': ['Noto Sans TC', 'system-ui', 'sans-serif'],
  'en': ['Inter', 'system-ui', 'sans-serif'],
  'ja': ['Noto Sans JP', 'system-ui', 'sans-serif'],
  'ko': ['Noto Sans KR', 'system-ui', 'sans-serif']
} as const; 