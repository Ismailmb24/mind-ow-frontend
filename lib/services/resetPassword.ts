import { AxiosError } from "axios";
import { ExternalServiceError } from "./ExternalServiceError";
import { clientAxios } from "../http/clientAxios";

export async function forgotPassword(email: string) {
    try {
        const responce = await clientAxios.post("/auth/forgot-password", {email})

        return {success: true, data: responce.data}
    } catch (error) {
         if (error instanceof AxiosError) {
            throw new ExternalServiceError(
                "ForgotPasswordError",
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

export async function resetPassword(password: string, token: string) {
    try {
        const response = await clientAxios.post("/auth/reset-password", {user_update: {password}, token})

        return response.data;
    } catch (error) {
         if (error instanceof AxiosError) {
            throw new ExternalServiceError(
                "ResetPasswordError",
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