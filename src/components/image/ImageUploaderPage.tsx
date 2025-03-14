'use client';

import { useTranslations } from 'next-intl';
import ImageUploader from '@/components/image/ImageUploader';

export default function ImageUploaderPage() {
  const t = useTranslations('home');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-12">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
          <p className="mb-8 text-lg">{t('description')}</p>
          
          <ImageUploader />
          
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">{t('howToUse.title')}</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>{t('howToUse.step1')}</li>
              <li>{t('howToUse.step2')}</li>
              <li>{t('howToUse.step3')}</li>
            </ol>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">{t('faq.title')}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{t('faq.q1')}</h3>
                <p>{t('faq.a1')}</p>
              </div>
              <div>
                <h3 className="font-medium">{t('faq.q2')}</h3>
                <p>{t('faq.a2')}</p>
              </div>
              <div>
                <h3 className="font-medium">{t('faq.q3')}</h3>
                <p>{t('faq.a3')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 