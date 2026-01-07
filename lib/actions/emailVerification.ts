import { resendEmail, verifyEmail } from "../services/emailVerification";
import { ExternalServiceError } from "../services/ExternalServiceError";

export async function verifyEmailAction(token: string) {
    try {
        const data = await verifyEmail(token);

        return {success: true, data}
    } catch (error) {
        if (error instanceof ExternalServiceError) {
            return {success: false, type: error.name, message: error.message}
        }

        return {
            ok: false,
            type: "InternalError",
            message: "Something went wrong"
        }
    }
}

export async function resendEmailAction(email: string){
    try {
        const data = await resendEmail(email);

        return {success: true, data}
    } catch (error) {
        if (error instanceof ExternalServiceError) {
            return {success: false, type: error.name, message: error.message}
        }

        return {
            ok: false,
            type: "InternalError",
            message: "Something went wrong"
        }
    }
}