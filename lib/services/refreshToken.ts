
import { serverAxios } from "../http/serverAxios";
import { ExternalServiceError } from "./ExternalServiceError";
import { AxiosError } from "axios";

export async function refreshToken(refresh_token: string) {
    try {
        const response = await serverAxios.post("/refresh-token", {
            refresh_token: refresh_token
        });

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new ExternalServiceError("RefreshTokenError", error.message, error.response?.status|| 500);
        }
    }
}