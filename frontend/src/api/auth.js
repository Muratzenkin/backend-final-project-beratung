import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/auth";

export const registerUser = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/register`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
    withCredentials: true,
  });
  return response.data;
};

export const getUserProfile = async () => {
  const response = await axios.get(`${API_BASE_URL}/profile`, {
    withCredentials: true,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(
    `${API_BASE_URL}/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const updateProfilePicture = async (formData) => {
  const response = await axios.put(
    `${API_BASE_URL}/update-profile-picture`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }
  );
  return response.data;
};

export const updateBio = async (bio) => {
  const response = await axios.put(
    `${API_BASE_URL}/update-bio`,
    { bio },
    { withCredentials: true }
  );
  return response.data;
};
