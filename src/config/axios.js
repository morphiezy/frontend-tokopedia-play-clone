import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT_URI,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${Cookies.get("token")}`,
    timeout: 5000,
  },
});

export default instance;
