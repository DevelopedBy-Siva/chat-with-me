import { APP_NAME } from "../assets/constants";
import { DarkTheme, LightTheme } from "../assets/styles/Themes";

const THEME_KEY = `${APP_NAME}_THEME`;

export function updateTheme(val = "light") {
  try {
    localStorage.setItem(THEME_KEY, val);
  } catch (ex) {}
  return val;
}

export function getTheme() {
  const allowed = ["light", "dark"];
  let val;
  try {
    val = localStorage.getItem(THEME_KEY);
  } catch (ex) {}
  if (allowed.includes(val)) return val;
  return allowed[1];
}

export function getStyles(theme) {
  if (theme === "dark") return DarkTheme;
  return LightTheme;
}
