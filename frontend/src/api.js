import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const employeeService = {
  getAll: () => api.get('/employees/'),
  create: (data) => api.post('/employees/', data),
  delete: (id) => api.delete(`/employees/${id}/`),
};

export const attendanceService = {
  mark: (data) => api.post('/attendance/mark/', data),
  getByEmployee: (id) => api.get(`/attendance/employee/${id}/`),
  getSummary: () => api.get('/attendance/summary/'),
};

export default api;
