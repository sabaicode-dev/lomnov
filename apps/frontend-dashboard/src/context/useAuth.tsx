'use client'
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpionts";
import { AuthContextType, LoginRequest, SignupRequest, VerifyUserRequest } from "@/libs/types/auth/auth.type";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Define API endpoints

export const AuthProvider = ({ children, isLogin }: { children: ReactNode, isLogin: boolean }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isErrors, setIsErrors] = useState<string>('')
    const router = useRouter();
    const checkAuthStatus = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(API_ENDPOINTS.USER_PROFILE);
            console.log("User Profile ::: ",res.data)
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
        setLoading(true);
        try {
            const ress = await axiosInstance.post(`${API_ENDPOINTS.SIGN_IN}`, {
                [email ? 'email' : 'phone_number']: email ?? phone_number,
                password
            })
            console.log(ress);

            setIsAuthenticated(true);
            // Fetch the user profile data after login
            const res = await axiosInstance.get(API_ENDPOINTS.USER_PROFILE);
            setUser(res.data);
            router.push('/dashboard');
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            handleError(error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }

    // const signup = async ({ username, email, phone_number, password , role  }: SignupRequest) => {
    //     setLoading(true);
    //     try {
    //         await axiosInstance.post(`${API_ENDPOINTS.SIGN_UP}`, {
    //             username,
    //             [email ? 'email' : 'phone_number']: email || phone_number,
    //             password,
    //             role
    //         })

    //         // TODO: redirect to verify page with contact and method (email or phone_number)
    //         router.push(`/verify?contact=${email || phone_number}&method=${email ? 'email' : 'phone_number'}`);
    //     } catch (error) {
    //         //  console.log('This error: ', error)
    //         setIsAuthenticated(false);
    //         throw error;
    //     } finally {
    //         setLoading(false);
    //     }
    // }


    // const verify = async ({ email, phone_number, code }: VerifyUserRequest) => {
    //     setLoading(true);
    //     try {
    //         await axiosInstance.post(`${API_ENDPOINTS.VERIFY}`, {
    //             [email ? 'email' : 'phone_number']: email || phone_number,
    //             code
    //         })

    //         router.push('/login');
    //     } catch (error) {
    //         console.error('Verify failed:', error);
    //         setIsAuthenticated(false);
    //         throw error;
    //     } finally {
    //         setLoading(false);
    //     }
    // }
    // Signup function
  const signup = async ({
    username,
    email,
    phone_number,
    password,
    role,
  }: SignupRequest) => {
    setLoading(true);
    try {
      const contact = email || phone_number;
      const method = email ? "email" : "phone_number";

      await axiosInstance.post(API_ENDPOINTS.SIGN_UP, {
        username,
        [method]: contact,
        password,
        role,
      });

      // Redirect to verify page with contact and method
    //   router.push(`/verify?contact=${contact}&method=${method}`);
    } catch (error) {
      console.error("Signup error:", error);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Verify function
  const verify = async ({ email, phone_number, code }: VerifyUserRequest) => {
    setLoading(true);
    try {
      const contact = email || phone_number;
      const method = email ? "email" : "phone_number";

      await axiosInstance.post(API_ENDPOINTS.VERIFY, {
        [method]: contact,
        code,
      });

      // Redirect to login after successful verification
      
    } catch (error) {
      console.error("Verification error:", error);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

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
            handleError(error);
        } finally {
            setLoading(false);
        }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleError = (error) => {
        if (error.response) {
            setIsErrors(error.response.data.error_message || "Something went wrong")
        } else if (error.request) {
            // No response received from server
            setIsErrors('Server did not respond. Please try again later.');
        } else {
            // Error during setting up the request
            setIsErrors('An error occurred while setting up the request.');
        }
        console.log(error);
    }
    console.log(user);
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, user, isErrors, login, logout, signup, verify, siginWithGoogle }
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