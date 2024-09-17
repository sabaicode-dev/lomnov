import { CookieOptions, Response } from "express";

function setCookie(
  response: Response,
  name: string,
  value: string,
  options: CookieOptions = {},
) {
  const defaultOptions: CookieOptions = {
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 5 * 60 * 1000, // Default 5 minutes expiration
    ...options, // Allow overriding defaults
  };

  response.cookie(name, value, defaultOptions);
}

export default setCookie;
