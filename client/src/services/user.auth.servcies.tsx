// import axiosInstance from "@/base/axios";
import type { UserFormValues } from "@/pages/userform";
import axiosApi from "@/utils/axios";
import axios from "axios";
import { toast } from "sonner";

const registerUser = async (userData: UserFormValues): Promise<void> => {
  try {
    const response = await axiosApi.post("/users", userData);
    if (response && response.status === 201) {
      toast.success("Registration completed successfully!", {
        description:
          "Your information has been saved and we'll be in touch soon.",
      });
      console.log("User registered successfully");
    } else {
      throw new Error("User registration failed");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    if (axios.isAxiosError(error) && error.response) {
      toast.error(`Error: ${error.response.data.message || "Unknown error"}`);
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }
};

const userAuthServices = {
  registerUser,
};

export default userAuthServices;
