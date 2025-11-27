import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['es', 'en'];
const defaultLocale = 'es';

function getLocale(request: NextRequest): string {
  // Primero, verificar si hay un locale en la URL
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameLocale) return pathnameLocale;
  
  // Verificar cookie de idioma
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }
  
  // Verificar header Accept-Language
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const browserLocale = acceptLanguage
      .split(',')[0]
      .split('-')[0]
      .toLowerCase();
    if (locales.includes(browserLocale)) {
      return browserLocale;
    }
  }
  
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Verificar si la ruta ya tiene un locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return NextResponse.next();
  
  // Redireccionar a la ruta con locale
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  const response = NextResponse.redirect(newUrl);
  response.cookies.set('NEXT_LOCALE', locale, { maxAge: 31536000 }); // 1 año
  
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};