import { CookieOptions, Response } from 'express';

function setCookie(
  response: Response,
  name: string,
  value: string,
  options: CookieOptions = {}
) {
  const defaultOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'lax', // Default to lax same-site policy
    maxAge: 30 * 24 * 60 * 60 * 1000,
    ...options, // Allow overriding defaults
  };

  response.cookie(name, value, defaultOptions);
}

export default setCookie;
