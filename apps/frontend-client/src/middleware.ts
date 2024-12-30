import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "kh"];

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferredLocales = acceptLanguage.split(",").map((lang) => lang.split(";")[0]);

    // Match the preferred locale with supported locales
    for (const locale of preferredLocales) {
      if (locales.includes(locale)) {
        return locale;
      }
    }
  }

  // Fallback to default locale
  return "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already includes a locale
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (hasLocale) {
    return NextResponse.next();
  }

  // Get the preferred locale
  const locale = getPreferredLocale(request);

  // Redirect to the localized version of the path
  const url = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/((?!_next|static|favicon.ico|api).*)",
};
