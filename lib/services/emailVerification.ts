import { clientAxios } from "../http/clientAxios";
import { AxiosError } from "axios";
import { ExternalServiceError } from "./ExternalServiceError";

export const verifyEmail = async (token: string) => {
    try {
        const response = await clientAxios.post(`/auth/verify-email`, { token: token });
        console.log("Verify email response: ", response.data);

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log("Verify email error: ", error.response?.data);
            throw new ExternalServiceError(
                "ResendEmailError",
                error.response?.data?.message,
                error.response?.status || 500
            );
        }
        
        throw new ExternalServiceError(
            "InternalError", 
            "Something went wrong",
            500
        )
    }
}

export const resendEmail = async (email: string) => {
    try {
        const response = await clientAxios.post(`/auth/resend-verification-email`, { email });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new ExternalServiceError(
                "ResendEmailError",
                error.response?.data?.message,
                error.response?.status || 500
            );
        }
        
        throw new ExternalServiceError(
            "InternalError", 
            "Something went wrong",
            500
        )
    }
}