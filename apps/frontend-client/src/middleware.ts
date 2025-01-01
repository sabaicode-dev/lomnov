import { NextRequest, NextResponse } from "next/server";

const locales = ["kh", "en"]; // Supported locales

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferredLocales = acceptLanguage.split(",").map((lang) => lang.split(";")[0]);
    preferredLocales.push("kh");
    for (const locale of preferredLocales) {
      if (locales.includes(locale)) {
        console.log("1=============:: ", locale);
        return locale
      }
    }
  }
  return "en"; // Default locale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("PathName:: ",pathname);
  
  console.log("Incoming Pathname:: ", pathname);

  // Check if the pathname already includes a locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) {
    console.log("Locale detected, proceeding.");
    return NextResponse.next();
  }

  // Determine preferred locale
  const locale = getPreferredLocale(request);
  console.log("Preferred Locale:: ", locale);

  // Redirect to localized path
  const url = new URL(request.url);
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/((?!_next|static|favicon.ico|api).*)",
};
