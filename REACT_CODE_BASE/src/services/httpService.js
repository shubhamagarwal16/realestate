import { default as http } from "axios";
// import { getJwt } from "./authService";

// http.defaults.headers.common["x-auth-token"] = getJwt();

http.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error ", error);
    // alert("unexpected error occured");
  }

  return Promise.reject(error);
});

export default {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete
};
