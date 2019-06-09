// import http from "./httpService";
// import { apiEndPoint } from "../config";
import jwtDecode from "jwt-decode";

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    const { user } = jwtDecode(jwt);
    return user;
  } catch (error) {
    console.log("getCurrentUser ", error);
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem("token");
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
