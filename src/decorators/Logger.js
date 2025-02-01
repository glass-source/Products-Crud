"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = Logger;
function Logger(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (req, res) {
        console.log(`[LOG] ${req.method} ${req.path}`);
        return originalMethod.call(this, req, res);
    };
}
