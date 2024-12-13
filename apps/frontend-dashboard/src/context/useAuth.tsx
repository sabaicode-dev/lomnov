'use client'
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpionts";
import { AuthContextType, LoginRequest, SignupRequest, VerifyUserRequest } from "@/libs/types/auth/auth.type";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children, isLogin }: { children: ReactNode, isLogin: boolean }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const checkAuthStatus = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(API_ENDPOINTS.USER_PROFILE);
            //console.log("User Profile ::: ",res.data)
            //setUser(res.data);
            // Extract the first user from the response
            if (res.data) {
                //console.log("User condition is true:: ",true)
                setUser(res.data); // Access the first user in the users array
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
                // Handle case where no users are returned
            }
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (isLogin) {
            checkAuthStatus();
        } else { setLoading(false) }
    }, [isLogin]);

    const login = async ({ email, phone_number, password }: LoginRequest) => {
        console.log(email,password);
        
        setLoading(true);
        try {
            const ress = await axiosInstance.post(`${API_ENDPOINTS.SIGN_IN}`, {
                [email ? 'email' : 'phone_number']: email || phone_number,
                password
            })
            console.log(ress);
            
            setIsAuthenticated(true);
            // Fetch the user profile data after login
            const res = await axiosInstance.get(API_ENDPOINTS.USER_PROFILE);
            setUser(res.data);
            // console.log(res);
            router.push('/dashboard');
        } catch (error) {
            console.log("Error Athentication:: ",error)
            setIsAuthenticated(false);
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
            //  console.log('This error: ', error)
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
            const response = await axiosInstance.get(`${API_ENDPOINTS.SIGN_IN_WITH_GOOGLE}`);
            window.location.href = response.data.data;
            setIsAuthenticated(true);
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
            await axiosInstance.post(API_ENDPOINTS.LOGOUT); // Call the logout endpoint
            setIsAuthenticated(false);
            setUser(null);
            router.push('/');
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

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