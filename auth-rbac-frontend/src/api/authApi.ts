import axiosInstance from './axiosConfig';
import type { ApiResponse, JwtResponse, LoginRequest, RegisterRequest, ApiError, User } from '../types';

export const authApi = {
  login: async (data: LoginRequest): Promise<{ token: string; user: User }> => {
    try {
      console.log('Sending login request to:', '/auth/login', data);
      const response = await axiosInstance.post<ApiResponse<JwtResponse>>('/auth/login', data);
      
      console.log('Full API response:', response);
      console.log('Response data:', response.data);
      
      // Check if response is successful
      if (!response.data.success) {
        throw new Error(response.data.message || 'Login failed');
      }
      
      const jwtData = response.data.data;
      console.log('JWT Data:', jwtData);
      
      if (!jwtData || !jwtData.token) {
        throw new Error('No token received from server');
      }
      
      // Create user object from JWT data
      const user: User = {
        id: 0, // Backend se id nahi aa rahi, but required hai
        name: '', // Name bhi nahi aa raha login mein
        email: jwtData.email,
        role: jwtData.role as 'USER' | 'ADMIN'
      };
      
      console.log('Created user object:', user);
      
      return {
        token: jwtData.token,
        user: user
      };
    } catch (error: any) {
      console.error('Login API error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      let errorMessage = 'Login failed';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw {
        message: errorMessage,
        status: error.response?.status
      } as ApiError;
    }
  },

  register: async (data: RegisterRequest): Promise<{ token: string; user: User }> => {
    try {
      console.log('Sending register request to:', '/auth/register', data);
      const response = await axiosInstance.post<ApiResponse<JwtResponse>>('/auth/register', data);
      
      console.log('Full API response:', response);
      console.log('Response data:', response.data);
      
      // Check if response is successful
      if (!response.data.success) {
        throw new Error(response.data.message || 'Registration failed');
      }
      
      const jwtData = response.data.data;
      console.log('JWT Data:', jwtData);
      
      if (!jwtData || !jwtData.token) {
        throw new Error('No token received from server');
      }
      
      // Create user object from registration data and JWT response
      const user: User = {
        id: 0, // Backend se id nahi aa rahi
        name: data.name,
        email: jwtData.email,
        role: jwtData.role as 'USER' | 'ADMIN'
      };
      
      console.log('Created user object:', user);
      
      return {
        token: jwtData.token,
        user: user
      };
    } catch (error: any) {
      console.error('Register API error:', error);
      
      let errorMessage = 'Registration failed';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw {
        message: errorMessage,
        status: error.response?.status
      } as ApiError;
    }
  },

  getPublicContent: async (): Promise<string> => {
    const response = await axiosInstance.get('/public');
    return response.data;
  },

  getUserContent: async (): Promise<string> => {
    const response = await axiosInstance.get('/user');
    return response.data;
  },

  getAdminContent: async (): Promise<string> => {
    const response = await axiosInstance.get('/admin');
    return response.data;
  }
};