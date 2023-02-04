import _ from "lodash";

export const AllowedInputFields = {
  EMAIL: "email",
  NAME: "name",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
  PHONE: "phone",
  REMEMBER_ME: "rememberme",
};

let inputData = {
  name: null,
  email: null,
  password: null,
  phone: null,
  confirmPassword: null,
  rememberme: false,
};

export const inputChanges = (e, type, source, ...requiredFields) => {
  const value = e.target.value;
  let data = { ...inputData };
  data = Object.assign(data, source);

  const { EMAIL, NAME, PASSWORD, CONFIRM_PASSWORD, PHONE, REMEMBER_ME } =
    AllowedInputFields;

  switch (type) {
    case EMAIL:
      data.email = value.toLowerCase();
      break;
    case NAME:
      data.name = value.toLowerCase();
      break;
    case PASSWORD:
      data.password = value;
      break;
    case CONFIRM_PASSWORD:
      data.confirmPassword = value;
      break;
    case PHONE:
      data.phone = value;
      break;
    case REMEMBER_ME:
      data.rememberme = e.target.checked;
      break;
    default:
      break;
  }

  const newData = _.pick(data, ...requiredFields);
  return newData;
};

export const emailValidation = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isValid = email && email.match(regex);
  let message = null;
  if (!isValid) message = "Invalid e-mail id";

  return { isValid, message };
};

export const passwordValidation = (password) => {
  const isValid = password && password.length >= 8;
  let message = null;
  if (!isValid) message = "Minimum password length should be 8 characters";
  return {
    isValid,
    message,
  };
};

export const confirmPasswordValidation = (pswd, confirmPswd) => {
  const isValid = pswd === confirmPswd;
  let message = null;
  if (!isValid) message = "Passwords are not matching";
  return {
    isValid,
    message,
  };
};

export const validationColor = {
  success: "#21222B",
  error: "red",
};

export const errorVisibility = (
  inputRef,
  errorRef,
  txtColor = validationColor.success,
  borderColor = validationColor.success,
  errorMsg = null
) => {
  // inputRef.current.style.color = txtColor;
  // inputRef.current.style.borderBottom = `1px solid ${borderColor}`;
  errorRef.current.innerText = errorMsg;
};
