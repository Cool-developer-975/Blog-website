export class ApiResponse{
    constructor(statusCode, msg, data){
        this.statusCode = statusCode;
        this.msg = msg;
        this.data = data;
        this.success = this.statusCode >= 200 && this.statusCode < 300;
    }
}