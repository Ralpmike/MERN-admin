import axios from "axios";
import axiosApi from "@/utils/axios";
import { toast } from "sonner";
import type { SignUpFormValues } from "@/pages/sign-up";

interface AdminSignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
}

interface AdminSignUpResponse {
  token: string;
  newAdmin: {
    firstName: string;
    lastName: string;
    email: string;
    agreeToTerms: boolean;
    id: string;
  };
  message: string;
}

export interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface AdminSignInResponse {
  token: string;
  admin: Admin;
  message: string;
  password?: string;
}
export interface AdminSignRequest {
  email: string;
  password: string;
}

export const adminSignUp = async (data: SignUpFormValues): Promise<void> => {
  const { firstName, lastName, email, password, agreeToTerms } = data;
  const adminSignUpData: AdminSignUpRequest = {
    firstName,
    lastName,
    email,
    password,
    agreeToTerms,
  };

  try {
    const response = await axiosApi.post<AdminSignUpResponse>(
      "/admin/signup",
      adminSignUpData
    );
    console.log("Admin sign-up response:", response);

    if (response && response.status === 201) {
      const { newAdmin: admin, message } = response.data;
      toast.success(message, {
        description: `Welcome aboard, ${admin.firstName}!`,
      });
    }
  } catch (error) {
    console.error("Error during admin sign-up:", error);
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message || "Unknown error");
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }
};
