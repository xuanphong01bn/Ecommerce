import axios from "axios";
export const getToken = () => {
  if (localStorage.getItem("persist:root")) {
    const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
    const user = JSON.parse(persistRoot?.user);
    return user?.token;
  }
};

export const userRequest = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    authToken: getToken(),
  },
});
export const guestRequest = axios.create({
  baseURL: process.env.REACT_APP_API,
});
