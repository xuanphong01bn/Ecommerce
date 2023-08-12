import axios from "axios";

export const getSubs = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/subs`);
};
export const getSub = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);
};
export const removeSub = async (slug, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/sub/${slug}`,
    {},
    {
      headers: {
        // delete ko có body thì headers ko hoạt động
        authToken,
      },
    }
  );
};
export const updateSub = async (slug, name, parent, authToken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/sub/${slug}`,
    { name, parent },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const createSub = async (sub, parent, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/sub`,
    { name: sub, parent },
    {
      headers: {
        authToken,
      },
    }
  );
};
