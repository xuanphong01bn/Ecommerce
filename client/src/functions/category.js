import axios from "axios";
import { getToken } from "./getToken";
export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/categories`);
};
export const getCategory = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
};
export const removeCategory = async (slug, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/category/${slug}`,
    {},
    {
      headers: {
        // delete ko có body thì headers ko hoạt động
        authToken,
      },
    }
  );
};
export const updateCategory = async (slug, name, authToken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/category/${slug}`,
    { name },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const createCategory = async (category, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/category`,
    { name: category },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const listSubsOfCategory = async (id) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/subs/${id}`);
};
