import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/auth/",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 403) {
        throw new Error(
          "Invalid credentials. Please check your email and password."
        );
      } else if (status === 404) {
        throw new Error("Something went wrong");
      } else if (status === 400 && error.response.config.method === "post") {
        throw new Error("Email is taken. Please try another one.");
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from the server.");
    } else {
      // Other errors
      throw new Error("An error occurred while making the request.");
    }
  }
);

export default api;
