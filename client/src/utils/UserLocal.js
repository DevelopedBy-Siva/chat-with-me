import Cookies from "universal-cookie";

import { DarkTheme, LightTheme } from "../assets/styles/Themes";

const THEME_KEY = "prefered_theme_mode";
const IS_LOGGED_IN_KEY = "logged_in";

const cookies = new Cookies();

export function updateTheme(val = "light") {
  try {
    cookies.set(THEME_KEY, val);
  } catch (ex) {}
  return val;
}

export function getTheme() {
  const allowed = ["light", "dark"];
  let val;
  try {
    val = cookies.get(THEME_KEY);
  } catch (ex) {}
  if (allowed.includes(val)) return val;
  return allowed[1];
}

export function getStyles(theme) {
  if (theme === "dark") return DarkTheme;
  return LightTheme;
}

export function isLoggedIn() {
  const isLogged = cookies.get(IS_LOGGED_IN_KEY);
  if (isLogged === "yes") return true;
  return false;
}
