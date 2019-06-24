// import http from "./httpService";
// import { apiEndPoint } from "../config";
import jwtDecode from "jwt-decode";
import * as commonService from "./commonServices";

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

export async function getUserData() {
  try {
    const userID = (getCurrentUser() && getCurrentUser()._id) || "";
    if (!userID) throw new Error("Couldn't get user from props");

    const { data: userData } = await commonService.get(`/user/${userID}`);
    // console.log({ userData });
    return userData;
  } catch (error) {
    console.log("error in getting User: ", error);
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
