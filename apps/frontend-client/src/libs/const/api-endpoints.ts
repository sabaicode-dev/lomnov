export const API_ENDPOINTS = {
  // AUTH SERVICE
  SIGN_UP: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/signup`,
  VERIFY: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/verify`,
  RESEND_CODE: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/resend-code`,
  SIGN_IN: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/signin`,
  CHANGE_PASSWORD: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/change-password`,
  RESET_PASSWORD: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/reset-password`,
  CONFIRM_PASSWORD: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/confirm-password`,
  SIGN_IN_WITH_GOOGLE: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/google-signin`,
  LOGOUT: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/logout`,
  REFRESH_TOKEN:`${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/refresh-token`,
  // USER SERVICE
  USER_PROFILE: `${process.env.NEXT_PUBLIC_USER_ENDPOINT}/me`,
  USER: `${process.env.NEXT_PUBLIC_USER_ENDPOINT}`,
  ADD_PROPERTY: `${process.env.NEXT_PUBLIC_USER_ENDPOINT}/favorite`,
  // PROPERTIES SERVICES
  PROPERTIES: `${process.env.NEXT_PUBLIC_PROPERTIES_ENDPOINT}/properties`,
};
