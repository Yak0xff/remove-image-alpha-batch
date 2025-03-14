'use client';

import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  
  // 获取当前语言
  const currentLocale = pathname.split('/')[1] || 'zh-CN';
  
  // 支持的语言列表
  const supportedLocales = [
    { code: 'zh-CN', name: '简体中文' },
    { code: 'zh-TW', name: '繁體中文' },
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' }
  ];

  return (
    <footer className="w-full py-6 mt-8 backdrop-blur-sm bg-white/70">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* 语言链接 - 对 SEO 有益 */}
          <div className="flex flex-wrap justify-center gap-4">
            {supportedLocales.map((locale) => {
              const newPathname = pathname.replace(/^\/[^\/]+/, `/${locale.code}`);
              return (
                <Link 
                  key={locale.code}
                  href={newPathname}
                  className={`text-sm ${currentLocale === locale.code ? 'text-primary-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                  hrefLang={locale.code}
                >
                  {locale.name}
                </Link>
              );
            })}
          </div>
          
          {/* 版权信息 */}
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>© {currentYear}</span>
            <span className="mx-2">•</span>
            <span>{t('madeWith')}</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>{t('by')}</span>
            <a
              href="https://github.com/Yak0xff"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              Yak.Software
            </a>
          </div>
          
          {/* 工具描述 */}
          <p className="text-xs text-gray-500 text-center max-w-lg">
            {t('description')}
          </p>
          
          {/* 结构化数据 - 对 SEO 有益 */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                'name': 'Image Alpha Channel Remover',
                'url': 'https://remove-image-alpha-batch.vercel.app',
                'description': t('description'),
                'applicationCategory': 'DesignApplication',
                'operatingSystem': 'Web',
                'offers': {
                  '@type': 'Offer',
                  'price': '0',
                  'priceCurrency': 'USD'
                },
                'author': {
                  '@type': 'Person',
                  'name': 'Yak0xff',
                  'url': 'https://github.com/Yak0xff'
                }
              })
            }}
          />
        </div>
      </div>
    </footer>
  );
} 