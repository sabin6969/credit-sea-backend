class ErrorResponse{

    /**
     * Creates an instance of the error response.
     * @param {number} statusCode - The HTTP status code of the error.
     * @param {string} message - A descriptive error message.
     * @param {Array|Object} errors - Additional error details or validation errors.
     */
    constructor(statusCode,message,errors=[]) {
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.success = false;
    }
}

export default ErrorResponse;