import { MetadataRoute } from 'next';

// 支持的语言列表
const SUPPORTED_LOCALES = [
  { code: 'zh-CN', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://remove-image-alpha-batch.vercel.app';
  
  // 为每种语言创建主页 URL
  const localeUrls = SUPPORTED_LOCALES.map(({ code }) => ({
    url: `${baseUrl}/${code}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));
  
  // 添加根 URL 重定向到默认语言
  const rootUrl = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  };
  
  return [rootUrl, ...localeUrls];
} 