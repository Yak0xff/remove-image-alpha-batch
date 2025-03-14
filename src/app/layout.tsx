import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0ea5e9',
};

export const metadata: Metadata = {
  title: {
    template: '%s | Image Alpha Channel Remover',
    default: 'Image Alpha Channel Remover',
  },
  description: 'A simple and easy-to-use online tool that helps you quickly remove alpha channels from images while maintaining image quality. Support PNG, JPG, JPEG, WEBP formats.',
  authors: [{ name: 'Yak0xff', url: 'https://github.com/Yak0xff' }],
  keywords: ['image tool', 'alpha channel remover', 'image processing', 'transparency removal', 'batch processing', 'online tool'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://remove-image-alpha-batch.vercel.app',
    title: 'Image Alpha Channel Remover - Remove Transparency from Images',
    description: 'A simple and easy-to-use online tool that helps you quickly remove alpha channels from images while maintaining image quality.',
    siteName: 'Image Alpha Channel Remover',
    images: [
      {
        url: 'https://remove-image-alpha-batch.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Image Alpha Channel Remover Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Alpha Channel Remover - Remove Transparency from Images',
    description: 'A simple and easy-to-use online tool that helps you quickly remove alpha channels from images while maintaining image quality.',
    images: ['https://remove-image-alpha-batch.vercel.app/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://remove-image-alpha-batch.vercel.app',
    languages: {
      'zh-CN': 'https://remove-image-alpha-batch.vercel.app/zh-CN',
      'zh-TW': 'https://remove-image-alpha-batch.vercel.app/zh-TW',
      'en': 'https://remove-image-alpha-batch.vercel.app/en',
      'ja': 'https://remove-image-alpha-batch.vercel.ap/ja',
      'ko': 'https://remove-image-alpha-batch.vercel.app/ko',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-PKVZ19KZW4`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PKVZ19KZW4');
          `}
        </Script>
        
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6076347298102292"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
} 