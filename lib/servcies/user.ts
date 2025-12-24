import { serverAxios } from "../http/serverAxios";
import { UserCreateInput } from "../validation/user";
import { AxiosError } from "axios";

export class ExternalServiceError extends Error {
    constructor(public name: string, message: string, public status: number) {
        super(message);
    }
}

export async function createUser(user: UserCreateInput) {
    try {
        const response = await serverAxios.post("/users", user); 

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 409) {
                throw new ExternalServiceError(
                    "ExternalServiceConflict",
                    "User already exists",
                    error.response?.status || 500
                );
            }

            throw new ExternalServiceError(
                "ExternalServiceError",     
                `Failed to create user`, 
                error?.response?.status || 500
            );
        }

        throw new ExternalServiceError(
            "InternalError",     
            `something went wrong`, 
            500
        );
    }
}