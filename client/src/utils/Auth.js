import { APP_NAME } from "../assets/constants";

const AUTH_KEY = `${APP_NAME}_TKN_KEY`;

export const saveToken = (token) => {
  //TODO
  if (!token || token.length === 0) return false;

  try {
    localStorage.setItem(AUTH_KEY, token);
  } catch (ex) {
    return false;
  }
  return true;
};

export const getToken = () => {
  // TODO

  let token;
  try {
    token = localStorage.getItem(AUTH_KEY);
  } catch (ex) {}
  return token;
};

export const validateToken = () => {
  const token = getToken();
  // TODO
  if (token) return true;
  return false;
};

export const logout = () => {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (ex) {}
};
