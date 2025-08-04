// creating a instance of axios to make it modual and
// resuable accros app

import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

// function to get tokenized instance dynamically
export function getAPIWithToken() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return axios.create({
      baseURL: "http://localhost:4000",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  }

  // fallback for SSR: no token
  return API;
}
