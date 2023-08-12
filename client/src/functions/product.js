import axios from "axios";
import { userRequest } from "./getToken";
import { guestRequest } from "./getToken";

export const createProduct = async (product) => {
  return await userRequest.post(
    `${process.env.REACT_APP_API}/product`,
    product
  );
};

export const getProductsByCount = async (count) => {
  return await userRequest.get(`/products/${count}}`);
};

export const deleteProduct = async (slug) => {
  return await userRequest.post(`/product/${slug}`);
};

export const getProductBySlug = async (slug) => {
  return guestRequest.get(`/product/${slug}`);
};
export const updateProduct = async (slug, product) => {
  return await userRequest.put(`/product/update/${slug}`, product);
};

export const rateStarProduct = async (productId, body) => {
  return await userRequest.put(`/product/star/${productId}`, body);
};
export const getProductFilter = async (filter) => {
  return await userRequest.post(`/product/search/filter`, filter);
};
export const getProductRatingsDes = async () => {
  return await userRequest.get(`products/ratings-sort`);
};

export const getSimilarProducts = async (subId) => {
  return await guestRequest.get(`/products/similar/${subId}`);
};
