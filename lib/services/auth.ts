import { serverAxios } from "../http/serverAxios";
import { AxiosError } from "axios";
import { ExternalServiceError } from "./ExternalServiceError";
import { UserInput } from "../validation/user";
import { auth } from "../auth/config";

export async function signOutUser() {
    try {
        const session = auth()
        const response = await serverAxios.get("/auth/signout", {
            params: {refreshToken: auth.r}
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new ExternalServiceError(
                "ExternalServiceError",
                "Failed to sign out user",
                error.response?.status || 500
            );
        }
        throw new ExternalServiceError(
            "InternalError",
            "Something went wrong during sign out",
            500
        );
    }
}

// sign in user
export async function signInUser(user: UserInput) { 
    try {
        //convert user to form data
        const params = new URLSearchParams();
        params.append("username", user.email);
        params.append("password", user.password);

        //send form data to server
        const response = await serverAxios.post("/auth/signin", params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });

        const setCookies = response.headers["set-cookie"];

        return response.data;
    } catch (error) {
        
        if (error instanceof AxiosError) {
            if (error.response?.status === 404) {
                throw new ExternalServiceError(
                    "AuthenticationError",
                    "Invalid email or password",
                    error.response?.status
                );
            }

            throw new ExternalServiceError(
                "ExternalServiceError",     
                `Failed to sign in user`, 
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
// google sign in
export async function googleSignIn(token: string) {
    try {
        const response = await serverAxios.post("/auth/google-signin", {token});

        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            if (error.response?.status === 401) {
                throw new ExternalServiceError(
                    "AuthenticationError",
                    "You are not authorized",
                    error.response?.status || 500
                )
            }

            throw new ExternalServiceError(
                "ExternalServiceError",     
                `Failed to sign in user`, 
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