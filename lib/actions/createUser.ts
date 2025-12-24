import { createUser, ExternalServiceError } from "../servcies/user";
import { UserCreateInput } from "../validation/user";

export async function createUserAction(userData: UserCreateInput) {
    try {
        const user  = await createUser(userData);

        return {
            ok: true,
            message: "User created successfully",
            user
        };
    } catch (error) {
        if (error instanceof ExternalServiceError) {
            if (error.status === 409) {
                return {
                    ok: false,
                    type: error.name,
                    message: error.message
                }
            }

            return {
                ok: false,
                type: error.name,
                message: error.message
            }
        }

        return {
            ok: false,
            type: "InternalError",
            message: "Something went wrong"
        }
    }
}