import type {
  Admin,
  AdminSignInResponse,
  AdminSignRequest,
} from "@/services/admin.auth.services";
import axiosApi from "@/utils/axios";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  setAdminToken,
  removeAdminToken,
  getAdminToken,
} from "@/helpers/axios-api-helpers";
import { useNavigate } from "react-router";

interface AuthContextType {
  token: string | null;
  adminSignIn: (data: AdminSignRequest) => Promise<void>;
  admin: Admin | null;
  logout: () => void;
  isAuthenticated: boolean;

  // Define the shape of your auth context here
  // For example, you might have user, login, logout, etc.
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setTokenState] = useState<string | null>(
    () => getAdminToken() ?? null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = getAdminToken();
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  const setToken = (token: string | null) => {
    setTokenState(token);
    if (token) {
      setAdminToken(token);
    } else {
      removeAdminToken();
    }
  };

  const adminSignIn = async ({
    email,
    password,
  }: AdminSignRequest): Promise<void> => {
    console.log(
      "Admin sign-in initiated with email:",
      email,
      "password:",
      password
    );
    try {
      const response = await axiosApi.post<AdminSignInResponse>(
        "/admin/signin",
        {
          email,
          password,
        }
      );
      console.log("Admin sign-in response:", response);

      if (response && response.status === 200) {
        const { token, admin, message } = response.data;
        setToken(token);
        setAdmin(admin);
        toast.success(message, {
          description: `Welcome back, ${admin.firstName}!`,
        });
        navigate("/dashboard", { replace: true }); // Redirect to dashboard after successful sign-in
      }
    } catch (error) {
      console.error("Error during admin sign-in:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Unknown error");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const logout = () => {
    removeAdminToken();
    setAdmin(null);
    setToken(null);
    navigate("/signin");
    toast.success("Logged out successfully");
  };

  const value = {
    token,
    adminSignIn,
    admin,
    logout,
    isAuthenticated: !!token && !!admin,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
