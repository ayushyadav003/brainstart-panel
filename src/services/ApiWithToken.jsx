import axios from "axios";
import { toast } from "react-toastify";

export const ApiWithToken = async ({ url, method, data, params }) => {
  const apiOptions = {
    url,
    method,
    headers: { Authorization: localStorage.getItem("userToken") },
    params,
    data: data,
  };
  const res = await axios(apiOptions);
  if (res?.data) {
    return res.data;
  }
};
