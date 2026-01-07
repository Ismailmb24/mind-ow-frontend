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
                    error.response?.status || 500
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
export default async function googleSignIn(token: string) {
    console.log("google sign in");
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