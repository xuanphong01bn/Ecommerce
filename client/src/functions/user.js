import axios from "axios";
import { userRequest } from "./getToken";
import { guestRequest } from "./getToken";

export const userCart = async (cart) => {
  return await userRequest.post("/user/cart", { cart });
};

export const getUserCart = async () => {
  return await userRequest.get("/user/cart");
};

export const createOrder = async (body) => {
  return await userRequest.post("/user/order", body);
};

export const emptyUserCart = async () => {
  return await userRequest.delete("/user/cart");
};

export const getAllUserOrder = async () => {
  return await userRequest.get("/user/order");
};
