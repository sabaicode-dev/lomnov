import { CookieOptions, Response } from "express";

function setCookie(response: Response, name: string, value: string, options: CookieOptions = {}) {
  const defaultOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Secure in production only
    sameSite: 'lax',
    maxAge: 3600 * 5,  // 5 minutes expiration
    ...options,       // Override defaults with provided options
  };
  response.cookie(name, value, defaultOptions);
}

export default setCookie;
