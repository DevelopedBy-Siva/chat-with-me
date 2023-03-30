import axios from "../api/axios";

export const validateToken = async () => {
  const token = await axios
    .get("/user/validate-token")
    .then(() => true)
    .catch(() => false);
  if (token) return true;
  return false;
};
