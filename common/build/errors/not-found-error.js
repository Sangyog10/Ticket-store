"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundError = void 0;
const custom_error_1 = require("./custom-error");
class notFoundError extends custom_error_1.CustomError {
    constructor() {
        super('Route not found');
        this.statusCode = 404;
        Object.setPrototypeOf(this, notFoundError.prototype);
    }
    serializeErrors() {
        return [{ message: 'Not Found' }];
    }
}
exports.notFoundError = notFoundError;
