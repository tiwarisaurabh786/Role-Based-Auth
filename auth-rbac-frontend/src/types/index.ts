export interface User {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface JwtResponse {
  token: string;
  type: string;
  email: string;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
}

export interface ApiError {
  message: string;
  status?: number;
}

// Auth response after extracting data from ApiResponse
export interface AuthData {
  token: string;
  type: string;
  email: string;
  role: string;
}