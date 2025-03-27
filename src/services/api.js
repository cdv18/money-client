import axios from '../plugins/axios';

export const authAPI = {
  login: (credentials) => axios.post('/auth/login', credentials),
  register: (userData) => axios.post('/auth/register', userData)
};

export const transactionAPI = {
  getIncomes: () => axios.get('/transactions/incomes'),
  getExpenses: () => axios.get('/transactions/expenses'),
  addTransaction: (data) => axios.post('/transactions', data),
  updateTransaction: (id, data) => axios.put(`/transactions/${id}`, data),
  deleteTransaction: (id) => axios.delete(`/transactions/${id}`)
};

export const categoryAPI = {
  getCategories: () => axios.get('/categories'),
  addCategory: (data) => axios.post('/categories', data),
  updateCategory: (id, data) => axios.put(`/categories/${id}`, data),
  deleteCategory: (id) => axios.delete(`/categories/${id}`)
};

export const statisticsAPI = {
  getMonthlyStats: () => axios.get('/statistics/monthly'),
  getYearlyStats: () => axios.get('/statistics/yearly')
};
