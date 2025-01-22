import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/beraters";

export const createBerater = async (beraterData) => {
  const response = await axios.post(API_BASE_URL, beraterData);
  return response.data;
};

export const getBeraters = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const updateBerater = async (id, beraterData) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, beraterData);
  return response.data;
};

export const deleteBerater = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
