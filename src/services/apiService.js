
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Patient API
export const patientAPI = {
  onlineRegister: (data) => apiClient.post('/patient/online-register', data),
  offlineRegister: (data) => apiClient.post('/patient/offline-register', data),
  getPatient: (id) => apiClient.get(`/patient/${id}`),
  getAllPatients: () => apiClient.get('/patient/all'),
  updatePatient: (id, data) => apiClient.put(`/patient/update/${id}`, data),
  deletePatient: (id) => apiClient.delete(`/patient/delete/${id}`),
  getPatientsByBranch: (branchId) => apiClient.get(`/patient/by-branch/${branchId}`),
  getPatientByMobile: (mobile) => apiClient.get(`/patient/by-mobile/${mobile}`),
};

// Referral API
export const referralAPI = {
  register: (data) => apiClient.post('/referral/register', data),
  getReferral: (id) => apiClient.get(`/referral/${id}`),
  getAllReferrals: () => apiClient.get('/referral/all'),
  getReferralsByDoctor: (doctorId) => apiClient.get(`/referral/by-doctor/${doctorId}`),
  deleteReferral: (id) => apiClient.delete(`/referral/delete/${id}`),
};

// Branch API
export const branchAPI = {
  create: (data) => apiClient.post('/branch/create', data),
  getBranch: (id) => apiClient.get(`/branch/${id}`),
  getAllBranches: () => apiClient.get('/branch/all'),
  updateBranch: (id, data) => apiClient.put(`/branch/update/${id}`, data),
  deleteBranch: (id) => apiClient.delete(`/branch/delete/${id}`),
};

// Doctor API
export const doctorAPI = {
  addExternal: (data) => apiClient.post('/doctor/add-external', data),
  getExternal: (id) => apiClient.get(`/doctor/external/${id}`),
  getAllExternal: () => apiClient.get('/doctor/external/all'),
  deleteExternal: (id) => apiClient.delete(`/doctor/external/delete/${id}`),
};

// Auth API
export const authAPI = {
  login: (data) => apiClient.post('/auth/login', data),
  registerStaff: (data) => apiClient.post('/auth/register-staff', data),
  registerAdmin: (data) => apiClient.post('/auth/register-admin', data),
};

export default apiClient;
