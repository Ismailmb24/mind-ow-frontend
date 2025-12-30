
// Extend the built-in session types
declare module "next-auth" {
    interface Session {
        accessToken: string;
        error?: "RefreshTokenError" | null;
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

