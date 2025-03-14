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
  authors: [{ name: 'Your Name', url: 'https://github.com/yourusername' }],
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
    url: 'https://your-website-url.com/',
    title: 'Image Alpha Channel Remover - Remove Transparency from Images',
    description: 'A simple and easy-to-use online tool that helps you quickly remove alpha channels from images while maintaining image quality.',
    siteName: 'Image Alpha Channel Remover',
    images: [
      {
        url: 'https://your-website-url.com/og-image.jpg',
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
    images: ['https://your-website-url.com/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://your-website-url.com',
    languages: {
      'zh-CN': 'https://your-website-url.com/zh-CN',
      'zh-TW': 'https://your-website-url.com/zh-TW',
      'en': 'https://your-website-url.com/en',
      'ja': 'https://your-website-url.com/ja',
      'ko': 'https://your-website-url.com/ko',
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
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
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