import NextAuth from "next-auth";
import type { Session, User } from "next-auth";
import type { Account } from "@auth/core/types";
import type { JWT } from "@auth/core/jwt";
import Credentials from "next-auth/providers/credentials";  
import { userSchema } from "../validation/user";
import googleSignIn, { getMe, signInUser } from "../services/user";
import "./types"; // Import to register type extensions
import { refreshToken } from "../services/refreshToken";
import Google from "next-auth/providers/google";
import { AxiosError } from "axios";



const authConfig = {
    providers: [
        Google,
        Credentials({
            credentials: {
                email: {
                    type: "email",
                    label: "Email",
                    placeholder: "Enter your email"
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "Enter your password"
                }
            },
            authorize: async (credentials) => {
                const parsedCredentials = userSchema.safeParse(credentials);

                if (!parsedCredentials.success) {
                   return null; 
                }

                try {
                    const response = await signInUser(parsedCredentials.data);
                    
                    const user = await getMe(response.access_token);
                    // Attach token data directly to the user object
                    return {
                        ...user,
                        accessToken: response.access_token, 
                        expiresAt: response.expires_at,
                        refreshToken: response.refresh_token
                    };              
                } catch (error) { 
                    return null;
                }
            },
        })
    ],
    callbacks: {
        async jwt({token, user, account}: {token: JWT, user: User, account: Account}) {
            // Check if user is authenticated through google provider
            if(account?.provider === "google") {
                try {
                    const response = await googleSignIn(account.id_token as string);

                    // Attach token data directly to the user object
                    return {
                        ...token,
                        accessToken: response.access_token, 
                        expiresAt: response.expires_at,
                        refreshToken: response.refresh_token
                    };              
                } catch (error) { 
                    return null;
                }
                
            }
            if (user) {
                // Attach token data directly to the token object
                token.accessToken = user.accessToken as string;
                token.expiresAt = user.expiresAt;
                token.refreshToken = user.refreshToken;

                return token;
            } else if (Date.now() < Date.parse(token.expiresAt)) {
                // Token is still valid
                return token;   
            } else {
                // Token has expired, clear it
               try {
                console.log("refreshing token")
                const response = await refreshToken(token.refreshToken);
                token.accessToken = response.access_token;
                token.expiresAt = response.expires_at;
                token.refreshToken = response.refresh_token;
                token.error = null;

                return token;
               } catch (error) {
                if (error instanceof AxiosError) {
                    console.log("Refresh token error: ", error.message)
                    token.error = "RefreshTokenError";

                    return token;
                }
               }    
            }
        },
        async session({session, token}: {session: Session, token: JWT}) {
            // Attach token data directly to the session object
            if (token) {
                session.accessToken = token.accessToken as string;
                session.error = token.error;
            }

            return session;
        }
    },
    pages: {
        signIn: "/signin",
        error: "/auth/error",
        newUser: "/signup"
    }
};

// @ts-expect-error - NextAuth is callable despite TypeScript's incorrect type inference
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);