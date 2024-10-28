'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";

export interface User {
  _id: string;
  cognitoSub: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  age: number | null;
  background: string[];
  createdAt: string;
  dateOfBirth: string;
  favorite: string[];
  gender: string;
  location: string;
  phoneNumber: string;
  profile: string[];
  role: string;
  updatedAt: string;
  userName: string;
}

interface LoginRequest {
  email?: string,
  phone_number?: string,
  password: string
}

interface SignupRequest {
  username: string,
  email?: string,
  phone_number?: string
  password: string
}

interface VerifyUserRequest {
  email?: string,
  phone_number?: string
  code: string
}


interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  login: ({ email, phone_number, password }: LoginRequest) => Promise<void>;
  logout: () => Promise<void>,
  signup: ({ username, email, phone_number, password }: SignupRequest) => Promise<void>;
  verify: ({ email, phone_number, code }: VerifyUserRequest) => Promise<void>;
  siginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(API_ENDPOINTS.USER_PROFILE);
        setUser(res.data)
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus();
  }, [])

  const login = async ({ email, phone_number, password }: LoginRequest) => {
    setLoading(true);
    try {
      await axiosInstance.post(`${API_ENDPOINTS.SIGN_IN}`, {
        [email ? 'email' : 'phone_number']: email || phone_number,
        password
      })

      // Fetch the user profile data after login
      const res = await axiosInstance.get(API_ENDPOINTS.USER_PROFILE);
      setUser(res.data);

      setIsAuthenticated(true);
      router.push('/');
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const signup = async ({ username, email, phone_number, password }: SignupRequest) => {
    setLoading(true);
    try {
      await axiosInstance.post(`${API_ENDPOINTS.SIGN_UP}`, {
        username,
        [email ? 'email' : 'phone_number']: email || phone_number,
        password
      })

      // TODO: redirect to verify page with contact and method (email or phone_number)
      router.push(`/verify?contact=${email || phone_number}&method=${email ? 'email' : 'phone_number'}`);
    } catch (error) {
      console.log('This error: ', error)
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const verify = async ({ email, phone_number, code }: VerifyUserRequest) => {
    setLoading(true);
    try {
      await axiosInstance.post(`${API_ENDPOINTS.VERIFY}`, {
        [email ? 'email' : 'phone_number']: email || phone_number,
        code
      })

      router.push('/login');
    } catch (error) {
      console.error('Verify failed:', error);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const siginWithGoogle = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.SIGN_IN_WITH_GOOGLE}?state=user`);

      setIsAuthenticated(true);
      window.location.href = response.data;
    } catch (error) {
      console.error('Signin with Google failed:', error);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
    setLoading(true);
    try {
      // send logout to api
      setIsAuthenticated(false);
      setUser(null);
      router.push('/login')
    } catch (error) {
      console.error('Logout Failed:::', error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, user, login, logout, signup, verify, siginWithGoogle }
    }>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}