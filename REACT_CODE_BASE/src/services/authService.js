// import http from "./httpService";
// import { apiEndPoint } from "../config";
import jwtDecode from "jwt-decode";

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    if (user && user.user) return user.user;
    else throw new Error("");
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function logOut() {
  try {
    localStorage.removeItem("token");
    return true;
  } catch (error) {
    console.log(error);
    alert("---");
    return null;
  }
}
