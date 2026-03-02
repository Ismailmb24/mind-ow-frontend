import { serverAxios } from "../http/serverAxios";
import { UserCreateInput, UserInput } from "../validation/user";
import { AxiosError } from "axios";
import { ExternalServiceError } from "./ExternalServiceError";


//create user
export async function createUser(user: UserCreateInput) {
    try {
        //send user data to server
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


// get authorized user
export async function getMe(token: string) {
    try {
        const me = await serverAxios.get("/users/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return me.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            if (error.status === 401) {
                throw new ExternalServiceError(
                    "AuthenticationError",
                    "You are not authorized",
                    error.response?.status || 500
                )
            }

            throw new ExternalServiceError(
                "ExternalServiceError",     
                `Failed to get user`, 
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