import axios from "axios";
import { userRequest } from "./getToken";

export const createPayment = () => {
  return userRequest.post(`create-payment-stripe`);
};
