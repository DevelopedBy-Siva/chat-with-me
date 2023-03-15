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
      let parsedVal = parseInt(value).toString();
      if (isNaN(parsedVal)) parsedVal = "";
      if (parsedVal.length > 10) break;
      data.phone = parsedVal;
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
  if (!isValid) message = "Invalid e-mail";

  return { isValid, message };
};

export const phoneValidation = (number) => {
  const isValid = number && number.length > 8 && number.length < 11;
  let message = null;
  if (!isValid) message = "Invalid Phone number";
  return {
    isValid,
    message,
  };
};

export const nameValidation = (name) => {
  const isValid = name && name.length >= 3 && name.length <= 16;
  let message = null;
  if (!isValid) message = "Name length must be >=3 or <=16";
  return {
    isValid,
    message,
  };
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

export const statusValidation = (status) => {
  const isValid = status && status.length >= 1 && status.length <= 150;
  let message = null;
  if (!isValid) message = "Status length must be >=1 or <=150";
  return {
    isValid,
    message,
  };
};

export function filterBy_Name_Nickname(searchInput = "", data = []) {
  searchInput = searchInput.trim().toLowerCase();
  const filteredData = data.filter((val) => {
    const nickname = val.nickname ? val.nickname.toLowerCase() : "";
    const name = val.name.toLowerCase();
    return nickname.indexOf(searchInput) > -1 || name.indexOf(searchInput) > -1;
  });
  return filteredData;
}

export function sortContactsByAsc(data = []) {
  return _.orderBy(data, ["name"], "asc");
}
