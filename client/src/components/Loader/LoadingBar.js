import NProgress from "nprogress";
import { useEffect } from "react";

export default function LoadingBar() {
  useEffect(() => {
    NProgress.configure({ easing: "ease", speed: 500, showSpinner: false });

    NProgress.start();
    return () => NProgress.done();
  });

  return "";
}
