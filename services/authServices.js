import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/api";

// Login function
export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/token/`, {
    username,
    password,
  });
  if (response.data.access) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout function
export const logout = () => {
  localStorage.removeItem("user");
};

// Get current user
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
