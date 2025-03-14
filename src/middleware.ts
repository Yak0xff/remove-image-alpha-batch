import createMiddleware from 'next-intl/middleware';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './config/i18n';

export default createMiddleware({
  // 支持的语言列表
  locales: SUPPORTED_LOCALES.map(locale => locale.code),
  
  // 默认语言
  defaultLocale: DEFAULT_LOCALE,
});

export const config = {
  // 匹配所有路径
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 