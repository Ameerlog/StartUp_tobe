import { apiClient } from "./index";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";

export const coventureAPI = {
  // GET all coventures
  getAll: () => {
    return apiClient.get(API_ENDPOINTS.COVENTURES_GET);
  },

  // GET single coventure by ID
  getById: (id) => {
    return apiClient.get(`${API_ENDPOINTS.COVENTURES_GET}/${id}`);
  },

  // POST create new coventure
  create: (data) => {
    return apiClient.post(API_ENDPOINTS.COVENTURES_CREATE, data); // ✅ Uses /createCoBranding
  },

  // PUT update coventure
  update: (id, data) => {
    return apiClient.put(`${API_ENDPOINTS.COVENTURES_CREATE}/${id}`, data);
  },

  // DELETE coventure
  delete: (id) => {
    return apiClient.delete(`${API_ENDPOINTS.COVENTURES_CREATE}/${id}`);
  },
};
