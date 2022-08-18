const TOAST_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
  DISMISS_ALL: "dismiss_all",
  DISMISS: "dismiss",
};

const TOAST_PROPS = {
  position: "bottom-center",
};

const success = (message, {} = TOAST_PROPS) => {
  toast(TOAST_TYPE.SUCCESS);
};

const error = () => {
  toast(TOAST_TYPE.ERROR);
};

const dismiss = () => {
  toast(TOAST_TYPE.DISMISS);
};

const dismissAll = () => {
  toast(TOAST_TYPE.DISMISS_ALL);
};

const toast = (type) => {
  switch (type) {
    case TOAST_TYPE.SUCCESS:
      break;

    case TOAST_TYPE.ERROR:
      break;

    case TOAST_TYPE.DISMISS:
      break;

    case TOAST_TYPE.DISMISS_ALL:
      break;

    default:
      break;
  }
};
