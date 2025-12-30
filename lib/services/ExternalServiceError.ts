//this class is used to throw errors from external services
export class ExternalServiceError extends Error {
    constructor(public name: string, message: string, public status: number) {
        super(message);
    }
}