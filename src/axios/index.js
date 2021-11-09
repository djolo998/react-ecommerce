import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,

  headers: {
    "Content-Type": "application/json",
    common: {
      Accept: "application/json",
    },
  },
});

function axiosError(error) {
  console.log("response axios error", error);
  // return error;
  return Promise.reject(error);
}

instance.interceptors.response.use(function (response) {
  return response.data;
}, axiosError);

export const setToken = (token) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

export default instance;
