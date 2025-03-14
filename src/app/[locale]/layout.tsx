import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { SUPPORTED_LOCALES } from '@/config/i18n';
import { Github } from 'lucide-react';
import LanguageSelector from '@/components/ui/LanguageSelector';
import Footer from '@/components/layout/Footer';

// 导入所有需要的字体
import { Inter } from 'next/font/google';
import { Noto_Sans_SC } from 'next/font/google';
import { Noto_Sans_TC } from 'next/font/google';
import { Noto_Sans_JP } from 'next/font/google';
import { Noto_Sans_KR } from 'next/font/google';

// 配置字体
const inter = Inter({ subsets: ['latin'] });
const notoSansSC = Noto_Sans_SC({ subsets: ['latin'] });
const notoSansTC = Noto_Sans_TC({ subsets: ['latin'] });
const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] });
const notoSansKR = Noto_Sans_KR({ subsets: ['latin'] });

const fonts = {
  'zh-CN': notoSansSC,
  'zh-TW': notoSansTC,
  'en': inter,
  'ja': notoSansJP,
  'ko': notoSansKR,
} as const;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map(({ code }) => ({ locale: code }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const font = fonts[locale as keyof typeof fonts] || inter;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className={`min-h-screen flex flex-col ${font.className}`}>
        <div className="fixed top-4 right-4 z-50 flex items-center space-x-4">
          <a
            href="https://github.com/Yak0xff/remove-image-alpha-batch"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            title="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <LanguageSelector />
        </div>
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
} 