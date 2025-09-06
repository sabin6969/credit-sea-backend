class ApiResponse{
    /**
     * 
     * @param {number} statusCode 
     * @param {string} message 
     * @param {object} data 
     */
    constructor(statusCode,message,data=null) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = true;
    }
}

export default ApiResponse;