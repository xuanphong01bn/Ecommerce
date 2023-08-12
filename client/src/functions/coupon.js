import axios from "axios";
import { userRequest } from "./getToken";
import { guestRequest } from "./getToken";

export const createCoupon = async (values) => {
  return await userRequest.post("/coupon", values);
};

export const applyCouponApi = async (coupon) => {
  return await userRequest.post("/user/cart/coupon", { coupon });
};
