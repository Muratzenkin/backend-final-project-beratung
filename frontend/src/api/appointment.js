import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/appointments";

export const createAppointment = async (appointmentData) => {
  const response = await axios.post(API_BASE_URL, appointmentData, {
    withCredentials: true,
  });
  return response.data;
};

export const getAppointments = async () => {
  const response = await axios.get(API_BASE_URL, { withCredentials: true });
  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
