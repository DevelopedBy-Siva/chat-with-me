export const FORGOT_PSWD_SCREEN = {
  HOME: "HOME",
  VEIRFY_CODE: "VERIFY_CODE",
  CNG_PSWD: "CNG_PSWD",
};

export function toggle_BW_Chats(goBack = false) {
  const containerRef = document.querySelector(".home-container");
  containerRef.scrollLeft = !goBack
    ? containerRef.scrollWidth
    : -containerRef.scrollWidth;
}
