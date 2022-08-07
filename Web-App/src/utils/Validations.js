const emailValidation = (email) => {
  const isValid =
    email &&
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  let message = null;
  if (!isValid) message = "Invalid e-mail id";

  return { isValid, message };
};

const passwordValidation = (password) => {
  const isValid = password && password.length >= 8;
  let message = null;
  if (!isValid) message = "Minimum password length should be 8 characters";
  return {
    isValid,
    message,
  };
};

const validationColor = {
  success: "#737373",
  error: "red",
};

export { emailValidation, passwordValidation, validationColor };
