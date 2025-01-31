import { Login } from "../api";
export const RequestLogin = async (e, email, password) => {
  e.preventDefault();

  const credentials = { email, password };
  const response = await Login(credentials);
};
