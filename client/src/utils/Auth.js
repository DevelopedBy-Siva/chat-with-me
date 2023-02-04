export const getToken = () => {
  // TODO

  let token;
  try {
    token = localStorage.getItem("myUser");
  } catch (ex) {}
  return token;
};

export const validateToken = () => {
  const token = getToken();
  // TODO
  if (token) return true;
  return false;
};
