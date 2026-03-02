
// Extend the built-in session types
declare module "next-auth" {
    interface Session {
        accessToken: string;
        refreshToken: string;
        error?: "RefreshTokenError" | null;
        user?: {
            email: string;
            name?: string;
            image?: string;
        }
    }

    interface User {
        accessToken: string;
        expiresAt: string;
        refreshToken: string;
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        accessToken: string;
        expiresAt: string;
        refreshToken: string;
        error?: "RefreshTokenError" | null;
    }
}

