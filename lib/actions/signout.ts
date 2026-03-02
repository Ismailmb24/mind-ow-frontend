"use server";

import { signOutUser } from "../services/auth";
import { signOut } from "../auth/config";

export async function logout() {
    try {
        await signOutUser();
    } catch (error) {
        console.error("Failed to sign out from backend:", error);
        // Continue with NextAuth signout even if backend fails
    }
    
    await signOut({ redirectTo: "/auth/signin" });
}
