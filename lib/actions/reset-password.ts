import { success } from "zod"
import { ExternalServiceError } from "../services/ExternalServiceError"
import { forgotPassword, resetPassword } from "../services/resetPassword"


export async function forgotPasswordAction(email: string) {
    try {
        const data = await forgotPassword(email)

        return {success: true, data}
    } catch (error) {
        if (error instanceof ExternalServiceError) {
            return {success: false, type: error.name, message: error.message}
        }
    }
}

export async function resetPasswordAction(password: string, token: string) {
    try {
        const data = await resetPassword(password, token)

        return {success: true, data}
    } catch (error) {
        if (error instanceof ExternalServiceError) {
            return {success: false, type: error.name, message: error.message}
        }
    }
}