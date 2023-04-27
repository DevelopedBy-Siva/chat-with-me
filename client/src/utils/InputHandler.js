import _ from "lodash";

export const AllowedInputFields = {
  EMAIL: "email",
  NAME: "name",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
  PHONE: "phone",
  CURRENT_PASSWORD: "currentPassword",
};

let inputData = {
  name: null,
  email: null,
  password: null,
  phone: null,
  confirmPassword: null,
  currentPassword: null,
};

export const inputChanges = (e, type, source, ...requiredFields) => {
  const value = e.target.value;
  let data = { ...inputData };
  data = Object.assign(data, source);

  const { EMAIL, NAME, PASSWORD, CONFIRM_PASSWORD, PHONE, CURRENT_PASSWORD } =
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
    case CURRENT_PASSWORD:
      data.currentPassword = value;
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
  const PASSWORD_PATTERN =
    /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&]).{8,16}$/;
  const isValid = PASSWORD_PATTERN.test(password);
  let message = null;
  if (!isValid)
    message =
      "Passwords must have atleast 8 characters, should contain upper, lower & numeric characters, and include symbols like !@#$%&";
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

export const nicknameValidation = (nickname, contacts = []) => {
  let isValid = true;
  if (!nickname) isValid = false;
  if (isValid) isValid = /^[a-zA-Z0-9_]{3,}$/.test(nickname);

  let message = null;
  if (!isValid)
    message =
      "Nicknames must contain more than 3 characters, and the only allowed characters are alphabets, numbers, and underscore (_)";

  const isDuplicate = contacts.some(
    (item) => item.nickname === nickname.trim().toLowerCase()
  );
  if (isValid && isDuplicate) {
    isValid = false;
    message = "Nickname already exists";
  }

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

export function getContactNickname(contacts = [], lookupEmail) {
  const index = contacts.findIndex((item) => item.email === lookupEmail);
  if (index === -1) return null;
  return contacts[index].nickname;
}

export function getContactNicknameById(contacts = [], id) {
  const index = contacts.findIndex((item) => item._id === id);
  if (index === -1) return null;
  return contacts[index].nickname;
}

export function getContactAvatarById(contacts = [], id) {
  const index = contacts.findIndex((item) => item._id === id);
  if (index === -1) return null;
  return contacts[index].avatarId;
}
