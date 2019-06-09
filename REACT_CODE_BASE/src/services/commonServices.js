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
