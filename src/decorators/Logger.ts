import { Request, Response } from "express";

export function Logger(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (req: Request, res: Response) {
      console.log(`[LOG] ${req.method} ${req.path}`);
      return originalMethod.call(this, req, res);
    };
}