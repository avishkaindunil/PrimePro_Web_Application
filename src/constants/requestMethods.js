import axios from "axios";

const LOCAL_BACKEND_URL = "http://localhost:8080";

export const publicAuthRequest = axios.create({
  baseURL: LOCAL_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "access-control-allow-origin": "*",
  },
});
