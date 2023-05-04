import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

const tokenName = process.env.REACT_APP_COOKIE_TOKEN_NAME || 'token';

export const getToken = () => {
  return getCookie(tokenName) || '';
}

export const setToken = (token: string) => {
  return setCookie(tokenName, token);
}

export const removeToken = () => {
  return removeCookie(tokenName);
}