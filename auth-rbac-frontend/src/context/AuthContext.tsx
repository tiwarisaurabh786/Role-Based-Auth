import React, { createContext, useState, useContext, useEffect} from 'react';
import type { User, ApiError } from '../types';
import type { ReactNode } from 'react';
import { authApi } from '../api/authApi';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'USER' | 'ADMIN') => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored auth data on mount
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      console.log('Stored token:', storedToken ? 'exists' : 'not found');
      console.log('Stored user:', storedUser ? 'exists' : 'not found');
      
      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser) as User;
          // Validate that parsedUser has required fields
          if (parsedUser && parsedUser.email && parsedUser.role) {
            setToken(storedToken);
            setUser(parsedUser);
            console.log('User restored from localStorage:', parsedUser);
          } else {
            console.error('Invalid user data in localStorage');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } catch (parseError) {
          console.error('Failed to parse stored user:', parseError);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    } catch (e) {
      console.error('Error accessing localStorage:', e);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Attempting login with:', email);
      const response = await authApi.login({ email, password });
      
      console.log('Login response:', response);
      
      if (!response.token) {
        throw new Error('No token received from server');
      }
      
      if (!response.user) {
        throw new Error('No user data received from server');
      }
      
      // Store in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Verify storage
      console.log('Token saved:', !!localStorage.getItem('token'));
      console.log('User saved:', !!localStorage.getItem('user'));
      
      setToken(response.token);
      setUser(response.user);
      
      console.log('Login successful, user:', response.user);
    } catch (err) {
      console.error('Login error:', err);
      const apiError = err as ApiError;
      setError(apiError.message || 'Login failed. Please check your credentials.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: 'USER' | 'ADMIN') => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Attempting register with:', { name, email, role });
      const response = await authApi.register({ name, email, password, role });
      
      console.log('Register response:', response);
      
      if (!response.token) {
        throw new Error('No token received from server');
      }
      
      if (!response.user) {
        throw new Error('No user data received from server');
      }
      
      // Store in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setToken(response.token);
      setUser(response.user);
      
      console.log('Registration successful, user:', response.user);
    } catch (err) {
      console.error('Registration error:', err);
      const apiError = err as ApiError;
      setError(apiError.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out, clearing localStorage');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};