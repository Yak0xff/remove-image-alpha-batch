import { Metadata } from 'next';
import ImageUploaderPage from '@/components/image/ImageUploaderPage';

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> => {
  // 获取翻译函数
  try {
    const messages = (await import(`@/messages/${locale}.json`)).default;
    const t = (key: string) => {
      const keys = key.split('.');
      let value = messages;
      for (const k of keys) {
        if (value[k] === undefined) return key;
        value = value[k];
      }
      return value;
    };

    return {
      title: t('metadata.title'),
      description: t('metadata.description'),
      keywords: t('metadata.keywords').split(','),
    };
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    return {
      title: 'Image Alpha Channel Remover',
      description: 'A simple tool to remove alpha channels from images',
    };
  }
};

// 服务器组件不能使用客户端hooks，所以我们将页面内容移到一个客户端组件中
export default function Home() {
  return <ImageUploaderPage />;
} 