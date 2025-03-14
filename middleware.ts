import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // 支持的语言列表
  locales: ['zh-CN', 'zh-TW', 'en', 'ja', 'ko'],
  
  // 默认语言
  defaultLocale: 'zh-CN',
});

export const config = {
  // 匹配所有路径
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 