import axios from "axios";
import { userRequest } from "./getToken";
import { guestRequest } from "./getToken";

export const updateStatusOrder = async (id, status) => {
  return await userRequest.post(`/admin/order-status/${id}`, { status });
};

export const getAllOrderAdmin = async () => {
  return await userRequest.get(`/admin/order`);
};

export const sendEmail = async (body) => {
  return await userRequest.post("/admin/email/send", body);
};

export const checkFile = async (path) => {
  return await userRequest.post("/admin/checkFile", { path });
};

export const orderByDay = async (daySubtract) => {
  return await userRequest.post("/admin/order-by-day", { daySubtract });
};

export const revenueStatic = async () => {
  return await userRequest.post("/admin/revenue");
};
