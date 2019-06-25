import http from "./httpService";
import { apiEndPoint } from "../config";

export function get(url = "") {
  return http.get(`${apiEndPoint}${url}`);
}
export function post(url = "", params) {
  return http.post(`${apiEndPoint}${url}`, params);
}

export function showGFSImage(path) {
  if (!path) return "";
  return `${apiEndPoint}/property/showGFSImage/${path}`;
}

export async function renderStateList() {
  try {
    const { data: stateList } = await this.get("/common/state");
    return [{ name: "--Select State--", _id: "" }, ...stateList];
  } catch (error) {
    console.log("Error while fetching stateList: ", error);
  }
}
export async function renderCityList(stateId) {
  try {
    const { data: cityList } = await this.get(`/common/cities/${stateId}`);
    return [{ name: "--Select City--", _id: "" }, ...cityList];
  } catch (error) {
    console.log("Error while fetching cityList: ", error);
  }
}
